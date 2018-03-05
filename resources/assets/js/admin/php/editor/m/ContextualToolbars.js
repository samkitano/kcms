'use strict'

import { Env } from './Env'
import { Tools } from './Tools'
import { Rect } from './Rect'
import { Delay } from './Delay'
import { DOMUtils } from './DOMUtils'
import { ToolbarCreator } from './ToolbarCreator'
import { UiContainerDelta } from './UiContainerDelta'
import { Factory } from './Factory'

let DOM = DOMUtils.DOM

let toClientRect = function (geomRect) {
  return {
    left: geomRect.x,
    top: geomRect.y,
    width: geomRect.w,
    height: geomRect.h,
    right: geomRect.x + geomRect.w,
    bottom: geomRect.y + geomRect.h
  }
}

let hideAllFloatingPanels = editor => {
  Tools.each(editor.contextToolbars, toolbar => {
    if (toolbar.panel) {
      toolbar.panel.hide()
    }
  })
}

let movePanelTo = (panel, pos) => {
  panel.moveTo(pos.left, pos.top)
}

let togglePositionClass = (panel, relPos, predicate) => {
  relPos = relPos
    ? relPos.substr(0, 2)
    : ''

  Tools.each({
    t: 'down',
    b: 'up'
  }, (cls, pos) => {
    panel.classes.toggle(`arrow-${cls}`, predicate(pos, relPos.substr(0, 1)))
  })

  Tools.each({
    l: 'left',
    r: 'right'
  }, (cls, pos) => {
    panel.classes.toggle(`arrow-${cls}`, predicate(pos, relPos.substr(1, 1)))
  })
}

let userConstrain = (handler, x, y, elementRect, contentAreaRect, panelRect) => {
  panelRect = toClientRect({
    x,
    y,
    w: panelRect.w,
    h: panelRect.h
  })

  if (handler) {
    panelRect = handler({
      elementRect: toClientRect(elementRect),
      contentAreaRect: toClientRect(contentAreaRect),
      panelRect: panelRect
    })
  }

  return panelRect
}

