PUBDIR = public
LIBDIR = lib
TESTDIR = test/lib

JQVERSION = 1.10.2
QUNITVERSION = 1.12.0
JQUERY = jquery-$(JQVERSION).min.js
FILES = gengen.html gengen.js gengen.css $(JQUERY)
TESTFILES = qunit.js qunit.css gengen.js $(JQUERY)
PORT ?= 8080


CURLFLAGS = -s

serve: $(addprefix $(PUBDIR)/, $(FILES))
	python -m http.server --directory $(PUBDIR) $(PORT)

%/jquery-$(JQVERSION).min.js:
	curl $(CURLFLAGS) -o $@ "http://code.jquery.com/jquery-$(JQVERSION).min.js"

test: $(TESTDIR) $(addprefix $(TESTDIR)/, $(TESTFILES))

$(TESTDIR):
	@mkdir $@

$(TESTDIR)/qunit.% :
	@echo -n "Retrieving QUnit $(QUNITVERSION) ($*)..."
	@curl $(CURLFLAGS) -o $@ "http://code.jquery.com/qunit/qunit-$(QUNITVERSION).$*"
	@echo "done"

.PHONY: test serve
