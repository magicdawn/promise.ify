'use strict';

/**
 * promiseify
 */

var promiseify = exports = module.exports = function(m, ctx) {
  if (typeof m !== 'function') throw new Error(String(m) + ' is not a function');

  return function() {

    var args = [].slice.call(arguments);
    ctx = ctx || this;

    return new Promise(function(resolve, reject) {
      args.push(function(e, res) {
        if (e) return reject(e);

        // one result
        if (arguments.length <= 2) {
          return resolve(res);
        } else {
          // more
          return resolve([].slice.call(arguments, 1));
        }
      });

      try {
        m.apply(ctx, args);
      } catch (e) {
        reject(e);
      }
    });
  };
};

/**
 * promiseify.all
 */

promiseify.all = function(obj) {
  Object.keys(obj)
    .filter(function(m) {
      return typeof obj[m] === 'function';
    })
    .forEach(function(m) {
      obj[m + 'Async'] = promiseify(obj[m]);
    });
  return obj;
};