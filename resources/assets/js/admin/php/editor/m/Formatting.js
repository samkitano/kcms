'use strict'

import { Tools } from './Tools'
import { Format } from './Format'

let defaultBlocks = `Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;
Heading 6=h6;Preformatted=pre`

let createFormats$1 = formats => {
  formats = formats.replace(/;$/, '').split(';')
  let i = formats.length

  while (i--) {
    formats[i] = formats[i].split('=')
  }

  return formats
}

let createListBoxChangeHandler = function (editor, items, formatName) {
  return function () {
    let self = this

    editor.on('nodeChange', function (e) {
      let formatter = editor.formatter
      let value = null

      Tools.each(e.parents, function (node) {
        Tools.each(items, function (item) {
          if (formatName) {
            if (formatter.matchNode(node, formatName, { value: item.value })) {
              value = item.value
            }
          } else {
            if (formatter.matchNode(node, item.value)) {
              value = item.value
            }
          }

          if (value) {
            return false
          }
        })

        if (value) {
          return false
        }
      })

      self.value(value)
    })
  }
}

let lazyFormatSelectBoxItems = (editor, blocks) => () => {
  let items = []
  Tools.each(blocks, block => {
    items.push({
      text: block[0],
      value: block[1],
      textStyle: () => editor.formatter.getCssText(block[1])
    })
  })

  return {
    type: 'listbox',
    text: blocks[0][0],
    values: items,
    fixedWidth: true,

    onselect: e => {
      if (e.control) {
        let fmt = e.control.value()

        Format.toggleFormat(editor, fmt)()
      }
    },
    onPostRender: createListBoxChangeHandler(editor, items)
  }
}

let buildMenuItems = (editor, blocks) => Tools.map(blocks, block => ({
  text: block[0],
  onclick: Format.toggleFormat(editor, block[1]),

  textStyle: () => editor.formatter.getCssText(block[1])
}))

let register = editor => {
  let blocks = createFormats$1(editor.settings.block_formats || defaultBlocks)

  editor.addMenuItem('blockformats', {
    text: 'Blocks',
    menu: buildMenuItems(editor, blocks)
  })

  editor.addButton('formatselect', lazyFormatSelectBoxItems(editor, blocks))
}

let Formatting = { register }

export { Formatting }
