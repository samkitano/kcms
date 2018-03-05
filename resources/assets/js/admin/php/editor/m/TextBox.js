'use strict'

import { funcs } from './funcs'
import { Tools } from './Tools'
import { Widget } from './Widget'

let TextBox = Widget.extend({
  init: function (settings) {
    let self = this

    self._super(settings)
    self.classes.add('textbox')

    if (settings.multiline) {
      self.classes.add('multiline')
    } else {
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

      self.on('keyup', function (e) {
        self.state.set('value', e.target.value)
      })
    }
  },
  repaint: function () {
    let style, rect, borderBox, borderW, lastRepaintRect
    let self = this
    let borderH = 0

    style = self.getEl().style
    rect = self._layoutRect
    lastRepaintRect = self._lastRepaintRect || {}

    let doc = document

    if (!self.settings.multiline && doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
      style.lineHeight = `${rect.h - borderH}px`
    }

    borderBox = self.borderBox
    borderW = borderBox.left + borderBox.right + 8
    borderH = borderBox.top + borderBox.bottom + (self.settings.multiline ? 8 : 0)

    if (rect.x !== lastRepaintRect.x) {
      style.left = rect.x + 'px'
      lastRepaintRect.x = rect.x
    }

    if (rect.y !== lastRepaintRect.y) {
      style.top = rect.y + 'px'
      lastRepaintRect.y = rect.y
    }

    if (rect.w !== lastRepaintRect.w) {
      style.width = rect.w - borderW + 'px'
      lastRepaintRect.w = rect.w
    }

    if (rect.h !== lastRepaintRect.h) {
      style.height = rect.h - borderH + 'px'
      lastRepaintRect.h = rect.h
    }

    self._lastRepaintRect = lastRepaintRect
    self.fire('repaint', {}, false)
    return self
  },
  renderHtml: function () {
    let elm
    let self = this
    let settings = self.settings

    let attrs = {
      id: self._id,
      hidefocus: '1'
    }

    Tools.each([
      'rows',
      'spellcheck',
      'maxLength',
      'size',
      'readonly',
      'min',
      'max',
      'step',
      'list',
      'pattern',
      'placeholder',
      'required',
      'multiple'
    ], function (name) {
      attrs[name] = settings[name]
    })

    if (self.disabled()) {
      attrs.disabled = 'disabled'
    }

    if (settings.subtype) {
      attrs.type = settings.subtype
    }

    elm = funcs.create(settings.multiline ? 'textarea' : 'input', attrs)
    elm.value = self.state.get('value')
    elm.className = self.classes

    return elm.outerHTML
  },
  value: function (value) {
    if (arguments.length) {
      this.state.set('value', value)

      return this
    }

    if (this.state.get('rendered')) {
      this.state.set('value', this.getEl().value)
    }

    return this.state.get('value')
  },
  postRender: function () {
    let self = this

    self.getEl().value = self.state.get('value')
    self._super()

    self.$el.on('change', function (e) {
      self.state.set('value', e.target.value)
      self.fire('change', e)
    })
  },
  bindStates: function () {
    let self = this

    self.state.on('change:value', function (e) {
      if (self.getEl().value !== e.value) {
        self.getEl().value = e.value
      }
    })

    self.state.on('change:disabled', function (e) {
      self.getEl().disabled = e.value
    })

    return self._super()
  },
  remove: function () {
    this.$el.off()
    this._super()
  }
})

export { TextBox }
