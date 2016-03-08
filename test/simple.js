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