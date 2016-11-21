'use strict'

const { selfSigned } = require('apem')
const co = require('co')
const writeout = require('writeout')

co(function * () {
  {
    let { key, cert } = selfSigned
    yield writeout('www.example.com.crt', cert)
    yield writeout('www.example.com.key', key)
  }
}).catch((err) => console.error(err))

