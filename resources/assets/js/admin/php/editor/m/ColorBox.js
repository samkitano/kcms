'use strict'

import { ComboBox } from './ComboBox'

let ColorBox = ComboBox.extend({
  init: function (settings) {
    let self = this

    settings.spellcheck = false

    if (settings.onaction) {
      settings.icon = 'none'
    }

    self._super(settings)
    self.classes.add('colorbox')

    self.on('change keyup postrender', function () {
      self.repaintColor(self.value())
    })
  },
  repaintColor: function (value) {
    let openElm = this.getEl('open')
    let elm = openElm ? openElm.getElementsByTagName('i')[0] : null

    if (elm) {
      try {
        elm.style.background = value
      } catch (ex) {}
    }
  },
  bindStates: function () {
    let self = this

    self.state.on('change:value', function (e) {
      if (self.state.get('rendered')) {
        self.repaintColor(e.value)
      }
    })

    return self._super()
  }
})

export { ColorBox }
