'use strict'

import { Body } from './Body'
import { Types } from './Types'
import { Retrieve } from './Retrieve'
import { ObjectTools } from './ObjectTools'

let ELEMENT = Types.ELEMENT
let DOCUMENT = Types.DOCUMENT

let is = (element, selector) => {
  let elem = element.dom()

  if (elem.nodeType !== ELEMENT) {
    return false
  } else if (elem.matches !== undefined) {
    return elem.matches(selector)
  } else if (elem.msMatchesSelector !== undefined) {
    return elem.msMatchesSelector(selector)
  } else if (elem.webkitMatchesSelector !== undefined) {
    return elem.webkitMatchesSelector(selector)
  } else if (elem.mozMatchesSelector !== undefined) {
    return elem.mozMatchesSelector(selector)
  } else {
    throw new Error('Browser lacks native selectors')
  }
}

let bypassSelector = dom =>
  (dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT) || dom.childElementCount === 0

let all = (selector, scope) => {
  let base = scope === undefined
    ? document
    : scope.dom()

  return bypassSelector(base)
    ? []
    : ObjectTools.map(base.querySelectorAll(selector), Body.fromDom)
}

let one = (selector, scope) => {
  let base = scope === undefined
    ? document
    : scope.dom()

  return bypassSelector(base)
    ? Retrieve.none()
    : Retrieve.from(base.querySelector(selector)).map(Body.fromDom)
}

let SelectorUtils = { all, is, one }

export { SelectorUtils }
