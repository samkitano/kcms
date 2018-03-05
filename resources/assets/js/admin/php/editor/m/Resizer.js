'use strict'

import { DOMUtils } from './DOMUtils'
import { FireThemeItems } from './FireThemeItems'

let DOM = DOMUtils.DOM

let getMinWidth = editor => editor.getParam('min_width', 100, 'number')
let getMaxWidth = editor => editor.getParam('max_width', 65535, 'number')
let getMinHeight = editor => editor.getParam('min_height', 100, 'number')
let getMaxHeight = editor => editor.getParam('max_height', 65535, 'number')

let getSize = elm => ({
  width: elm.clientWidth,
  height: elm.clientHeight
})

let resizeTo = (editor, width, height) => {
  let containerElm, iframeElm, containerSize, iframeSize

  containerElm = editor.getContainer()
  iframeElm = editor.getContentAreaContainer().firstChild
  containerSize = getSize(containerElm)
  iframeSize = getSize(iframeElm)

  if (width !== null) {
    width = Math.max(getMinWidth(editor), width)
    width = Math.min(getMaxWidth(editor), width)
    DOM.setStyle(containerElm, 'width', width + (containerSize.width - iframeSize.width))
    DOM.setStyle(iframeElm, 'width', width)
  }

  height = Math.max(getMinHeight(editor), height)
  height = Math.min(getMaxHeight(editor), height)

  DOM.setStyle(iframeElm, 'height', height)

  FireThemeItems.fireResizeEditor(editor)
}

let resizeBy = (editor, dw, dh) => {
  let elm = editor.getContentAreaContainer()

  resizeTo(editor, elm.clientWidth + dw, elm.clientHeight + dh)
}

let Resizer = { resizeTo, resizeBy }

export { Resizer }
