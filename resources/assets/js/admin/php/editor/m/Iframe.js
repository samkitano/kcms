'use strict'

import { Delay } from './Delay'
import { Widget } from './Widget'

let Iframe = Widget.extend({
  renderHtml: function () {
    let self = this

    self.classes.add('iframe')
    self.canFocus = false

    return `<iframe id="${self._id}" class="${self.classes}" 
tabindex="-1" src="` + (self.settings.url || 'javascript:\'\'') + '" frameborder="0"></iframe>'
  },
  src: function (src) {
    this.getEl().src = src
  },
  html: function (html, callback) {
    let self = this
    let body = this.getEl().contentWindow.document.body

    if (!body) {
      Delay.setTimeout(function () {
        self.html(html)
      })
    } else {
      body.innerHTML = html

      if (callback) {
        callback()
      }
    }

    return this
  }
})

export { Iframe }
