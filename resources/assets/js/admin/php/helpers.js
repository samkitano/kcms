/* global kcms */
'use strict'

import { startCase } from 'lodash'
import swal from 'sweetalert2'

let translations = kcms.translations
let dev = kcms.local

/**
 * Alerts for a 500 error
 *
 * @requires 'vue-sweetalert2'
 *
 * @param e
 */
let alertSystemError = e => {
  swal(this.translate('alerts.oops'), this.translate('alerts.something_went_wrong'), 'error')
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
 * Dot notation translation, Laravel style
 *
 * @requires 'lodash'
 *
 * @param {string}       pointer Element to translate in Dot notation
 * @param {Object|null}  replace Replace text
 *
 * @returns {string}
 */
let translate = (pointer, replace = null) => {
  let str = getTranslation(pointer)

  if (!str) {
    if (dev) console.warn(`Translation not found: ${pointer}`)
    if (dev) console.log(translations)
    let segments = pointer.split('.')

    return segments.length
      ? startCase(segments[segments.length - 1])
      : startCase(pointer)
  }

  if (!replace) {
    return str
  }

  for (let replacement in replace) {
    str = str.replace(`:${replacement}`, replace[replacement])
  }

  return str
}

/**
 * Capitalize first letter
 *
 * @param str String
 *
 * @returns {string}
 */
let ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Get the translation from the window object passed by Laravel
 * Max depth: 3
 *
 * @param {String} pointer
 *
 * @returns {String|Boolean}
 */
let getTranslation = pointer => {
  let res
  let segments = pointer.split('.')
  let steps = segments.length

  switch (steps) {
    case 1:
      res = translations.hasOwnProperty(pointer)
        ? translations[pointer]
        : false
      break

    case 2:
      if (translations.hasOwnProperty(segments[0])) {
        res = translations[segments[0]].hasOwnProperty(segments[1])
          ? translations[segments[0]][segments[1]]
          : false
      }

      break

    case 3:
      if (translations.hasOwnProperty(segments[0])) {
        if (translations[segments[0]].hasOwnProperty(segments[1])) {
          res = translations[segments[0]][segments[1]].hasOwnProperty(segments[2])
            ? translations[segments[0]][segments[1]][segments[2]]
            : false
        }
      }

      break

    default:
      return false
  }

  return res
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

export {
  alertSystemError,
  inArray,
  loaded,
  translate,
  ucFirst
}
