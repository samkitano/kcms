'use strict'

import { Body } from './Body'
import { Utils } from './Utils'
import { Retrieve } from './Retrieve'
import { DOMUtils } from './DOMUtils'
import { CheckType } from './CheckType'

let normalizeFontFamily = fontFamily => fontFamily.replace(/['"]/g, '').replace(/,\s+/g, ',')
let getComputedFontProp = (propName, elm) => Retrieve.from(DOMUtils.DOM.getStyle(elm, propName, true))

let getSpecifiedFontProp = (propName, rootElm, elm) => {
  while (elm !== rootElm) {
    if (elm.style[propName]) {
      let foundStyle = elm.style[propName]

      return foundStyle !== ''
        ? Retrieve.some(foundStyle)
        : Retrieve.none()
    }

    elm = elm.parentNode
  }

  return Retrieve.none()
}

let round = (number, precision) => {
  let factor = Math.pow(10, precision)

  return Math.round(number * factor) / factor
}

let toPt = (fontSize, precision) => {
  if (/[0-9.]+px$/.test(fontSize)) {
    return round(parseInt(fontSize, 10) * 72 / 96, precision || 0) + 'pt'
  }

  return fontSize
}

let getFontProp = propName =>
  (rootElm, elm) =>
    Retrieve.from(elm)
      .map(Body.fromDom)
      .filter(CheckType.isElement)
      .bind(
        element => getSpecifiedFontProp(propName, rootElm, element.dom())
          .or(getComputedFontProp(propName, element.dom()))
      ).getOr('')

let Fonts = {
  getFontSize: getFontProp('fontSize'),
  getFontFamily: Utils.compose(normalizeFontFamily, getFontProp('fontFamily')),
  toPt
}

export { Fonts }
