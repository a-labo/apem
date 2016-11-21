/**
 * Pem generator
 * @module apem
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get selfSigned () { return d(require('./self_signed')) }
}
