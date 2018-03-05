'use strict'

import { $ } from './$'
import { Box } from './Box'
import { Env } from './Env'
import { Panel } from './Panel'
import { Delay } from './Delay'
import { funcs } from './funcs'
import { DragHelper } from './DragHelper'
import { FloatPanel } from './FloatPanel'

let windows = []
let oldMetaValue = ''

function toggleFullScreenState (state) {
  let contentValue
  let noScaleMetaValue = 'width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0'
  let viewport = $('meta[name=viewport]')[0]

  if (Env.overrideViewPort === false) {
    return
  }

  if (!viewport) {
    viewport = document.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    document.getElementsByTagName('head')[0].appendChild(viewport)
  }

  contentValue = viewport.getAttribute('content')

  if (contentValue && typeof oldMetaValue !== 'undefined') {
    oldMetaValue = contentValue
  }

  viewport.setAttribute('content', state ? noScaleMetaValue : oldMetaValue)
}

function toggleBodyFullScreenClasses (classPrefix, state) {
  if (checkFullscreenWindows() && state === false) {
    $([
      document.documentElement,
      document.body
    ]).removeClass(`${classPrefix}fullscreen`)
  }
}

function checkFullscreenWindows () {
  for (let i = 0; i < windows.length; i++) {
    if (windows[i]._fullscreen) {
      return true
    }
  }

  return false
}

function handleWindowResize () {
  if (!Env.desktop) {
    let lastSize = {
      w: window.innerWidth,
      h: window.innerHeight
    }

    Delay.setInterval(function () {
      let w = window.innerWidth
      let h = window.innerHeight

      if (lastSize.w !== w || lastSize.h !== h) {
        lastSize = { w, h }

        $(window).trigger('resize')
      }
    }, 100)
  }

  function reposition () {
    let i, layoutRect
    let rect = funcs.getWindowSize()

    for (i = 0; i < windows.length; i++) {
      layoutRect = windows[i].layoutRect()

      windows[i].moveTo(
        windows[i].settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2),
        windows[i].settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2)
      )
    }
  }

  $(window).on('resize', reposition)
}

