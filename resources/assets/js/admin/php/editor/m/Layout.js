'use strict'

import { Tools } from './Tools'
import { Class } from './Class'

let Layout = Class.extend({
  Defaults: {
    firstControlClass: 'first',
    lastControlClass: 'last'
  },
  init: function (settings) {
    this.settings = Tools.extend({}, this.Defaults, settings)
  },
  preRender: function (container) {
    container.bodyClasses.add(this.settings.containerClass)
  },
  applyClasses: function (items) {
    let firstClass, lastClass, firstItem, lastItem
    let self = this
    let settings = self.settings

    firstClass = settings.firstControlClass
    lastClass = settings.lastControlClass

    items.each(item => {
      item.classes.remove(firstClass).remove(lastClass).add(settings.controlClass)

      if (item.visible()) {
        if (!firstItem) {
          firstItem = item
        }

        lastItem = item
      }
    })

    if (firstItem) {
      firstItem.classes.add(firstClass)
    }

    if (lastItem) {
      lastItem.classes.add(lastClass)
    }
  },
  renderHtml: function (container) {
    let self = this
    let html = ''

    self.applyClasses(container.items())
    container.items().each(item => {
      html += item.renderHtml()
    })

    return html
  },
  recalc: () => {},
  postRender: () => {},
  isNative: () => false
})

export { Layout }
