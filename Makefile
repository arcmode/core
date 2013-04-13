
all: install build test

install: package.json
	@echo "\nInstall: npm install ..."
	@npm install
	
build: components index.js
	@echo "\nBuild:  component build --dev ..."
	@component build --dev

components: component.json
	@echo "\nInstall: component install --dev ..."
	@component install --dev

test: test-mocha test-mocha-phantomjs

test-mocha:
	@echo "\nTest: mocha"
	@./node_modules/.bin/mocha \
			--require should \
			--reporter spec \
			--colors \
			--check-leaks

test-mocha-phantomjs:
	@echo "\nTest: mocha-phantomjs"
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R spec test/test.html
	
watch:
	@osascript test/watch.applescript
	
watch-mocha:
	@component build --dev
	@./node_modules/.bin/mocha \
			--require should \
			--reporter min \
			--colors \
			--check-leaks

watch-phantom:
	@component build --dev
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R min test/test.html

clean:
	rm -fr build components node_modules

.PHONY: install test build clean
