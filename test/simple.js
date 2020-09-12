const pify = require('../')
const should = require('should')

describe('should work', function () {
  it('when ctx provided', function () {
    let ctx = {
      name: 'foo',
    }

    let fn = function (cb) {
      let self = this
      setTimeout(function () {
        cb(null, self.name)
      }, 10)
    }

    return pify(fn, ctx)().then(function (res) {
      res.should.equal(ctx.name)
    })
  })

  it('multi result', function () {
    let fn = pify(function (cb) {
      setTimeout(function () {
        cb(null, 0, 1)
      }, 10)
    })

    return fn().then(function (res) {
      res[0].should.equal(0)
      res[1].should.equal(1)
    })
  })

  it('auto this', function () {
    let ctx = {
      name: 'foo',
      fn: function (cb) {
        let self = this
        setTimeout(function () {
          cb(null, self.name)
        }, 10)
      },
    }

    ctx.fnAsync = pify(ctx.fn)
    return ctx.fnAsync().then(function (res) {
      res.should.equal(ctx.name)
    })
  })

  it('pify.all should work', function () {
    let fs = pify.all(require('fs'))
    return fs.readFileAsync(__filename, 'utf8').then(function (res) {
      res.should.match(/pify/)
    })
  })
})

describe('error should be reported', function () {
  it('pify none function', function () {
    try {
      pify('a')
    } catch (e) {
      e.message.should.equal('a is not a function')
    }
  })

  it('reject first arg err', function (done) {
    pify(function (cb) {
      setTimeout(function () {
        cb(new Error('boom'))
      }, 10)
    })().catch(function (e) {
      e.message.should.equal('boom')
      done()
    })
  })

  it('reject fn runtime error', function (done) {
    pify(function (cb) {
      throw new Error('blabla')
    })().catch(function (e) {
      e.message.should.equal('blabla')
      done()
    })
  })
})

describe('work when `this` changes', function () {
  it('instance call prototype promiseified fn', function (done) {
    function T(name) {
      this.name = name
    }

    T.prototype.fn = function (cb) {
      let self = this
      setTimeout(function () {
        cb(null, self.name)
      }, 10)
    }
    T.prototype.fnAsync = pify(T.prototype.fn)

    let times = 0
    let done2 = function done2() {
      times++
      if (times === 2) done()
    }

    let foo = new T('foo')
    foo
      .fnAsync()
      .then(function (res) {
        res.should.equal('foo')
        done2()
      })
      .catch(done)

    let bar = new T('bar')
    bar
      .fnAsync()
      .then(function (res) {
        res.should.equal('bar')
        done2()
      })
      .catch(done)
  })
})

describe('noerr works', function () {
  it('pify.noerr', function (done) {
    let sleep = function (ms, cb) {
      setTimeout(function () {
        cb(ms)
      }, ms)
    }

    let sleepAsync = pify.noerr(sleep)
    sleepAsync(10)
      .then(function (x) {
        x.should.equal(10)
        done()
      })
      .catch(function (e) {
        should(e).not.exists()
      })
  })
})
