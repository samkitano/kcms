'use strict'

import { Tools } from './Tools'
import { getMenubar } from './getMenubar'
import { ObjectTools } from './ObjectTools'

let getMenu = editor => editor.getParam('menu')
let getRemovedMenuItems = editor => editor.getParam('removed_menuitems', '')
let isSeparator = namedMenuItem => namedMenuItem && namedMenuItem.item.text === '|'

let defaultMenus = {
  file: {
    title: 'File',
    items: 'newdocument restoredraft | preview | print'
  },
  edit: {
    title: 'Edit',
    items: 'undo redo | cut copy paste pastetext | selectall'
  },
  view: {
    title: 'View',
    items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'
  },
  insert: {
    title: 'Insert',
    items: 'image link media template codesample inserttable | charmap hr | pagebreak nonbreaking anchor toc | insertdatetime'
  },
  format: {
    title: 'Format',
    items: 'bold italic underline strikethrough superscript subscript codeformat | blockformats align | removeformat'
  },
  tools: {
    title: 'Tools',
    items: 'spellchecker spellcheckerlanguage | a11ycheck'
  },
  table: { title: 'Table' }/*,
  help: { title: 'Help' } */
}

let delimiterMenuNamePair = () => ({
  name: '|',
  item: {text: '|'}
})

let createMenuNameItemPair = (name, item) => {
  let menuItem = item ? {
    name,
    item
  } : null

  return name === '|'
    ? delimiterMenuNamePair()
    : menuItem
}

let hasItemName = (namedMenuItems, name) =>
  ObjectTools.findIndex(namedMenuItems, namedMenuItem =>
    namedMenuItem.name === name).isSome()

let cleanupMenu = (namedMenuItems, removedMenuItems) => {
  let menuItemsPass1 = ObjectTools.filter(namedMenuItems, namedMenuItem =>
    removedMenuItems.hasOwnProperty(namedMenuItem.name) === false)

  let menuItemsPass2 = ObjectTools.filter(
    menuItemsPass1,
    (namedMenuItem, i, namedMenuItems) =>
      !isSeparator(namedMenuItem) || !isSeparator(namedMenuItems[i - 1]))

  return ObjectTools.filter(menuItemsPass2, (namedMenuItem, i, namedMenuItems) =>
    !isSeparator(namedMenuItem) || (i > 0 && i < namedMenuItems.length - 1))
}

let createMenu = (editorMenuItems, menus, removedMenuItems, context) => {
  let menuButton, menu, namedMenuItems, isUserDefined

  if (menus) {
    menu = menus[context]
    isUserDefined = true
  } else {
    menu = defaultMenus[context]
  }

  if (menu) {
    menuButton = { text: menu.title }
    namedMenuItems = []

    Tools.each((menu.items || '').split(/[ ,]/), name => {
      let namedMenuItem = createMenuNameItemPair(name, editorMenuItems[name])

      if (namedMenuItem) {
        namedMenuItems.push(namedMenuItem)
      }
    })

    if (!isUserDefined) {
      Tools.each(editorMenuItems, (item, name) => {
        if (item.context === context && !hasItemName(namedMenuItems, name)) {
          if (item.separator === 'before') {
            namedMenuItems.push(delimiterMenuNamePair())
          }

          if (item.prependToContext) {
            namedMenuItems.unshift(createMenuNameItemPair(name, item))
          } else {
            namedMenuItems.push(createMenuNameItemPair(name, item))
          }

          if (item.separator === 'after') {
            namedMenuItems.push(delimiterMenuNamePair())
          }
        }
      })
    }

    menuButton.menu = ObjectTools.map(
      cleanupMenu(namedMenuItems, removedMenuItems),
      menuItem => menuItem.item
    )

    if (!menuButton.menu.length) {
      return null
    }
  }
  return menuButton
}

let getDefaultMenubar = editor => {
  let name
  let defaultMenuBar = []
  let menu = getMenu(editor)

  if (menu) {
    for (name in menu) {
      defaultMenuBar.push(name)
    }
  } else {
    for (name in defaultMenus) {
      defaultMenuBar.push(name)
    }
  }

  return defaultMenuBar
}

let createMenuButtons = editor => {
  let menuButtons = []
  let defaultMenuBar = getDefaultMenubar(editor)
  let removedMenuItems = Tools.makeMap(getRemovedMenuItems(editor).split(/[ ,]/))
  let menubar = getMenubar(editor)
  let enabledMenuNames = typeof menubar === 'string'
    ? menubar.split(/[ ,]/)
    : defaultMenuBar

  for (let i = 0; i < enabledMenuNames.length; i++) {
    let menuItems = enabledMenuNames[i]
    let menu = createMenu(editor.menuItems, getMenu(editor), removedMenuItems, menuItems)

    if (menu) {
      menuButtons.push(menu)
    }
  }

  return menuButtons
}

let MenuBarButtons = { createMenuButtons }

export { MenuBarButtons }
