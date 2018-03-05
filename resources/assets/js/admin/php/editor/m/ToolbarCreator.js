'use strict'

import { Tools } from './Tools'
import { Factory } from './Factory'

let getToolbars = editor => {
  let toolbar = editor.getParam('toolbar')
  let defaultToolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'

  if (toolbar === false) {
    return []
  } else if (Tools.isArray(toolbar)) {
    return Tools.grep(toolbar, toolbar => toolbar.length > 0)
  } else {
    return getIndexedToolbars(editor.settings, defaultToolbar)
  }
}

let getIndexedToolbars = (settings, defaultToolbar) => {
  let toolbars = []

  for (let i = 1; i < 10; i++) {
    let tb = settings[`toolbar${i}`]

    if (!tb) {
      break
    }

    toolbars.push(tb)
  }

  let mainToolbar = settings.toolbar
    ? [settings.toolbar]
    : [defaultToolbar]

  return toolbars.length > 0
    ? toolbars
    : mainToolbar
}

let createToolbar = (editor, items, size) => {
  let toolbarItems = []
  let buttonGroup

  if (!items) {
    return
  }

  Tools.each(items.split(/[ ,]/), item => {
    let itemName
    let bindSelectorChanged = () => {
      let selection = editor.selection

      if (item.settings.stateSelector) {
        selection.selectorChanged(item.settings.stateSelector, state => {
          item.active(state)
        }, true)
      }

      if (item.settings.disabledStateSelector) {
        selection.selectorChanged(item.settings.disabledStateSelector, state => {
          item.disabled(state)
        })
      }
    }

    if (item === '|') {
      buttonGroup = null
    } else {
      if (!buttonGroup) {
        buttonGroup = {
          type: 'buttongroup',
          items: []
        }

        toolbarItems.push(buttonGroup)
      }

      if (editor.buttons[item]) {
        itemName = item
        item = editor.buttons[itemName]

        if (typeof item === 'function') {
          item = item()
        }

        item.type = item.type || 'button'
        item.size = size
        item = Factory.create(item)
        buttonGroup.items.push(item)

        if (editor.initialized) {
          bindSelectorChanged()
        } else {
          editor.on('init', bindSelectorChanged)
        }
      }
    }
  })

  return {
    type: 'toolbar',
    layout: 'flow',
    items: toolbarItems
  }
}

let createToolbars = (editor, size) => {
  let toolbars = []

  let addToolbar = items => {
    if (items) {
      toolbars.push(createToolbar(editor, items, size))
    }
  }

  Tools.each(getToolbars(editor), toolbar => {
    addToolbar(toolbar)
  })

  if (toolbars.length) {
    return {
      type: 'panel',
      layout: 'stack',
      classes: 'toolbar-grp',
      ariaRoot: true,
      ariaRemember: true,
      items: toolbars
    }
  }
}

let ToolbarCreator = { createToolbar, createToolbars }

export { ToolbarCreator }
