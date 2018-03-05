'use strict'

import { funcs } from './funcs'

function calculateRelativePosition (ctrl, targetElm, rel) {
  let viewport = funcs.getViewPort()
  let pos = funcs.getPos(targetElm)
  let x = pos.x
  let y = pos.y

  if (ctrl.state.get('fixed') && funcs.getRuntimeStyle(document.body, 'position') === 'static') {
    x -= viewport.x
    y -= viewport.y
  }

  let ctrlElm = ctrl.getEl()
  let size = funcs.getSize(ctrlElm)
  let selfW = size.width
  let selfH = size.height

  size = funcs.getSize(targetElm)

  let targetW = size.width
  let targetH = size.height

  rel = (rel || '').split('')

  if (rel[0] === 'b') {
    y += targetH
  }

  if (rel[1] === 'r') {
    x += targetW
  }

  if (rel[0] === 'c') {
    y += Math.round(targetH / 2)
  }

  if (rel[1] === 'c') {
    x += Math.round(targetW / 2)
  }

  if (rel[3] === 'b') {
    y -= selfH
  }

  if (rel[4] === 'r') {
    x -= selfW
  }

  if (rel[3] === 'c') {
    y -= Math.round(selfH / 2)
  }

  if (rel[4] === 'c') {
    x -= Math.round(selfW / 2)
  }

  return {
    x,
    y,
    w: selfW,
    h: selfH
  }
}

let Movable = {
  testMoveRel: function (elm, rels) {
    let viewPortRect = funcs.getViewPort()

    for (let i = 0; i < rels.length; i++) {
      let pos = calculateRelativePosition(this, elm, rels[i])

      if (this.state.get('fixed')) {
        if (pos.x > 0 && pos.x + pos.w < viewPortRect.w && pos.y > 0 && pos.y + pos.h < viewPortRect.h) {
          return rels[i]
        }
      } else {
        if (pos.x > viewPortRect.x && pos.x + pos.w < viewPortRect.w + viewPortRect.x && pos.y > viewPortRect.y && pos.y + pos.h < viewPortRect.h + viewPortRect.y) {
          return rels[i]
        }
      }
    }

    return rels[0]
  },
  moveRel: function (elm, rel) {
    if (typeof rel !== 'string') {
      rel = this.testMoveRel(elm, rel)
    }

    let pos = calculateRelativePosition(this, elm, rel)

    return this.moveTo(pos.x, pos.y)
  },
  moveBy: function (dx, dy) {
    let self = this
    let rect = self.layoutRect()

    self.moveTo(rect.x + dx, rect.y + dy)

    return self
  },
  moveTo: function (x, y) {
    let self = this

    function constrain (value, max, size) {
      if (value < 0) {
        return 0
      }

      if (value + size > max) {
        value = max - size

        return value < 0 ? 0 : value
      }

      return value
    }

    if (self.settings.constrainToViewport) {
      let viewPortRect = funcs.getViewPort(window)
      let layoutRect = self.layoutRect()

      x = constrain(x, viewPortRect.w + viewPortRect.x, layoutRect.w)
      y = constrain(y, viewPortRect.h + viewPortRect.y, layoutRect.h)
    }

    if (self.state.get('rendered')) {
      self.layoutRect({ x, y }).repaint()
    } else {
      self.settings.x = x
      self.settings.y = y
    }

    self.fire('move', { x, y })

    return self
  }
}

export { Movable }
