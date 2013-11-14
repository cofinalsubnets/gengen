(function () {
  window.gengen = {};

  gengen.generate = function (data) {
    function gencolumn(column, pword) {
      if (column.words.length
          && (!column.prereq || column.prereq == pword)
          && Math.random() < column.p) {
        var word = column.words[Math.floor(Math.random() * column.words.length)],
            prefix = column.fragment ? '' : ' ';
        return prefix + word + gencolumns(column.dependents, word).join('');
      } else return '';
    }

    function gencolumns(columns, pword) {
      return [].concat(columns.map(function (c) {return gencolumn(c, pword);}));
    }
    return gencolumns(data).join('').trim();
  };

  gengen.generatorSnippet = function (data) {
    return "function generate() {"
         + "  var g = " + gengen.generate + ";"
         + "  return g(" + JSON.stringify(data) + ");"
         + "}";
  };

  gengen.pageGeneratorSnippet = function () {
    return gengen.generatorSnippet(gengen.pageGeneratorData());
  }

  gengen.domify = function (obj, root) {
    obj.forEach(function (o) {
      var el = gengen.newElement(".term");
      el.find(".words").val(o.words.join("\n"));
      el.find(".p").val(o.p * 100).change();
      el.find(".fragment")[0].checked = o.fragment;
      el.find(".prereq").val(o.prereq || "");
      gengen.domify(o.dependents, el);
      root.find(".dependents").first().append(el);
    });
  };

  gengen.objify = function (dom) {
    dom = $(dom);
    return {
      p:          Number(dom.find(".p").val()) / 100,
      words:      dom.find(".words").val().split(/\n+/).filter(function (s) {return s.trim()}),
      fragment:   dom.find(".fragment")[0].checked,
      dependents: dom.find(".dependents").first().children().toArray().map(gengen.objify),
      prereq:     dom.find(".prereq").val() || null
    };
  };

  gengen.queryObject = function (qstring) {
    qstring = qstring.replace(/^\?/,'');
    if (qstring)
      return qstring.split("&")
              .map(function (s) {return s.split("=").map(decodeURIComponent);})
              .reduce(function (p,c) {p[c[0]] = c[1]; return p}, {});
    else return null;
  };

  gengen.pageQueryObject = function () {
    return gengen.queryObject(window.location.search);
  };

  gengen.pageLink = function () {
    return window.location.origin
         + window.location.pathname + "?gen="
         + encodeURIComponent(JSON.stringify(gengen.pageGeneratorData()));
  };

  gengen.pageLoadGenerator = function (gendata) {
    gengen.domify(gendata, $("#root"));
    $("#help0").hide();
  };

  gengen.pageGeneratorData = function () {
    return $("#root > .dependents").children().toArray().map(gengen.objify);
  };

  gengen.pageGenerateOutput = function () {
    var t, n = Math.max(0, Number($("#gennum").val())),
        out = $("#output").empty(),
        data = gengen.pageGeneratorData();
    for (var i=0; i<n; i++)
      (t = gengen.generate(data)) &&
        out.append($(document.createElement("li")).addClass("output").text(t));
  };

  gengen.newElement = function (sel) {
    return $(sel).filter(".prototype").clone(1).removeClass("prototype");
  };
})();

