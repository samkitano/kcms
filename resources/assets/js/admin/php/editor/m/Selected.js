'use strict'

import { Body } from './Body'
import { Utils } from './Utils'
import { Retrieve } from './Retrieve'
import { Siblings } from './Siblings'
import { VarTypes } from './VarTypes'
import { Selection } from './Selection'
import { Immutables } from './Immutables'
import { ObjectTools } from './ObjectTools'

let firstChild = element => child(element, 0)
let hasChildNodes = element => element.dom().hasChildNodes()
let owner = element => Body.fromDom(element.dom().ownerDocument)
let childNodesCount = element => element.dom().childNodes.length
let nextSiblings = element => Siblings.toArray(element, nextSibling)
let prevSiblings = element => ObjectTools.reverse(Siblings.toArray(element, prevSibling))
let lastChild = element => child(element, element.dom().childNodes.length - 1)

let documentElement = element => {
  let doc = owner(element)

  return Body.fromDom(doc.dom().documentElement)
}

let defaultView = element => {
  let el = element.dom()
  let defaultView = el.ownerDocument.defaultView

  return Body.fromDom(defaultView)
}

let parent = element => {
  let dom = element.dom()

  return Retrieve.from(dom.parentNode).map(Body.fromDom)
}

let findIndex = element => parent(element).bind(p => {
  let kin = children(p)

  return ObjectTools.findIndex(kin, elem => Selection.eq(element, elem))
})

let parents = (element, isRoot) => {
  let stop = VarTypes.isFunction(isRoot)
    ? isRoot
    : Utils.constant(false)
  let dom = element.dom()
  let ret = []

  while (dom.parentNode !== null && dom.parentNode !== undefined) {
    let rawParent = dom.parentNode
    let parent = Body.fromDom(rawParent)

    ret.push(parent)

    if (stop(parent) === true) {
      break
    } else {
      dom = rawParent
    }
  }

  return ret
}

let siblings = element => {
  let filterSelf = elements => ObjectTools.filter(elements, x => !Selection.eq(element, x))

  return parent(element).map(children).map(filterSelf).getOr([])
}

let offsetParent = element => {
  let dom = element.dom()

  return Retrieve.from(dom.offsetParent).map(Body.fromDom)
}

let prevSibling = element => {
  let dom = element.dom()

  return Retrieve.from(dom.previousSibling).map(Body.fromDom)
}

let nextSibling = element => {
  let dom = element.dom()

  return Retrieve.from(dom.nextSibling).map(Body.fromDom)
}

let children = element => {
  let dom = element.dom()

  return ObjectTools.map(dom.childNodes, Body.fromDom)
}

let child = (element, index) => {
  let children = element.dom().childNodes

  return Retrieve.from(children[index]).map(Body.fromDom)
}

let spot = Immutables.immutable('element', 'offset')

let leaf = (element, offset) => {
  let cs = children(element)

  return cs.length > 0 && offset < cs.length
    ? spot(cs[offset], 0)
    : spot(element, offset)
}

let Selected = {
  owner,
  defaultView,
  documentElement,
  parent,
  findIndex,
  parents,
  siblings,
  prevSibling,
  offsetParent,
  prevSiblings,
  nextSibling,
  nextSiblings,
  children,
  child,
  firstChild,
  lastChild,
  childNodesCount,
  hasChildNodes,
  leaf
}

export { Selected }
