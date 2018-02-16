/* global kcms */
'use strict'

import swal from 'sweetalert2'
import { translate } from './modules/_translate'

let dev = kcms.local

/**
 * Alerts for a 500 error
 *
 * @requires 'vue-sweetalert2'
 *
 * @param e
 */
let alertSystemError = e => {
  swal(translate('alerts.oops'), translate('alerts.something_went_wrong'), 'error')
}

/**
 * Check if given data is loaded
 *
 * @param {Object|Array} data
 *
 * @returns {boolean}
 */
let loaded = data => {
  if (data.constructor === Array) {
    if (dev) console.log('loaded: array')
    return data.length > 0
  }

  if (dev) console.log('loaded: object')

  return Object.keys(data).length > 0 && data.constructor === Object
}

/**
 *
 * @param str
 * @param arr
 * @returns {boolean}
 */
let inArray = (str, arr) => {
  if (!arr) return false

  return arr.indexOf(str) > -1
}

/**
 * Capitalize first letter
 *
 * @param str String
 *
 * @returns {string}
 */
let ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

export {
  alertSystemError,
  inArray,
  loaded,
  ucFirst
}
