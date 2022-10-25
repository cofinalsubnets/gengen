PORT ?= 8080

serve:
	python -m http.server $(PORT)

.PHONY: serve
