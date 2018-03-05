'use strict'

import { Widget } from './Widget'

function createOptions (options) {
  let strOptions = ''

  if (options) {
    for (let i = 0; i < options.length; i++) {
      strOptions += `<option value="${options[i]}">${options[i]}</option>`
    }
  }

  return strOptions
}

let SelectBox = Widget.extend({
  Defaults: {
    classes: 'selectbox',
    role: 'selectbox',
    options: []
  },
  init: function (settings) {
    let self = this

    self._super(settings)

    if (self.settings.size) {
      self.size = self.settings.size
    }

    if (self.settings.options) {
      self._options = self.settings.options
    }

    self.on('keydown', function (e) {
      let rootControl

      if (e.keyCode === 13) {
        e.preventDefault()

        self.parents().reverse().each(function (ctrl) {
          if (ctrl.toJSON) {
            rootControl = ctrl

            return false
          }
        })

        self.fire('submit', { data: rootControl.toJSON() })
      }
    })
  },
  options: function (state) {
    if (!arguments.length) {
      return this.state.get('options')
    }

    this.state.set('options', state)

    return this
  },
  renderHtml: function () {
    let self = this
    let options
    let size = ''

    options = createOptions(self._options)

    if (self.size) {
      size = ` size = "${self.size}"`
    }

    return `<select id="${self._id}" class="${self.classes}"${size}>${options}</select>`
  },
  bindStates: function () {
    let self = this

    self.state.on('change:options', function (e) {
      self.getEl().innerHTML = createOptions(e.value)
    })

    return self._super()
  }
})

export { SelectBox }
