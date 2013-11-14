(function () {
  var genData = [
    {
      words: ["uni", "chupa", "night"],
      p:     1,
      fragment: false,
      dependents: [],
      prereq: null

    },
    {
      words: ["corn", "cabra", "gaunt"],
      p:     1,
      fragment: true,
      dependents: [],
      prereq: null
    }
  ];

  test("gengen.generate", function () {
    var word = gengen.generate(genData);
    equal(typeof(word), 'string', "returns a string");
    equal(word.split(/\s+/).length, 1, "treats fragments correctly");
  });

  test("gengen.generatorSnippet", function () {
    var snippet = gengen.generatorSnippet(genData);
    equal(typeof(snippet), 'string', 'returns a string');
    eval(snippet);
    equal(typeof(generate), 'function', 'which defines a function');
  });

  test("gengen.domify", function () {
    var $fix = $("#qunit-fixture");
    gengen.domify(genData, $fix);
    var deps = $fix.find(".dependents").first();

    equal(deps.children().length, 2,
      'appends the correct number of elements to the correct node');
  });

  test("gengen.objify", function () {
    var term = $("#qunit-fixture > .term");
    term.find(".p").val(50);
    term.find(".words").val("what\na\nracket\n\n");
    term.find(".fragment")[0].checked = true;
    term.find(".prereq").val("this makes no sense");

    gengen.domify(genData, term);
    var newData = gengen.objify(term);
    window.newData = newData;

    equal(newData.p, 0.5, 'gets p');
    deepEqual(newData.words, ['what', 'a', 'racket'], 'gets words');
    equal(newData.fragment, true, 'gets fragment');
    equal(newData.prereq, 'this makes no sense', 'gets prereq');
    deepEqual(newData.dependents, genData, 'gets dependents');
  });

  test("gengen.queryObject", function () {
    var obj = { comic: "books", rap: "music" },
        qstring = "?comic=books&rap=music";
    equal(null, gengen.queryObject(""),
      'returns null when called with an empty string');
    deepEqual(obj, gengen.queryObject(qstring),
      'returns an object representing a query string');

    var obj = { noise: "{#'!! ]])*" };
        nstring = "?noise=" + encodeURIComponent(obj.noise);

    deepEqual(obj, gengen.queryObject(nstring),
      'handles URI encoded text');
  });

})();

