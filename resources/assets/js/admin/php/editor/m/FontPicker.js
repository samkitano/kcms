'use strict'

import { Tools } from './Tools'
import { Fonts } from './Fonts'

let getFirstFont = fontFamily => fontFamily ? fontFamily.split(',')[0] : ''

let findMatchingValue = (items, fontFamily) => {
  let value

  Tools.each(items, item => {
    if (item.value.toLowerCase() === fontFamily.toLowerCase()) {
      value = item.value
    }
  })

  Tools.each(items, item => {
    if (!value && getFirstFont(item.value).toLowerCase() === getFirstFont(fontFamily).toLowerCase()) {
      value = item.value
    }
  })

  return value
}

let createFontNameListBoxChangeHandler = function (editor, items) {
  return function () {
    let self = this

    editor.on('init nodeChange', function (e) {
      let fontFamily = Fonts.getFontFamily(editor.getBody(), e.element)
      let match = findMatchingValue(items, fontFamily)

      self.value(match || null)

      if (!match && fontFamily) {
        self.text(getFirstFont(fontFamily))
      }
    })
  }
}

let createFormats = formats => {
  formats = formats.replace(/;$/, '').split(';')

  let i = formats.length

  while (i--) {
    formats[i] = formats[i].split('=')
  }

  return formats
}

let getFontItems = editor => {
  let defaultFontsFormats = `Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;
Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;
Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;
Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;
Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;
Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;
Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats`
  let fonts = createFormats(editor.settings.font_formats || defaultFontsFormats)

  return Tools.map(fonts, font => ({
    text: {raw: font[0]},
    value: font[1],
    textStyle: font[1].indexOf('dings') === -1
      ? 'font-family:' + font[1]
      : ''
  }))
}

let registerButtons = editor => {
  editor.addButton('fontselect', () => {
    let items = getFontItems(editor)

    return {
      type: 'listbox',
      text: 'Font Family',
      tooltip: 'Font Family',
      values: items,
      fixedWidth: true,
      onPostRender: createFontNameListBoxChangeHandler(editor, items),
      onselect: e => {
        if (e.control.settings.value) {
          editor.execCommand('FontName', false, e.control.settings.value)
        }
      }
    }
  })
}

let register = editor => {
  registerButtons(editor)
}

let FontPicker = { register }

export { FontPicker }
