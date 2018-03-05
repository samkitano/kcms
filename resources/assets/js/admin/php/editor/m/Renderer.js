'use strict'

import { KeyMan } from './KeyMan'
import { Resizer } from './Resizer'
import { Factory } from './Factory'
import { Sidebar } from './Sidebar'
import { DOMUtils } from './DOMUtils'
import { hasMenubar } from './hasMenubar'
import { SkinLoaded } from './SkinLoaded'
import { FireThemeItems } from './FireThemeItems'
import { ToolbarCreator } from './ToolbarCreator'
import { getToolbarSize } from './getToolbarSize'
import { isSkinDisabled } from './isSkinDisabled'
import { MenuBarButtons } from './MenuBarButtons'
import { ContextualToolbars } from './ContextualToolbars'

let DOM = DOMUtils.DOM

let isReadOnly = editor => editor.getParam('readonly', false, 'boolean')
let hasStatusbar = editor => editor.getParam('statusbar', true, 'boolean')
let switchMode = panel => e => { panel.find('*').disabled(e.mode === 'readonly') }

let editArea = border => ({
  type: 'panel',
  name: 'iframe',
  layout: 'stack',
  classes: 'edit-area',
  border,
  html: ''
})

let editAreaContainer = editor => ({
  type: 'panel',
  layout: 'stack',
  classes: 'edit-aria-container',
  border: '1 0 0 0',
  items: [
    editArea('0'),
    Sidebar.createSidebar(editor)
  ]
})

let getResize = editor => {
  let resize = editor.getParam('resize', 'vertical')

  if (resize === false) {
    return 'none'
  } else if (resize === 'both') {
    return 'both'
  } else {
    return 'vertical'
  }
}

let render = function (editor, theme, args) {
  let panel, resizeHandleCtrl, startSize

  if (isSkinDisabled(editor) === false && args.skinUiCss) {
    DOM.styleSheetLoader.load(args.skinUiCss, SkinLoaded.fireSkinLoaded(editor))
  } else {
    SkinLoaded.fireSkinLoaded(editor)()
  }

  panel = theme.panel = Factory.create({
    type: 'panel',
    role: 'application',
    classes: 'tinymce',
    style: 'visibility: hidden',
    layout: 'stack',
    border: 1,
    items: [
      {
        type: 'container',
        classes: 'top-part',
        items: [
          hasMenubar(editor) === false ? null : {
            type: 'menubar',
            border: '0 0 1 0',
            items: MenuBarButtons.createMenuButtons(editor)
          },
          ToolbarCreator.createToolbars(editor, getToolbarSize(editor))
        ]
      },
      Sidebar.hasSidebar(editor) ? editAreaContainer(editor) : editArea('1 0 0 0')
    ]
  })
  if (getResize(editor) !== 'none') {
    resizeHandleCtrl = {
      type: 'resizehandle',
      direction: getResize(editor),
      onResizeStart: () => {
        let elm = editor.getContentAreaContainer().firstChild

        startSize = {
          width: elm.clientWidth,
          height: elm.clientHeight
        }
      },
      onResize: e => {
        if (getResize(editor) === 'both') {
          Resizer.resizeTo(editor, startSize.width + e.deltaX, startSize.height + e.deltaY)
        } else {
          Resizer.resizeTo(editor, null, startSize.height + e.deltaY)
        }
      }
    }
  }

  if (hasStatusbar(editor)) {
    let html = 'K-CMS'
    let brandingLabel = {
      type: 'label',
      classes: 'branding',
      html: ` ${html}`
    }

    panel.add({
      type: 'panel',
      name: 'statusbar',
      classes: 'statusbar',
      layout: 'flow',
      border: '1 0 0 0',
      ariaRoot: true,
      items: [
        {
          type: 'elementpath',
          editor: editor
        },
        resizeHandleCtrl,
        brandingLabel
      ]
    })
  }

  FireThemeItems.fireBeforeRenderUI(editor)
  editor.on('SwitchMode', switchMode(panel))
  panel.renderBefore(args.targetNode).reflow()

  if (isReadOnly(editor)) {
    editor.setMode('readonly')
  }

  if (args.width) {
    DOM.setStyle(panel.getEl(), 'width', args.width)
  }

  editor.on('remove', function () {
    panel.remove()
    panel = null
  })

  KeyMan.addKeys(editor, panel)
  ContextualToolbars.addContextualToolbars(editor)

  return {
    iframeContainer: panel.find('#iframe')[0].getEl(),
    editorContainer: panel.getEl()
  }
}

let Renderer = { render }

export { Renderer }
