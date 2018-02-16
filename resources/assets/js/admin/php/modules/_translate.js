/* global kcms */
'use strict'
import { startCase } from 'lodash'
import { translations } from './../../laravelTranslations'

let dev = kcms.local

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

export {
  translate
}
