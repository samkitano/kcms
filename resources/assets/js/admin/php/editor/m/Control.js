'use strict'

import { $ } from './$'
import { Box } from './Box'
import { funcs } from './funcs'
import { Tools } from './Tools'
import { Class } from './Class'
import { ClassList } from './ClassList'
import { Collection } from './Collection'
import { ReflowQueue } from './ReflowQueue'
import { EventDispatcher } from './EventDispatcher'
import { ObservableObject } from './ObservableObject'

let Control
let idCounter = 0
let classPrefix = 'mce-'
let hasWheelEventSupport = false
let hasMouseWheelEventSupport = 'onmousewheel' in document

let proto = {
  Statics: { classPrefix },
  isRtl: () => Control.rtl,
  classPrefix: classPrefix,
  init: function (settings) {
    let classes, defaultClasses
    let self = this

    function applyClasses (classes) {
      let i

      classes = classes.split(' ')

      for (i = 0; i < classes.length; i++) {
        self.classes.add(classes[i])
      }
    }

    self.settings = settings = Tools.extend({}, self.Defaults, settings)
    self._id = settings.id || `mceu_${idCounter++}`
    self._aria = { role: settings.role }
    self._elmCache = {}
    self.$ = $

    self.state = new ObservableObject({
      visible: true,
      active: false,
      disabled: false,
      value: ''
    })

    self.data = new ObservableObject(settings.data)

    self.classes = new ClassList(function () {
      if (self.state.get('rendered')) {
        self.getEl().className = this.toString()
      }
    })

    self.classes.prefix = self.classPrefix
    classes = settings.classes

    if (classes) {
      if (self.Defaults) {
        defaultClasses = self.Defaults.classes

        if (defaultClasses && classes !== defaultClasses) {
          applyClasses(defaultClasses)
        }
      }

      applyClasses(classes)
    }

    Tools.each('title text name visible disabled active value'.split(' '), function (name) {
      if (name in settings) {
        self[name](settings[name])
      }
    })

    self.on('click', function () {
      if (self.disabled()) {
        return false
      }
    })

    self.settings = settings
    self.borderBox = Box.parseBox(settings.border)
    self.paddingBox = Box.parseBox(settings.padding)
    self.marginBox = Box.parseBox(settings.margin)

    if (settings.hidden) {
      self.hide()
    }
  },
  Properties: 'parent,name',
  getContainerElm: function () {
    return funcs.getContainer()
  },
  getParentCtrl: function (elm) {
    let ctrl
    let lookup = this.getRoot().controlIdLookup

    while (elm && lookup) {
      ctrl = lookup[elm.id]

      if (ctrl) {
        break
      }

      elm = elm.parentNode
    }

    return ctrl
  },
  initLayoutRect: function () {
    let width, height, minWidth, minHeight, autoResize
    let startMinWidth, startMinHeight, initialSize
    let borderBox, layoutRect
    let self = this
    let settings = self.settings
    let elm = self.getEl()

    borderBox = self.borderBox = self.borderBox || Box.measureBox(elm, 'border')
    self.paddingBox = self.paddingBox || Box.measureBox(elm, 'padding')
    self.marginBox = self.marginBox || Box.measureBox(elm, 'margin')
    initialSize = funcs.getSize(elm)
    startMinWidth = settings.minWidth
    startMinHeight = settings.minHeight
    minWidth = startMinWidth || initialSize.width
    minHeight = startMinHeight || initialSize.height
    width = settings.width
    height = settings.height
    autoResize = settings.autoResize
    autoResize = typeof autoResize !== 'undefined' ? autoResize : !width && !height
    width = width || minWidth
    height = height || minHeight

    let deltaW = borderBox.left + borderBox.right
    let deltaH = borderBox.top + borderBox.bottom
    let maxW = settings.maxWidth || 65535
    let maxH = settings.maxHeight || 65535

    self._layoutRect = layoutRect = {
      x: settings.x || 0,
      y: settings.y || 0,
      w: width,
      h: height,
      deltaW,
      deltaH,
      contentW: width - deltaW,
      contentH: height - deltaH,
      innerW: width - deltaW,
      innerH: height - deltaH,
      startMinWidth: startMinWidth || 0,
      startMinHeight: startMinHeight || 0,
      minW: Math.min(minWidth, maxW),
      minH: Math.min(minHeight, maxH),
      maxW,
      maxH,
      autoResize,
      scrollW: 0
    }

    self._lastLayoutRect = {}

    return layoutRect
  },
  layoutRect: function (newRect) {
    let lastLayoutRect, size, deltaWidth, deltaHeight, repaintControls
    let self = this
    let curRect = self._layoutRect

    if (!curRect) {
      curRect = self.initLayoutRect()
    }

    if (newRect) {
      deltaWidth = curRect.deltaW
      deltaHeight = curRect.deltaH

      if (newRect.x !== undefined) {
        curRect.x = newRect.x
      }

      if (newRect.y !== undefined) {
        curRect.y = newRect.y
      }

      if (newRect.minW !== undefined) {
        curRect.minW = newRect.minW
      }

      if (newRect.minH !== undefined) {
        curRect.minH = newRect.minH
      }

      size = newRect.w

      if (size !== undefined) {
        size = size < curRect.minW ? curRect.minW : size
        size = size > curRect.maxW ? curRect.maxW : size
        curRect.w = size
        curRect.innerW = size - deltaWidth
      }

      size = newRect.h

      if (size !== undefined) {
        size = size < curRect.minH ? curRect.minH : size
        size = size > curRect.maxH ? curRect.maxH : size
        curRect.h = size
        curRect.innerH = size - deltaHeight
      }

      size = newRect.innerW

      if (size !== undefined) {
        size = size < curRect.minW - deltaWidth ? curRect.minW - deltaWidth : size
        size = size > curRect.maxW - deltaWidth ? curRect.maxW - deltaWidth : size
        curRect.innerW = size
        curRect.w = size + deltaWidth
      }

      size = newRect.innerH

      if (size !== undefined) {
        size = size < curRect.minH - deltaHeight ? curRect.minH - deltaHeight : size
        size = size > curRect.maxH - deltaHeight ? curRect.maxH - deltaHeight : size
        curRect.innerH = size
        curRect.h = size + deltaHeight
      }

      if (newRect.contentW !== undefined) {
        curRect.contentW = newRect.contentW
      }

      if (newRect.contentH !== undefined) {
        curRect.contentH = newRect.contentH
      }

      lastLayoutRect = self._lastLayoutRect

      if (lastLayoutRect.x !== curRect.x || lastLayoutRect.y !== curRect.y) {
        repaintControls = Control.repaintControls

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self)
            repaintControls.map[self._id] = true
          }
        }

        lastLayoutRect.x = curRect.x
        lastLayoutRect.y = curRect.y
        lastLayoutRect.w = curRect.w
        lastLayoutRect.h = curRect.h
      } else if (lastLayoutRect.w !== curRect.w) {
        repaintControls = Control.repaintControls

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self)
            repaintControls.map[self._id] = true
          }
        }

        lastLayoutRect.x = curRect.x
        lastLayoutRect.y = curRect.y
        lastLayoutRect.w = curRect.w
        lastLayoutRect.h = curRect.h
      } else if (lastLayoutRect.h !== curRect.h) {
        repaintControls = Control.repaintControls

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self)
            repaintControls.map[self._id] = true
          }
        }

        lastLayoutRect.x = curRect.x
        lastLayoutRect.y = curRect.y
        lastLayoutRect.w = curRect.w
        lastLayoutRect.h = curRect.h
      }

      return self
    }

    return curRect
  },
  repaint: function () {
    let style, bodyStyle, bodyElm, rect, borderBox
    let borderW, borderH, lastRepaintRect, round, value
    let self = this

    round = !document.createRange ? Math.round : function (value) {
      return value
    }

    style = self.getEl().style
    rect = self._layoutRect
    lastRepaintRect = self._lastRepaintRect || {}
    borderBox = self.borderBox
    borderW = borderBox.left + borderBox.right
    borderH = borderBox.top + borderBox.bottom

    if (rect.x !== lastRepaintRect.x) {
      style.left = `${round(rect.x)}px`
      lastRepaintRect.x = rect.x
    }

    if (rect.y !== lastRepaintRect.y) {
      style.top = `${round(rect.y)}px`
      lastRepaintRect.y = rect.y
    }

    if (rect.w !== lastRepaintRect.w) {
      value = round(rect.w - borderW)
      style.width = `${value >= 0 ? value : 0}px`
      lastRepaintRect.w = rect.w
    }

    if (rect.h !== lastRepaintRect.h) {
      value = round(rect.h - borderH)
      style.height = `${value >= 0 ? value : 0}px`
      lastRepaintRect.h = rect.h
    }

    if (self._hasBody && rect.innerW !== lastRepaintRect.innerW) {
      value = round(rect.innerW)
      bodyElm = self.getEl('body')

      if (bodyElm) {
        bodyStyle = bodyElm.style
        bodyStyle.width = `${value >= 0 ? value : 0}px`
      }

      lastRepaintRect.innerW = rect.innerW
    }

    if (self._hasBody && rect.innerH !== lastRepaintRect.innerH) {
      value = round(rect.innerH)
      bodyElm = bodyElm || self.getEl('body')

      if (bodyElm) {
        bodyStyle = bodyStyle || bodyElm.style
        bodyStyle.height = (value >= 0 ? value : 0) + 'px'
      }

      lastRepaintRect.innerH = rect.innerH
    }

    self._lastRepaintRect = lastRepaintRect
    self.fire('repaint', {}, false)
  },
  updateLayoutRect: function () {
    let self = this

    self.parent()._lastRect = null
    funcs.css(self.getEl(), {
      width: '',
      height: ''
    })

    self._layoutRect = self._lastRepaintRect = self._lastLayoutRect = null
    self.initLayoutRect()
  },
  on: function (name, callback) {
    let self = this

    function resolveCallbackName (name) {
      let callback, scope

      if (typeof name !== 'string') {
        return name
      }

      return function (e) {
        if (!callback) {
          self.parentsAndSelf().each(ctrl => {
            let callbacks = ctrl.settings.callbacks

            if (callbacks && (callback = callbacks[name])) {
              scope = ctrl

              return false
            }
          })
        }

        if (!callback) {
          e.action = name

          this.fire('execute', e)

          return
        }

        return callback.call(scope, e)
      }
    }

    getEventDispatcher(self).on(name, resolveCallbackName(callback))

    return self
  },
  off: function (name, callback) {
    getEventDispatcher(this).off(name, callback)

    return this
  },
  fire: function (name, args, bubble) {
    let self = this

    args = args || {}

    if (!args.control) {
      args.control = self
    }

    args = getEventDispatcher(self).fire(name, args)

    if (bubble !== false && self.parent) {
      let prnt = self.parent()

      while (prnt && !args.isPropagationStopped()) {
        prnt.fire(name, args, false)
        prnt = prnt.parent()
      }
    }

    return args
  },
  hasEventListeners: function (name) {
    return getEventDispatcher(this).has(name)
  },
  parents: function (selector) {
    let ctrl
    let self = this
    let parents = new Collection()

    for (ctrl = self.parent(); ctrl; ctrl = ctrl.parent()) {
      parents.add(ctrl)
    }

    if (selector) {
      parents = parents.filter(selector)
    }

    return parents
  },
  parentsAndSelf: function (selector) {
    return new Collection(this).add(this.parents(selector))
  },
  next: function () {
    let parentControls = this.parent().items()

    return parentControls[parentControls.indexOf(this) + 1]
  },
  prev: function () {
    let parentControls = this.parent().items()

    return parentControls[parentControls.indexOf(this) - 1]
  },
  innerHtml: function (html) {
    this.$el.html(html)
    return this
  },
  getEl: function (suffix) {
    let id = `${suffix ? this._id + '-' + suffix : this._id}`

    if (!this._elmCache[id]) {
      this._elmCache[id] = $(`#${id}`)[0]
    }

    return this._elmCache[id]
  },
  show: function () {
    return this.visible(true)
  },
  hide: function () {
    return this.visible(false)
  },
  focus: function () {
    try {
      this.getEl().focus()
    } catch (ex) {}

    return this
  },
  blur: function () {
    this.getEl().blur()

    return this
  },
  aria: function (name, value) {
    let self = this
    let elm = self.getEl(self.ariaTarget)

    if (typeof value === 'undefined') {
      return self._aria[name]
    }

    self._aria[name] = value

    if (self.state.get('rendered')) {
      elm.setAttribute(name === 'role' ? name : 'aria-' + name, value)
    }

    return self
  },
  encode: function (text, translate) {
    if (translate !== false) {
      text = this.translate(text)
    }

    return (text || '').replace(/[&<>"]/g, function (match) {
      return `&#${match.charCodeAt(0)};`
    })
  },
  translate: function (text) {
    return Control.translate ? Control.translate(text) : text
  },
  before: function (items) {
    let self = this
    let parent = self.parent()

    if (parent) {
      parent.insert(items, parent.items().indexOf(self), true)
    }

    return self
  },
  after: function (items) {
    let self = this
    let parent = self.parent()

    if (parent) {
      parent.insert(items, parent.items().indexOf(self))
    }

    return self
  },
  remove: function () {
    let newItems, i
    let self = this
    let elm = self.getEl()
    let parent = self.parent()

    if (self.items) {
      let controls = self.items().toArray()

      i = controls.length

      while (i--) {
        controls[i].remove()
      }
    }

    if (parent && parent.items) {
      newItems = []

      parent.items().each(function (item) {
        if (item !== self) {
          newItems.push(item)
        }
      })

      parent.items().set(newItems)
      parent._lastRect = null
    }

    if (self._eventsRoot && self._eventsRoot === self) {
      $(elm).off()
    }

    let lookup = self.getRoot().controlIdLookup

    if (lookup) {
      delete lookup[self._id]
    }

    if (elm && elm.parentNode) {
      elm.parentNode.removeChild(elm)
    }

    self.state.set('rendered', false)
    self.state.destroy()
    self.fire('remove')

    return self
  },
  renderBefore: function (elm) {
    $(elm).before(this.renderHtml())

    this.postRender()

    return this
  },
  renderTo: function (elm) {
    $(elm || this.getContainerElm()).append(this.renderHtml())

    this.postRender()

    return this
  },
  preRender: function () {},
  render: function () {},
  renderHtml: function () {
    return `<div id="${this._id}" class="${this.classes}"></div>`
  },
  postRender: function () {
    let elm, box, parent, name, parentEventsRoot
    let self = this
    let settings = self.settings

    self.$el = $(self.getEl())
    self.state.set('rendered', true)

    for (name in settings) {
      if (name.indexOf('on') === 0) {
        self.on(name.substr(2), settings[name])
      }
    }

    if (self._eventsRoot) {
      for (parent = self.parent(); !parentEventsRoot && parent; parent = parent.parent()) {
        parentEventsRoot = parent._eventsRoot
      }

      if (parentEventsRoot) {
        for (name in parentEventsRoot._nativeEvents) {
          self._nativeEvents[name] = true
        }
      }
    }

    bindPendingEvents(self)

    if (settings.style) {
      elm = self.getEl()

      if (elm) {
        elm.setAttribute('style', settings.style)
        elm.style.cssText = settings.style
      }
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

    let root = self.getRoot()

    if (!root.controlIdLookup) {
      root.controlIdLookup = {}
    }

    root.controlIdLookup[self._id] = self

    for (let key in self._aria) {
      self.aria(key, self._aria[key])
    }

    if (self.state.get('visible') === false) {
      self.getEl().style.display = 'none'
    }

    self.bindStates()

    self.state.on('change:visible', e => {
      let parentCtrl
      let state = e.value

      if (self.state.get('rendered')) {
        self.getEl().style.display = state === false ? 'none' : ''
        self.getEl().getBoundingClientRect()
      }

      parentCtrl = self.parent()

      if (parentCtrl) {
        parentCtrl._lastRect = null
      }

      self.fire(state ? 'show' : 'hide')

      ReflowQueue.add(self)
    })

    self.fire('postrender', {}, false)
  },
  bindStates: function () {},
  scrollIntoView: function (align) {
    function getOffset (elm, rootElm) {
      let x, y
      let parent = elm

      x = y = 0

      while (parent && parent !== rootElm && parent.nodeType) {
        x += parent.offsetLeft || 0
        y += parent.offsetTop || 0

        parent = parent.offsetParent
      }

      return { x, y }
    }

    let x, y, width, height, parentWidth, parentHeight
    let elm = this.getEl()
    let parentElm = elm.parentNode
    let pos = getOffset(elm, parentElm)

    x = pos.x
    y = pos.y
    width = elm.offsetWidth
    height = elm.offsetHeight
    parentWidth = parentElm.clientWidth
    parentHeight = parentElm.clientHeight

    if (align === 'end') {
      x -= parentWidth - width
      y -= parentHeight - height
    } else if (align === 'center') {
      x -= parentWidth / 2 - width / 2
      y -= parentHeight / 2 - height / 2
    }

    parentElm.scrollLeft = x
    parentElm.scrollTop = y

    return this
  },
  getRoot: function () {
    let rootControl
    let ctrl = this
    let parents = []

    while (ctrl) {
      if (ctrl.rootControl) {
        rootControl = ctrl.rootControl
        break
      }

      parents.push(ctrl)
      rootControl = ctrl
      ctrl = ctrl.parent()
    }

    if (!rootControl) {
      rootControl = this
    }

    let i = parents.length

    while (i--) {
      parents[i].rootControl = rootControl
    }

    return rootControl
  },
  reflow: function () {
    ReflowQueue.remove(this)
    let parent = this.parent()

    if (parent && parent._layout && !parent._layout.isNative()) {
      parent.reflow()
    }

    return this
  }
}

