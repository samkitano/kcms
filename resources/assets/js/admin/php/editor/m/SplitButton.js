'use strict'

import { funcs } from './funcs'
import { MenuButton } from './MenuButton'
import { $ } from './$'

let SplitButton = MenuButton.extend({
  Defaults: {
    classes: 'widget btn splitbtn',
    role: 'button'
  },
  repaint: function () {
    let mainButtonElm, menuButtonElm
    let self = this
    let elm = self.getEl()
    let rect = self.layoutRect()

    self._super()
    mainButtonElm = elm.firstChild
    menuButtonElm = elm.lastChild

    $(mainButtonElm).css({
      width: rect.w - funcs.getSize(menuButtonElm).width,
      height: rect.h - 2
    })

    $(menuButtonElm).css({ height: rect.h - 2 })

    return self
  },
  activeMenu: function (state) {
    let self = this

    $(self.getEl().lastChild).toggleClass(`${self.classPrefix}active`, state)
  },
  renderHtml: function () {
    let ariaPressed
    let self = this
    let id = self._id
    let prefix = self.classPrefix
    let icon = self.state.get('icon')
    let text = self.state.get('text')
    let settings = self.settings
    let textHtml = ''
    let image = settings.image

    if (image) {
      icon = 'none'

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1]
      }

      image = ` style="background-image: url('${image}')"`
    } else {
      image = ''
    }

    icon = `${settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : ''}`

    if (text) {
      self.classes.add('btn-has-text')
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
    }

    ariaPressed = `${typeof settings.active === 'boolean'
      ? ' aria-pressed="' + settings.active + '"'
      : ''}`

    return `<div id="${id}" class="${self.classes}" role="button"${ariaPressed} tabindex="-1">
<button type="button" hidefocus="1" tabindex="-1">${icon ? '<i class="' + icon + '"' + image + '></i>' : ''}${textHtml}
</button><button type="button" class="${prefix}open" hidefocus="1" tabindex="-1">
${self._menuBtnText ? (icon ? '\xA0' : '') + self._menuBtnText : ''} <i class="
${prefix}caret"></i></button></div>`
  },
  postRender: function () {
    let self = this
    let onClickHandler = self.settings.onclick

    self.on('click', function (e) {
      let node = e.target

      if (e.control === this) {
        while (node) {
          if (e.aria && e.aria.key !== 'down' || node.nodeName === 'BUTTON' && node.className.indexOf('open') === -1) {
            e.stopImmediatePropagation()

            if (onClickHandler) {
              onClickHandler.call(this, e)
            }

            return
          }

          node = node.parentNode
        }
      }
    })

    delete self.settings.onclick

    return self._super()
  }
})

export { SplitButton }
