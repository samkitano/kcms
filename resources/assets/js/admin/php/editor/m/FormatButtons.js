'use strict'

import { Tools } from './Tools'
import { Format } from './Format'

let registerFormatButtons = editor => {
  Tools.each({
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript'
  }, (text, name) => {
    editor.addButton(name, {
      active: false,
      tooltip: text,
      onPostRender: Format.postRenderFormat(editor, name),
      onclick: Format.toggleFormat(editor, name)
    })
  })
}

let registerCommandButtons = editor => {
  Tools.each({
    outdent: [
      'Decrease indent',
      'Outdent'
    ],
    indent: [
      'Increase indent',
      'Indent'
    ],
    cut: [
      'Cut',
      'Cut'
    ],
    copy: [
      'Copy',
      'Copy'
    ],
    paste: [
      'Paste',
      'Paste'
    ],
    help: [
      'Help',
      'mceHelp'
    ],
    selectall: [
      'Select all',
      'SelectAll'
    ],
    visualaid: [
      'Visual aids',
      'mceToggleVisualAid'
    ],
    newdocument: [
      'New document',
      'mceNewDocument'
    ],
    removeformat: [
      'Clear formatting',
      'RemoveFormat'
    ],
    remove: [
      'Remove',
      'Delete'
    ]
  }, (item, name) => {
    editor.addButton(name, {
      tooltip: item[0],
      cmd: item[1]
    })
  })
}

let registerCommandToggleButtons = editor => {
  Tools.each({
    blockquote: [
      'Blockquote',
      'mceBlockQuote'
    ],
    subscript: [
      'Subscript',
      'Subscript'
    ],
    superscript: [
      'Superscript',
      'Superscript'
    ]
  }, (item, name) => {
    editor.addButton(name, {
      active: false,
      tooltip: item[0],
      cmd: item[1],
      onPostRender: Format.postRenderFormat(editor, name)
    })
  })
}

let registerButtons = editor => {
  registerFormatButtons(editor)
  registerCommandButtons(editor)
  registerCommandToggleButtons(editor)
}

let registerMenuItems = editor => {
  Tools.each({
    bold: [
      'Bold',
      'Bold',
      'Meta+B'
    ],
    italic: [
      'Italic',
      'Italic',
      'Meta+I'
    ],
    underline: [
      'Underline',
      'Underline',
      'Meta+U'
    ],
    strikethrough: [
      'Strikethrough',
      'Strikethrough'
    ],
    subscript: [
      'Subscript',
      'Subscript'
    ],
    superscript: [
      'Superscript',
      'Superscript'
    ],
    removeformat: [
      'Clear formatting',
      'RemoveFormat'
    ],
    newdocument: [
      'New document',
      'mceNewDocument'
    ],
    cut: [
      'Cut',
      'Cut',
      'Meta+X'
    ],
    copy: [
      'Copy',
      'Copy',
      'Meta+C'
    ],
    paste: [
      'Paste',
      'Paste',
      'Meta+V'
    ],
    selectall: [
      'Select all',
      'SelectAll',
      'Meta+A'
    ]
  }, (item, name) => {
    editor.addMenuItem(name, {
      text: item[0],
      icon: name,
      shortcut: item[2],
      cmd: item[1]
    })
  })

  editor.addMenuItem('codeformat', {
    text: 'Code',
    icon: 'code',
    onclick: Format.toggleFormat(editor, 'code')
  })
}

let register = editor => {
  registerButtons(editor)
  registerMenuItems(editor)
}

let FormatButtons = { register }

export { FormatButtons }
