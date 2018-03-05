'use strict'

import { Widget } from './Widget'

let Button = Widget.extend({
  Defaults: {
    classes: 'widget btn',
    role: 'button'
  },
  init: function (settings) {
    let size
    let self = this

    self._super(settings)
    settings = self.settings
    size = self.settings.size

    self.on('click mousedown', function (e) {
      e.preventDefault()
    })

    self.on('touchstart', function (e) {
      self.fire('click', e)
      e.preventDefault()
    })

    if (settings.subtype) {
      self.classes.add(settings.subtype)
    }

    if (size) {
      self.classes.add(`btn-${size}`)
    }

    if (settings.icon) {
      self.icon(settings.icon)
    }
  },
  icon: function (icon) {
    if (!arguments.length) {
      return this.state.get('icon')
    }

    this.state.set('icon', icon)

    return this
  },
  repaint: function () {
    let btnElm = this.getEl().firstChild
    let btnStyle
    if (btnElm) {
      btnStyle = btnElm.style
      btnStyle.width = btnStyle.height = '100%'
    }

    this._super()
  },
  renderHtml: function () {
    let image, ariaPressed
    let self = this
    let id = self._id
    let prefix = self.classPrefix
    let icon = self.state.get('icon')
    let text = self.state.get('text')
    let textHtml = ''
    let settings = self.settings

    image = settings.image

    if (image) {
      icon = 'none'

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1]
      }

      image = ` style="background-image: url('${image}')"`
    } else {
      image = ''
    }

    if (text) {
      self.classes.add('btn-has-text')
      textHtml = `<span class="${prefix}txt">${self.encode(text)}</span>`
    }

    icon = `${icon ? prefix + 'ico ' + prefix + 'i-' + icon : ''}`
    ariaPressed = `${typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : ''}`

    return `<div id="${id}" class="${self.classes}" tabindex="-1"${ariaPressed}><button id="${id}-button" role="presentation" type="button" tabindex="-1">${icon ? '<i class="' + icon + '"' + image + '></i>' : ''}${textHtml}</button></div>`
  },
  bindStates: function () {
    let self = this
    let $ = self.$
    let textCls = `${self.classPrefix}txt`

    function setButtonText (text) {
      let $span = $(`span.${textCls}`, self.getEl())

      if (text) {
        if (!$span[0]) {
          $('button:first', self.getEl()).append(`<span class="${textCls}"></span>`)
          $span = $(`span.${textCls}`, self.getEl())
        }
        $span.html(self.encode(text))
      } else {
        $span.remove()
      }

      self.classes.toggle('btn-has-text', !!text)
    }

    self.state.on('change:text', e => {
      setButtonText(e.value)
    })

    self.state.on('change:icon', e => {
      let icon = e.value
      let prefix = self.classPrefix

      self.settings.icon = icon
      icon = `${icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : ''}`

      let btnElm = self.getEl().firstChild
      let iconElm = btnElm.getElementsByTagName('i')[0]

      if (icon) {
        if (!iconElm || iconElm !== btnElm.firstChild) {
          iconElm = document.createElement('i')
          btnElm.insertBefore(iconElm, btnElm.firstChild)
        }
        iconElm.className = icon
      } else if (iconElm) {
        btnElm.removeChild(iconElm)
      }

      setButtonText(self.state.get('text'))
    })

    return self._super()
  }
})

export { Button }