Tools.each('text title visible disabled active value'.split(' '), function (name) {
  proto[name] = function (value) {
    if (arguments.length === 0) {
      return this.state.get(name)
    }

    if (typeof value !== 'undefined') {
      this.state.set(name, value)
    }

    return this
  }
})

Control = Class.extend(proto)

function getEventDispatcher (obj) {
  if (!obj._eventDispatcher) {
    obj._eventDispatcher = new EventDispatcher({
      scope: obj,
      toggleEvent: (name, state) => {
        if (state && EventDispatcher.isNative(name)) {
          if (!obj._nativeEvents) {
            obj._nativeEvents = {}
          }

          obj._nativeEvents[name] = true

          if (obj.state.get('rendered')) {
            bindPendingEvents(obj)
          }
        }
      }
    })
  }

  return obj._eventDispatcher
}

function bindPendingEvents (eventCtrl) {
  let i, l, parents, eventRootCtrl, nativeEvents, name

  function delegate (e) {
    let control = eventCtrl.getParentCtrl(e.target)

    if (control) {
      control.fire(e.type, e)
    }
  }

  function mouseLeaveHandler () {
    let ctrl = eventRootCtrl._lastHoverCtrl

    if (ctrl) {
      ctrl.fire('mouseleave', { target: ctrl.getEl() })

      ctrl.parents().each(ctrl => {
        ctrl.fire('mouseleave', { target: ctrl.getEl() })
      })

      eventRootCtrl._lastHoverCtrl = null
    }
  }

  function mouseEnterHandler (e) {
    let i, parents, lastParents
    let ctrl = eventCtrl.getParentCtrl(e.target)
    let lastCtrl = eventRootCtrl._lastHoverCtrl
    let idx = 0

    if (ctrl !== lastCtrl) {
      eventRootCtrl._lastHoverCtrl = ctrl
      parents = ctrl.parents().toArray().reverse()
      parents.push(ctrl)

      if (lastCtrl) {
        lastParents = lastCtrl.parents().toArray().reverse()
        lastParents.push(lastCtrl)

        for (idx = 0; idx < lastParents.length; idx++) {
          if (parents[idx] !== lastParents[idx]) {
            break
          }
        }

        for (i = lastParents.length - 1; i >= idx; i--) {
          lastCtrl = lastParents[i]
          lastCtrl.fire('mouseleave', { target: lastCtrl.getEl() })
        }
      }

      for (i = idx; i < parents.length; i++) {
        ctrl = parents[i]
        ctrl.fire('mouseenter', { target: ctrl.getEl() })
      }
    }
  }

  function fixWheelEvent (e) {
    e.preventDefault()

    if (e.type === 'mousewheel') {
      e.deltaY = -1 / 40 * e.wheelDelta

      if (e.wheelDeltaX) {
        e.deltaX = -1 / 40 * e.wheelDeltaX
      }
    } else {
      e.deltaX = 0
      e.deltaY = e.detail
    }

    e = eventCtrl.fire('wheel', e)
  }

  nativeEvents = eventCtrl._nativeEvents
  if (nativeEvents) {
    parents = eventCtrl.parents().toArray()

    parents.unshift(eventCtrl)

    for (i = 0, l = parents.length; !eventRootCtrl && i < l; i++) {
      eventRootCtrl = parents[i]._eventsRoot
    }

    if (!eventRootCtrl) {
      eventRootCtrl = parents[parents.length - 1] || eventCtrl
    }

    eventCtrl._eventsRoot = eventRootCtrl

    for (l = i, i = 0; i < l; i++) {
      parents[i]._eventsRoot = eventRootCtrl
    }

    let eventRootDelegates = eventRootCtrl._delegates

    if (!eventRootDelegates) {
      eventRootDelegates = eventRootCtrl._delegates = {}
    }

    for (name in nativeEvents) {
      if (!nativeEvents) {
        return false
      }

      if (name === 'wheel' && !hasWheelEventSupport) {
        if (hasMouseWheelEventSupport) {
          $(eventCtrl.getEl()).on('mousewheel', fixWheelEvent)
        } else {
          $(eventCtrl.getEl()).on('DOMMouseScroll', fixWheelEvent)
        }

        continue
      }

      if (name === 'mouseenter' || name === 'mouseleave') {
        if (!eventRootCtrl._hasMouseEnter) {
          $(eventRootCtrl.getEl())
            .on('mouseleave', mouseLeaveHandler)
            .on('mouseover', mouseEnterHandler)
          eventRootCtrl._hasMouseEnter = 1
        }
      } else if (!eventRootDelegates[name]) {
        $(eventRootCtrl.getEl()).on(name, delegate)

        eventRootDelegates[name] = true
      }

      nativeEvents[name] = false
    }
  }
}

export { Control }
