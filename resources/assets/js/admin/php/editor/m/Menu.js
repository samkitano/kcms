'use strict'

import { Env } from './Env'
import { Tools } from './Tools'
import { Delay } from './Delay'
import { Throbber } from './Throbber'
import { FloatPanel } from './FloatPanel'

let Menu = FloatPanel.extend({
  Defaults: {
    defaultType: 'menuitem',
    border: 1,
    layout: 'stack',
    role: 'application',
    bodyRole: 'menu',
    ariaRoot: true
  },
  init: function (settings) {
    let self = this

    settings.autohide = true
    settings.constrainToViewport = true

    if (typeof settings.items === 'function') {
      settings.itemsFactory = settings.items
      settings.items = []
    }

    if (settings.itemDefaults) {
      let items = settings.items
      let i = items.length

      while (i--) {
        items[i] = Tools.extend({}, settings.itemDefaults, items[i])
      }
    }

    self._super(settings)
    self.classes.add('menu')

    if (settings.animate && Env.ie !== 11) {
      self.classes.add('animate')
    }
  },
  repaint: function () {
    this.classes.toggle('menu-align', true)
    this._super()
    this.getEl().style.height = ''
    this.getEl('body').style.height = ''

    return this
  },
  cancel: function () {
    let self = this

    self.hideAll()
    self.fire('select')
  },
  load: function () {
    let time, factory
    let self = this

    function hideThrobber () {
      if (self.throbber) {
        self.throbber.hide()
        self.throbber = null
      }
    }

    factory = self.settings.itemsFactory

    if (!factory) {
      return
    }

    if (!self.throbber) {
      self.throbber = new Throbber(self.getEl('body'), true)

      if (self.items().length === 0) {
        self.throbber.show()
        self.fire('loading')
      } else {
        self.throbber.show(100, function () {
          self.items().remove()
          self.fire('loading')
        })
      }

      self.on('hide close', hideThrobber)
    }

    self.requestTime = time = new Date().getTime()

    self.settings.itemsFactory(function (items) {
      if (items.length === 0) {
        self.hide()
        return
      }

      if (self.requestTime !== time) {
        return
      }

      self.getEl().style.width = ''
      self.getEl('body').style.width = ''
      hideThrobber()
      self.items().remove()
      self.getEl('body').innerHTML = ''
      self.add(items)
      self.renderNew()
      self.fire('loaded')
    })
  },
  hideAll: function () {
    let self = this

    this.find('menuitem').exec('hideMenu')

    return self._super()
  },
  preRender: function () {
    let self = this

    self.items().each(function (ctrl) {
      let settings = ctrl.settings

      if (settings.icon || settings.image || settings.selectable) {
        self._hasIcons = true
        return false
      }
    })

    if (self.settings.itemsFactory) {
      self.on('postrender', function () {
        if (self.settings.itemsFactory) {
          self.load()
        }
      })
    }

    self.on('show hide', function (e) {
      if (e.control === self) {
        if (e.type === 'show') {
          Delay.setTimeout(function () {
            self.classes.add('in')
          }, 0)
        } else {
          self.classes.remove('in')
        }
      }
    })

    return self._super()
  }
})

export { Menu }
