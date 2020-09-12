/**
 * promiseify factory
 */

/* eslint no-var: off */

var pifyFactory = function (executor) {
  return function promiseify(m, ctx) {
    if (typeof m !== 'function') throw new Error(String(m) + ' is not a function')

    return function () {
      let args = [].slice.call(arguments)
      let _ctx = ctx || this // do not modify ctx

      return new Promise(function (resolve, reject) {
        try {
          executor(m, _ctx, args, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

/**
 * all factory
 */

var allFactory = function (pify) {
  return function (obj) {
    Object.keys(obj)
      .filter(function (m) {
        return typeof obj[m] === 'function'
      })
      .forEach(function (m) {
        obj[m + 'Async'] = pify(obj[m])
      })
    return obj
  }
}

/**
 * node style promiseify
 */

var pify = pifyFactory(function (m, ctx, args, resolve, reject) {
  args.push(function (err, res) {
    if (err) return reject(err)

    // one result
    if (arguments.length <= 2) {
      return resolve(res)
    } else {
      // more
      return resolve([].slice.call(arguments, 1))
    }
  })

  m.apply(ctx, args)
})

/**
 * node style promiseifyAll
 */

pify.all = allFactory(pify)

/**
 * noerr
 */

var noerr = pifyFactory(function (m, ctx, args, resolve, reject) {
  args.push(function (res) {
    resolve(arguments.length <= 1 ? res : [].slice.call(arguments))
  })
  m.apply(ctx, args)
})

/**
 * noerr all
 */

noerr.all = allFactory(noerr)

/**
 * exports
 */

module.exports = pify
module.exports.noerr = noerr
