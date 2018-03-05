'use strict'

import { Container } from './Container'
import { Scrollable } from './Scrollable'

let Panel = Container.extend({
  Defaults: {
    layout: 'fit',
    containerCls: 'panel'
  },
  Mixins: [Scrollable],
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let innerHtml = self.settings.html

    self.preRender()
    layout.preRender(self)

    if (typeof innerHtml === 'undefined') {
      innerHtml = `<div id="${self._id}-body" class="${self.bodyClasses}">${layout.renderHtml(self)}</div>`
    } else {
      if (typeof innerHtml === 'function') {
        innerHtml = innerHtml.call(self)
      }

      self._hasBody = false
    }

    return `<div id="${self._id}" class="${self.classes}" hidefocus="1" tabindex="-1" role="group">` + (self._preBodyHtml || '') + innerHtml + '</div>'
  }
})

export { Panel }
