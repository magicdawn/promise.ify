# promise.ify
> promiseify / promisify / promise-ify / pify

[![Build Status](https://img.shields.io/travis/magicdawn/promise.ify.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.ify)
[![Coverage Status](https://img.shields.io/coveralls/magicdawn/promise.ify.svg?style=flat-square)](https://coveralls.io/github/magicdawn/promise.ify?branch=master)
[![npm version](https://img.shields.io/npm/v/promise.ify.svg?style=flat-square)](https://www.npmjs.com/package/promise.ify)
[![npm downloads](https://img.shields.io/npm/dm/promise.ify.svg?style=flat-square)](https://www.npmjs.com/package/promise.ify)
[![npm license](https://img.shields.io/npm/l/promise.ify.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Note
this is target ES5 environment.

## Install
```
$ npm i promise.ify --save
```

## API

### promiseify

- promiseify(m, ctx)
    - m: the input
    - ctx: the context
- promiseify.all(o)
    - o: the input object

```js
var promiseify = require('promise.ify');
var readFile = promiseify(fs.readFile, fs);

var Connection = require('mysql/lib/Connection');
promiseify.all(Connection.prototype);
```

### promiseify.noerr
take care of the `callback(result)` case

- promiseify.noerr(m, ctx)
    - m: the input method
    - ctx: the context
- promiseify.noerr.all(o)
    - o: the input object

## Why

for split things out of bluebird

## Changelog
[CHANGELOG.md](CHANGELOG.md)

## See Also

- [promise.ify](https://github.com/magicdawn/promise.ify)
- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.timeout](https://github.com/magicdawn/promise.timeout)
- [promise.retry](https://github.com/magicdawn/promise.retry)
- [promise.obj](https://github.com/magicdawn/promise.obj)
- [promise.delay](https://github.com/magicdawn/promise.delay)

## License

the MIT License http://magicdawn.mit-license.org
