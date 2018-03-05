'use strict'

import { Button } from './Button'
import { MenuBar } from './MenuBar'
import { Factory } from './Factory'

function isChildOf (node, parent) {
  while (node) {
    if (parent === node) {
      return true
    }

    node = node.parentNode
  }

  return false
}

let MenuButton = Button.extend({
  init: function (settings) {
    let self = this

    self._renderOpen = true
    self._super(settings)
    settings = self.settings
    self.classes.add('menubtn')

    if (settings.fixedWidth) {
      self.classes.add('fixed-width')
    }

    self.aria('haspopup', true)
    self.state.set('menu', settings.menu || self.render())
  },
  showMenu: function (toggle) {
    let menu
    let self = this

    if (self.menu && self.menu.visible() && toggle !== false) {
      return self.hideMenu()
    }

    if (!self.menu) {
      menu = self.state.get('menu') || []
      self.classes.add('opened')

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

      if (!menu.renderTo) {
        self.menu = Factory.create(menu).parent(self).renderTo()
      } else {
        self.menu = menu.parent(self).show().renderTo()
      }

      self.fire('createmenu')
      self.menu.reflow()

      self.menu.on('cancel', function (e) {
        if (e.control.parent() === self.menu) {
          e.stopPropagation()
          self.focus()
          self.hideMenu()
        }
      })

      self.menu.on('select', function () {
        self.focus()
      })

      self.menu.on('show hide', function (e) {
        if (e.control === self.menu) {
          self.activeMenu(e.type === 'show')
          self.classes.toggle('opened', e.type === 'show')
        }
        self.aria('expanded', e.type === 'show')
      }).fire('show')
    }

    self.menu.show()
    self.menu.layoutRect({ w: self.layoutRect().w })
    self.menu.repaint()
    self.menu.moveRel(self.getEl(), self.isRtl() ? [
      'br-tr',
      'tr-br'
    ] : [
      'bl-tl',
      'tl-bl'
    ])
    self.fire('showmenu')
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
    }
  },
  activeMenu: function (state) {
    this.classes.toggle('active', state)
  },
  renderHtml: function () {
    let image
    let self = this
    let id = self._id
    let prefix = self.classPrefix
    let icon = self.settings.icon
    let text = self.state.get('text')
    let textHtml = ''

    image = self.settings.image
    if (image) {
      icon = 'none'

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1]
      }
      image = ' style="background-image: url(\'' + image + '\')"'
    } else {
      image = ''
    }

    if (text) {
      self.classes.add('btn-has-text')
      textHtml = `<span class="${prefix}txt">${self.encode(text)}</span>`
    }

    if (self.settings.icon) {
      icon = `${prefix}ico ${prefix}i-${icon}`
    } else {
      icon = ''
    }

    self.aria('role', self.parent() instanceof MenuBar ? 'menuitem' : 'button')

    return `<div id="${id}" class="${self.classes}" tabindex="-1" aria-labelledby="${id}">
<button id="${id}-open" role="presentation" type="button" 
tabindex="-1">${icon ? '<i class="' + icon + '"' + image + '></i>' : ''}${textHtml} 
<i class="${prefix}caret"></i></button></div>`
  },
  postRender: function () {
    let self = this

    self.on('click', function (e) {
      if (e.control === self && isChildOf(e.target, self.getEl())) {
        self.focus()
        self.showMenu(!e.aria)

        if (e.aria) {
          self.menu.items().filter(':visible')[0].focus()
        }
      }
    })

    self.on('mouseenter', function (e) {
      let overCtrl = e.control
      let parent = self.parent()
      let hasVisibleSiblingMenu

      if (overCtrl && parent && overCtrl instanceof MenuButton && overCtrl.parent() === parent) {
        parent.items().filter('MenuButton').each(function (ctrl) {
          if (ctrl.hideMenu && ctrl !== overCtrl) {
            if (ctrl.menu && ctrl.menu.visible()) {
              hasVisibleSiblingMenu = true
            }
            ctrl.hideMenu()
          }
        })

        if (hasVisibleSiblingMenu) {
          overCtrl.focus()
          overCtrl.showMenu()
        }
      }
    })

    return self._super()
  },
  bindStates: function () {
    let self = this

    self.state.on('change:menu', function () {
      if (self.menu) {
        self.menu.remove()
      }

      self.menu = null
    })

    return self._super()
  },
  remove: function () {
    this._super()

    if (this.menu) {
      this.menu.remove()
    }
  }
})

export { MenuButton }
