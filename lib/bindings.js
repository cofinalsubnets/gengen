$(function () {

  function shadowMsg(sel) {
    var c = $("#msg_box").children(sel).show();
    c.siblings().hide();
    $("#shadow,#msg_box").addClass("gen");
    return c;
  }

  $("#shadow").click(function () {
    $(".gen").removeClass("gen");
  });

  $(".delete").click(function () {
    $(this).parents(".deleteable").first().remove();
  });

  $(".p").change(function () {
    $(this).siblings(".percent").text(this.value + "%");
  });

  $(".deps").click(function () {
    var r = $(this).parents(".term").first().find(".right")
                   .first().toggleClass("show");
    $(this).text(r.hasClass("show") ? "Hide dependents" : "Show dependents");
  });

  $(".add_term").click(function () {
    gengen.newElement(".term").appendTo($(this)
      .siblings(".dependents")).hide().fadeIn(100);
  });

  $("#root > .add_term").one("click", function () {
    $("#help0").fadeOut();
  });

  $(".test").click(function () {
    var term = $(this).parents(".term").first(),
        result = gengen.generate([gengen.objify(term)]);
    term.find(".test_out").first().text(result);
  });

  $("#generate,#regen").click(function () {
    shadowMsg("#generator_box");
    gengen.pageGenerateOutput();
  });

  $("#snippet").click(function () {
    shadowMsg("#code_box").text(gengen.pageGeneratorSnippet());
  });

  $("#link").click(function () {
    shadowMsg("#code_box").text(gengen.pageLink());
  });

  $("#helpme").click(function () {
    shadowMsg("#help_box");
  });

  $("#gennum").change(gengen.pageGenerateOutput);

  $(".collapse").click(function () {
    var c = $(this),
        open = c.parents(".term").first().toggleClass("open").hasClass("open");
    c.text(open ? "-" : "+");
  });

  // check for a configuration passed in through the query string
  var q = gengen.pageQueryObject();
  q && q.gen && gengen.pageLoadGenerator(JSON.parse(q.gen));

  // open unicorn generator link in a new window
  $("#help_box a").attr("target", "_blank");
});

