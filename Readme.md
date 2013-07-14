
# Core

A cross-platform embeddable, multi emitter Javascript prototype.

See Makefile for details

## Example

```
// CommonJS require the module
var Core = require('core');

// apps and modules are the same kind of objects
var app = Core.create('myapp');
var hello = Core.create('hello');
var world = Core.create('world');

// they can use each others
world.use(hello);
app.use(world);

// and they initialize in dependency-first order
hello.on('init', function(){
  console.log('hello');
});
world.on('init', function(){
  console.log('world!');
});
app.init();
// hello
// world!
```

## API

####use()

```
describe('#use()', function(){
  it('should add a module to #modules', function(){
    var core = Core.create();
    var c1 = Core.create('c1');
    core.use(c1);
    core.modules.should.have.property('c1').equal(c1);
  });
});
```

####init()

```
describe('init', function(){
  it('should propagate through #modules (dependencies)', function(){
    var c1 = Core.create();
    var c2 = Core.create();
    var c3 = Core.create();
    var core = Core.create('core');
    core.use(c1);
    c1.use(c2);
    c2.use(c3);
    core.init();
    core.status.should.equal('running');
    c1.status.should.equal('running');
    c2.status.should.equal('running');
    c3.status.should.equal('running');
  });
  it('should be executed from dependencies to parents', function(done){
    var app = Core.create('myapp');
    var module = Core.create('mymod');
    var history = [];
    app.on('init', function(){
      history.push(this.id);
    });
    module.on('init', function(){
      history.push(this.id);
    });
    var loop = setInterval(function(){
      if (history.length === 2) {
        clearInterval(loop);
        history[0].should.equal('mymod');
        history[1].should.equal('myapp');
        done();
      }
    }, 1);
    app.use(module);
    app.init();
  });
});
```

####publish() / subscribe()

```
describe('#public', function(){
  it('should expose a publish/subscribe channel to all instances of Core',
  function(){
    var core1 = Core.create();
    var core2 = Core.create();
    var data1 = {data: 'mock1'};
    var data2 = {data: 'mock2'};
    var listener = sinon.spy();
    core1.subscribe('event', listener);
    core1.publish('event', data2);
    core2.publish('event', data1);
    listener.callCount.should.equal(2);
    listener.calledWithExactly(data1).should.be.true;
    listener.calledWithExactly(data2).should.be.true;
  });
});
```

####emit() / on()


```
it('should have private events', function(){
  var core1 = Core.create();
  var core2 = Core.create();
  var data1 = {data: 'mock1'};
  var data2 = {data: 'mock2'};
  var listener = sinon.spy();
  core1.on('event', listener);
  listener.callCount.should.equal(0);
  core1.emit('event', data1);
  listener.callCount.should.equal(1);
  core2.emit('event', data2);
  listener.callCount.should.equal(1);
  listener.calledWithExactly(data1).should.be.true;
});
```

## Test

Assuming you have `mocha` installed

####For node.js

    $ ./node_modules/.bin/mocha

####For the browser

    $ Open test/test.html

####Using mocha-phantomjs

    $ ./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R spec test/test.html

See Makefile and test/applescript for more options

## Todo

- Integrate websockets.
- AMD compatibility

## License

  MIT
