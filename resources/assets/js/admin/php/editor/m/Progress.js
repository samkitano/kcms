'use strict'

import { Widget } from './Widget'

let Progress = Widget.extend({
  Defaults: { value: 0 },
  init: function (settings) {
    let self = this

    self._super(settings)
    self.classes.add('progress')

    if (!self.settings.filter) {
      self.settings.filter = function (value) {
        return Math.round(value)
      }
    }
  },
  renderHtml: function () {
    let self = this
    let id = self._id
    let prefix = this.classPrefix

    return `<div id="${id}" class="${self.classes}"><div class="${prefix}bar-container"><div class="${prefix}bar"></div></div><div class="${prefix}text">0%</div></div>`
  },
  postRender: function () {
    let self = this

    self._super()
    self.value(self.settings.value)

    return self
  },
  bindStates: function () {
    let self = this

    function setValue (value) {
      value = self.settings.filter(value)
      self.getEl().lastChild.innerHTML = value + '%'
      self.getEl().firstChild.firstChild.style.width = value + '%'
    }

    self.state.on('change:value', function (e) {
      setValue(e.value)
    })

    setValue(self.state.get('value'))

    return self._super()
  }
})

export { Progress }
