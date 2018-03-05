'use strict'

import { Utils } from './Utils'
import { Retrieve } from './Retrieve'
import { CheckType } from './CheckType'
import { Cache } from './Cache'

let fromHtml = function (html, scope) {
  let doc = scope || document
  let div = doc.createElement('div')

  div.innerHTML = html

  if (!div.hasChildNodes() || div.childNodes.length > 1) {
    console.error('HTML does not have a single root node', html)

    throw new Error('HTML must have a single root node')
  }

  return fromDom(div.childNodes[0])
}

let fromTag = (tag, scope) => {
  let doc = scope || document
  let node = doc.createElement(tag)

  return fromDom(node)
}

let fromText = (text, scope) => {
  let doc = scope || document
  let node = doc.createTextNode(text)

  return fromDom(node)
}

let fromDom = node => {
  if (node === null || node === undefined) {
    throw new Error('Node cannot be null or undefined')
  }

  return { dom: Utils.constant(node) }
}

let fromPoint = (doc, x, y) => Retrieve.from(doc.dom().elementFromPoint(x, y)).map(fromDom)

let inBody = element => {
  let dom = CheckType.isText(element)
    ? element.dom().parentNode
    : element.dom()

  return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom)
}

let body = Cache.cached(() => getBody(Body.fromDom(document)))

let getBody = doc => {
  let body = doc.dom().body

  if (body === null || body === undefined) {
    throw new Error('Body is not available yet')
  }

  return Body.fromDom(body)
}

let Body = {
  fromHtml,
  fromTag,
  fromText,
  fromDom,
  fromPoint,
  body,
  getBody,
  inBody
}

export { Body }
