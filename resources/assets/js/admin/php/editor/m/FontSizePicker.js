'use strict'

import { Tools } from './Tools'
import { Fonts } from './Fonts'

let findMatchingValue = (items, pt, px) => {
  let value

  Tools.each(items, item => {
    if (item.value === px) {
      value = px
    } else if (item.value === pt) {
      value = pt
    }
  })

  return value
}

let createFontSizeListBoxChangeHandler = function (editor, items) {
  return function () {
    let self = this

    editor.on('init nodeChange', function (e) {
      let px, pt, precision, match

      px = Fonts.getFontSize(editor.getBody(), e.element)

      if (px) {
        for (precision = 3; !match && precision >= 0; precision--) {
          pt = Fonts.toPt(px, precision)
          match = findMatchingValue(items, pt, px)
        }
      }

      self.value(match || null)

      if (!match) {
        self.text(pt)
      }
    })
  }
}

let getFontSizeItems = editor => {
  let defaultFontsizeFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
  let fontsizeFormats = editor.settings.fontsize_formats || defaultFontsizeFormats

  return Tools.map(fontsizeFormats.split(' '), item => {
    let text = item
    let value = item
    let values = item.split('=')

    if (values.length > 1) {
      text = values[0]
      value = values[1]
    }

    return { text, value }
  })
}

let registerButtons = editor => {
  editor.addButton('fontsizeselect', () => {
    let items = getFontSizeItems(editor)
    return {
      type: 'listbox',
      text: 'Font Sizes',
      tooltip: 'Font Sizes',
      values: items,
      fixedWidth: true,
      onPostRender: createFontSizeListBoxChangeHandler(editor, items),
      onclick: e => {
        if (e.control.settings.value) {
          editor.execCommand('FontSize', false, e.control.settings.value)
        }
      }
    }
  })
}

let register = editor => {
  registerButtons(editor)
}

let FontSizePicker = { register }

export { FontSizePicker }
