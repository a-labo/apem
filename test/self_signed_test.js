/**
 * Test case for selfSigned.
 * Runs with mocha.
 */
'use strict'

const selfSigned = require('../lib/self_signed.js')
const assert = require('assert')
const co = require('co')

describe('self-signed', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Self signed', () => co(function * () {
    let { key, cert } = yield selfSigned()
    assert.ok(key)
    assert.ok(cert)

    let filename = `${__dirname}/../tmp/foo/testing-certs`
    yield selfSigned.generate(filename)
    assert.ok(selfSigned.exists(filename))
  }))

})

/* global describe, before, after, it */
