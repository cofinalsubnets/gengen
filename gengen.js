window.gengen = {

  generate: data => {
    const
      gencolumns = (columns, pword) =>
        [].concat(columns.map(c => gencolumn(c, pword))),

      gencolumn = (column, pword) => {
        if (column.words.length
            && (!column.prereq || column.prereq == pword)
            && Math.random() < column.p) {
          const word = column.words[Math.floor(Math.random() * column.words.length)],
                prefix = column.fragment ? '' : ' ';
          return prefix + word + gencolumns(column.dependents, word).join('');
        }
        return '';
      };

    return gencolumns(data).join('').trim();
  },

  generatorSnippet: data =>
    `(() => (${gengen.generate})(${JSON.stringify(data)}))`,

  pageGeneratorSnippet: () =>
    gengen.generatorSnippet(gengen.pageGeneratorData()),

  domify: (objs, root) => objs.forEach(o => {
    const el = gengen.newElement(".term");
    el.find(".words").val(o.words.join("\n"));
    el.find(".p").val(o.p * 100).change();
    el.find(".fragment")[0].checked = o.fragment;
    el.find(".prereq").val(o.prereq || "");
    gengen.domify(o.dependents, el);
    root.find(".dependents").first().append(el);
  }),

  objify: dom => {
    dom = $(dom);
    return {
      p:          Number(dom.find(".p").val()) / 100,
      words:      dom.find(".words").val().split(/\n+/).filter(s => s.trim()),
      fragment:   dom.find(".fragment")[0].checked,
      dependents: dom.find(".dependents").first().children().toArray().map(gengen.objify),
      prereq:     dom.find(".prereq").val() || null
    };
  },

  queryObject: qstring => {
    qstring = qstring.replace(/^\?/,'');
    return !qstring ? null :
      qstring.split("&")
        .map(s => s.split("=").map(decodeURIComponent))
        .reduce((p,c) => (p[c[0]] = c[1], p), {});
  },

  pageQueryObject: () => gengen.queryObject(window.location.search),

  pageLink: () => window.location.origin
    + window.location.pathname + "?gen="
    + encodeURIComponent(JSON.stringify(gengen.pageGeneratorData())),

  pageLoadGenerator: gendata => {
    gengen.domify(gendata, $("#root"));
    $("#help0").hide();
  },

  pageGeneratorData: () =>
    $("#root > .dependents").children().toArray().map(gengen.objify),

  pageGenerateOutput: () => {
    const n = Math.max(0, Number($("#gennum").val())),
          out = $("#output").empty(),
          data = gengen.pageGeneratorData();
    for (let t, i=0; i<n; i++) if ((t = gengen.generate(data)))
      out.append($(document.createElement("li")).addClass("output").text(t));
  },

  newElement: sel =>
    $(sel).filter(".prototype").clone(1).removeClass("prototype")
};

window.addEventListener('DOMContentLoaded', () => {

  const shadowMsg = sel => {
    const c = $("#msg_box").children(sel).show();
    c.siblings().hide();
    $("#shadow,#msg_box").addClass("gen");
    return c;
  };

  $("#shadow").click(() => $(".gen").removeClass("gen"));

  $(".delete").click(function () {
    $(this).parents(".deleteable").first().remove();
  });

  $(".p").change(function () {
    $(this).siblings(".percent").text(this.value + "%");
  });

  $(".deps").click(function () {
    const r = $(this)
      .parents(".term").first().find(".right")
      .first().toggleClass("show");
    $(this).text(r.hasClass("show") ? "Hide dependents" : "Show dependents");
  });

  $(".add_term").click(function () {
    gengen.newElement(".term").appendTo($(this)
      .siblings(".dependents")).hide().fadeIn(100);
  });

  $("#root > .add_term").one("click", () => $("#help0").fadeOut());

  $(".test").click(function () {
    const term = $(this).parents(".term").first(),
          result = gengen.generate([gengen.objify(term)]);
    term.find(".test_out").first().text(result);
  });

  $('#generate, #regen').click(() => {
    shadowMsg("#generator_box");
    gengen.pageGenerateOutput();
  });

  $('#snippet').click(() => shadowMsg("#code_box").text(gengen.pageGeneratorSnippet()));
  $('#link').click(() => shadowMsg("#code_box").text(gengen.pageLink()));
  $('#helpme').click(() => shadowMsg("#help_box"));
  $("#gennum").change(gengen.pageGenerateOutput);

  $(".collapse").click(function () {
    const c = $(this),
          open = c.parents(".term").first().toggleClass("open").hasClass("open");
    c.text(open ? "-" : "+");
  });

  // check for a configuration passed in through the query string
  const q = gengen.pageQueryObject();
  q && q.gen && gengen.pageLoadGenerator(JSON.parse(q.gen));

  // open unicorn generator link in a new window
  $("#help_box a").attr("target", "_blank");
});
