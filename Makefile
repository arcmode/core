
all: build test

# Install all dependencies
install: install-npm install-components

# Install dependencies from package.json
install-npm: package.json
	@echo "\nInstall: npm install ..."
	@npm install

# Install dependencies from component.json
install-components: component.json
	@echo "\nInstall: component install --dev ..."
	@component install --dev

# Install dependencies and build
build: index.js
	@echo "\nBuild:  component build --dev ..."
	@component build --dev

# Launch tests
test: phantom mocha

# Launch mocha
mocha:
	@echo "\nTest: mocha"
	@./node_modules/.bin/mocha \
			--require should \
			--reporter spec \
			--colors \
			--check-leaks

# Launch mocha-phantomjs
phantom:
	@echo "\nTest: mocha-phantomjs"
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R spec test/test.html

# Build and test continuosly using an applescript
watch:
	@osascript test/watch.applescript

# Launch mocha with min reporter
mocha-mini:
	@component build --dev
	@./node_modules/.bin/mocha \
			--require should \
			--reporter min \
			--colors \
			--check-leaks

# Launch mocha-phantomjs with min reporter
phantom-mini:
	@component build --dev
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R min test/test.html

clean:
	rm -fr build components node_modules

.PHONY: install test build clean
