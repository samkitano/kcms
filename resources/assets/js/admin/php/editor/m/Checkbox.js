'use strict'

import { Widget } from './Widget'

let Checkbox = Widget.extend({
  Defaults: {
    classes: 'checkbox',
    role: 'checkbox',
    checked: false
  },
  init: function (settings) {
    let self = this

    self._super(settings)

    self.on('click mousedown', function (e) {
      e.preventDefault()
    })

    self.on('click', function (e) {
      e.preventDefault()

      if (!self.disabled()) {
        self.checked(!self.checked())
      }
    })

    self.checked(self.settings.checked)
  },
  checked: function (state) {
    if (!arguments.length) {
      return this.state.get('checked')
    }

    this.state.set('checked', state)

    return this
  },
  value: function (state) {
    if (!arguments.length) {
      return this.checked()
    }

    return this.checked(state)
  },
  renderHtml: function () {
    let self = this
    let id = self._id
    let prefix = self.classPrefix

    return `<div id="${id}" class="${self.classes}" unselectable="on" aria-labelledby="${id}-al" tabindex="-1"><i class="${prefix}ico ${prefix}i-checkbox"></i><span id="${id}-al" class="${prefix}label">${self.encode(self.state.get('text'))}</span></div>`
  },
  bindStates: function () {
    let self = this

    function checked (state) {
      self.classes.toggle('checked', state)
      self.aria('checked', state)
    }

    self.state.on('change:text', function (e) {
      self.getEl('al').firstChild.data = self.translate(e.value)
    })

    self.state.on('change:checked change:value', function (e) {
      self.fire('change')
      checked(e.value)
    })

    self.state.on('change:icon', function (e) {
      let icon = e.value
      let prefix = self.classPrefix

      if (typeof icon === 'undefined') {
        return self.settings.icon
      }

      self.settings.icon = icon
      icon = `${icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : ''}`

      let btnElm = self.getEl().firstChild
      let iconElm = btnElm.getElementsByTagName('i')[0]

      if (icon) {
        if (!iconElm || iconElm !== btnElm.firstChild) {
          iconElm = document.createElement('i')
          btnElm.insertBefore(iconElm, btnElm.firstChild)
        }

        iconElm.className = icon
      } else if (iconElm) {
        btnElm.removeChild(iconElm)
      }
    })

    if (self.state.get('checked')) {
      checked(true)
    }

    return self._super()
  }
})

export { Checkbox }
