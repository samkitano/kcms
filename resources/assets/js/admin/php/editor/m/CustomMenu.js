'use strict'

import { Tools } from './Tools'
import { ObjectTools } from './ObjectTools'

let createCustomMenuItems = (editor, names) => {
  let items, nameList

  if (typeof names === 'string') {
    nameList = names.split(' ')
  } else if (Tools.isArray(names)) {
    return ObjectTools.flatten(Tools.map(names, names => createCustomMenuItems(editor, names)))
  }

  items = Tools.grep(nameList, name => name === '|' || name in editor.menuItems)

  return Tools.map(items, name => name === '|' ? { text: '-' } : editor.menuItems[name])
}

let isSeparator = menuItem => menuItem && menuItem.text === '-'

let trimMenuItems = menuItems => {
  let menuItems2 = ObjectTools.filter(menuItems, (menuItem, i, menuItems) =>
    !isSeparator(menuItem) || !isSeparator(menuItems[i - 1]))

  return ObjectTools.filter(menuItems2, (menuItem, i, menuItems) =>
    !isSeparator(menuItem) || (i > 0 && i < menuItems.length - 1))
}

let createContextMenuItems = (editor, context) => {
  let outputMenuItems = [{ text: '-' }]
  let menuItems = Tools.grep(editor.menuItems, menuItem => menuItem.context === context)

  Tools.each(menuItems, menuItem => {
    if (menuItem.separator === 'before') {
      outputMenuItems.push({ text: '|' })
    }

    if (menuItem.prependToContext) {
      outputMenuItems.unshift(menuItem)
    } else {
      outputMenuItems.push(menuItem)
    }

    if (menuItem.separator === 'after') {
      outputMenuItems.push({ text: '|' })
    }
  })

  return outputMenuItems
}

let createInsertMenu = editor => {
  let insertButtonItems = editor.settings.insert_button_items

  if (insertButtonItems) {
    return trimMenuItems(createCustomMenuItems(editor, insertButtonItems))
  } else {
    return trimMenuItems(createContextMenuItems(editor, 'insert'))
  }
}

let registerButtons = function (editor) {
  editor.addButton('insert', {
    type: 'menubutton',
    icon: 'insert',
    menu: [],
    oncreatemenu: function () {
      this.menu.add(createInsertMenu(editor))
      this.menu.renderNew()
    }
  })
}
let register = function (editor) {
  registerButtons(editor)
}

let CustomMenu = { register }

export { CustomMenu }
