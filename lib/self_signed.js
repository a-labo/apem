/**
 * Create self-signed cert and keys
 * @function selfSigned
 * @parma {Object} [options={}] - Optional settings
 * @returns {Promise.<Object>} - Key and cert
 */
'use strict'

const { createCertificate } = require('pem')
const writeout = require('writeout')
const co = require('co')

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
   * @param {string} name - Name of cert
   * @param {Object} options - Optional settings
   * @returns {Promise}
   */
  generate (name, options = {}) {
    let write = (type, content) => writeout(`${name}.${type}`, content, {
      mkdirp: true
    })
    return co(function * () {
      let { key, cert } = yield selfSigned(options)
      yield write('key', key)
      yield write('crt', cert)
    })
  }
})

module.exports = selfSigned


