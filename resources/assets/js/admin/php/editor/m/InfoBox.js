'use strict'

import { Widget } from './Widget'

let InfoBox = Widget.extend({
  init: function (settings) {
    let self = this

    self._super(settings)
    self.classes.add('widget').add('infobox')
    self.canFocus = false
  },
  severity: function (level) {
    this.classes.remove('error')
    this.classes.remove('warning')
    this.classes.remove('success')
    this.classes.add(level)
  },
  help: function (state) {
    this.state.set('help', state)
  },
  renderHtml: function () {
    let self = this
    let prefix = self.classPrefix

    return `<div id="${self._id}" class="${self.classes}">
<div id="${self._id}-body">${self.encode(self.state.get('text'))}
<button role="button" tabindex="-1"><i class="${prefix}ico ${prefix}i-help"></i></button>
</div></div>`
  },
  bindStates: function () {
    let self = this

    self.state.on('change:text', function (e) {
      self.getEl('body').firstChild.data = self.encode(e.value)

      if (self.state.get('rendered')) {
        self.updateLayoutRect()
      }
    })

    self.state.on('change:help', function (e) {
      self.classes.toggle('has-help', e.value)

      if (self.state.get('rendered')) {
        self.updateLayoutRect()
      }
    })

    return self._super()
  }
})

export { InfoBox }
