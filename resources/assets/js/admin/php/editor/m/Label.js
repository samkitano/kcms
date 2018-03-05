'use strict'

import { funcs } from './funcs'
import { Widget } from './Widget'

let Label = Widget.extend({
  init: function (settings) {
    let self = this

    self._super(settings)
    self.classes.add('widget').add('label')
    self.canFocus = false

    if (settings.multiline) {
      self.classes.add('autoscroll')
    }

    if (settings.strong) {
      self.classes.add('strong')
    }
  },
  initLayoutRect: function () {
    let self = this
    let layoutRect = self._super()

    if (self.settings.multiline) {
      let size = funcs.getSize(self.getEl())

      if (size.width > layoutRect.maxW) {
        layoutRect.minW = layoutRect.maxW
        self.classes.add('multiline')
      }

      self.getEl().style.width = `${layoutRect.minW}px`
      layoutRect.startMinH = layoutRect.h = layoutRect.minH = Math.min(
        layoutRect.maxH,
        funcs.getSize(self.getEl()).height
      )
    }

    return layoutRect
  },
  repaint: function () {
    let self = this

    if (!self.settings.multiline) {
      self.getEl().style.lineHeight = `${self.layoutRect().h}px`
    }

    return self._super()
  },
  severity: function (level) {
    this.classes.remove('error')
    this.classes.remove('warning')
    this.classes.remove('success')
    this.classes.add(level)
  },
  renderHtml: function () {
    let targetCtrl, forName
    let self = this
    let forId = self.settings.forId
    let text = self.settings.html
      ? self.settings.html
      : self.encode(self.state.get('text'))

    if (!forId && (forName = self.settings.forName)) {
      targetCtrl = self.getRoot().find('#' + forName)[0]

      if (targetCtrl) {
        forId = targetCtrl._id
      }
    }

    if (forId) {
      return `<label id="${self._id}" class="${self.classes}"${forId ? ' for="' + forId + '"' : ''}>
${text}</label>`
    }

    return `<span id="${self._id}" class="${self.classes}">${text}</span>`
  },
  bindStates: function () {
    let self = this

    self.state.on('change:text', function (e) {
      self.innerHtml(self.encode(e.value))

      if (self.state.get('rendered')) {
        self.updateLayoutRect()
      }
    })

    return self._super()
  }
})

export { Label }
