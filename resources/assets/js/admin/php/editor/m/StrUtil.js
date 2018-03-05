'use strict'

import { Str } from './Str'

let lTrim = str => str.replace(/^\s+/g, '')
let rTrim = str => str.replace(/\s+$/g, '')
let addToEnd = (str, suffix) => str + suffix
let addToStart = (str, prefix) => prefix + str
let trim = str => str.replace(/^\s+|\s+$/g, '')
let contains = (str, substr) => str.indexOf(substr) !== -1
let startsWith = (str, prefix) => checkRange(str, prefix, 0)
let removeFromStart = (str, numChars) => str.substring(numChars)
let removeFromEnd = (str, numChars) => str.substring(0, str.length - numChars)
let endsWith = (str, suffix) => checkRange(str, suffix, str.length - suffix.length)

let checkRange = (str, substr, start) => {
  if (substr === '') {
    return true
  }

  if (str.length < substr.length) {
    return false
  }

  let x = str.substr(start, start + substr.length)

  return x === substr
}

let supplant = (str, obj) => {
  let isStringOrNumber = a => {
    let t = typeof a

    return t === 'string' || t === 'number'
  }

  return str.replace(/\${([^{}]*)}/g, (a, b) => {
    let value = obj[b]

    return isStringOrNumber(value) ? value : a
  })
}

let removeLeading = (str, prefix) => startsWith(str, prefix)
  ? StrUtil.removeFromStart(str, prefix.length)
  : str

let removeTrailing = (str, prefix) => endsWith(str, prefix)
  ? StrUtil.removeFromEnd(str, prefix.length)
  : str

let ensureLeading = (str, prefix) => startsWith(str, prefix)
  ? str
  : StrUtil.addToStart(str, prefix)

let ensureTrailing = (str, prefix) => endsWith(str, prefix)
  ? str
  : StrUtil.addToEnd(str, prefix)

let capitalize = str => Str.head(str)
  .bind(head => Str.tail(str).map(tail => head.toUpperCase() + tail))
  .getOr(str)

let StrUtil = {
  addToStart,
  addToEnd,
  removeFromStart,
  removeFromEnd,
  supplant,
  startsWith,
  removeLeading,
  removeTrailing,
  ensureLeading,
  ensureTrailing,
  endsWith,
  contains,
  trim,
  lTrim,
  rTrim,
  capitalize
}

export { StrUtil }
