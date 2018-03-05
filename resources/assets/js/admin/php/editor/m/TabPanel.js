'use strict'

import { funcs } from './funcs'
import { Panel } from './Panel'
import { $ } from './$'

let TabPanel = Panel.extend({
  Defaults: {
    layout: 'absolute',
    defaults: { type: 'panel' }
  },
  activateTab: function (idx) {
    let activeTabElm

    if (this.activeTabId) {
      activeTabElm = this.getEl(this.activeTabId)
      $(activeTabElm).removeClass(`${this.classPrefix}active`)
      activeTabElm.setAttribute('aria-selected', 'false')
    }

    this.activeTabId = `t${idx}`

    activeTabElm = this.getEl(`t${idx}`)
    activeTabElm.setAttribute('aria-selected', 'true')
    $(activeTabElm).addClass(`${this.classPrefix}active`)

    this.items()[idx].show().fire('showtab')
    this.reflow()

    this.items().each(function (item, i) {
      if (idx !== i) {
        item.hide()
      }
    })
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let tabsHtml = ''
    let prefix = self.classPrefix

    self.preRender()
    layout.preRender(self)

    self.items().each(function (ctrl, i) {
      let id = `${self._id}-t${i}`

      ctrl.aria('role', 'tabpanel')
      ctrl.aria('labelledby', id)
      tabsHtml += `<div id="${id}" class="${prefix}tab" unselectable="on" role="tab" 
aria-controls="${ctrl._id}" aria-selected="false" tabIndex="-1">
${self.encode(ctrl.settings.title)}</div>`
    })

    return '<div id="' + self._id + '" class="' +
      self.classes + '" hidefocus="1" tabindex="-1">' +
      '<div id="' + self._id + '-head" class="' + prefix +
      'tabs" role="tablist">' + tabsHtml + '</div>' + '<div id="' +
      self._id + '-body" class="' + self.bodyClasses + '">' +
      layout.renderHtml(self) + '</div>' + '</div>'
  },
  postRender: function () {
    let self = this

    self._super()
    self.settings.activeTab = self.settings.activeTab || 0
    self.activateTab(self.settings.activeTab)

    this.on('click', function (e) {
      let targetParent = e.target.parentNode

      if (targetParent && targetParent.id === `${self._id}-head`) {
        let i = targetParent.childNodes.length

        while (i--) {
          if (targetParent.childNodes[i] === e.target) {
            self.activateTab(i)
          }
        }
      }
    })
  },
  initLayoutRect: function () {
    let rect, minW, minH
    let self = this

    minW = funcs.getSize(self.getEl('head')).width
    minW = minW < 0 ? 0 : minW
    minH = 0

    self.items().each(function (item) {
      minW = Math.max(minW, item.layoutRect().minW)
      minH = Math.max(minH, item.layoutRect().minH)
    })

    self.items().each(function (ctrl) {
      ctrl.settings.x = 0
      ctrl.settings.y = 0
      ctrl.settings.w = minW
      ctrl.settings.h = minH
      ctrl.layoutRect({
        x: 0,
        y: 0,
        w: minW,
        h: minH
      })
    })

    let headH = funcs.getSize(self.getEl('head')).height

    self.settings.minWidth = minW
    self.settings.minHeight = minH + headH
    rect = self._super()
    rect.deltaH += headH
    rect.innerH = rect.h - rect.deltaH

    return rect
  }
})

export { TabPanel }
