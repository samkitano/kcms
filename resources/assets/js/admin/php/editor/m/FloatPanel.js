'use strict'

import { $ } from './$'
import { Panel } from './Panel'
import { Delay } from './Delay'
import { funcs } from './funcs'
import { Movable } from './Movable'
import { Resizable } from './Resizable'

let hasModal
let zOrder = []
let visiblePanels = []
let windowResizeHandler
let documentClickHandler
let documentScrollHandler

function isChildOf (ctrl, parent) {
  while (ctrl) {
    if (ctrl === parent) {
      return true
    }

    ctrl = ctrl.parent()
  }
}

function skipOrHidePanels (e) {
  let i = visiblePanels.length

  while (i--) {
    let panel = visiblePanels[i]
    let clickCtrl = panel.getParentCtrl(e.target)

    if (panel.settings.autohide) {
      if (clickCtrl) {
        if (isChildOf(clickCtrl, panel) || panel.parent() === clickCtrl) {
          continue
        }
      }

      e = panel.fire('autohide', { target: e.target })

      if (!e.isDefaultPrevented()) {
        panel.hide()
      }
    }
  }
}

function bindDocumentClickHandler () {
  if (!documentClickHandler) {
    documentClickHandler = e => {
      if (e.button === 2) {
        return
      }

      skipOrHidePanels(e)
    }

    $(document).on('click touchstart', documentClickHandler)
  }
}

function bindDocumentScrollHandler () {
  if (!documentScrollHandler) {
    documentScrollHandler = () => {
      let i = visiblePanels.length

      while (i--) {
        repositionPanel(visiblePanels[i])
      }
    }

    $(window).on('scroll', documentScrollHandler)
  }
}

function bindWindowResizeHandler () {
  if (!windowResizeHandler) {
    let docElm = document.documentElement
    let clientWidth = docElm.clientWidth
    let clientHeight = docElm.clientHeight

    windowResizeHandler = function () {
      if (!document.all || clientWidth !== docElm.clientWidth || clientHeight !== docElm.clientHeight) {
        clientWidth = docElm.clientWidth
        clientHeight = docElm.clientHeight

        FloatPanel.hideAll()
      }
    }

    $(window).on('resize', windowResizeHandler)
  }
}

function repositionPanel (panel) {
  let scrollY = funcs.getViewPort().y

  function toggleFixedChildPanels (fixed, deltaY) {
    let parent

    for (let i = 0; i < visiblePanels.length; i++) {
      if (visiblePanels[i] !== panel) {
        parent = visiblePanels[i].parent()

        while (parent && (parent = parent.parent())) {
          if (parent === panel) {
            visiblePanels[i].fixed(fixed).moveBy(0, deltaY).repaint()
          }
        }
      }
    }
  }

  if (panel.settings.autofix) {
    if (!panel.state.get('fixed')) {
      panel._autoFixY = panel.layoutRect().y

      if (panel._autoFixY < scrollY) {
        panel.fixed(true).layoutRect({ y: 0 }).repaint()
        toggleFixedChildPanels(true, scrollY - panel._autoFixY)
      }
    } else {
      if (panel._autoFixY > scrollY) {
        panel.fixed(false).layoutRect({ y: panel._autoFixY }).repaint()
        toggleFixedChildPanels(false, panel._autoFixY - scrollY)
      }
    }
  }
}

function addRemove (add, ctrl) {
  let i, topModal
  let zIndex = FloatPanel.zIndex || 65535

  if (add) {
    zOrder.push(ctrl)
  } else {
    i = zOrder.length

    while (i--) {
      if (zOrder[i] === ctrl) {
        zOrder.splice(i, 1)
      }
    }
  }

  if (zOrder.length) {
    for (i = 0; i < zOrder.length; i++) {
      if (zOrder[i].modal) {
        zIndex++
        topModal = zOrder[i]
      }

      zOrder[i].getEl().style.zIndex = zIndex
      zOrder[i].zIndex = zIndex
      zIndex++
    }
  }

  let modalBlockEl = $(`#${ctrl.classPrefix}modal-block`, ctrl.getContainerElm())[0]

  if (topModal) {
    $(modalBlockEl).css('z-index', topModal.zIndex - 1)
  } else if (modalBlockEl) {
    modalBlockEl.parentNode.removeChild(modalBlockEl)
    hasModal = false
  }

  FloatPanel.currentZIndex = zIndex
}

