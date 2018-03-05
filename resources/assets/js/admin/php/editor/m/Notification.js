'use strict'

import { Delay } from './Delay'
import { Movable } from './Movable'
import { Control } from './Control'
import { Progress } from './Progress'

let updateLiveRegion = function (ctx, text) {
  ctx.getEl().lastChild.textContent = `${text}${ctx.progressBar ? ' ' + ctx.progressBar.value() + '%' : ''}`
}

let Notification = Control.extend({
  Mixins: [Movable],
  Defaults: { classes: 'widget notification' },
  init: function (settings) {
    let self = this

    self._super(settings)
    self.maxWidth = settings.maxWidth

    if (settings.text) {
      self.text(settings.text)
    }

    if (settings.icon) {
      self.icon = settings.icon
    }

    if (settings.color) {
      self.color = settings.color
    }

    if (settings.type) {
      self.classes.add(`notification-${settings.type}`)
    }

    if (settings.timeout && (settings.timeout < 0 || settings.timeout > 0) && !settings.closeButton) {
      self.closeButton = false
    } else {
      self.classes.add('has-close')
      self.closeButton = true
    }

    if (settings.progressBar) {
      self.progressBar = new Progress()
    }

    self.on('click', function (e) {
      if (e.target.className.indexOf(`${self.classPrefix}close`) !== -1) {
        self.close()
      }
    })
  },
  renderHtml: function () {
    let self = this
    let prefix = self.classPrefix
    let icon = ''
    let closeButton = ''
    let progressBar = ''
    let notificationStyle = ''

    if (self.icon) {
      icon = `<i class="${prefix}ico ${prefix}i-${self.icon}"></i>`
    }

    notificationStyle = ` style="max-width: ${self.maxWidth}px;${self.color ? 'background-color: ' + self.color + ';"' : '"'}`

    if (self.closeButton) {
      closeButton = `<button type="button" class="${prefix}close" aria-hidden="true">\xD7</button>`
    }

    if (self.progressBar) {
      progressBar = self.progressBar.renderHtml()
    }

    return `<div id="${self._id}" class="${self.classes}"${notificationStyle} role="presentation">${icon}<div class="${prefix}notification-inner">${self.state.get('text')}</div>${progressBar}${closeButton}<div style="clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;width: 1px;" aria-live="assertive" aria-relevant="additions" aria-atomic="true"></div></div>`
  },
  postRender: function () {
    let self = this

    Delay.setTimeout(() => {
      self.$el.addClass(`${self.classPrefix}in`)

      updateLiveRegion(self, self.state.get('text'))
    }, 100)

    return self._super()
  },
  bindStates: function () {
    let self = this

    self.state.on('change:text', function (e) {
      self.getEl().firstChild.innerHTML = e.value
      updateLiveRegion(self, e.value)
    })

    if (self.progressBar) {
      self.progressBar.bindStates()
      self.progressBar.state.on('change:value', function (e) {
        updateLiveRegion(self, self.state.get('text'))
      })
    }

    return self._super()
  },
  close: function () {
    let self = this

    if (!self.fire('close').isDefaultPrevented()) {
      self.remove()
    }

    return self
  },
  repaint: function () {
    let style, rect
    let self = this

    style = self.getEl().style
    rect = self._layoutRect
    style.left = `${rect.x}px`
    style.top = `${rect.y}px`
    style.zIndex = 65535 - 1
  }
})

export { Notification }
