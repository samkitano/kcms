'use strict'

import { Layout } from './Layout'

let AbsoluteLayout = Layout.extend({
  Defaults: {
    containerClass: 'abs-layout',
    controlClass: 'abs-layout-item'
  },
  recalc: container => {
    container.items().filter(':visible').each(ctrl => {
      let settings = ctrl.settings

      ctrl.layoutRect({
        x: settings.x,
        y: settings.y,
        w: settings.w,
        h: settings.h
      })

      if (ctrl.recalc) {
        ctrl.recalc()
      }
    })
  },
  renderHtml: function (container) {
    return `<div id="${container._id}-absend" class="${container.classPrefix}abs-end"></div>${this._super(container)}`
  }
})

export { AbsoluteLayout }
