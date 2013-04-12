NO_COLOR=\x1b[0m
MSG_COLOR=\x1b[34;01m

all: install build test

build: components index.js
	@echo "\nBuild:  component build --dev ..."
	@component build --dev

install: package.json
	@echo "\nInstall: npm install ..."
	@npm install

components: component.json
	@component install --dev

test: testNode testBrowser

testNode:
	@echo "\nTest: mocha --require should --reporter spec --colors --check-leaks"
	@./node_modules/.bin/mocha \
			--require should \
			--reporter spec --colors --check-leaks

testBrowser:
	@echo "\nTest: mocha-phantomjs test/test.html"
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs test/test.html

clean:
	rm -fr build components template.js

.PHONY: install test build clean
