'use strict'

import { Button } from './Button'
import { FloatPanel } from './FloatPanel'

let PanelButton = Button.extend({
  showPanel: function () {
    let self = this
    let settings = self.settings

    self.classes.add('opened')

    if (!self.panel) {
      let panelSettings = settings.panel

      if (panelSettings.type) {
        panelSettings = {
          layout: 'grid',
          items: panelSettings
        }
      }

      panelSettings.role = panelSettings.role || 'dialog'
      panelSettings.popover = true
      panelSettings.autohide = true
      panelSettings.ariaRoot = true

      self.panel = new FloatPanel(panelSettings).on('hide', function () {
        self.classes.remove('opened')
      }).on('cancel', function (e) {
        e.stopPropagation()
        self.focus()
        self.hidePanel()
      }).parent(self).renderTo(self.getContainerElm())
      self.panel.fire('show')
      self.panel.reflow()
    } else {
      self.panel.show()
    }

    let rel = self.panel.testMoveRel(self.getEl(), settings.popoverAlign || (self.isRtl() ? [
      'bc-tc',
      'bc-tl',
      'bc-tr'
    ] : [
      'bc-tc',
      'bc-tr',
      'bc-tl'
    ]))

    self.panel.classes.toggle('start', rel === 'bc-tl')
    self.panel.classes.toggle('end', rel === 'bc-tr')
    self.panel.moveRel(self.getEl(), rel)
  },
  hidePanel: function () {
    let self = this

    if (self.panel) {
      self.panel.hide()
    }
  },
  postRender: function () {
    let self = this

    self.aria('haspopup', true)

    self.on('click', function (e) {
      if (e.control === self) {
        if (self.panel && self.panel.visible()) {
          self.hidePanel()
        } else {
          self.showPanel()
          self.panel.focus(!!e.aria)
        }
      }
    })

    return self._super()
  },
  remove: function () {
    if (this.panel) {
      this.panel.remove()
      this.panel = null
    }

    return this._super()
  }
})

export { PanelButton }
