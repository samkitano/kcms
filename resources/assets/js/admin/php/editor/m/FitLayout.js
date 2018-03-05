'use strict'

import { AbsoluteLayout } from './AbsoluteLayout'

let FitLayout = AbsoluteLayout.extend({
  recalc: container => {
    let contLayoutRect = container.layoutRect()
    let paddingBox = container.paddingBox

    container.items().filter(':visible').each(ctrl => {
      ctrl.layoutRect({
        x: paddingBox.left,
        y: paddingBox.top,
        w: contLayoutRect.innerW - paddingBox.right - paddingBox.left,
        h: contLayoutRect.innerH - paddingBox.top - paddingBox.bottom
      })

      if (ctrl.recalc) {
        ctrl.recalc()
      }
    })
  }
})

export { FitLayout }
