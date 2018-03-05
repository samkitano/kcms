'use strict'

import { DOMUtils } from './DOMUtils'
import { PanelButton } from './PanelButton'

let DOM = DOMUtils.DOM

let ColorButton = PanelButton.extend({
  init: function (settings) {
    this._super(settings)
    this.classes.add('splitbtn')
    this.classes.add('colorbutton')
  },
  color: function (color) {
    if (color) {
      this._color = color
      this.getEl('preview').style.backgroundColor = color

      return this
    }

    return this._color
  },
  resetColor: function () {
    this._color = null
    this.getEl('preview').style.backgroundColor = null

    return this
  },
  renderHtml: function () {
    let self = this
    let id = self._id
    let prefix = self.classPrefix
    let text = self.state.get('text')
    let icon = `${self.settings.icon
      ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon
      : ''}`
    let image = `${self.settings.image
      ? ' style="background-image: url(\'' + self.settings.image + '\')"'
      : ''}`
    let textHtml = ''

    if (text) {
      self.classes.add('btn-has-text')
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
    }

    return `<div id="${id}" class="${self.classes}" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">${icon ? '<i class="' + icon + '"' + image + '></i>' : ''}<span id="${id}-preview" class="${prefix}preview"></span>${textHtml}</button><button type="button" class="${prefix}open" hidefocus="1" tabindex="-1"> <i class="${prefix}caret"></i></button></div>`
  },
  postRender: function () {
    let self = this
    let onClickHandler = self.settings.onclick

    self.on('click', function (e) {
      if (e.aria && e.aria.key === 'down') {
        return
      }

      if (e.control === self && !DOM.getParent(e.target, `.${self.classPrefix}open`)) {
        e.stopImmediatePropagation()

        onClickHandler.call(self, e)
      }
    })

    delete self.settings.onclick

    return self._super()
  }
})

export { ColorButton }