let Window = FloatPanel.extend({
  modal: true,
  Defaults: {
    border: 1,
    layout: 'flex',
    containerCls: 'panel',
    role: 'dialog',
    callbacks: {
      submit: function () {
        this.fire('submit', { data: this.toJSON() })
      },
      close: function () {
        this.close()
      }
    }
  },
  init: function (settings) {
    let self = this

    self._super(settings)

    if (self.isRtl()) {
      self.classes.add('rtl')
    }

    self.classes.add('window')
    self.bodyClasses.add('window-body')
    self.state.set('fixed', true)

    if (settings.buttons) {
      self.statusbar = new Panel({
        layout: 'flex',
        border: '1 0 0 0',
        spacing: 3,
        padding: 10,
        align: 'center',
        pack: self.isRtl() ? 'start' : 'end',
        defaults: { type: 'button' },
        items: settings.buttons
      })

      self.statusbar.classes.add('foot')
      self.statusbar.parent(self)
    }

    self.on('click', function (e) {
      let closeClass = `${self.classPrefix}close`

      if (funcs.hasClass(e.target, closeClass) || funcs.hasClass(e.target.parentNode, closeClass)) {
        self.close()
      }
    })

    self.on('cancel', function () {
      self.close()
    })

    self.aria('describedby', self.describedBy || `${self._id}-none`)
    self.aria('label', settings.title)
    self._fullscreen = false
  },
  recalc: function () {
    let layoutRect, width, x, needsRecalc
    let self = this
    let statusbar = self.statusbar

    if (self._fullscreen) {
      self.layoutRect(funcs.getWindowSize())
      self.layoutRect().contentH = self.layoutRect().innerH
    }

    self._super()
    layoutRect = self.layoutRect()

    if (self.settings.title && !self._fullscreen) {
      width = layoutRect.headerW

      if (width > layoutRect.w) {
        x = layoutRect.x - Math.max(0, width / 2)

        self.layoutRect({
          w: width,
          x
        })

        needsRecalc = true
      }
    }

    if (statusbar) {
      statusbar.layoutRect({ w: self.layoutRect().innerW }).recalc()
      width = statusbar.layoutRect().minW + layoutRect.deltaW

      if (width > layoutRect.w) {
        x = layoutRect.x - Math.max(0, width - layoutRect.w)

        self.layoutRect({
          w: width,
          x
        })

        needsRecalc = true
      }
    }

    if (needsRecalc) {
      self.recalc()
    }
  },
  initLayoutRect: function () {
    let headEl
    let self = this
    let layoutRect = self._super()
    let deltaH = 0

    if (self.settings.title && !self._fullscreen) {
      headEl = self.getEl('head')

      let size = funcs.getSize(headEl)

      layoutRect.headerW = size.width
      layoutRect.headerH = size.height
      deltaH += layoutRect.headerH
    }

    if (self.statusbar) {
      deltaH += self.statusbar.layoutRect().h
    }

    layoutRect.deltaH += deltaH
    layoutRect.minH += deltaH
    layoutRect.h += deltaH

    let rect = funcs.getWindowSize()

    layoutRect.x = self.settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2)
    layoutRect.y = self.settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2)

    return layoutRect
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let id = self._id
    let prefix = self.classPrefix
    let settings = self.settings
    let headerHtml = ''
    let footerHtml = ''
    let html = settings.html

    self.preRender()
    layout.preRender(self)

    if (settings.title) {
      headerHtml = `<div id="${id}-head" class="${prefix}window-head"><div id="${id}-title" class="${prefix}title">${self.encode(settings.title)}</div><div id="${id}-dragh" class="${prefix}dragh"></div><button type="button" class="${prefix}close" aria-hidden="true"><i class="mce-ico mce-i-remove"></i></button></div>`
    }

    if (settings.url) {
      html = `<iframe src="${settings.url}" tabindex="-1"></iframe>`
    }

    if (typeof html === 'undefined') {
      html = layout.renderHtml(self)
    }

    if (self.statusbar) {
      footerHtml = self.statusbar.renderHtml()
    }

    return `<div id="${id}" class="${self.classes}" hidefocus="1"><div class="${self.classPrefix}reset" role="application">${headerHtml}<div id="${id}-body" class="${self.bodyClasses}">${html}</div>${footerHtml}</div></div>`
  },
  fullscreen: function (state) {
    let layoutRect, slowRendering
    let self = this
    let documentElement = document.documentElement
    let prefix = self.classPrefix

    if (state !== self._fullscreen) {
      $(window).on('resize', function () {
        let time

        if (self._fullscreen) {
          if (!slowRendering) {
            time = new Date().getTime()

            let rect = funcs.getWindowSize()

            self.moveTo(0, 0).resizeTo(rect.w, rect.h)

            if (new Date().getTime() - time > 50) {
              slowRendering = true
            }
          } else {
            if (!self._timer) {
              self._timer = Delay.setTimeout(function () {
                let rect = funcs.getWindowSize()

                self.moveTo(0, 0).resizeTo(rect.w, rect.h)
                self._timer = 0
              }, 50)
            }
          }
        }
      })

      layoutRect = self.layoutRect()
      self._fullscreen = state

      if (!state) {
        self.borderBox = Box.parseBox(self.settings.border)
        self.getEl('head').style.display = ''
        layoutRect.deltaH += layoutRect.headerH

        $([
          documentElement,
          document.body
        ]).removeClass(`${prefix}fullscreen`)

        self.classes.remove('fullscreen')
        self.moveTo(self._initial.x, self._initial.y).resizeTo(self._initial.w, self._initial.h)
      } else {
        self._initial = {
          x: layoutRect.x,
          y: layoutRect.y,
          w: layoutRect.w,
          h: layoutRect.h
        }

        self.borderBox = Box.parseBox('0')
        self.getEl('head').style.display = 'none'

        layoutRect.deltaH -= layoutRect.headerH + 2

        $([
          documentElement,
          document.body
        ]).addClass(`${prefix}fullscreen`)

        self.classes.add('fullscreen')

        let rect = funcs.getWindowSize()

        self.moveTo(0, 0).resizeTo(rect.w, rect.h)
      }
    }

    return self.reflow()
  },
  postRender: function () {
    let startPos
    let self = this

    setTimeout(function () {
      self.classes.add('in')
      self.fire('open')
    }, 0)

    self._super()

    if (self.statusbar) {
      self.statusbar.postRender()
    }

    self.focus()

    this.dragHelper = new DragHelper(`${self._id}-dragh`, {
      start: function () {
        startPos = {
          x: self.layoutRect().x,
          y: self.layoutRect().y
        }
      },
      drag: function (e) {
        self.moveTo(startPos.x + e.deltaX, startPos.y + e.deltaY)
      }
    })

    self.on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        self.close()
      }
    })

    windows.push(self)

    toggleFullScreenState(true)
  },
  submit: function () {
    return this.fire('submit', { data: this.toJSON() })
  },
  remove: function () {
    let i
    let self = this

    self.dragHelper.destroy()
    self._super()

    if (self.statusbar) {
      this.statusbar.remove()
    }

    toggleBodyFullScreenClasses(self.classPrefix, false)
    i = windows.length

    while (i--) {
      if (windows[i] === self) {
        windows.splice(i, 1)
      }
    }
    toggleFullScreenState(windows.length > 0)
  },
  getContentWindow: function () {
    let ifr = this.getEl().getElementsByTagName('iframe')[0]

    return ifr
      ? ifr.contentWindow
      : null
  }
})

export { Window, handleWindowResize }
