'use strict'

import { Widget } from './Widget'

let Spacer = Widget.extend({
  renderHtml: function () {
    let self = this

    self.classes.add('spacer')
    self.canFocus = false

    return `<div id="${self._id}" class="${self.classes}"></div>`
  }
})

export { Spacer }
