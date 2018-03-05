'use strict'

import { $ } from './$'
import { Tools } from './Tools'
import { Control } from './Control'
import { Factory } from './Factory'
import { Selector } from './Selector'
import { ClassList } from './ClassList'
import { Collection } from './Collection'
import { ReflowQueue } from './ReflowQueue'
import { KeyboardNavigation } from './KeyboardNavigation'

let selectorCache = {}

let Container = Control.extend({
  init: function (settings) {
    let self = this

    self._super(settings)
    settings = self.settings

    if (settings.fixed) {
      self.state.set('fixed', true)
    }

    self._items = new Collection()

    if (self.isRtl()) {
      self.classes.add('rtl')
    }

    self.bodyClasses = new ClassList(function () {
      if (self.state.get('rendered')) {
        self.getEl('body').className = this.toString()
      }
    })

    self.bodyClasses.prefix = self.classPrefix
    self.classes.add('container')
    self.bodyClasses.add('container-body')

    if (settings.containerCls) {
      self.classes.add(settings.containerCls)
    }

    self._layout = Factory.create((settings.layout || '') + 'layout')

    if (self.settings.items) {
      self.add(self.settings.items)
    } else {
      self.add(self.render())
    }

    self._hasBody = true
  },
  items: function () {
    return this._items
  },
  find: function (selector) {
    selector = selectorCache[selector] = selectorCache[selector] || new Selector(selector)
    return selector.find(this)
  },
  add: function (items) {
    let self = this
    self.items().add(self.create(items)).parent(self)
    return self
  },
  focus: function (keyboard) {
    let focusCtrl, keyboardNav, items
    let self = this

    if (keyboard) {
      keyboardNav = self.keyboardNav || self.parents().eq(-1)[0].keyboardNav

      if (keyboardNav) {
        keyboardNav.focusFirst(self)
        return
      }
    }

    items = self.find('*')

    if (self.statusbar) {
      items.add(self.statusbar.items())
    }

    items.each(ctrl => {
      if (ctrl.settings.autofocus) {
        focusCtrl = null
        return false
      }

      if (ctrl.canFocus) {
        focusCtrl = focusCtrl || ctrl
      }
    })

    if (focusCtrl) {
      focusCtrl.focus()
    }

    return self
  },
  replace: function (oldItem, newItem) {
    let ctrlElm
    let items = this.items()
    let i = items.length

    while (i--) {
      if (items[i] === oldItem) {
        items[i] = newItem
        break
      }
    }

    if (i >= 0) {
      ctrlElm = newItem.getEl()

      if (ctrlElm) {
        ctrlElm.parentNode.removeChild(ctrlElm)
      }

      ctrlElm = oldItem.getEl()

      if (ctrlElm) {
        ctrlElm.parentNode.removeChild(ctrlElm)
      }
    }

    newItem.parent(this)
  },
  create: function (items) {
    let settings
    let self = this
    let ctrlItems = []

    if (!Tools.isArray(items)) {
      items = [items]
    }

    Tools.each(items, item => {
      if (item) {
        if (!(item instanceof Control)) {
          if (typeof item === 'string') {
            item = { type: item }
          }

          settings = Tools.extend({}, self.settings.defaults, item)
          item.type = settings.type = settings.type ||
            item.type ||
            self.settings.defaultType ||
            (settings.defaults ? settings.defaults.type : null)
          item = Factory.create(settings)
        }

        ctrlItems.push(item)
      }
    })

    return ctrlItems
  },
  renderNew: function () {
    let self = this

    self.items().each((ctrl, index) => {
      let containerElm

      ctrl.parent(self)

      if (!ctrl.state.get('rendered')) {
        containerElm = self.getEl('body')

        if (containerElm.hasChildNodes() && index <= containerElm.childNodes.length - 1) {
          $(containerElm.childNodes[index]).before(ctrl.renderHtml())
        } else {
          $(containerElm).append(ctrl.renderHtml())
        }

        ctrl.postRender()
        ReflowQueue.add(ctrl)
      }
    })

    self._layout.applyClasses(self.items().filter(':visible'))
    self._lastRect = null

    return self
  },
  append: function (items) {
    return this.add(items).renderNew()
  },
  prepend: function (items) {
    let self = this

    self.items().set(self.create(items).concat(self.items().toArray()))

    return self.renderNew()
  },
  insert: function (items, index, before) {
    let curItems, beforeItems, afterItems
    let self = this

    items = self.create(items)
    curItems = self.items()

    if (!before && index < curItems.length - 1) {
      index += 1
    }

    if (index >= 0 && index < curItems.length) {
      beforeItems = curItems.slice(0, index).toArray()
      afterItems = curItems.slice(index).toArray()
      curItems.set(beforeItems.concat(items, afterItems))
    }

    return self.renderNew()
  },
  fromJSON: function (data) {
    let self = this

    for (let n in data) {
      self.find('#' + n).value(data[n])
    }
    return self
  },
  toJSON: function () {
    let self = this
    let data = {}

    self.find('*').each(ctrl => {
      let name = ctrl.name()
      let value = ctrl.value()

      if (name && typeof value !== 'undefined') {
        data[name] = value
      }
    })

    return data
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let role = this.settings.role

    self.preRender()
    layout.preRender(self)

    return `<div id="${self._id}" class="${self.classes}"${role ? ' role="' + this.settings.role + '"' : ''}><div id="${self._id}-body" class="${self.bodyClasses}">` + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
  },
  postRender: function () {
    let box
    let self = this

    self.items().exec('postRender')
    self._super()
    self._layout.postRender(self)
    self.state.set('rendered', true)

    if (self.settings.style) {
      self.$el.css(self.settings.style)
    }

    if (self.settings.border) {
      box = self.borderBox
      self.$el.css({
        'border-top-width': box.top,
        'border-right-width': box.right,
        'border-bottom-width': box.bottom,
        'border-left-width': box.left
      })
    }

    if (!self.parent()) {
      self.keyboardNav = KeyboardNavigation({ root: self })
    }

    return self
  },
  initLayoutRect: function () {
    let self = this
    let layoutRect = self._super()

    self._layout.recalc(self)

    return layoutRect
  },
  recalc: function () {
    let self = this
    let rect = self._layoutRect
    let lastRect = self._lastRect

    if (!lastRect || lastRect.w !== rect.w || lastRect.h !== rect.h) {
      self._layout.recalc(self)
      rect = self.layoutRect()

      self._lastRect = {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h
      }

      return true
    }
  },
  reflow: function () {
    let i

    ReflowQueue.remove(this)
    if (this.visible()) {
      Control.repaintControls = []
      Control.repaintControls.map = {}

      this.recalc()

      i = Control.repaintControls.length

      while (i--) {
        Control.repaintControls[i].repaint()
      }

      if (this.settings.layout !== 'flow' && this.settings.layout !== 'stack') {
        this.repaint()
      }

      Control.repaintControls = []
    }

    return this
  }
})

export { Container }
