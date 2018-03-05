'use strict'

import { Tools } from './Tools'
import { Format } from './Format'

let hideMenuObjects = (editor, menu) => {
  let count = menu.length

  Tools.each(menu, item => {
    if (item.menu) {
      item.hidden = hideMenuObjects(editor, item.menu) === 0
    }

    let formatName = item.format

    if (formatName) {
      item.hidden = !editor.formatter.canApply(formatName)
    }

    if (item.hidden) {
      count--
    }
  })

  return count
}

let hideFormatMenuItems = (editor, menu) => {
  let count = menu.items().length

  menu.items().each(item => {
    if (item.menu) {
      item.visible(hideFormatMenuItems(editor, item.menu) > 0)
    }

    if (!item.menu && item.settings.menu) {
      item.visible(hideMenuObjects(editor, item.settings.menu) > 0)
    }

    let formatName = item.settings.format

    if (formatName) {
      item.visible(editor.formatter.canApply(formatName))
    }

    if (!item.visible()) {
      count--
    }
  })

  return count
}

let createFormatMenu = function (editor) {
  let count = 0
  let newFormats = []
  let defaultStyleFormats = [
    {
      title: 'Headings',
      items: [
        {
          title: 'Heading 1',
          format: 'h1'
        },
        {
          title: 'Heading 2',
          format: 'h2'
        },
        {
          title: 'Heading 3',
          format: 'h3'
        },
        {
          title: 'Heading 4',
          format: 'h4'
        },
        {
          title: 'Heading 5',
          format: 'h5'
        },
        {
          title: 'Heading 6',
          format: 'h6'
        }
      ]
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Bold',
          icon: 'bold',
          format: 'bold'
        },
        {
          title: 'Italic',
          icon: 'italic',
          format: 'italic'
        },
        {
          title: 'Underline',
          icon: 'underline',
          format: 'underline'
        },
        {
          title: 'Strikethrough',
          icon: 'strikethrough',
          format: 'strikethrough'
        },
        {
          title: 'Superscript',
          icon: 'superscript',
          format: 'superscript'
        },
        {
          title: 'Subscript',
          icon: 'subscript',
          format: 'subscript'
        },
        {
          title: 'Code',
          icon: 'code',
          format: 'code'
        }
      ]
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Paragraph',
          format: 'p'
        },
        {
          title: 'Blockquote',
          format: 'blockquote'
        },
        {
          title: 'Div',
          format: 'div'
        },
        {
          title: 'Pre',
          format: 'pre'
        }
      ]
    },
    {
      title: 'Alignment',
      items: [
        {
          title: 'Left',
          icon: 'alignleft',
          format: 'alignleft'
        },
        {
          title: 'Center',
          icon: 'aligncenter',
          format: 'aligncenter'
        },
        {
          title: 'Right',
          icon: 'alignright',
          format: 'alignright'
        },
        {
          title: 'Justify',
          icon: 'alignjustify',
          format: 'alignjustify'
        }
      ]
    }
  ]

  let createMenu = formats => {
    let menu = []

    if (!formats) {
      return
    }

    Tools.each(formats, format => {
      let menuItem = {
        text: format.title,
        icon: format.icon
      }

      if (format.items) {
        menuItem.menu = createMenu(format.items)
      } else {
        let formatName = format.format || `custom${count++}`

        if (!format.format) {
          format.name = formatName
          newFormats.push(format)
        }

        menuItem.format = formatName
        menuItem.cmd = format.cmd
      }

      menu.push(menuItem)
    })

    return menu
  }

  let createStylesMenu = () => {
    let menu

    if (editor.settings.style_formats_merge) {
      if (editor.settings.style_formats) {
        menu = createMenu(defaultStyleFormats.concat(editor.settings.style_formats))
      } else {
        menu = createMenu(defaultStyleFormats)
      }
    } else {
      menu = createMenu(editor.settings.style_formats || defaultStyleFormats)
    }

    return menu
  }

  editor.on('init', () => {
    Tools.each(newFormats, format => {
      editor.formatter.register(format.name, format)
    })
  })

  return {
    type: 'menu',
    items: createStylesMenu(),
    onPostRender: function (e) {
      editor.fire('renderFormatsMenu', { control: e.control })
    },
    itemDefaults: {
      preview: true,
      textStyle: function () {
        if (this.settings.format) {
          return editor.formatter.getCssText(this.settings.format)
        }
      },
      onPostRender: function () {
        let self = this
        self.parent().on('show', function () {
          let formatName, command

          formatName = self.settings.format

          if (formatName) {
            self.disabled(!editor.formatter.canApply(formatName))
            self.active(editor.formatter.match(formatName))
          }

          command = self.settings.cmd

          if (command) {
            self.active(editor.queryCommandState(command))
          }
        })
      },
      onclick: function () {
        if (this.settings.format) {
          Format.toggleFormat(editor, this.settings.format)()
        }

        if (this.settings.cmd) {
          editor.execCommand(this.settings.cmd)
        }
      }
    }
  }
}

let registerMenuItems = (editor, formatMenu) => {
  editor.addMenuItem('formats', {
    text: 'Formats',
    menu: formatMenu
  })
}

let registerButtons = function (editor, formatMenu) {
  editor.addButton('styleselect', {
    type: 'menubutton',
    text: 'Formats',
    menu: formatMenu,
    onShowMenu: function () {
      if (editor.settings.style_formats_autohide) {
        hideFormatMenuItems(editor, this.menu)
      }
    }
  })
}

let register = editor => {
  let formatMenu = createFormatMenu(editor)

  registerMenuItems(editor, formatMenu)
  registerButtons(editor, formatMenu)
}

let FormatMenu = { register }

export { FormatMenu }
