'use strict'

import { $ } from './$'
import { Tools } from './Tools'
import { funcs } from './funcs'
import { Button } from './Button'

let BrowseButton = Button.extend({
  init: function (settings) {
    let self = this

    settings = Tools.extend({
      text: 'Browse...',
      multiple: false,
      accept: null
    }, settings)

    self._super(settings)
    self.classes.add('browsebutton')

    if (settings.multiple) {
      self.classes.add('multiple')
    }
  },
  postRender: function () {
    let self = this

    let input = funcs.create('input', {
      type: 'file',
      id: `${self._id}-browse`,
      accept: self.settings.accept
    })

    self._super()

    $(input).on('change', function (e) {
      let files = e.target.files

      self.value = function () {
        if (!files.length) {
          return null
        } else if (self.settings.multiple) {
          return files
        } else {
          return files[0]
        }
      }

      e.preventDefault()

      if (files.length) {
        self.fire('change', e)
      }
    })

    $(input).on('click', function (e) {
      e.stopPropagation()
    })

    $(self.getEl('button')).on('click', function (e) {
      e.stopPropagation()
      input.click()
    })

    self.getEl().appendChild(input)
  },
  remove: function () {
    $(this.getEl('button')).off()
    $(this.getEl('input')).off()

    this._super()
  }
})

export { BrowseButton }
