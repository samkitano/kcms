'use strict'

let focus = (panel, type) => function () {
  let item = panel.find(type)[0]
  if (item) {
    item.focus(true)
  }
}

let addKeys = (editor, panel) => {
  editor.shortcuts.add('Alt+F9', '', focus(panel, 'menubar'))
  editor.shortcuts.add('Alt+F10,F10', '', focus(panel, 'toolbar'))
  editor.shortcuts.add('Alt+F11', '', focus(panel, 'elementpath'))

  panel.on('cancel', function () {
    editor.focus()
  })
}

let KeyMan = { addKeys }

export { KeyMan }
