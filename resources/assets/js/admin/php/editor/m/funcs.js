'use strict'

import { Env } from './Env'
import { Tools } from './Tools'
import { DOMUtils } from './DOMUtils'

let count = 0
let funcs = {
  id: () => `mceu_${count++}`,
  create: (name, attrs, children) => {
    let elm = document.createElement(name)

    DOMUtils.DOM.setAttribs(elm, attrs)

    if (typeof children === 'string') {
      elm.innerHTML = children
    } else {
      Tools.each(children, child => {
        if (child.nodeType) {
          elm.appendChild(child)
        }
      })
    }

    return elm
  },
  createFragment: html => DOMUtils.DOM.createFragment(html),
  getWindowSize: () => DOMUtils.DOM.getViewPort(),
  getSize: elm => {
    let width, height

    if (elm.getBoundingClientRect) {
      let rect = elm.getBoundingClientRect()

      width = Math.max(rect.width || rect.right - rect.left, elm.offsetWidth)
      height = Math.max(rect.height || rect.bottom - rect.bottom, elm.offsetHeight)
    } else {
      width = elm.offsetWidth
      height = elm.offsetHeight
    }

    return { width, height }
  },
  getPos: (elm, root) => DOMUtils.DOM.getPos(elm, root || funcs.getContainer()),
  getContainer: () => Env.container ? Env.container : document.body,
  getViewPort: win => DOMUtils.DOM.getViewPort(win),
  get: id => document.getElementById(id),
  addClass: (elm, cls) => DOMUtils.DOM.addClass(elm, cls),
  removeClass: (elm, cls) => DOMUtils.DOM.removeClass(elm, cls),
  hasClass: (elm, cls) => DOMUtils.DOM.hasClass(elm, cls),
  toggleClass: (elm, cls, state) => DOMUtils.DOM.toggleClass(elm, cls, state),
  css: (elm, name, value) => DOMUtils.DOM.setStyle(elm, name, value),
  getRuntimeStyle: (elm, name) => DOMUtils.DOM.getStyle(elm, name, true),
  on: (target, name, callback, scope) => DOMUtils.DOM.bind(target, name, callback, scope),
  off: (target, name, callback) => DOMUtils.DOM.unbind(target, name, callback),
  fire: (target, name, args) => DOMUtils.DOM.fire(target, name, args),
  innerHtml: (elm, html) => {
    DOMUtils.DOM.setHTML(elm, html)
  }
}

export { funcs }
