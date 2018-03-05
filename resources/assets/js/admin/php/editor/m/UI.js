'use strict'

import { Env } from './Env'
import { KeyMan } from './KeyMan'
import { Factory } from './Factory'
import { DOMUtils } from './DOMUtils'
import { FloatPanel } from './FloatPanel'
import { SkinLoaded } from './SkinLoaded'
import { hasMenubar } from './hasMenubar'
import { getToolbarSize } from './getToolbarSize'
import { FireThemeItems } from './FireThemeItems'
import { isSkinDisabled } from './isSkinDisabled'
import { ToolbarCreator } from './ToolbarCreator'
import { MenuBarButtons } from './MenuBarButtons'
import { ContextualToolbars } from './ContextualToolbars'

let getFixedToolbarContainer = editor => editor.getParam('fixed_toolbar_container')
let isFixed = inlineToolbarContainer => !!(inlineToolbarContainer && !Env.container)

let render = (editor, theme, args) => {
  let panel, inlineToolbarContainer
  let DOM = DOMUtils.DOM
  let fixedToolbarContainer = getFixedToolbarContainer(editor)

  if (fixedToolbarContainer) {
    inlineToolbarContainer = DOM.select(fixedToolbarContainer)[0]
  }

  let reposition = () => {
    if (panel && panel.moveRel && panel.visible() && !panel._fixed) {
      let scrollContainer = editor.selection.getScrollContainer()
      let body = editor.getBody()
      let deltaX = 0
      let deltaY = 0

      if (scrollContainer) {
        let bodyPos = DOM.getPos(body)
        let scrollContainerPos = DOM.getPos(scrollContainer)

        deltaX = Math.max(0, scrollContainerPos.x - bodyPos.x)
        deltaY = Math.max(0, scrollContainerPos.y - bodyPos.y)
      }

      panel.fixed(false).moveRel(body, editor.rtl ? [
        'tr-br',
        'br-tr'
      ] : [
        'tl-bl',
        'bl-tl',
        'tr-br'
      ]).moveBy(deltaX, deltaY)
    }
  }

  let show = () => {
    if (panel) {
      panel.show()
      reposition()
      DOM.addClass(editor.getBody(), 'mce-edit-focus')
    }
  }

  let hide = () => {
    if (panel) {
      panel.hide()
      FloatPanel.hideAll()
      DOM.removeClass(editor.getBody(), 'mce-edit-focus')
    }
  }

  let render = () => {
    if (panel) {
      if (!panel.visible()) {
        show()
      }

      return
    }

    panel = theme.panel = Factory.create({
      type: inlineToolbarContainer ? 'panel' : 'floatpanel',
      role: 'application',
      classes: 'tinymce tinymce-inline',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      autohide: false,
      autofix: isFixed(inlineToolbarContainer),
      fixed: isFixed(inlineToolbarContainer),
      border: 1,
      items: [
        hasMenubar(editor) === false ? null : {
          type: 'menubar',
          border: '0 0 1 0',
          items: MenuBarButtons.createMenuButtons(editor)
        },
        ToolbarCreator.createToolbars(editor, getToolbarSize(editor))
      ]
    })

    FireThemeItems.fireBeforeRenderUI(editor)

    if (inlineToolbarContainer) {
      panel.renderTo(inlineToolbarContainer).reflow()
    } else {
      panel.renderTo().reflow()
    }

    KeyMan.addKeys(editor, panel)

    show()

    ContextualToolbars.addContextualToolbars(editor)
    editor.on('nodeChange', reposition)
    editor.on('ResizeWindow', reposition)
    editor.on('activate', show)
    editor.on('deactivate', hide)
    editor.nodeChanged()
  }

  editor.settings.content_editable = true
  editor.on('focus', () => {
    if (isSkinDisabled(editor) === false && args.skinUiCss) {
      DOM.styleSheetLoader.load(args.skinUiCss, render, render)
    } else {
      render()
    }
  })

  editor.on('blur hide', hide)
  editor.on('remove', () => {
    if (panel) {
      panel.remove()
      panel = null
    }
  })

  if (isSkinDisabled(editor) === false && args.skinUiCss) {
    DOM.styleSheetLoader.load(args.skinUiCss, SkinLoaded.fireSkinLoaded(editor))
  } else {
    SkinLoaded.fireSkinLoaded(editor)()
  }

  return {}
}

let UI = { render }

export { UI }
