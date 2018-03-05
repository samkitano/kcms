'use strict'

let toggleFormat = (editor, fmt) => () => {
  editor.execCommand('mceToggleFormat', false, fmt)
}

let postRenderFormat = function (editor, name) {
  return function () {
    let self = this

    if (editor.formatter) {
      editor.formatter.formatChanged(name, function (state) {
        self.active(state)
      })
    } else {
      editor.on('init', function () {
        editor.formatter.formatChanged(name, function (state) {
          self.active(state)
        })
      })
    }
  }
}

let Format = {
  toggleFormat,
  postRenderFormat
}

export { Format }
