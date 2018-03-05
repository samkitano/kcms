'use strict'

import { $ } from './$'
import { VK } from './VK'
import { Tools } from './Tools'
import { funcs } from './funcs'
import { Widget } from './Widget'
import { Factory } from './Factory'

let ComboBox = Widget.extend({
  init: function (settings) {
    let self = this
    self._super(settings)
    settings = self.settings
    self.classes.add('combobox')
    self.subinput = true
    self.ariaTarget = 'inp'
    settings.menu = settings.menu || settings.values

    if (settings.menu) {
      settings.icon = 'caret'
    }

    self.on('click', function (e) {
      let elm = e.target
      let root = self.getEl()

      if (!$.contains(root, elm) && elm !== root) {
        return
      }

      while (elm && elm !== root) {
        if (elm.id && elm.id.indexOf('-open') !== -1) {
          self.fire('action')

          if (settings.menu) {
            self.showMenu()

            if (e.aria) {
              self.menu.items()[0].focus()
            }
          }
        }

        elm = elm.parentNode
      }
    })

    self.on('keydown', function (e) {
      let rootControl

      if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
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
      if (e.target.nodeName === 'INPUT') {
        let oldValue = self.state.get('value')
        let newValue = e.target.value

        if (newValue !== oldValue) {
          self.state.set('value', newValue)
          self.fire('autocomplete', e)
        }
      }
    })

    self.on('mouseover', function (e) {
      let tooltip = self.tooltip().moveTo(-65535)

      if (self.statusLevel() && e.target.className.indexOf(`${self.classPrefix}status`) !== -1) {
        let statusMessage = self.statusMessage() || 'Ok'
        let rel = tooltip.text(statusMessage).show().testMoveRel(e.target, [
          'bc-tc',
          'bc-tl',
          'bc-tr'
        ])

        tooltip.classes.toggle('tooltip-n', rel === 'bc-tc')
        tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl')
        tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr')
        tooltip.moveRel(e.target, rel)
      }
    })
  },
  statusLevel: function (value) {
    if (arguments.length > 0) {
      this.state.set('statusLevel', value)
    }

    return this.state.get('statusLevel')
  },
  statusMessage: function (value) {
    if (arguments.length > 0) {
      this.state.set('statusMessage', value)
    }

    return this.state.get('statusMessage')
  },
  showMenu: function () {
    let menu
    let self = this
    let settings = self.settings

    if (!self.menu) {
      menu = settings.menu || []

      if (menu.length) {
        menu = {
          type: 'menu',
          items: menu
        }
      } else {
        menu.type = menu.type || 'menu'
      }

      self.menu = Factory.create(menu).parent(self).renderTo(self.getContainerElm())
      self.fire('createmenu')
      self.menu.reflow()

      self.menu.on('cancel', function (e) {
        if (e.control === self.menu) {
          self.focus()
        }
      })

      self.menu.on('show hide', function (e) {
        e.control.items().each(function (ctrl) {
          ctrl.active(ctrl.value() === self.value())
        })
      }).fire('show')

      self.menu.on('select', function (e) {
        self.value(e.control.value())
      })

      self.on('focusin', function (e) {
        if (e.target.tagName.toUpperCase() === 'INPUT') {
          self.menu.hide()
        }
      })

      self.aria('expanded', true)
    }

    self.menu.show()
    self.menu.layoutRect({ w: self.layoutRect().w })
    self.menu.moveRel(self.getEl(), self.isRtl() ? [
      'br-tr',
      'tr-br'
    ] : [
      'bl-tl',
      'tl-bl'
    ])
  },
  focus: function () {
    this.getEl('inp').focus()
  },
  repaint: function () {
    let width, lineHeight
    let self = this
    let elm = self.getEl()
    let openElm = self.getEl('open')
    let rect = self.layoutRect()
    let innerPadding = 0
    let inputElm = elm.firstChild

    if (self.statusLevel() && self.statusLevel() !== 'none') {
      innerPadding = parseInt(
        funcs.getRuntimeStyle(
          inputElm,
          'padding-right')
        ,
        10) - parseInt(funcs.getRuntimeStyle(inputElm, 'padding-left'), 10)
    }

    if (openElm) {
      width = rect.w - funcs.getSize(openElm).width - 10
    } else {
      width = rect.w - 10
    }

    let doc = document

    if (doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
      lineHeight = self.layoutRect().h - 2 + 'px'
    }

    $(inputElm).css({
      width: width - innerPadding,
      lineHeight: lineHeight
    })

    self._super()

    return self
  },
  postRender: function () {
    let self = this

    $(this.getEl('inp')).on('change', function (e) {
      self.state.set('value', e.target.value)
      self.fire('change', e)
    })

    return self._super()
  },
  renderHtml: function () {
    let icon, text
    let self = this
    let id = self._id
    let settings = self.settings
    let prefix = self.classPrefix
    let value = self.state.get('value') || ''
    let openBtnHtml = ''
    let extraAttrs = ''
    let statusHtml = ''

    if ('spellcheck' in settings) {
      extraAttrs += ` spellcheck="${settings.spellcheck}"`
    }

    if (settings.maxLength) {
      extraAttrs += ` maxlength="${settings.maxLength}"`
    }

    if (settings.size) {
      extraAttrs += ` size="${settings.size}"`
    }

    if (settings.subtype) {
      extraAttrs += ` type="${settings.subtype}"`
    }

    statusHtml = `<i id="${id}-status" class="mce-status mce-ico" style="display: none"></i>`

    if (self.disabled()) {
      extraAttrs += ' disabled="disabled"'
    }

    icon = settings.icon

    if (icon && icon !== 'caret') {
      icon = `${prefix}ico ${prefix}i-${settings.icon}`
    }

    text = self.state.get('text')

    if (icon || text) {
      openBtnHtml = `<div id="${id}-open" class="${prefix}btn ${prefix}open" 
tabIndex="-1" role="button"><button id="${id}-action" type="button" hidefocus="1" 
tabindex="-1">${icon !== 'caret' ? '<i class="' + icon + '"></i>' : '<i class="' + prefix + 'caret"></i>'}
${text ? (icon ? ' ' : '') + text : ''}</button></div>`

      self.classes.add('has-open')
    }

    return `<div id="${id}" class="${self.classes}"><input id="${id}-inp" class="${prefix}textbox" 
value="${self.encode(value, false)}" hidefocus="1"${extraAttrs} placeholder="
${self.encode(settings.placeholder)}" />${statusHtml}${openBtnHtml}</div>`
  },
  value: function (value) {
    if (arguments.length) {
      this.state.set('value', value)

      return this
    }

    if (this.state.get('rendered')) {
      this.state.set('value', this.getEl('inp').value)
    }

    return this.state.get('value')
  },
  showAutoComplete: function (items, term) {
    let self = this

    if (items.length === 0) {
      self.hideMenu()

      return
    }

    let insert = function (value, title) {
      return function () {
        self.fire('selectitem', {
          title: title,
          value: value
        })
      }
    }

    if (self.menu) {
      self.menu.items().remove()
    } else {
      self.menu = Factory.create({
        type: 'menu',
        classes: 'combobox-menu',
        layout: 'flow'
      }).parent(self).renderTo()
    }

    Tools.each(items, function (item) {
      self.menu.add({
        text: item.title,
        url: item.previewUrl,
        match: term,
        classes: 'menu-item-ellipsis',
        onclick: insert(item.value, item.title)
      })
    })

    self.menu.renderNew()
    self.hideMenu()

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

    let maxW = self.layoutRect().w

    self.menu.layoutRect({
      w: maxW,
      minW: 0,
      maxW: maxW
    })

    self.menu.repaint()
    self.menu.reflow()
    self.menu.show()
    self.menu.moveRel(self.getEl(), self.isRtl() ? [
      'br-tr',
      'tr-br'
    ] : [
      'bl-tl',
      'tl-bl'
    ])
  },
  hideMenu: function () {
    if (this.menu) {
      this.menu.hide()
    }
  },
  bindStates: function () {
    let self = this

    self.state.on('change:value', function (e) {
      if (self.getEl('inp').value !== e.value) {
        self.getEl('inp').value = e.value
      }
    })

    self.state.on('change:disabled', function (e) {
      self.getEl('inp').disabled = e.value
    })

    self.state.on('change:statusLevel', function (e) {
      let statusIconElm = self.getEl('status')
      let prefix = self.classPrefix
      let value = e.value

      funcs.css(statusIconElm, 'display', value === 'none' ? 'none' : '')
      funcs.toggleClass(statusIconElm, `${prefix}i-checkmark`, value === 'ok')
      funcs.toggleClass(statusIconElm, `${prefix}i-warning`, value === 'warn')
      funcs.toggleClass(statusIconElm, `${prefix}i-error`, value === 'error')
      self.classes.toggle('has-status', value !== 'none')
      self.repaint()
    })

    funcs.on(self.getEl('status'), 'mouseleave', function () {
      self.tooltip().hide()
    })

    self.on('cancel', function (e) {
      if (self.menu && self.menu.visible()) {
        e.stopPropagation()
        self.hideMenu()
      }
    })

    let focusIdx = function (idx, menu) {
      if (menu && menu.items().length > 0) {
        menu.items().eq(idx)[0].focus()
      }
    }

    self.on('keydown', function (e) {
      let keyCode = e.keyCode

      if (e.target.nodeName === 'INPUT') {
        if (keyCode === VK.DOWN) {
          e.preventDefault()

          self.fire('autocomplete')
          focusIdx(0, self.menu)
        } else if (keyCode === VK.UP) {
          e.preventDefault()

          focusIdx(-1, self.menu)
        }
      }
    })

    return self._super()
  },
  remove: function () {
    $(this.getEl('inp')).off()

    if (this.menu) {
      this.menu.remove()
    }

    this._super()
  }
})

export { ComboBox }
