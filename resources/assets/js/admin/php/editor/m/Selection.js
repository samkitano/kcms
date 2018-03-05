'use strict'

import { Utils } from './Utils'
import { UA } from './UA'
import { SelectorUtils } from './SelectorUtils'
import { DocPosition } from './DocPosition'
import { ObjectTools } from './ObjectTools'

let eq = (e1, e2) => e1.dom() === e2.dom()
let isEqualNode = (e1, e2) => e1.dom().isEqualNode(e2.dom())
let ieContains = (e1, e2) => DocPosition.documentPositionContainedBy(e1.dom(), e2.dom())
let member = (element, elements) => ObjectTools.exists(elements, Utils.curry(eq, element))

let regularContains = (e1, e2) => {
  let d1 = e1.dom()
  let d2 = e2.dom()

  return d1 === d2
    ? false
    : d1.contains(d2)
}

let browser = UA.detect().browser
let contains = browser.isIE()
  ? ieContains
  : regularContains

let Selection = {
  eq,
  isEqualNode,
  member,
  contains,
  is: SelectorUtils.is
}

export { Selection }
