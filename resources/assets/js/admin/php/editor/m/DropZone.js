'use strict'

import { Tools } from './Tools'
import { funcs } from './funcs'
import { Widget } from './Widget'

let DropZone = Widget.extend({
  init: function (settings) {
    let self = this

    settings = Tools.extend({
      height: 100,
      text: 'Drop an image here',
      multiple: false,
      accept: null
    }, settings)

    self._super(settings)
    self.classes.add('dropzone')

    if (settings.multiple) {
      self.classes.add('multiple')
    }
  },
  renderHtml: function () {
    let attrs, elm
    let self = this
    let cfg = self.settings

    attrs = {
      id: self._id,
      hidefocus: '1'
    }

    elm = funcs.create('div', attrs, `<span>${this.translate(cfg.text)}</span>`)

    if (cfg.height) {
      funcs.css(elm, 'height', `${cfg.height}px`)
    }
    if (cfg.width) {
      funcs.css(elm, 'width', `${cfg.width}px`)
    }

    elm.className = self.classes

    return elm.outerHTML
  },
  postRender: function () {
    let self = this

    let toggleDragClass = function (e) {
      e.preventDefault()

      self.classes.toggle('dragenter')
      self.getEl().className = self.classes
    }

    let filter = function (files) {
      let accept = self.settings.accept

      if (typeof accept !== 'string') {
        return files
      }

      let re = new RegExp(`(${accept.split(/\s*,\s*/).join('|')})$`, 'i')

      return Tools.grep(files, function (file) {
        return re.test(file.name)
      })
    }

    self._super()

    self.$el.on('dragover', function (e) {
      e.preventDefault()
    })

    self.$el.on('dragenter', toggleDragClass)
    self.$el.on('dragleave', toggleDragClass)

    self.$el.on('drop', function (e) {
      e.preventDefault()

      if (self.state.get('disabled')) {
        return
      }

      let files = filter(e.dataTransfer.files)

      self.value = function () {
        if (!files.length) {
          return null
        } else if (self.settings.multiple) {
          return files
        } else {
          return files[0]
        }
      }

      if (files.length) {
        self.fire('change', e)
      }
    })
  },
  remove: function () {
    this.$el.off()
    this._super()
  }
})

export { DropZone }
