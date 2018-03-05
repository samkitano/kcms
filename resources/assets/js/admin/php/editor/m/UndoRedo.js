'use strict'

let toggleUndoRedoState = function (editor, type) {
  return function () {
    let self = this

    let checkState = () => {
      let typeFn = type === 'redo'
        ? 'hasRedo'
        : 'hasUndo'

      return editor.undoManager
        ? editor.undoManager[typeFn]()
        : false
    }

    self.disabled(!checkState())

    editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', () => {
      self.disabled(editor.readonly || !checkState())
    })
  }
}

let registerMenuItems = editor => {
  editor.addMenuItem('undo', {
    text: 'Undo',
    icon: 'undo',
    shortcut: 'Meta+Z',
    onPostRender: toggleUndoRedoState(editor, 'undo'),
    cmd: 'undo'
  })

  editor.addMenuItem('redo', {
    text: 'Redo',
    icon: 'redo',
    shortcut: 'Meta+Y',
    onPostRender: toggleUndoRedoState(editor, 'redo'),
    cmd: 'redo'
  })
}

let registerButtons = editor => {
  editor.addButton('undo', {
    tooltip: 'Undo',
    onPostRender: toggleUndoRedoState(editor, 'undo'),
    cmd: 'undo'
  })

  editor.addButton('redo', {
    tooltip: 'Redo',
    onPostRender: toggleUndoRedoState(editor, 'redo'),
    cmd: 'redo'
  })
}

let register = editor => {
  registerMenuItems(editor)
  registerButtons(editor)
}

let UndoRedo = { register }

export { UndoRedo }
