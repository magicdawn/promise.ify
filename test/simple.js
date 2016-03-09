'use strict';

var promiseify = require('../');
require('should');


describe('should work', function(done) {
  it('when ctx provided', function() {
    var ctx = {
      name: 'foo'
    };

    var fn = function(cb) {
      var self = this;
      setTimeout(function() {
        cb(null, self.name);
      }, 10);
    };

    promiseify(fn, ctx)()
      .then(function(res) {
        res.should.equal(ctx.name);
        done();
      })
      .catch(done);
  });

  it('multi result', function(done) {
    var fn = promiseify(function(cb) {
      setTimeout(function() {
        cb(null, 0, 1);
      }, 10);
    });

    fn()
      .then(function(res) {
        res[0].should.equal(0);
        res[1].should.equal(1);
        done();
      })
      .catch(done);
  });

  it('auto this', function(done) {
    var ctx = {
      name: 'foo',
      fn: function(cb) {
        var self = this;
        setTimeout(function() {
          cb(null, self.name);
        }, 10);
      }
    };

    ctx.fnAsync = promiseify(ctx.fn);
    ctx.fnAsync()
      .then(function(res) {
        res.should.equal(ctx.name);
        done();
      })
      .catch(done);
  });

  it('promiseify.all should work', function(done) {
    var fs = promiseify.all(require('fs'));
    fs.readFileAsync(__filename, 'utf8')
      .then(function(res) {
        res.should.match(/promiseify/);
        done();
      })
      .catch(done);
  });
});

describe('error should be reported', function() {
  it('promiseify none function', function() {
    try {
      promiseify('a');
    } catch (e) {
      e.message.should.equal('a is not a function');
    }
  });

  it('reject first arg err', function(done) {
    promiseify(function(cb) {
      setTimeout(function() {
        cb(new Error('boom'));
      }, 10);
    })().catch(function(e) {
      e.message.should.equal('boom');
      done();
    });
  });

  it('reject fn runtime error', function(done) {
    promiseify(function(cb) {
      throw new Error('blabla');
    })().catch(function(e) {
      e.message.should.equal('blabla');
      done();
    });
  });
});

describe('work when `this` changes', function() {
  it('instance call prototype promiseified fn', function(done) {
    function T(name) {
      this.name = name;
    }

    T.prototype.fn = function(cb) {
      var self = this;
      setTimeout(function() {
        cb(null, self.name);
      }, 10);
    };
    T.prototype.fnAsync = promiseify(T.prototype.fn);

    var times = 0;
    var done2 = function done2() {
      times++;
      if (times === 2) done();
    };

    var foo = new T('foo');
    foo.fnAsync()
      .then(function(res) {
        res.should.equal('foo');
        done2();
      })
      .catch(done);

    var bar = new T('bar');
    bar.fnAsync()
      .then(function(res) {
        res.should.equal('bar');
        done2();
      })
      .catch(done);
  });
});