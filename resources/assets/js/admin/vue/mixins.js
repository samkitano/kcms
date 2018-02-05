/* global kcms */
'use strict'

import Vue from 'vue'
import { startCase } from 'lodash'

const translations = kcms.translations
const dev = kcms.local

Vue.mixin({
  methods: {
    /**
     * Alerts for a 500 error
     *
     * @requires 'vue-sweetalert2'
     *
     * @param e
     */
    alertSystemError (e) {
      this.$swal({ title: this.translate('alerts.oops'), type: 'error', text: this.translate('alerts.something_went_wrong') })
    },

    /**
     * Check if array contains element
     *
     * @param   {String} str Needle
     * @param   {array}  arr Haystack
     * @returns {boolean}
     */
    inArray: (str, arr) => arr.indexOf(str) > -1,

    /**
     * Check if given data is loaded
     *
     * @param {Object|Array} data
     *
     * @returns {boolean}
     */
    loaded (data) {
      if (data.constructor === Array) {
        if (dev) console.log('loaded: array')
        return data.length > 0
      }

      if (dev) console.log('loaded: object')

      return Object.keys(data).length > 0 && data.constructor === Object
    },

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
    translate (pointer, replace = null) {
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
    },

    /**
     * Capitalize first letter
     *
     * @param str String
     *
     * @returns {string}
     */
    ucFirst: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
})

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
