PUBDIR = public
LIBDIR = lib
TESTDIR = test/lib

JQVERSION = 1.10.2
QUNITVERSION = 1.12.0
JQUERY = jquery-$(JQVERSION).min.js
FILES = gengen.html gengen.js gengen.css $(JQUERY)
TESTFILES = qunit.js qunit.css gengen.js $(JQUERY)
PORT ?= 8080


HAMLFLAGS = -e
SASSFLAGS = -t expanded
CURLFLAGS = -s

build: $(PUBDIR) $(addprefix $(PUBDIR)/, $(FILES))

$(PUBDIR):
	@mkdir $@

$(PUBDIR)/gengen.html: $(LIBDIR)/gengen.haml $(LIBDIR)/help.markdown
	@echo -n "Compiling gengen.html... "
	@haml $(HAMLFLAGS) $< $@
	@echo "done"

$(PUBDIR)/gengen.js: $(LIBDIR)/gengen.js $(LIBDIR)/bindings.js
	@echo -n "Concatenating gengen.js... "
	@cat $^ > $@
	@echo "done"

$(PUBDIR)/gengen.css: $(LIBDIR)/gengen.scss
	@echo -n "Compiling gengen.css... "
	@sass $(SASSFLAGS) $< $@ > /dev/null
	@echo "done"

%/jquery-$(JQVERSION).min.js:
	@echo -n "Retrieving jQuery $(JQVERSION)... "
	@curl $(CURLFLAGS) -o $@ "http://code.jquery.com/jquery-$(JQVERSION).min.js"
	@echo "done"

test: $(TESTDIR) $(addprefix $(TESTDIR)/, $(TESTFILES))

$(TESTDIR):
	@mkdir $@

$(TESTDIR)/qunit.% :
	@echo -n "Retrieving QUnit $(QUNITVERSION) ($*)..."
	@curl $(CURLFLAGS) -o $@ "http://code.jquery.com/qunit/qunit-$(QUNITVERSION).$*"
	@echo "done"

server: build
	@cd public ;python2 -m SimpleHTTPServer $(PORT)

.PHONY: build test server

