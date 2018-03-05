/* eslint-disable no-cond-assign */
'use strict'

import { Widget } from './Widget'

let Path = Widget.extend({
  init: function (settings) {
    let self = this

    if (!settings.delimiter) {
      settings.delimiter = '\xBB'
    }

    self._super(settings)
    self.classes.add('path')
    self.canFocus = true

    self.on('click', function (e) {
      let index
      let target = e.target

      if (index = target.getAttribute('data-index')) {
        self.fire('select', {
          value: self.row()[index],
          index: index
        })
      }
    })

    self.row(self.settings.row)
  },
  focus: function () {
    let self = this

    self.getEl().firstChild.focus()

    return self
  },
  row: function (row) {
    if (!arguments.length) {
      return this.state.get('row')
    }

    this.state.set('row', row)

    return this
  },
  renderHtml: function () {
    let self = this
    return `<div id="${self._id}" class="${self.classes}">
${self._getDataPathHtml(self.state.get('row'))}</div>`
  },
  bindStates: function () {
    let self = this

    self.state.on('change:row', function (e) {
      self.innerHtml(self._getDataPathHtml(e.value))
    })

    return self._super()
  },
  _getDataPathHtml: function (data) {
    let i, l
    let self = this
    let parts = data || []
    let html = ''
    let prefix = self.classPrefix

    for (i = 0, l = parts.length; i < l; i++) {
      html += `${i > 0 ? '<div class="' + prefix + 'divider" ' +
        'aria-hidden="true"> ' + self.settings.delimiter + ' </div>' : ''}<div 
role="button" class="${prefix}path-item${i === l - 1 ? ' ' + prefix + 'last' : ''}" 
data-index="${i}" tabindex="-1" id="${self._id}-${i}" aria-level="${i + 1}">${parts[i].name}</div>`
    }

    if (!html) {
      html = `<div class="${prefix}path-item">\xA0</div>`
    }

    return html
  }
})

export { Path }
