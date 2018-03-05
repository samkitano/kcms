'use strict'

let toggleVisualAidState = function (editor) {
  return function () {
    let self = this

    editor.on('VisualAid', e => {
      self.active(e.hasVisual)
    })

    self.active(editor.hasVisual)
  }
}

let registerMenuItems = editor => {
  editor.addMenuItem('visualaid', {
    text: 'Visual aids',
    selectable: true,
    onPostRender: toggleVisualAidState(editor),
    cmd: 'mceToggleVisualAid'
  })
}

let register = editor => {
  registerMenuItems(editor)
}

let VisualAids = { register }

export { VisualAids }