let FloatPanel = Panel.extend({
  Mixins: [
    Movable,
    Resizable
  ],
  init: function (settings) {
    let self = this

    self._super(settings)
    self._eventsRoot = self
    self.classes.add('floatpanel')

    if (settings.autohide) {
      bindDocumentClickHandler()
      bindWindowResizeHandler()
      visiblePanels.push(self)
    }

    if (settings.autofix) {
      bindDocumentScrollHandler()

      self.on('move', function () {
        repositionPanel(this)
      })
    }

    self.on('postrender show', function (e) {
      if (e.control === self) {
        let modal
        let prefix = self.classPrefix

        if (self.modal && !hasModal) {
          modal = $(`#${prefix}modal-block`, self.getContainerElm())

          if (!modal[0]) {
            modal = $(`<div id="${prefix}modal-block" class="${prefix}reset ${prefix}fade"></div>`)
              .appendTo(self.getContainerElm())
          }

          Delay.setTimeout(() => {
            modal.addClass(`${prefix}in`)
            $(self.getEl()).addClass(`${prefix}in`)
          })

          hasModal = true
        }

        addRemove(true, self)
      }
    })

    self.on('show', function () {
      self.parents().each(function (ctrl) {
        if (ctrl.state.get('fixed')) {
          self.fixed(true)

          return false
        }
      })
    })

    if (settings.popover) {
      self._preBodyHtml = `<div class="${self.classPrefix}arrow"></div>`
      self.classes.add('popover').add('bottom').add(self.isRtl() ? 'end' : 'start')
    }

    self.aria('label', settings.ariaLabel)
    self.aria('labelledby', self._id)
    self.aria('describedby', self.describedBy || self._id + '-none')
  },
  fixed: function (state) {
    let self = this

    if (self.state.get('fixed') !== state) {
      if (self.state.get('rendered')) {
        let viewport = funcs.getViewPort()

        if (state) {
          self.layoutRect().y -= viewport.y
        } else {
          self.layoutRect().y += viewport.y
        }
      }

      self.classes.toggle('fixed', state)
      self.state.set('fixed', state)
    }

    return self
  },
  show: function () {
    let i = visiblePanels.length
    let self = this
    let state = self._super()

    while (i--) {
      if (visiblePanels[i] === self) {
        break
      }
    }

    if (i === -1) {
      visiblePanels.push(self)
    }

    return state
  },
  hide: function () {
    removeVisiblePanel(this)
    addRemove(false, this)

    return this._super()
  },
  hideAll: () => {
    FloatPanel.hideAll()
  },
  close: function () {
    let self = this

    if (!self.fire('close').isDefaultPrevented()) {
      self.remove()
      addRemove(false, self)
    }

    return self
  },
  remove: function () {
    removeVisiblePanel(this)

    this._super()
  },
  postRender: function () {
    let self = this

    if (self.settings.bodyRole) {
      this.getEl('body').setAttribute('role', self.settings.bodyRole)
    }

    return self._super()
  }
})

FloatPanel.hideAll = () => {
  let i = visiblePanels.length

  while (i--) {
    let panel = visiblePanels[i]

    if (panel && panel.settings.autohide) {
      panel.hide()
      visiblePanels.splice(i, 1)
    }
  }
}

function removeVisiblePanel (panel) {
  let i = visiblePanels.length

  while (i--) {
    if (visiblePanels[i] === panel) {
      visiblePanels.splice(i, 1)
    }
  }

  i = zOrder.length

  while (i--) {
    if (zOrder[i] === panel) {
      zOrder.splice(i, 1)
    }
  }
}

export { FloatPanel }
