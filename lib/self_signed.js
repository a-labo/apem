/**
 * Create self-signed cert and keys
 * @function selfSigned
 * @parma {Object} [options={}] - Optional settings
 * @returns {Promise.<Object>} - Key and cert
 */
'use strict'

const { createCertificate } = require('pem')
const writeout = require('writeout')
const { EOL } = require('os')
const co = require('co')
const fs = require('fs')

/** @lends selfSigned */
function selfSigned (options = {}) {
  let { days = 1 } = options
  return new Promise((resolve, reject) =>
    createCertificate({ days, selfSigned: true }, (err, keys) =>
      err ? reject(err) : resolve({
        key: keys.serviceKey,
        cert: keys.certificate
      })
    )
  )
}

Object.assign(selfSigned, {
  /**
   * Generate self signed certifications
   * @param {string} filename - Filename of pem file
   * @param {Object} options - Optional settings
   * @returns {Promise}
   */
  generate (filename, options = {}) {
    return co(function * () {
      let { key, cert } = yield selfSigned(options)
      let content = [ key, cert ].join(EOL)
      yield writeout(filename, content, {
        mkdirp: true
      })
    })
  },
  /**
   * Has cert
   * @param {string} filename
   * @returns {Promise}
   */
  exists (filename) {
    return co(function * () {
      yield new Promise((resolve) =>
        fs.statSync(filename, (err, state) => resolve(!err && !!state))
      )
    })
  }
})

module.exports = selfSigned


