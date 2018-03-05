'use strict'

import { funcs } from './funcs'
import { Color } from './Color'
import { Widget } from './Widget'
import { DragHelper } from './DragHelper'

let ColorPicker = Widget.extend({
  Defaults: { classes: 'widget colorpicker' },
  init: function (settings) {
    this._super(settings)
  },
  postRender: function () {
    let hsv, hueRootElm, huePointElm, svRootElm, svPointElm
    let self = this
    let color = self.color()

    hueRootElm = self.getEl('h')
    huePointElm = self.getEl('hp')
    svRootElm = self.getEl('sv')
    svPointElm = self.getEl('svp')

    function getPos (elm, event) {
      let x, y
      let pos = funcs.getPos(elm)

      x = event.pageX - pos.x
      y = event.pageY - pos.y
      x = Math.max(0, Math.min(x / elm.clientWidth, 1))
      y = Math.max(0, Math.min(y / elm.clientHeight, 1))

      return { x, y }
    }
    function updateColor (hsv, hueUpdate) {
      let hue = (360 - hsv.h) / 360

      funcs.css(huePointElm, { top: `${hue * 100}%` })

      if (!hueUpdate) {
        funcs.css(svPointElm, {
          left: `${hsv.s}%`,
          top: `${100 - hsv.v}%`
        })
      }

      svRootElm.style.background = Color({
        s: 100,
        v: 100,
        h: hsv.h
      }).toHex()
      self.color().pars
      e({
        s: hsv.s,
        v: hsv.v,
        h: hsv.h
      })
    }

    function updateSaturationAndValue (e) {
      let pos

      pos = getPos(svRootElm, e)
      hsv.s = pos.x * 100
      hsv.v = (1 - pos.y) * 100

      updateColor(hsv)

      self.fire('change')
    }

    function updateHue (e) {
      let pos

      pos = getPos(hueRootElm, e)
      hsv = color.toHsv()
      hsv.h = (1 - pos.y) * 360

      updateColor(hsv, true)

      self.fire('change')
    }

    self._repaint = function () {
      hsv = color.toHsv()

      updateColor(hsv)
    }

    self._super()

    self._svdraghelper = new DragHelper(self._id + '-sv', {
      start: updateSaturationAndValue,
      drag: updateSaturationAndValue
    })

    self._hdraghelper = new DragHelper(self._id + '-h', {
      start: updateHue,
      drag: updateHue
    })

    self._repaint()
  },
  rgb: function () {
    return this.color().toRgb()
  },
  value: function (value) {
    let self = this

    if (arguments.length) {
      self.color().parse(value)

      if (self._rendered) {
        self._repaint()
      }
    } else {
      return self.color().toHex()
    }
  },
  color: function () {
    if (!this._color) {
      this._color = Color()
    }

    return this._color
  },
  renderHtml: function () {
    let self = this
    let id = self._id
    let prefix = self.classPrefix
    let hueHtml

    let stops = '#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000'

    function getOldIeFallbackHtml () {
      let i, l, gradientPrefix, stopsList
      let html = ''

      gradientPrefix = 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='
      stopsList = stops.split(',')

      for (i = 0, l = stopsList.length - 1; i < l; i++) {
        html += `<div class="${prefix}colorpicker-h-chunk" 
style="height:${100 / l}%;${gradientPrefix}${stopsList[i]},endColorstr=${stopsList[i + 1]});
-ms-${gradientPrefix}${stopsList[i]},endColorstr=${stopsList[i + 1]})"></div>`
      }

      return html
    }

    let gradientCssText = `background: -ms-linear-gradient(top,${stops});background: 
linear-gradient(to bottom,${stops});`

    hueHtml = `<div id="${id}-h" class="${prefix}colorpicker-h" 
style="${gradientCssText}">${getOldIeFallbackHtml()}<div id="${id}-hp" 
class="${prefix}colorpicker-h-marker"></div></div>`

    return `<div id="${id}" class="${self.classes}"><div id="${id}-sv" 
class="${prefix}colorpicker-sv"><div class="${prefix}colorpicker-overlay1"><div 
class="${prefix}colorpicker-overlay2"><div id="${id}-svp" 
class="${prefix}colorpicker-selector1"><div 
class="${prefix}colorpicker-selector2"></div></div></div></div></div>${hueHtml}</div>`
  }
})

export { ColorPicker }
