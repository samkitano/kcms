/* eslint-disable no-cond-assign */
'use strict'

import { ID } from './ID'
import { Node } from './Node'
import { Body } from './Body'
import { Utils } from './Utils'
import { Tools } from './Tools'
import { ObjectTools } from './ObjectTools'

let trim = Tools.trim

let hasContentEditableState = value => node => {
  if (node && node.nodeType === 1) {
    if (node.contentEditable === value) {
      return true
    }

    if (node.getAttribute('data-mce-contenteditable') === value) {
      return true
    }
  }

  return false
}

let hasTitle = target => trim(target.title).length > 0
let isContentEditableTrue = hasContentEditableState('true')
let isContentEditableFalse = hasContentEditableState('false')
let isValidAnchor = elm => isAnchor(elm) && isEditable(elm)
let isValidHeader = elm => isHeader(elm) && isEditable(elm)
let isHeader = elm => elm && /^(H[1-6])$/.test(elm.nodeName)
let getElementText = elm => elm.innerText || elm.textContent
let getOrGenerateId = elm => elm.id ? elm.id : ID.generate('h')
let isAnchor = elm => elm && elm.nodeName === 'A' && (elm.id || elm.name)
let getLevel = elm => isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0
let isEditable = elm => isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm)
let getAnchorTargets = elms => ObjectTools.map(ObjectTools.filter(elms, isValidAnchor), anchorTarget)
let getHeaderTargets = elms => ObjectTools.map(ObjectTools.filter(elms, isValidHeader), headerTarget)
let select = (selector, root) =>
  ObjectTools.map(Node.descendants(Body.fromDom(root), selector), element => element.dom())

let create = (type, title, url, level, attach) => ({
  type,
  title,
  url,
  level,
  attach
})

let isChildOfContentEditableTrue = node => {
  while (node = node.parentNode) {
    let value = node.contentEditable

    if (value && value !== 'inherit') {
      return isContentEditableTrue(node)
    }
  }

  return false
}

let headerTarget = elm => {
  let headerId = getOrGenerateId(elm)

  let attach = () => {
    elm.id = headerId
  }

  return create('header', getElementText(elm), `#${headerId}`, getLevel(elm), attach)
}

let anchorTarget = elm => {
  let anchorId = elm.id || elm.name
  let anchorText = getElementText(elm)

  return create('anchor', anchorText || `#${anchorId}`, `#${anchorId}`, 0, Utils.noop)
}

let getTargetElements = elm => {
  return select('h1,h2,h3,h4,h5,h6,a:not([href])', elm)
}

let find = elm => {
  let elms = getTargetElements(elm)

  return ObjectTools.filter(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle)
}

let Anchors = { find }

export { Anchors }
