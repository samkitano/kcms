'use strict'

import { Env } from './Env'
import { Delay } from './Delay'
import { Widget } from './Widget'
import { Factory } from './Factory'

let toggleTextStyle = function (ctrl, state) {
  let textStyle = ctrl._textStyle

  if (textStyle) {
    let textElm = ctrl.getEl('text')

    textElm.setAttribute('style', textStyle)

    if (state) {
      textElm.style.color = ''
      textElm.style.backgroundColor = ''
    }
  }
}

let MenuItem = Widget.extend({
  Defaults: {
    border: 0,
    role: 'menuitem'
  },
  init: function (settings) {
    let text
    let self = this

    self._super(settings)
    settings = self.settings
    self.classes.add('menu-item')

    if (settings.menu) {
      self.classes.add('menu-item-expand')
    }

    if (settings.preview) {
      self.classes.add('menu-item-preview')
    }

    text = self.state.get('text')

    if (text === '-' || text === '|') {
      self.classes.add('menu-item-sep')
      self.aria('role', 'separator')
      self.state.set('text', '-')
    }

    if (settings.selectable) {
      self.aria('role', 'menuitemcheckbox')
      self.classes.add('menu-item-checkbox')
      settings.icon = 'selected'
    }

    if (!settings.preview && !settings.selectable) {
      self.classes.add('menu-item-normal')
    }

    self.on('mousedown', function (e) {
      e.preventDefault()
    })

    if (settings.menu && !settings.ariaHideMenu) {
      self.aria('haspopup', true)
    }
  },
  hasMenus: function () {
    return !!this.settings.menu
  },
  showMenu: function () {
    let menu
    let self = this
    let parent = self.parent()
    let settings = self.settings

    parent.items().each(function (ctrl) {
      if (ctrl !== self) {
        ctrl.hideMenu()
      }
    })

    if (settings.menu) {
      menu = self.menu

      if (!menu) {
        menu = settings.menu

        if (menu.length) {
          menu = {
            type: 'menu',
            animate: true,
            items: menu
          }
        } else {
          menu.type = menu.type || 'menu'
          menu.animate = true
        }

        if (parent.settings.itemDefaults) {
          menu.itemDefaults = parent.settings.itemDefaults
        }

        menu = self.menu = Factory.create(menu).parent(self).renderTo()
        menu.reflow()

        menu.on('cancel', function (e) {
          e.stopPropagation()
          self.focus()
          menu.hide()
        })

        menu.on('show hide', function (e) {
          if (e.control.items) {
            e.control.items().each(function (ctrl) {
              ctrl.active(ctrl.settings.selected)
            })
          }
        }).fire('show')

        menu.on('hide', function (e) {
          if (e.control === menu) {
            self.classes.remove('selected')
          }
        })

        menu.submenu = true
      } else {
        menu.show()
      }

      menu._parentMenu = parent
      menu.classes.add('menu-sub')

      let rel = menu.testMoveRel(self.getEl(), self.isRtl() ? [
        'tl-tr',
        'bl-br',
        'tr-tl',
        'br-bl'
      ] : [
        'tr-tl',
        'br-bl',
        'tl-tr',
        'bl-br'
      ])
      menu.moveRel(self.getEl(), rel)
      menu.rel = rel
      rel = `menu-sub-${rel}`
      menu.classes.remove(menu._lastRel).add(rel)
      menu._lastRel = rel
      self.classes.add('selected')
      self.aria('expanded', true)
    }
  },
  hideMenu: function () {
    let self = this

    if (self.menu) {
      self.menu.items().each(function (item) {
        if (item.hideMenu) {
          item.hideMenu()
        }
      })

      self.menu.hide()
      self.aria('expanded', false)
    }

    return self
  },
  renderHtml: function () {
    let self = this
    let id = self._id
    let settings = self.settings
    let prefix = self.classPrefix
    let text = self.state.get('text')
    let icon = self.settings.icon
    let image = ''
    let shortcut = settings.shortcut
    let url = self.encode(settings.url)
    let iconHtml = ''

    function convertShortcut (shortcut) {
      let i, value
      let replace = {}

      if (Env.mac) {
        replace = {
          alt: '&#x2325;',
          ctrl: '&#x2318;',
          shift: '&#x21E7;',
          meta: '&#x2318;'
        }
      } else {
        replace = { meta: 'Ctrl' }
      }

      shortcut = shortcut.split('+')

      for (i = 0; i < shortcut.length; i++) {
        value = replace[shortcut[i].toLowerCase()]

        if (value) {
          shortcut[i] = value
        }
      }

      return shortcut.join('+')
    }

    function escapeRegExp (str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    function markMatches (text) {
      let match = settings.match || ''

      return match
        ? text.replace(new RegExp(escapeRegExp(match), 'gi'), function (match) {
          return `!mce~match[${match}]mce~match!`
        })
        : text
    }

    function boldMatches (text) {
      return text.replace(new RegExp(escapeRegExp('!mce~match['), 'g'), '<b>')
        .replace(new RegExp(escapeRegExp(']mce~match!'), 'g'), '</b>')
    }

    if (icon) {
      self.parent().classes.add('menu-has-icons')
    }

    if (settings.image) {
      image = ` style="background-image: url('${settings.image}')"`
    }

    if (shortcut) {
      shortcut = convertShortcut(shortcut)
    }

    icon = `${prefix}ico ${prefix}i-` + (self.settings.icon || 'none')
    iconHtml = `${text !== '-' ? '<i class="' + icon + '"' + image + '></i>\xA0' : ''}`

    text = boldMatches(self.encode(markMatches(text)))
    url = boldMatches(self.encode(markMatches(url)))

    return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1">' +
      iconHtml + (text !== '-' ? '<span id="' + id + '-text" class="' + prefix + 'text">' +
        text + '</span>' : '') + (shortcut ? '<div id="' + id + '-shortcut" class="' + prefix +
        'menu-shortcut">' + shortcut + '</div>' : '') + (settings.menu ? '<div class="' + prefix +
        'caret"></div>' : '') + (url ? '<div class="' + prefix + 'menu-item-link">' + url +
        '</div>' : '') + '</div>'
  },
  postRender: function () {
    let self = this
    let settings = self.settings
    let textStyle = settings.textStyle

    if (typeof textStyle === 'function') {
      textStyle = textStyle.call(this)
    }

    if (textStyle) {
      let textElm = self.getEl('text')

      if (textElm) {
        textElm.setAttribute('style', textStyle)
        self._textStyle = textStyle
      }
    }

    self.on('mouseenter click', function (e) {
      if (e.control === self) {
        if (!settings.menu && e.type === 'click') {
          self.fire('select')

          Delay.requestAnimationFrame(function () {
            self.parent().hideAll()
          })
        } else {
          self.showMenu()

          if (e.aria) {
            self.menu.focus(true)
          }
        }
      }
    })

    self._super()

    return self
  },
  hover: function () {
    let self = this

    self.parent().items().each(function (ctrl) {
      ctrl.classes.remove('selected')
    })

    self.classes.toggle('selected', true)

    return self
  },
  active: function (state) {
    toggleTextStyle(this, state)

    if (typeof state !== 'undefined') {
      this.aria('checked', state)
    }

    return this._super(state)
  },
  remove: function () {
    this._super()

    if (this.menu) {
      this.menu.remove()
    }
  }
})

export { MenuItem }
