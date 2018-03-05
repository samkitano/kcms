'use strict'

import { Widget } from './Widget'
import { DragHelper } from './DragHelper'

let ResizeHandle = Widget.extend({
  renderHtml: function () {
    let self = this
    let prefix = self.classPrefix

    self.classes.add('resizehandle')

    if (self.settings.direction === 'both') {
      self.classes.add('resizehandle-both')
    }

    self.canFocus = false

    return `<div id="${self._id}" class="${self.classes}"><i 
class="${prefix}ico ${prefix}i-resize"></i></div>`
  },
  postRender: function () {
    let self = this

    self._super()

    self.resizeDragHelper = new DragHelper(this._id, {
      start: function () {
        self.fire('ResizeStart')
      },
      drag: function (e) {
        if (self.settings.direction !== 'both') {
          e.deltaX = 0
        }

        self.fire('Resize', e)
      },
      stop: function () {
        self.fire('ResizeEnd')
      }
    })
  },
  remove: function () {
    if (this.resizeDragHelper) {
      this.resizeDragHelper.destroy()
    }

    return this._super()
  }
})

export { ResizeHandle }