let addContextualToolbars = editor => {
  let scrollContainer

  let getContextToolbars = () => editor.contextToolbars || []

  let getElementRect = elm => {
    let pos, targetRect, root

    pos = DOM.getPos(editor.getContentAreaContainer())
    targetRect = editor.dom.getRect(elm)
    root = editor.dom.getRoot()

    if (root.nodeName === 'BODY') {
      targetRect.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft
      targetRect.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop
    }

    targetRect.x += pos.x
    targetRect.y += pos.y

    return targetRect
  }

  let getInlineToolbarPositionHandler = editor => editor.getParam('inline_toolbar_position_handler')

  let reposition = (match, shouldShow) => {
    let relPos, panelRect, elementRect, contentAreaRect, panel, relRect, testPositions, smallElementWidthThreshold
    let handler = getInlineToolbarPositionHandler(editor)

    if (editor.removed) {
      return
    }

    if (!match || !match.toolbar.panel) {
      hideAllFloatingPanels(editor)
      return
    }

    testPositions = [
      'bc-tc',
      'tc-bc',
      'tl-bl',
      'bl-tl',
      'tr-br',
      'br-tr'
    ]

    panel = match.toolbar.panel

    if (shouldShow) {
      panel.show()
    }

    elementRect = getElementRect(match.element)
    panelRect = DOM.getRect(panel.getEl())
    contentAreaRect = DOM.getRect(editor.getContentAreaContainer() || editor.getBody())

    let delta = UiContainerDelta.getUiContainerDelta().getOr({
      x: 0,
      y: 0
    })

    elementRect.x += delta.x
    elementRect.y += delta.y
    panelRect.x += delta.x
    panelRect.y += delta.y
    contentAreaRect.x += delta.x
    contentAreaRect.y += delta.y
    smallElementWidthThreshold = 25

    if (DOM.getStyle(match.element, 'display', true) !== 'inline') {
      let clientRect = match.element.getBoundingClientRect()

      elementRect.w = clientRect.width
      elementRect.h = clientRect.height
    }

    if (!editor.inline) {
      contentAreaRect.w = editor.getDoc().documentElement.offsetWidth
    }

    if (editor.selection.controlSelection.isResizable(match.element)) {
      if (elementRect.w < smallElementWidthThreshold) {
        elementRect = Rect.inflate(elementRect, 0, 8)
      }
    }

    relPos = Rect.findBestRelativePosition(panelRect, elementRect, contentAreaRect, testPositions)
    elementRect = Rect.clamp(elementRect, contentAreaRect)

    if (relPos) {
      relRect = Rect.relativePosition(panelRect, elementRect, relPos)

      movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect))
    } else {
      contentAreaRect.h += panelRect.h
      elementRect = Rect.intersect(contentAreaRect, elementRect)

      if (elementRect) {
        relPos = Rect.findBestRelativePosition(panelRect, elementRect, contentAreaRect, [
          'bc-tc',
          'bl-tl',
          'br-tr'
        ])

        if (relPos) {
          relRect = Rect.relativePosition(panelRect, elementRect, relPos)
          movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect))
        } else {
          movePanelTo(panel, userConstrain(handler, elementRect.x, elementRect.y, elementRect, contentAreaRect, panelRect))
        }
      } else {
        panel.hide()
      }
    }

    togglePositionClass(panel, relPos, (pos1, pos2) => pos1 === pos2)
  }

  let repositionHandler = show => () => {
    let execute = () => {
      if (editor.selection) {
        reposition(findFrontMostMatch(editor.selection.getNode()), show)
      }
    }

    Delay.requestAnimationFrame(execute)
  }

  let bindScrollEvent = () => {
    if (!scrollContainer) {
      let repos = repositionHandler(true)

      scrollContainer = editor.selection.getScrollContainer() || editor.getWin()

      DOM.bind(scrollContainer, 'scroll', repos)
      DOM.bind(Env.container, 'scroll', repos)

      editor.on('remove', () => {
        DOM.unbind(scrollContainer, 'scroll', repos)
        DOM.unbind(Env.container, 'scroll', repos)
      })
    }
  }

  let showContextToolbar = match => {
    let panel

    if (match.toolbar.panel) {
      match.toolbar.panel.show()
      reposition(match)
      return
    }

    bindScrollEvent()

    panel = Factory.create({
      type: 'floatpanel',
      role: 'dialog',
      classes: 'tinymce tinymce-inline arrow',
      ariaLabel: 'Inline toolbar',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      autohide: false,
      autofix: true,
      fixed: true,
      border: 1,
      items: ToolbarCreator.createToolbar(editor, match.toolbar.items),
      oncancel: () => {
        editor.focus()
      }
    })

    match.toolbar.panel = panel
    panel.renderTo().reflow()
    reposition(match)
  }

  let hideAllContextToolbars = () => {
    Tools.each(getContextToolbars(), toolbar => {
      if (toolbar.panel) {
        toolbar.panel.hide()
      }
    })
  }

  let findFrontMostMatch = targetElm => {
    let i, y, parentsAndSelf
    let toolbars = getContextToolbars()

    parentsAndSelf = editor.$(targetElm).parents().add(targetElm)

    for (i = parentsAndSelf.length - 1; i >= 0; i--) {
      for (y = toolbars.length - 1; y >= 0; y--) {
        if (toolbars[y].predicate(parentsAndSelf[i])) {
          return {
            toolbar: toolbars[y],
            element: parentsAndSelf[i]
          }
        }
      }
    }

    return null
  }

  editor.on('click keyup setContent ObjectResized', e => {
    if (e.type === 'setcontent' && !e.selection) {
      return
    }

    Delay.setEditorTimeout(editor, () => {
      let match = findFrontMostMatch(editor.selection.getNode())

      if (match) {
        hideAllContextToolbars()
        showContextToolbar(match)
      } else {
        hideAllContextToolbars()
      }
    })
  })

  editor.on('blur hide contextmenu', hideAllContextToolbars)

  editor.on('ObjectResizeStart', () => {
    let match = findFrontMostMatch(editor.selection.getNode())

    if (match && match.toolbar.panel) {
      match.toolbar.panel.hide()
    }
  })

  editor.on('ResizeEditor ResizeWindow', repositionHandler(true))
  editor.on('nodeChange', repositionHandler(false))

  editor.on('remove', () => {
    Tools.each(getContextToolbars(), toolbar => {
      if (toolbar.panel) {
        toolbar.panel.remove()
      }
    })

    editor.contextToolbars = {}
  })

  editor.shortcuts.add('ctrl+shift+e > ctrl+shift+p', '', () => {
    let match = findFrontMostMatch(editor.selection.getNode())

    if (match && match.toolbar.panel) {
      match.toolbar.panel.items()[0].focus()
    }
  })
}

let ContextualToolbars = { addContextualToolbars }

export { ContextualToolbars }
