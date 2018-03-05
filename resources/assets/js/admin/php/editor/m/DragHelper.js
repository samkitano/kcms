'use strict'

import { $ } from './$'

function getDocumentSize (doc) {
  let documentElement, body, scrollWidth, clientWidth
  let offsetWidth, scrollHeight, clientHeight, offsetHeight
  let max = Math.max

  documentElement = doc.documentElement
  body = doc.body
  scrollWidth = max(documentElement.scrollWidth, body.scrollWidth)
  clientWidth = max(documentElement.clientWidth, body.clientWidth)
  offsetWidth = max(documentElement.offsetWidth, body.offsetWidth)
  scrollHeight = max(documentElement.scrollHeight, body.scrollHeight)
  clientHeight = max(documentElement.clientHeight, body.clientHeight)
  offsetHeight = max(documentElement.offsetHeight, body.offsetHeight)

  return {
    width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
    height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
  }
}

function updateWithTouchData (e) {
  let keys, i

  if (e.changedTouches) {
    keys = 'screenX screenY pageX pageY clientX clientY'.split(' ')

    for (i = 0; i < keys.length; i++) {
      e[keys[i]] = e.changedTouches[0][keys[i]]
    }
  }
}

function DragHelper (id, settings) {
  let $eventOverlay
  let downButton
  let start, stop, drag, startX, startY
  let doc = settings.document || document

  settings = settings || {}

  function getHandleElm () {
    return doc.getElementById(settings.handle || id)
  }

  start = function (e) {
    let handleElm, cursor
    let docSize = getDocumentSize(doc)

    updateWithTouchData(e)

    e.preventDefault()

    downButton = e.button
    handleElm = getHandleElm()
    startX = e.screenX
    startY = e.screenY

    if (window.getComputedStyle) {
      cursor = window.getComputedStyle(handleElm, null).getPropertyValue('cursor')
    } else {
      cursor = handleElm.runtimeStyle.cursor
    }

    $eventOverlay = $('<div></div>').css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: docSize.width,
      height: docSize.height,
      zIndex: 2147483647,
      opacity: 0.0001,
      cursor: cursor
    }).appendTo(doc.body)

    $(doc).on('mousemove touchmove', drag).on('mouseup touchend', stop)

    settings.start(e)
  }

  drag = function (e) {
    updateWithTouchData(e)

    if (e.button !== downButton) {
      return stop(e)
    }

    e.deltaX = e.screenX - startX
    e.deltaY = e.screenY - startY

    e.preventDefault()

    settings.drag(e)
  }

  stop = function (e) {
    updateWithTouchData(e)

    $(doc).off('mousemove touchmove', drag).off('mouseup touchend', stop)
    $eventOverlay.remove()

    if (settings.stop) {
      settings.stop(e)
    }
  }

  this.destroy = function () {
    $(getHandleElm()).off()
  }

  $(getHandleElm()).on('mousedown touchstart', start)
}

export { DragHelper }
