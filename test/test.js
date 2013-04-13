'use strict';

var Core;

try {
  Core = require('core');
  console.log('\n  requiring Core from component');
} catch(e){
  Core = require('../');
  console.log('\n  requiring Core from filesystem');
}

describe('Core', function(){
  describe('#create()', function(){
    it('should return a stopped Core instance with no modules', function(){
      var core = Core.create();
      (core instanceof Core).should.equal(true);
      (core.status).should.equal('stopped');
      (core.modules).should.be.empty;
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
      describe('when multiple instances are initialized', function(){
        var core = Core.create();
        var count = 0;
        core.events.on('change status', function(data) {
          if (data.target === core) {
            count += 1;
          }
          it('should emit a single `change status` event for instance', function(){
            count.should.equal(1);
          });
        });
        core.init();
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
        var context = this;
        var core = Core.create();
        context.Mock = function(){};
        context.Mock.prototype = Core.create();
        context.Mock.prototype.events.on('change status', function(event) {
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
        var mock = new this.Mock();
        core.use('mock', mock);
        core.modules.should.have.property('mock').equal(mock);
      });
    });
  });
});
