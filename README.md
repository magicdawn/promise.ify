# promise.ify
> promiseify

[![Build Status](https://travis-ci.org/magicdawn/promise.ify.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.ify)
[![Coverage Status](https://coveralls.io/repos/github/magicdawn/promise.ify/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/magicdawn/promise.ify?branch=master)
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

```js
var promiseify = require('promise.ify');
var readFile = promiseify(fs.readFile, fs);

var Connection = require('mysql/lib/Connection');
promiseify.all(Connection.prototype);
```

## Why

for split things out of bluebird

## See Also

- [promise.map](https://github.com/magicdawn/promise.map)

## License

the MIT License http://magicdawn.mit-license.org
