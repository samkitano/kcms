'use strict'

import { Tooltip } from './Tooltip'
import { Control } from './Control'

let tooltip

let Widget = Control.extend({
  init: function (settings) {
    let self = this

    self._super(settings)
    settings = self.settings
    self.canFocus = true

    if (settings.tooltip && Widget.tooltips !== false) {
      self.on('mouseenter', function (e) {
        let tooltip = self.tooltip().moveTo(-65535)

        if (e.control === self) {
          let rel = tooltip.text(settings.tooltip).show().testMoveRel(self.getEl(), [
            'bc-tc',
            'bc-tl',
            'bc-tr'
          ])

          tooltip.classes.toggle('tooltip-n', rel === 'bc-tc')
          tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl')
          tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr')
          tooltip.moveRel(self.getEl(), rel)
        } else {
          tooltip.hide()
        }
      })

      self.on('mouseleave mousedown click', function () {
        self.tooltip().hide()
      })
    }

    self.aria('label', settings.ariaLabel || settings.tooltip)
  },
  tooltip: function () {
    if (!tooltip) {
      tooltip = new Tooltip({ type: 'tooltip' })
      tooltip.renderTo()
    }

    return tooltip
  },
  postRender: function () {
    let self = this
    let settings = self.settings

    self._super()

    if (!self.parent() && (settings.width || settings.height)) {
      self.initLayoutRect()
      self.repaint()
    }

    if (settings.autofocus) {
      self.focus()
    }
  },
  bindStates: function () {
    let self = this

    function disable (state) {
      self.aria('disabled', state)
      self.classes.toggle('disabled', state)
    }

    function active (state) {
      self.aria('pressed', state)
      self.classes.toggle('active', state)
    }

    self.state.on('change:disabled', function (e) {
      disable(e.value)
    })

    self.state.on('change:active', function (e) {
      active(e.value)
    })

    if (self.state.get('disabled')) {
      disable(true)
    }

    if (self.state.get('active')) {
      active(true)
    }

    return self._super()
  },
  remove: function () {
    this._super()

    if (tooltip) {
      tooltip.remove()
      tooltip = null
    }
  }
})

export { Widget }
