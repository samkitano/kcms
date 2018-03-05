'use strict'

import { funcs } from './funcs'

let Resizable = {
  resizeToContent: function () {
    this._layoutRect.autoResize = true
    this._lastRect = null

    this.reflow()
  },
  resizeTo: function (w, h) {
    if (w <= 1 || h <= 1) {
      let rect = funcs.getWindowSize()

      w = w <= 1
        ? w * rect.w
        : w
      h = h <= 1
        ? h * rect.h
        : h
    }

    this._layoutRect.autoResize = false

    return this.layoutRect({
      minW: w,
      minH: h,
      w,
      h
    }).reflow()
  },
  resizeBy: function (dw, dh) {
    let self = this
    let rect = self.layoutRect()

    return self.resizeTo(rect.w + dw, rect.h + dh)
  }
}

export { Resizable }
