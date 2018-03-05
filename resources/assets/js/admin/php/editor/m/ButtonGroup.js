'use strict'

import { Container } from './Container'

let ButtonGroup = Container.extend({
  Defaults: {
    defaultType: 'button',
    role: 'group'
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout

    self.classes.add('btn-group')
    self.preRender()
    layout.preRender(self)

    return `<div id="${self._id}" class="${self.classes}"><div id="${self._id}-body">` + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
  }
})

export { ButtonGroup }
