var Core;

try {
  Core = require('../');
  console.log('\n  requiring from filesystem');
} catch(e){
  Core = require('core');
  console.log('\n  requiring from component');
}

describe('Core', function(){
  describe('#create()', function(){
    it('should return a stopped Core instance with no modules', function(){
      var core = Core.create();
      (core instanceof Core).should.equal(true);
      (core.status).should.equal('stopped');
      (Array.prototype.slice(core.modules).length).should.equal(0);
    })
  });
  describe('#prototype', function(){
    describe('#init()', function(){
      it('should return a running Core instance', function(){
        var core = Core.create();
        core.init();
        (core.status).should.equal('running');
      });
      it('should fail on running instances', function(){
        var core = Core.create();
        core.init();
        core.init.should.throw();
      });
    });
    describe('#stop()', function(){
      it('should return a stopped Core instance', function(){
        var core = Core.create();
        core.init();
        core.stop();
        (core.status).should.equal('stopped');
      });
      it('should fail on new instances', function(){
        var core = Core.create();
        core.stop.should.throw();
      });
      it('should fail on stopped instances', function(){
        var core = Core.create();
        core.init();
        core.stop();
        core.stop.should.throw();
      });
    });
    describe('#use()', function(){
      it('should add a module to `this.modules`', function(){
        var core = Core.create();
        Mock = function(){};
        Mock.prototype = Core.create();
        Mock.prototype.events.on('change status', function(event) {
          if (event.target instanceof Mock) {
            switch (event.data.success) {
              case 'running':
                console.log('initialized', event.target);
                break;
              case 'stopped':
                console.log('stopped', event.target);
                break;
            }
          }
        });
        var mock = new Mock();
        core.use('mock', mock);
        (core.modules.mock).should.equal(mock);
        delete Mock;
      });
    });
  });
})