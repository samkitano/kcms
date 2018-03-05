'use strict'

import { Container } from './Container'

let FormItem = Container.extend({
  Defaults: {
    layout: 'flex',
    align: 'center',
    defaults: { flex: 1 }
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let prefix = self.classPrefix

    self.classes.add('formitem')
    layout.preRender(self)

    return `<div id="${self._id}" class="${self.classes}" hidefocus="1" 
tabindex="-1">${self.settings.title ? '<div id="' + self._id + '-title" class="' + prefix + 'title">' + self.settings.title + '</div>' : ''}<div id="${self._id}-body" class="${self.bodyClasses}">` + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
  }
})

export { FormItem }
