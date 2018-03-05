'use strict'

import { Env } from './Env'
import { Tools } from './Tools'
import { Factory } from './Factory'
import { FireThemeItems } from './FireThemeItems'

let api = elm => ({
  element: () => elm
})

let trigger = (sidebar, panel, callbackName) => {
  let callback = sidebar.settings[callbackName]

  if (callback) {
    callback(api(panel.getEl('body')))
  }
}

let hidePanels = (name, container, sidebars) => {
  Tools.each(sidebars, sidebar => {
    let panel = container.items().filter(`#${sidebar.name}`)[0]

    if (panel && panel.visible() && sidebar.name !== name) {
      trigger(sidebar, panel, 'onhide')

      panel.visible(false)
    }
  })
}

let deactivateButtons = toolbar => {
  toolbar.items().each(ctrl => {
    ctrl.active(false)
  })
}

let findSidebar = (sidebars, name) => Tools.grep(sidebars, sidebar => sidebar.name === name)[0]

let showPanel = (editor, name, sidebars) => e => {
  let btnCtrl = e.control
  let container = btnCtrl.parents().filter('panel')[0]
  let panel = container.find('#' + name)[0]
  let sidebar = findSidebar(sidebars, name)

  hidePanels(name, container, sidebars)
  deactivateButtons(btnCtrl.parent())

  if (panel && panel.visible()) {
    trigger(sidebar, panel, 'onhide')

    panel.hide()
    btnCtrl.active(false)
  } else {
    if (panel) {
      panel.show()

      trigger(sidebar, panel, 'onshow')
    } else {
      panel = Factory.create({
        type: 'container',
        name,
        layout: 'stack',
        classes: 'sidebar-panel',
        html: ''
      })

      container.prepend(panel)

      trigger(sidebar, panel, 'onrender')
      trigger(sidebar, panel, 'onshow')
    }

    btnCtrl.active(true)
  }

  FireThemeItems.fireResizeEditor(editor)
}

let isModernBrowser = () => !Env.ie || Env.ie >= 11

let hasSidebar = editor => isModernBrowser() && editor.sidebars
  ? editor.sidebars.length > 0
  : false

let createSidebar = editor => {
  let buttons = Tools.map(editor.sidebars, sidebar => {
    let settings = sidebar.settings

    return {
      type: 'button',
      icon: settings.icon,
      image: settings.image,
      tooltip: settings.tooltip,
      onclick: showPanel(editor, sidebar.name, editor.sidebars)
    }
  })

  return {
    type: 'panel',
    name: 'sidebar',
    layout: 'stack',
    classes: 'sidebar',
    items: [{
      type: 'toolbar',
      layout: 'stack',
      classes: 'sidebar-toolbar',
      items: buttons
    }]
  }
}

let Sidebar = { hasSidebar, createSidebar }

export { Sidebar }
