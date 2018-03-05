'use strict'

import { Movable } from './Movable'
import { Control } from './Control'

let Tooltip = Control.extend({
  Mixins: [Movable],
  Defaults: { classes: 'widget tooltip tooltip-n' },
  renderHtml: function () {
    let self = this
    let prefix = self.classPrefix

    return `<div id="${self._id}" class="${self.classes}" role="presentation"><div class="${prefix}tooltip-arrow"></div><div class="${prefix}tooltip-inner">${self.encode(self.state.get('text'))}</div></div>`
  },
  bindStates: function () {
    let self = this

    self.state.on('change:text', function (e) {
      self.getEl().lastChild.innerHTML = self.encode(e.value)
    })

    return self._super()
  },
  repaint: function () {
    let style, rect
    let self = this

    style = self.getEl().style
    rect = self._layoutRect
    style.left = `${rect.x}px`
    style.top = `${rect.y}px`
    style.zIndex = 65535 + 65535
  }
})

export { Tooltip }
