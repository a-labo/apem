/**
 * Create self-signed cert and keys
 * @function selfSigned
 * @parma {Object} options - Optional settings
 * @returns {Promise.<Object>} - Key and cert
 */
'use strict'

const { createCertificate } = require('pem')

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

module.exports = selfSigned


