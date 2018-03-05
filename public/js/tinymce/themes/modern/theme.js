/* global tinymce */
(function () {
  let modern = (function () {
    'use strict'

    let ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager')

    let EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager')

    let Tools = tinymce.util.Tools.resolve('tinymce.util.Tools')

    let isBrandingEnabled = function (editor) {
      return editor.getParam('branding', true, 'boolean')
    }
    let hasMenubar = function (editor) {
      return getMenubar(editor) !== false
    }
    let getMenubar = function (editor) {
      return editor.getParam('menubar')
    }
    let hasStatusbar = function (editor) {
      return editor.getParam('statusbar', true, 'boolean')
    }
    let getToolbarSize = function (editor) {
      return editor.getParam('toolbar_items_size')
    }
    let isReadOnly = function (editor) {
      return editor.getParam('readonly', false, 'boolean')
    }
    let getFixedToolbarContainer = function (editor) {
      return editor.getParam('fixed_toolbar_container')
    }
    let getInlineToolbarPositionHandler = function (editor) {
      return editor.getParam('inline_toolbar_position_handler')
    }
    let getMenu = function (editor) {
      return editor.getParam('menu')
    }
    let getRemovedMenuItems = function (editor) {
      return editor.getParam('removed_menuitems', '')
    }
    let getMinWidth = function (editor) {
      return editor.getParam('min_width', 100, 'number')
    }
    let getMinHeight = function (editor) {
      return editor.getParam('min_height', 100, 'number')
    }
    let getMaxWidth = function (editor) {
      return editor.getParam('max_width', 65535, 'number')
    }
    let getMaxHeight = function (editor) {
      return editor.getParam('max_height', 65535, 'number')
    }
    let isSkinDisabled = function (editor) {
      return editor.settings.skin === false
    }
    let isInline = function (editor) {
      return editor.getParam('inline', false, 'boolean')
    }
    let getResize = function (editor) {
      let resize = editor.getParam('resize', 'vertical')
      if (resize === false) {
        return 'none'
      } else if (resize === 'both') {
        return 'both'
      } else {
        return 'vertical'
      }
    }
    let getSkinUrl = function (editor) {
      let settings = editor.settings
      let skin = settings.skin
      let skinUrl = settings.skin_url
      if (skin !== false) {
        let skinName = skin || 'lightgray'
        if (skinUrl) {
          skinUrl = editor.documentBaseURI.toAbsolute(skinUrl)
        } else {
          skinUrl = EditorManager.baseURL + '/skins/' + skinName
        }
      }
      return skinUrl
    }
    let getIndexedToolbars = function (settings, defaultToolbar) {
      let toolbars = []
      for (let i = 1; i < 10; i++) {
        let toolbar_1 = settings['toolbar' + i]
        if (!toolbar_1) {
          break
        }
        toolbars.push(toolbar_1)
      }
      let mainToolbar = settings.toolbar ? [settings.toolbar] : [defaultToolbar]
      return toolbars.length > 0 ? toolbars : mainToolbar
    }
    let getToolbars = function (editor) {
      let toolbar = editor.getParam('toolbar')
      let defaultToolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
      if (toolbar === false) {
        return []
      } else if (Tools.isArray(toolbar)) {
        return Tools.grep(toolbar, function (toolbar) {
          return toolbar.length > 0
        })
      } else {
        return getIndexedToolbars(editor.settings, defaultToolbar)
      }
    }

    let DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils')

    let Factory = tinymce.util.Tools.resolve('tinymce.ui.Factory')

    let I18n = tinymce.util.Tools.resolve('tinymce.util.I18n')

    let fireSkinLoaded = function (editor) {
      return editor.fire('SkinLoaded')
    }
    let fireResizeEditor = function (editor) {
      return editor.fire('ResizeEditor')
    }
    let fireBeforeRenderUI = function (editor) {
      return editor.fire('BeforeRenderUI')
    }
    let $_dprtsys7jd09eyyv = {
      fireSkinLoaded: fireSkinLoaded,
      fireResizeEditor: fireResizeEditor,
      fireBeforeRenderUI: fireBeforeRenderUI
    }

    let focus = function (panel, type) {
      return function () {
        let item = panel.find(type)[0]
        if (item) {
          item.focus(true)
        }
      }
    }
    let addKeys = function (editor, panel) {
      editor.shortcuts.add('Alt+F9', '', focus(panel, 'menubar'))
      editor.shortcuts.add('Alt+F10,F10', '', focus(panel, 'toolbar'))
      editor.shortcuts.add('Alt+F11', '', focus(panel, 'elementpath'))
      panel.on('cancel', function () {
        editor.focus()
      })
    }
    let $_3lzjdes8jd09eyyw = { addKeys: addKeys }

    let Env = tinymce.util.Tools.resolve('tinymce.Env')

    let Rect = tinymce.util.Tools.resolve('tinymce.geom.Rect')

    let Delay = tinymce.util.Tools.resolve('tinymce.util.Delay')

    let noop = function () {
    }
    let noarg = function (f) {
      return function () {
        return f()
      }
    }
    let compose = function (fa, fb) {
      return function () {
        return fa(fb.apply(null, arguments))
      }
    }
    let constant = function (value) {
      return function () {
        return value
      }
    }
    let identity = function (x) {
      return x
    }
    let tripleEquals = function (a, b) {
      return a === b
    }
    let curry = function (f) {
      let args = new Array(arguments.length - 1)
      for (let i = 1; i < arguments.length; i++) { args[i - 1] = arguments[i] }
      return function () {
        let newArgs = new Array(arguments.length)
        for (let j = 0; j < newArgs.length; j++) { newArgs[j] = arguments[j] }
        let all = args.concat(newArgs)
        return f.apply(null, all)
      }
    }
    let not = function (f) {
      return function () {
        return !f.apply(null, arguments)
      }
    }
    let die = function (msg) {
      return function () {
        throw new Error(msg)
      }
    }
    let apply = function (f) {
      return f()
    }
    let call = function (f) {
      f()
    }
    let never = constant(false)
    let always = constant(true)
    let $_4iv73osfjd09eyzh = {
      noop: noop,
      noarg: noarg,
      compose: compose,
      constant: constant,
      identity: identity,
      tripleEquals: tripleEquals,
      curry: curry,
      not: not,
      die: die,
      apply: apply,
      call: call,
      never: never,
      always: always
    }

    let never$1 = $_4iv73osfjd09eyzh.never
    let always$1 = $_4iv73osfjd09eyzh.always
    let none = function () {
      return NONE
    }
    let NONE = (function () {
      let eq = function (o) {
        return o.isNone()
      }
      let call = function (thunk) {
        return thunk()
      }
      let id = function (n) {
        return n
      }
      let noop = function () {
      }
      let me = {
        fold: function (n, s) {
          return n()
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.')
        },
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return []
        },
        toString: $_4iv73osfjd09eyzh.constant('none()')
      }
      if (Object.freeze) { Object.freeze(me) }
      return me
    }())
    let some = function (a) {
      let constant_a = function () {
        return a
      }
      let self = function () {
        return me
      }
      let map = function (f) {
        return some(f(a))
      }
      let bind = function (f) {
        return f(a)
      }
      let me = {
        fold: function (n, s) {
          return s(a)
        },
        is: function (v) {
          return a === v
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a))
          })
        },
        each: function (f) {
          f(a)
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE
        },
        equals: function (o) {
          return o.is(a)
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b)
          })
        },
        toArray: function () {
          return [a]
        },
        toString: function () {
          return 'some(' + a + ')'
        }
      }
      return me
    }
    let from = function (value) {
      return value === null || value === undefined ? NONE : some(value)
    }
    let $_dqtixqsejd09eyzf = {
      some: some,
      none: none,
      from: from
    }

    let getUiContainerDelta = function () {
      let uiContainer = Env.container
      if (uiContainer && DOMUtils.DOM.getStyle(uiContainer, 'position', true) !== 'static') {
        let containerPos = DOMUtils.DOM.getPos(uiContainer)
        let dx = uiContainer.scrollLeft - containerPos.x
        let dy = uiContainer.scrollTop - containerPos.y
        return $_dqtixqsejd09eyzf.some({
          x: dx,
          y: dy
        })
      } else {
        return $_dqtixqsejd09eyzf.none()
      }
    }
    let $_4g12o8sdjd09eyz5 = { getUiContainerDelta: getUiContainerDelta }

    let createToolbar = function (editor, items, size) {
      let toolbarItems = []
      let buttonGroup
      if (!items) {
        return
      }
      Tools.each(items.split(/[ ,]/), function (item) {
        let itemName
        let bindSelectorChanged = function () {
          let selection = editor.selection
          if (item.settings.stateSelector) {
            selection.selectorChanged(item.settings.stateSelector, function (state) {
              item.active(state)
            }, true)
          }
          if (item.settings.disabledStateSelector) {
            selection.selectorChanged(item.settings.disabledStateSelector, function (state) {
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
    let createToolbars = function (editor, size) {
      let toolbars = []
      let addToolbar = function (items) {
        if (items) {
          toolbars.push(createToolbar(editor, items, size))
        }
      }
      Tools.each(getToolbars(editor), function (toolbar) {
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
    let $_85b7rzsgjd09eyzn = {
      createToolbar: createToolbar,
      createToolbars: createToolbars
    }

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
    let hideAllFloatingPanels = function (editor) {
      Tools.each(editor.contextToolbars, function (toolbar) {
        if (toolbar.panel) {
          toolbar.panel.hide()
        }
      })
    }
    let movePanelTo = function (panel, pos) {
      panel.moveTo(pos.left, pos.top)
    }
    let togglePositionClass = function (panel, relPos, predicate) {
      relPos = relPos ? relPos.substr(0, 2) : ''
      Tools.each({
        t: 'down',
        b: 'up'
      }, function (cls, pos) {
        panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(0, 1)))
      })
      Tools.each({
        l: 'left',
        r: 'right'
      }, function (cls, pos) {
        panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(1, 1)))
      })
    }
    let userConstrain = function (handler, x, y, elementRect, contentAreaRect, panelRect) {
      panelRect = toClientRect({
        x: x,
        y: y,
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
    let addContextualToolbars = function (editor) {
      let scrollContainer
      let getContextToolbars = function () {
        return editor.contextToolbars || []
      }
      let getElementRect = function (elm) {
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
      let reposition = function (match, shouldShow) {
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
        let delta = $_4g12o8sdjd09eyz5.getUiContainerDelta().getOr({
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
        if (editor.selection.controlSelection.isResizable(match.element) && elementRect.w < smallElementWidthThreshold) {
          elementRect = Rect.inflate(elementRect, 0, 8)
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
        togglePositionClass(panel, relPos, function (pos1, pos2) {
          return pos1 === pos2
        })
      }
      let repositionHandler = function (show) {
        return function () {
          let execute = function () {
            if (editor.selection) {
              reposition(findFrontMostMatch(editor.selection.getNode()), show)
            }
          }
          Delay.requestAnimationFrame(execute)
        }
      }
      let bindScrollEvent = function () {
        if (!scrollContainer) {
          let reposition_1 = repositionHandler(true)
          scrollContainer = editor.selection.getScrollContainer() || editor.getWin()
          DOM.bind(scrollContainer, 'scroll', reposition_1)
          DOM.bind(Env.container, 'scroll', reposition_1)
          editor.on('remove', function () {
            DOM.unbind(scrollContainer, 'scroll', reposition_1)
            DOM.unbind(Env.container, 'scroll', reposition_1)
          })
        }
      }
      let showContextToolbar = function (match) {
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
          items: $_85b7rzsgjd09eyzn.createToolbar(editor, match.toolbar.items),
          oncancel: function () {
            editor.focus()
          }
        })
        match.toolbar.panel = panel
        panel.renderTo().reflow()
        reposition(match)
      }
      let hideAllContextToolbars = function () {
        Tools.each(getContextToolbars(), function (toolbar) {
          if (toolbar.panel) {
            toolbar.panel.hide()
          }
        })
      }
      let findFrontMostMatch = function (targetElm) {
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
      editor.on('click keyup setContent ObjectResized', function (e) {
        if (e.type === 'setcontent' && !e.selection) {
          return
        }
        Delay.setEditorTimeout(editor, function () {
          let match
          match = findFrontMostMatch(editor.selection.getNode())
          if (match) {
            hideAllContextToolbars()
            showContextToolbar(match)
          } else {
            hideAllContextToolbars()
          }
        })
      })
      editor.on('blur hide contextmenu', hideAllContextToolbars)
      editor.on('ObjectResizeStart', function () {
        let match = findFrontMostMatch(editor.selection.getNode())
        if (match && match.toolbar.panel) {
          match.toolbar.panel.hide()
        }
      })
      editor.on('ResizeEditor ResizeWindow', repositionHandler(true))
      editor.on('nodeChange', repositionHandler(false))
      editor.on('remove', function () {
        Tools.each(getContextToolbars(), function (toolbar) {
          if (toolbar.panel) {
            toolbar.panel.remove()
          }
        })
        editor.contextToolbars = {}
      })
      editor.shortcuts.add('ctrl+shift+e > ctrl+shift+p', '', function () {
        let match = findFrontMostMatch(editor.selection.getNode())
        if (match && match.toolbar.panel) {
          match.toolbar.panel.items()[0].focus()
        }
      })
    }
    let $_7fmw49s9jd09eyyz = { addContextualToolbars: addContextualToolbars }

    let rawIndexOf = (function () {
      let pIndexOf = Array.prototype.indexOf
      let fastIndex = function (xs, x) {
        return pIndexOf.call(xs, x)
      }
      let slowIndex = function (xs, x) {
        return slowIndexOf(xs, x)
      }
      return pIndexOf === undefined ? slowIndex : fastIndex
    }())
    let indexOf = function (xs, x) {
      let r = rawIndexOf(xs, x)
      return r === -1 ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.some(r)
    }
    let contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1
    }
    let exists = function (xs, pred) {
      return findIndex(xs, pred).isSome()
    }
    let range = function (num, f) {
      let r = []
      for (let i = 0; i < num; i++) {
        r.push(f(i))
      }
      return r
    }
    let chunk = function (array, size) {
      let r = []
      for (let i = 0; i < array.length; i += size) {
        let s = array.slice(i, i + size)
        r.push(s)
      }
      return r
    }
    let map = function (xs, f) {
      let len = xs.length
      let r = new Array(len)
      for (let i = 0; i < len; i++) {
        let x = xs[i]
        r[i] = f(x, i, xs)
      }
      return r
    }
    let each = function (xs, f) {
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        f(x, i, xs)
      }
    }
    let eachr = function (xs, f) {
      for (let i = xs.length - 1; i >= 0; i--) {
        let x = xs[i]
        f(x, i, xs)
      }
    }
    let partition = function (xs, pred) {
      let pass = []
      let fail = []
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        let arr = pred(x, i, xs) ? pass : fail
        arr.push(x)
      }
      return {
        pass: pass,
        fail: fail
      }
    }
    let filter = function (xs, pred) {
      let r = []
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        if (pred(x, i, xs)) {
          r.push(x)
        }
      }
      return r
    }
    let groupBy = function (xs, f) {
      if (xs.length === 0) {
        return []
      } else {
        let wasType = f(xs[0])
        let r = []
        let group = []
        for (let i = 0, len = xs.length; i < len; i++) {
          let x = xs[i]
          let type = f(x)
          if (type !== wasType) {
            r.push(group)
            group = []
          }
          wasType = type
          group.push(x)
        }
        if (group.length !== 0) {
          r.push(group)
        }
        return r
      }
    }
    let foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x)
      })
      return acc
    }
    let foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x)
      })
      return acc
    }
    let find = function (xs, pred) {
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        if (pred(x, i, xs)) {
          return $_dqtixqsejd09eyzf.some(x)
        }
      }
      return $_dqtixqsejd09eyzf.none()
    }
    let findIndex = function (xs, pred) {
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        if (pred(x, i, xs)) {
          return $_dqtixqsejd09eyzf.some(i)
        }
      }
      return $_dqtixqsejd09eyzf.none()
    }
    let slowIndexOf = function (xs, x) {
      for (let i = 0, len = xs.length; i < len; ++i) {
        if (xs[i] === x) {
          return i
        }
      }
      return -1
    }
    let push = Array.prototype.push
    let flatten = function (xs) {
      let r = []
      for (let i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i])) { throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs) }
        push.apply(r, xs[i])
      }
      return r
    }
    let bind = function (xs, f) {
      let output = map(xs, f)
      return flatten(output)
    }
    let forall = function (xs, pred) {
      for (let i = 0, len = xs.length; i < len; ++i) {
        let x = xs[i]
        if (pred(x, i, xs) !== true) {
          return false
        }
      }
      return true
    }
    let equal = function (a1, a2) {
      return a1.length === a2.length && forall(a1, function (x, i) {
        return x === a2[i]
      })
    }
    let slice = Array.prototype.slice
    let reverse = function (xs) {
      let r = slice.call(xs, 0)
      r.reverse()
      return r
    }
    let difference = function (a1, a2) {
      return filter(a1, function (x) {
        return !contains(a2, x)
      })
    }
    let mapToObject = function (xs, f) {
      let r = {}
      for (let i = 0, len = xs.length; i < len; i++) {
        let x = xs[i]
        r[String(x)] = f(x, i)
      }
      return r
    }
    let pure = function (x) {
      return [x]
    }
    let sort = function (xs, comparator) {
      let copy = slice.call(xs, 0)
      copy.sort(comparator)
      return copy
    }
    let head = function (xs) {
      return xs.length === 0 ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.some(xs[0])
    }
    let last = function (xs) {
      return xs.length === 0 ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.some(xs[xs.length - 1])
    }
    let $_1z9gljsijd09ez00 = {
      map: map,
      each: each,
      eachr: eachr,
      partition: partition,
      filter: filter,
      groupBy: groupBy,
      indexOf: indexOf,
      foldr: foldr,
      foldl: foldl,
      find: find,
      findIndex: findIndex,
      flatten: flatten,
      bind: bind,
      forall: forall,
      exists: exists,
      contains: contains,
      equal: equal,
      reverse: reverse,
      chunk: chunk,
      difference: difference,
      mapToObject: mapToObject,
      pure: pure,
      sort: sort,
      range: range,
      head: head,
      last: last
    }

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
      table: { title: 'Table' },
      help: { title: 'Help' }
    }
    let delimiterMenuNamePair = function () {
      return {
        name: '|',
        item: { text: '|' }
      }
    }
    let createMenuNameItemPair = function (name, item) {
      let menuItem = item ? {
        name: name,
        item: item
      } : null
      return name === '|' ? delimiterMenuNamePair() : menuItem
    }
    let hasItemName = function (namedMenuItems, name) {
      return $_1z9gljsijd09ez00.findIndex(namedMenuItems, function (namedMenuItem) {
        return namedMenuItem.name === name
      }).isSome()
    }
    let isSeparator = function (namedMenuItem) {
      return namedMenuItem && namedMenuItem.item.text === '|'
    }
    let cleanupMenu = function (namedMenuItems, removedMenuItems) {
      let menuItemsPass1 = $_1z9gljsijd09ez00.filter(namedMenuItems, function (namedMenuItem) {
        return removedMenuItems.hasOwnProperty(namedMenuItem.name) === false
      })
      let menuItemsPass2 = $_1z9gljsijd09ez00.filter(menuItemsPass1, function (namedMenuItem, i, namedMenuItems) {
        return !isSeparator(namedMenuItem) || !isSeparator(namedMenuItems[i - 1])
      })
      return $_1z9gljsijd09ez00.filter(menuItemsPass2, function (namedMenuItem, i, namedMenuItems) {
        return !isSeparator(namedMenuItem) || i > 0 && i < namedMenuItems.length - 1
      })
    }
    let createMenu = function (editorMenuItems, menus, removedMenuItems, context) {
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
        Tools.each((menu.items || '').split(/[ ,]/), function (name) {
          let namedMenuItem = createMenuNameItemPair(name, editorMenuItems[name])
          if (namedMenuItem) {
            namedMenuItems.push(namedMenuItem)
          }
        })
        if (!isUserDefined) {
          Tools.each(editorMenuItems, function (item, name) {
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
        menuButton.menu = $_1z9gljsijd09ez00.map(cleanupMenu(namedMenuItems, removedMenuItems), function (menuItem) {
          return menuItem.item
        })
        if (!menuButton.menu.length) {
          return null
        }
      }
      return menuButton
    }
    let getDefaultMenubar = function (editor) {
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
    let createMenuButtons = function (editor) {
      let menuButtons = []
      let defaultMenuBar = getDefaultMenubar(editor)
      let removedMenuItems = Tools.makeMap(getRemovedMenuItems(editor).split(/[ ,]/))
      let menubar = getMenubar(editor)
      let enabledMenuNames = typeof menubar === 'string' ? menubar.split(/[ ,]/) : defaultMenuBar
      for (let i = 0; i < enabledMenuNames.length; i++) {
        let menuItems = enabledMenuNames[i]
        let menu = createMenu(editor.menuItems, getMenu(editor), removedMenuItems, menuItems)
        if (menu) {
          menuButtons.push(menu)
        }
      }
      return menuButtons
    }
    let $_ecdzbsshjd09eyzu = { createMenuButtons: createMenuButtons }

    let DOM$1 = DOMUtils.DOM
    let getSize = function (elm) {
      return {
        width: elm.clientWidth,
        height: elm.clientHeight
      }
    }
    let resizeTo = function (editor, width, height) {
      let containerElm, iframeElm, containerSize, iframeSize
      containerElm = editor.getContainer()
      iframeElm = editor.getContentAreaContainer().firstChild
      containerSize = getSize(containerElm)
      iframeSize = getSize(iframeElm)
      if (width !== null) {
        width = Math.max(getMinWidth(editor), width)
        width = Math.min(getMaxWidth(editor), width)
        DOM$1.setStyle(containerElm, 'width', width + (containerSize.width - iframeSize.width))
        DOM$1.setStyle(iframeElm, 'width', width)
      }
      height = Math.max(getMinHeight(editor), height)
      height = Math.min(getMaxHeight(editor), height)
      DOM$1.setStyle(iframeElm, 'height', height)
      $_dprtsys7jd09eyyv.fireResizeEditor(editor)
    }
    let resizeBy = function (editor, dw, dh) {
      let elm = editor.getContentAreaContainer()
      resizeTo(editor, elm.clientWidth + dw, elm.clientHeight + dh)
    }
    let $_d42g69sjjd09ez05 = {
      resizeTo: resizeTo,
      resizeBy: resizeBy
    }

    let api = function (elm) {
      return {
        element: function () {
          return elm
        }
      }
    }
    let trigger = function (sidebar, panel, callbackName) {
      let callback = sidebar.settings[callbackName]
      if (callback) {
        callback(api(panel.getEl('body')))
      }
    }
    let hidePanels = function (name, container, sidebars) {
      Tools.each(sidebars, function (sidebar) {
        let panel = container.items().filter('#' + sidebar.name)[0]
        if (panel && panel.visible() && sidebar.name !== name) {
          trigger(sidebar, panel, 'onhide')
          panel.visible(false)
        }
      })
    }
    let deactivateButtons = function (toolbar) {
      toolbar.items().each(function (ctrl) {
        ctrl.active(false)
      })
    }
    let findSidebar = function (sidebars, name) {
      return Tools.grep(sidebars, function (sidebar) {
        return sidebar.name === name
      })[0]
    }
    let showPanel = function (editor, name, sidebars) {
      return function (e) {
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
              name: name,
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
        $_dprtsys7jd09eyyv.fireResizeEditor(editor)
      }
    }
    let isModernBrowser = function () {
      return !Env.ie || Env.ie >= 11
    }
    let hasSidebar = function (editor) {
      return isModernBrowser() && editor.sidebars ? editor.sidebars.length > 0 : false
    }
    let createSidebar = function (editor) {
      let buttons = Tools.map(editor.sidebars, function (sidebar) {
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
    let $_p7wogskjd09ez07 = {
      hasSidebar: hasSidebar,
      createSidebar: createSidebar
    }

    let fireSkinLoaded$1 = function (editor) {
      let done = function () {
        editor._skinLoaded = true
        $_dprtsys7jd09eyyv.fireSkinLoaded(editor)
      }
      return function () {
        if (editor.initialized) {
          done()
        } else {
          editor.on('init', done)
        }
      }
    }
    let $_bdv43wsljd09ez0b = { fireSkinLoaded: fireSkinLoaded$1 }

    let DOM$2 = DOMUtils.DOM
    let switchMode = function (panel) {
      return function (e) {
        panel.find('*').disabled(e.mode === 'readonly')
      }
    }
    let editArea = function (border) {
      return {
        type: 'panel',
        name: 'iframe',
        layout: 'stack',
        classes: 'edit-area',
        border: border,
        html: ''
      }
    }
    let editAreaContainer = function (editor) {
      return {
        type: 'panel',
        layout: 'stack',
        classes: 'edit-aria-container',
        border: '1 0 0 0',
        items: [
          editArea('0'),
          $_p7wogskjd09ez07.createSidebar(editor)
        ]
      }
    }
    let render = function (editor, theme, args) {
      let panel, resizeHandleCtrl, startSize
      if (isSkinDisabled(editor) === false && args.skinUiCss) {
        DOM$2.styleSheetLoader.load(args.skinUiCss, $_bdv43wsljd09ez0b.fireSkinLoaded(editor))
      } else {
        $_bdv43wsljd09ez0b.fireSkinLoaded(editor)()
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
                items: $_ecdzbsshjd09eyzu.createMenuButtons(editor)
              },
              $_85b7rzsgjd09eyzn.createToolbars(editor, getToolbarSize(editor))
            ]
          },
          $_p7wogskjd09ez07.hasSidebar(editor) ? editAreaContainer(editor) : editArea('1 0 0 0')
        ]
      })
      if (getResize(editor) !== 'none') {
        resizeHandleCtrl = {
          type: 'resizehandle',
          direction: getResize(editor),
          onResizeStart: function () {
            let elm = editor.getContentAreaContainer().firstChild
            startSize = {
              width: elm.clientWidth,
              height: elm.clientHeight
            }
          },
          onResize: function (e) {
            if (getResize(editor) === 'both') {
              $_d42g69sjjd09ez05.resizeTo(editor, startSize.width + e.deltaX, startSize.height + e.deltaY)
            } else {
              $_d42g69sjjd09ez05.resizeTo(editor, null, startSize.height + e.deltaY)
            }
          }
        }
      }
      if (hasStatusbar(editor)) {
        let linkHtml = '<a href="https://www.tinymce.com/?utm_campaign=editor_referral&utm_medium=poweredby&utm_source=tinymce" rel="noopener" target="_blank" role="presentation" tabindex="-1">tinymce</a>'
        let html = I18n.translate([
          'Powered by {0}',
          linkHtml
        ])
        let brandingLabel = isBrandingEnabled(editor) ? {
          type: 'label',
          classes: 'branding',
          html: ' ' + html
        } : null
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
      $_dprtsys7jd09eyyv.fireBeforeRenderUI(editor)
      editor.on('SwitchMode', switchMode(panel))
      panel.renderBefore(args.targetNode).reflow()
      if (isReadOnly(editor)) {
        editor.setMode('readonly')
      }
      if (args.width) {
        DOM$2.setStyle(panel.getEl(), 'width', args.width)
      }
      editor.on('remove', function () {
        panel.remove()
        panel = null
      })
      $_3lzjdes8jd09eyyw.addKeys(editor, panel)
      $_7fmw49s9jd09eyyz.addContextualToolbars(editor)
      return {
        iframeContainer: panel.find('#iframe')[0].getEl(),
        editorContainer: panel.getEl()
      }
    }
    let $_9t8haqs3jd09eyyr = { render: render }

    let $ = tinymce.util.Tools.resolve('tinymce.dom.DomQuery')

    let count = 0
    let funcs = {
      id: function () {
        return 'mceu_' + count++
      },
      create: function (name, attrs, children) {
        let elm = document.createElement(name)
        DOMUtils.DOM.setAttribs(elm, attrs)
        if (typeof children === 'string') {
          elm.innerHTML = children
        } else {
          Tools.each(children, function (child) {
            if (child.nodeType) {
              elm.appendChild(child)
            }
          })
        }
        return elm
      },
      createFragment: function (html) {
        return DOMUtils.DOM.createFragment(html)
      },
      getWindowSize: function () {
        return DOMUtils.DOM.getViewPort()
      },
      getSize: function (elm) {
        let width, height
        if (elm.getBoundingClientRect) {
          let rect = elm.getBoundingClientRect()
          width = Math.max(rect.width || rect.right - rect.left, elm.offsetWidth)
          height = Math.max(rect.height || rect.bottom - rect.bottom, elm.offsetHeight)
        } else {
          width = elm.offsetWidth
          height = elm.offsetHeight
        }
        return {
          width: width,
          height: height
        }
      },
      getPos: function (elm, root) {
        return DOMUtils.DOM.getPos(elm, root || funcs.getContainer())
      },
      getContainer: function () {
        return Env.container ? Env.container : document.body
      },
      getViewPort: function (win) {
        return DOMUtils.DOM.getViewPort(win)
      },
      get: function (id) {
        return document.getElementById(id)
      },
      addClass: function (elm, cls) {
        return DOMUtils.DOM.addClass(elm, cls)
      },
      removeClass: function (elm, cls) {
        return DOMUtils.DOM.removeClass(elm, cls)
      },
      hasClass: function (elm, cls) {
        return DOMUtils.DOM.hasClass(elm, cls)
      },
      toggleClass: function (elm, cls, state) {
        return DOMUtils.DOM.toggleClass(elm, cls, state)
      },
      css: function (elm, name, value) {
        return DOMUtils.DOM.setStyle(elm, name, value)
      },
      getRuntimeStyle: function (elm, name) {
        return DOMUtils.DOM.getStyle(elm, name, true)
      },
      on: function (target, name, callback, scope) {
        return DOMUtils.DOM.bind(target, name, callback, scope)
      },
      off: function (target, name, callback) {
        return DOMUtils.DOM.unbind(target, name, callback)
      },
      fire: function (target, name, args) {
        return DOMUtils.DOM.fire(target, name, args)
      },
      innerHtml: function (elm, html) {
        DOMUtils.DOM.setHTML(elm, html)
      }
    }

    function calculateRelativePosition (ctrl, targetElm, rel) {
      let ctrlElm, pos, x, y, selfW, selfH, targetW, targetH, viewport, size
      viewport = funcs.getViewPort()
      pos = funcs.getPos(targetElm)
      x = pos.x
      y = pos.y
      if (ctrl.state.get('fixed') && funcs.getRuntimeStyle(document.body, 'position') === 'static') {
        x -= viewport.x
        y -= viewport.y
      }
      ctrlElm = ctrl.getEl()
      size = funcs.getSize(ctrlElm)
      selfW = size.width
      selfH = size.height
      size = funcs.getSize(targetElm)
      targetW = size.width
      targetH = size.height
      rel = (rel || '').split('')
      if (rel[0] === 'b') {
        y += targetH
      }
      if (rel[1] === 'r') {
        x += targetW
      }
      if (rel[0] === 'c') {
        y += Math.round(targetH / 2)
      }
      if (rel[1] === 'c') {
        x += Math.round(targetW / 2)
      }
      if (rel[3] === 'b') {
        y -= selfH
      }
      if (rel[4] === 'r') {
        x -= selfW
      }
      if (rel[3] === 'c') {
        y -= Math.round(selfH / 2)
      }
      if (rel[4] === 'c') {
        x -= Math.round(selfW / 2)
      }
      return {
        x: x,
        y: y,
        w: selfW,
        h: selfH
      }
    }
    let $_bbrl2msqjd09ez0r = {
      testMoveRel: function (elm, rels) {
        let viewPortRect = funcs.getViewPort()
        for (let i = 0; i < rels.length; i++) {
          let pos = calculateRelativePosition(this, elm, rels[i])
          if (this.state.get('fixed')) {
            if (pos.x > 0 && pos.x + pos.w < viewPortRect.w && pos.y > 0 && pos.y + pos.h < viewPortRect.h) {
              return rels[i]
            }
          } else {
            if (pos.x > viewPortRect.x && pos.x + pos.w < viewPortRect.w + viewPortRect.x && pos.y > viewPortRect.y && pos.y + pos.h < viewPortRect.h + viewPortRect.y) {
              return rels[i]
            }
          }
        }
        return rels[0]
      },
      moveRel: function (elm, rel) {
        if (typeof rel !== 'string') {
          rel = this.testMoveRel(elm, rel)
        }
        let pos = calculateRelativePosition(this, elm, rel)
        return this.moveTo(pos.x, pos.y)
      },
      moveBy: function (dx, dy) {
        let self = this, rect = self.layoutRect()
        self.moveTo(rect.x + dx, rect.y + dy)
        return self
      },
      moveTo: function (x, y) {
        let self = this
        function constrain (value, max, size) {
          if (value < 0) {
            return 0
          }
          if (value + size > max) {
            value = max - size
            return value < 0 ? 0 : value
          }
          return value
        }
        if (self.settings.constrainToViewport) {
          let viewPortRect = funcs.getViewPort(window)
          let layoutRect = self.layoutRect()
          x = constrain(x, viewPortRect.w + viewPortRect.x, layoutRect.w)
          y = constrain(y, viewPortRect.h + viewPortRect.y, layoutRect.h)
        }
        if (self.state.get('rendered')) {
          self.layoutRect({
            x: x,
            y: y
          }).repaint()
        } else {
          self.settings.x = x
          self.settings.y = y
        }
        self.fire('move', {
          x: x,
          y: y
        })
        return self
      }
    }

    let Class = tinymce.util.Tools.resolve('tinymce.util.Class')

    let EventDispatcher = tinymce.util.Tools.resolve('tinymce.util.EventDispatcher')

    let $_91ag6bswjd09ez1u = {
      parseBox: function (value) {
        let len
        let radix = 10
        if (!value) {
          return
        }
        if (typeof value === 'number') {
          value = value || 0
          return {
            top: value,
            left: value,
            bottom: value,
            right: value
          }
        }
        value = value.split(' ')
        len = value.length
        if (len === 1) {
          value[1] = value[2] = value[3] = value[0]
        } else if (len === 2) {
          value[2] = value[0]
          value[3] = value[1]
        } else if (len === 3) {
          value[3] = value[1]
        }
        return {
          top: parseInt(value[0], radix) || 0,
          right: parseInt(value[1], radix) || 0,
          bottom: parseInt(value[2], radix) || 0,
          left: parseInt(value[3], radix) || 0
        }
      },
      measureBox: function (elm, prefix) {
        function getStyle (name) {
          let defaultView = elm.ownerDocument.defaultView
          if (defaultView) {
            let computedStyle = defaultView.getComputedStyle(elm, null)
            if (computedStyle) {
              name = name.replace(/[A-Z]/g, function (a) {
                return '-' + a
              })
              return computedStyle.getPropertyValue(name)
            } else {
              return null
            }
          }
          return elm.currentStyle[name]
        }
        function getSide (name) {
          let val = parseFloat(getStyle(name))
          return isNaN(val) ? 0 : val
        }
        return {
          top: getSide(prefix + 'TopWidth'),
          right: getSide(prefix + 'RightWidth'),
          bottom: getSide(prefix + 'BottomWidth'),
          left: getSide(prefix + 'LeftWidth')
        }
      }
    }

    function noop$1 () {
    }
    function ClassList (onchange) {
      this.cls = []
      this.cls._map = {}
      this.onchange = onchange || noop$1
      this.prefix = ''
    }
    Tools.extend(ClassList.prototype, {
      add: function (cls) {
        if (cls && !this.contains(cls)) {
          this.cls._map[cls] = true
          this.cls.push(cls)
          this._change()
        }
        return this
      },
      remove: function (cls) {
        if (this.contains(cls)) {
          let i = void 0
          for (i = 0; i < this.cls.length; i++) {
            if (this.cls[i] === cls) {
              break
            }
          }
          this.cls.splice(i, 1)
          delete this.cls._map[cls]
          this._change()
        }
        return this
      },
      toggle: function (cls, state) {
        let curState = this.contains(cls)
        if (curState !== state) {
          if (curState) {
            this.remove(cls)
          } else {
            this.add(cls)
          }
          this._change()
        }
        return this
      },
      contains: function (cls) {
        return !!this.cls._map[cls]
      },
      _change: function () {
        delete this.clsValue
        this.onchange.call(this)
      }
    })
    ClassList.prototype.toString = function () {
      let value
      if (this.clsValue) {
        return this.clsValue
      }
      value = ''
      for (let i = 0; i < this.cls.length; i++) {
        if (i > 0) {
          value += ' '
        }
        value += this.prefix + this.cls[i]
      }
      return value
    }

    function unique (array) {
      let uniqueItems = []
      let i = array.length, item
      while (i--) {
        item = array[i]
        if (!item.__checked) {
          uniqueItems.push(item)
          item.__checked = 1
        }
      }
      i = uniqueItems.length
      while (i--) {
        delete uniqueItems[i].__checked
      }
      return uniqueItems
    }
    let expression = /^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i
    let chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
    let whiteSpace = /^\s*|\s*$/g
    let Collection
    let Selector = Class.extend({
      init: function (selector) {
        let match = this.match
        function compileNameFilter (name) {
          if (name) {
            name = name.toLowerCase()
            return function (item) {
              return name === '*' || item.type === name
            }
          }
        }
        function compileIdFilter (id) {
          if (id) {
            return function (item) {
              return item._name === id
            }
          }
        }
        function compileClassesFilter (classes) {
          if (classes) {
            classes = classes.split('.')
            return function (item) {
              let i = classes.length
              while (i--) {
                if (!item.classes.contains(classes[i])) {
                  return false
                }
              }
              return true
            }
          }
        }
        function compileAttrFilter (name, cmp, check) {
          if (name) {
            return function (item) {
              let value = item[name] ? item[name]() : ''
              return !cmp ? !!check : cmp === '=' ? value === check : cmp === '*=' ? value.indexOf(check) >= 0 : cmp === '~=' ? (' ' + value + ' ').indexOf(' ' + check + ' ') >= 0 : cmp === '!=' ? value !== check : cmp === '^=' ? value.indexOf(check) === 0 : cmp === '$=' ? value.substr(value.length - check.length) === check : false
            }
          }
        }
        function compilePsuedoFilter (name) {
          let notSelectors
          if (name) {
            name = /(?:not\((.+)\))|(.+)/i.exec(name)
            if (!name[1]) {
              name = name[2]
              return function (item, index, length) {
                return name === 'first' ? index === 0 : name === 'last' ? index === length - 1 : name === 'even' ? index % 2 === 0 : name === 'odd' ? index % 2 === 1 : item[name] ? item[name]() : false
              }
            }
            notSelectors = parseChunks(name[1], [])
            return function (item) {
              return !match(item, notSelectors)
            }
          }
        }
        function compile (selector, filters, direct) {
          let parts
          function add (filter) {
            if (filter) {
              filters.push(filter)
            }
          }
          parts = expression.exec(selector.replace(whiteSpace, ''))
          add(compileNameFilter(parts[1]))
          add(compileIdFilter(parts[2]))
          add(compileClassesFilter(parts[3]))
          add(compileAttrFilter(parts[4], parts[5], parts[6]))
          add(compilePsuedoFilter(parts[7]))
          filters.pseudo = !!parts[7]
          filters.direct = direct
          return filters
        }
        function parseChunks (selector, selectors) {
          let parts = []
          let extra, matches, i
          do {
            chunker.exec('')
            matches = chunker.exec(selector)
            if (matches) {
              selector = matches[3]
              parts.push(matches[1])
              if (matches[2]) {
                extra = matches[3]
                break
              }
            }
          } while (matches)
          if (extra) {
            parseChunks(extra, selectors)
          }
          selector = []
          for (i = 0; i < parts.length; i++) {
            if (parts[i] !== '>') {
              selector.push(compile(parts[i], [], parts[i - 1] === '>'))
            }
          }
          selectors.push(selector)
          return selectors
        }
        this._selectors = parseChunks(selector, [])
      },
      match: function (control, selectors) {
        let i, l, si, sl, selector, fi, fl, filters, index, length, siblings, count, item
        selectors = selectors || this._selectors
        for (i = 0, l = selectors.length; i < l; i++) {
          selector = selectors[i]
          sl = selector.length
          item = control
          count = 0
          for (si = sl - 1; si >= 0; si--) {
            filters = selector[si]
            while (item) {
              if (filters.pseudo) {
                siblings = item.parent().items()
                index = length = siblings.length
                while (index--) {
                  if (siblings[index] === item) {
                    break
                  }
                }
              }
              for (fi = 0, fl = filters.length; fi < fl; fi++) {
                if (!filters[fi](item, index, length)) {
                  fi = fl + 1
                  break
                }
              }
              if (fi === fl) {
                count++
                break
              } else {
                if (si === sl - 1) {
                  break
                }
              }
              item = item.parent()
            }
          }
          if (count === sl) {
            return true
          }
        }
        return false
      },
      find: function (container) {
        let matches = [], i, l
        let selectors = this._selectors
        function collect (items, selector, index) {
          let i, l, fi, fl, item
          let filters = selector[index]
          for (i = 0, l = items.length; i < l; i++) {
            item = items[i]
            for (fi = 0, fl = filters.length; fi < fl; fi++) {
              if (!filters[fi](item, i, l)) {
                fi = fl + 1
                break
              }
            }
            if (fi === fl) {
              if (index === selector.length - 1) {
                matches.push(item)
              } else {
                if (item.items) {
                  collect(item.items(), selector, index + 1)
                }
              }
            } else if (filters.direct) {
              return
            }
            if (item.items) {
              collect(item.items(), selector, index)
            }
          }
        }
        if (container.items) {
          for (i = 0, l = selectors.length; i < l; i++) {
            collect(container.items(), selectors[i], 0)
          }
          if (l > 1) {
            matches = unique(matches)
          }
        }
        if (!Collection) {
          Collection = Selector.Collection
        }
        return new Collection(matches)
      }
    })

    let Collection$1
    let proto
    let push$1 = Array.prototype.push
    let slice$1 = Array.prototype.slice
    proto = {
      length: 0,
      init: function (items) {
        if (items) {
          this.add(items)
        }
      },
      add: function (items) {
        let self = this
        if (!Tools.isArray(items)) {
          if (items instanceof Collection$1) {
            self.add(items.toArray())
          } else {
            push$1.call(self, items)
          }
        } else {
          push$1.apply(self, items)
        }
        return self
      },
      set: function (items) {
        let self = this
        let len = self.length
        let i
        self.length = 0
        self.add(items)
        for (i = self.length; i < len; i++) {
          delete self[i]
        }
        return self
      },
      filter: function (selector) {
        let self = this
        let i, l
        let matches = []
        let item, match
        if (typeof selector === 'string') {
          selector = new Selector(selector)
          match = function (item) {
            return selector.match(item)
          }
        } else {
          match = selector
        }
        for (i = 0, l = self.length; i < l; i++) {
          item = self[i]
          if (match(item)) {
            matches.push(item)
          }
        }
        return new Collection$1(matches)
      },
      slice: function () {
        return new Collection$1(slice$1.apply(this, arguments))
      },
      eq: function (index) {
        return index === -1 ? this.slice(index) : this.slice(index, +index + 1)
      },
      each: function (callback) {
        Tools.each(this, callback)
        return this
      },
      toArray: function () {
        return Tools.toArray(this)
      },
      indexOf: function (ctrl) {
        let self = this
        let i = self.length
        while (i--) {
          if (self[i] === ctrl) {
            break
          }
        }
        return i
      },
      reverse: function () {
        return new Collection$1(Tools.toArray(this).reverse())
      },
      hasClass: function (cls) {
        return this[0] ? this[0].classes.contains(cls) : false
      },
      prop: function (name, value) {
        let self = this
        let item
        if (value !== undefined) {
          self.each(function (item) {
            if (item[name]) {
              item[name](value)
            }
          })
          return self
        }
        item = self[0]
        if (item && item[name]) {
          return item[name]()
        }
      },
      exec: function (name) {
        let self = this, args = Tools.toArray(arguments).slice(1)
        self.each(function (item) {
          if (item[name]) {
            item[name].apply(item, args)
          }
        })
        return self
      },
      remove: function () {
        let i = this.length
        while (i--) {
          this[i].remove()
        }
        return this
      },
      addClass: function (cls) {
        return this.each(function (item) {
          item.classes.add(cls)
        })
      },
      removeClass: function (cls) {
        return this.each(function (item) {
          item.classes.remove(cls)
        })
      }
    }
    Tools.each('fire on off show hide append prepend before after reflow'.split(' '), function (name) {
      proto[name] = function () {
        let args = Tools.toArray(arguments)
        this.each(function (ctrl) {
          if (name in ctrl) {
            ctrl[name].apply(ctrl, args)
          }
        })
        return this
      }
    })
    Tools.each('text name disabled active selected checked visible parent value data'.split(' '), function (name) {
      proto[name] = function (value) {
        return this.prop(name, value)
      }
    })
    Collection$1 = Class.extend(proto)
    Selector.Collection = Collection$1
    let Collection$2 = Collection$1

    let Binding = function (settings) {
      this.create = settings.create
    }
    Binding.create = function (model, name) {
      return new Binding({
        create: function (otherModel, otherName) {
          let bindings
          let fromSelfToOther = function (e) {
            otherModel.set(otherName, e.value)
          }
          let fromOtherToSelf = function (e) {
            model.set(name, e.value)
          }
          otherModel.on('change:' + otherName, fromOtherToSelf)
          model.on('change:' + name, fromSelfToOther)
          bindings = otherModel._bindings
          if (!bindings) {
            bindings = otherModel._bindings = []
            otherModel.on('destroy', function () {
              let i = bindings.length
              while (i--) {
                bindings[i]()
              }
            })
          }
          bindings.push(function () {
            model.off('change:' + name, fromSelfToOther)
          })
          return model.get(name)
        }
      })
    }

    let Observable = tinymce.util.Tools.resolve('tinymce.util.Observable')

    function isNode (node) {
      return node.nodeType > 0
    }
    function isEqual (a, b) {
      let k, checked
      if (a === b) {
        return true
      }
      if (a === null || b === null) {
        return a === b
      }
      if (typeof a !== 'object' || typeof b !== 'object') {
        return a === b
      }
      if (Tools.isArray(b)) {
        if (a.length !== b.length) {
          return false
        }
        k = a.length
        while (k--) {
          if (!isEqual(a[k], b[k])) {
            return false
          }
        }
      }
      if (isNode(a) || isNode(b)) {
        return a === b
      }
      checked = {}
      for (k in b) {
        if (!isEqual(a[k], b[k])) {
          return false
        }
        checked[k] = true
      }
      for (k in a) {
        if (!checked[k] && !isEqual(a[k], b[k])) {
          return false
        }
      }
      return true
    }
    let ObservableObject = Class.extend({
      Mixins: [Observable],
      init: function (data) {
        let name, value
        data = data || {}
        for (name in data) {
          value = data[name]
          if (value instanceof Binding) {
            data[name] = value.create(this, name)
          }
        }
        this.data = data
      },
      set: function (name, value) {
        let key, args
        let oldValue = this.data[name]
        if (value instanceof Binding) {
          value = value.create(this, name)
        }
        if (typeof name === 'object') {
          for (key in name) {
            this.set(key, name[key])
          }
          return this
        }
        if (!isEqual(oldValue, value)) {
          this.data[name] = value
          args = {
            target: this,
            name: name,
            value: value,
            oldValue: oldValue
          }
          this.fire('change:' + name, args)
          this.fire('change', args)
        }
        return this
      },
      get: function (name) {
        return this.data[name]
      },
      has: function (name) {
        return name in this.data
      },
      bind: function (name) {
        return Binding.create(this, name)
      },
      destroy: function () {
        this.fire('destroy')
      }
    })

    let dirtyCtrls = {}
    let animationFrameRequested
    let $_4tfr2rt3jd09ez2d = {
      add: function (ctrl) {
        let parent = ctrl.parent()
        if (parent) {
          if (!parent._layout || parent._layout.isNative()) {
            return
          }
          if (!dirtyCtrls[parent._id]) {
            dirtyCtrls[parent._id] = parent
          }
          if (!animationFrameRequested) {
            animationFrameRequested = true
            Delay.requestAnimationFrame(function () {
              let id, ctrl
              animationFrameRequested = false
              for (id in dirtyCtrls) {
                ctrl = dirtyCtrls[id]
                if (ctrl.state.get('rendered')) {
                  ctrl.reflow()
                }
              }
              dirtyCtrls = {}
            }, document.body)
          }
        }
      },
      remove: function (ctrl) {
        if (dirtyCtrls[ctrl._id]) {
          delete dirtyCtrls[ctrl._id]
        }
      }
    }

    let hasMouseWheelEventSupport = 'onmousewheel' in document
    let hasWheelEventSupport = false
    let classPrefix = 'mce-'
    let Control
    let idCounter = 0
    let proto$1 = {
      Statics: { classPrefix: classPrefix },
      isRtl: function () {
        return Control.rtl
      },
      classPrefix: classPrefix,
      init: function (settings) {
        let self = this
        let classes, defaultClasses
        function applyClasses (classes) {
          let i
          classes = classes.split(' ')
          for (i = 0; i < classes.length; i++) {
            self.classes.add(classes[i])
          }
        }
        self.settings = settings = Tools.extend({}, self.Defaults, settings)
        self._id = settings.id || 'mceu_' + idCounter++
        self._aria = { role: settings.role }
        self._elmCache = {}
        self.$ = $
        self.state = new ObservableObject({
          visible: true,
          active: false,
          disabled: false,
          value: ''
        })
        self.data = new ObservableObject(settings.data)
        self.classes = new ClassList(function () {
          if (self.state.get('rendered')) {
            self.getEl().className = this.toString()
          }
        })
        self.classes.prefix = self.classPrefix
        classes = settings.classes
        if (classes) {
          if (self.Defaults) {
            defaultClasses = self.Defaults.classes
            if (defaultClasses && classes !== defaultClasses) {
              applyClasses(defaultClasses)
            }
          }
          applyClasses(classes)
        }
        Tools.each('title text name visible disabled active value'.split(' '), function (name) {
          if (name in settings) {
            self[name](settings[name])
          }
        })
        self.on('click', function () {
          if (self.disabled()) {
            return false
          }
        })
        self.settings = settings
        self.borderBox = $_91ag6bswjd09ez1u.parseBox(settings.border)
        self.paddingBox = $_91ag6bswjd09ez1u.parseBox(settings.padding)
        self.marginBox = $_91ag6bswjd09ez1u.parseBox(settings.margin)
        if (settings.hidden) {
          self.hide()
        }
      },
      Properties: 'parent,name',
      getContainerElm: function () {
        return funcs.getContainer()
      },
      getParentCtrl: function (elm) {
        let ctrl
        let lookup = this.getRoot().controlIdLookup
        while (elm && lookup) {
          ctrl = lookup[elm.id]
          if (ctrl) {
            break
          }
          elm = elm.parentNode
        }
        return ctrl
      },
      initLayoutRect: function () {
        let self = this
        let settings = self.settings
        let borderBox, layoutRect
        let elm = self.getEl()
        let width, height, minWidth, minHeight, autoResize
        let startMinWidth, startMinHeight, initialSize
        borderBox = self.borderBox = self.borderBox || $_91ag6bswjd09ez1u.measureBox(elm, 'border')
        self.paddingBox = self.paddingBox || $_91ag6bswjd09ez1u.measureBox(elm, 'padding')
        self.marginBox = self.marginBox || $_91ag6bswjd09ez1u.measureBox(elm, 'margin')
        initialSize = funcs.getSize(elm)
        startMinWidth = settings.minWidth
        startMinHeight = settings.minHeight
        minWidth = startMinWidth || initialSize.width
        minHeight = startMinHeight || initialSize.height
        width = settings.width
        height = settings.height
        autoResize = settings.autoResize
        autoResize = typeof autoResize !== 'undefined' ? autoResize : !width && !height
        width = width || minWidth
        height = height || minHeight
        let deltaW = borderBox.left + borderBox.right
        let deltaH = borderBox.top + borderBox.bottom
        let maxW = settings.maxWidth || 65535
        let maxH = settings.maxHeight || 65535
        self._layoutRect = layoutRect = {
          x: settings.x || 0,
          y: settings.y || 0,
          w: width,
          h: height,
          deltaW: deltaW,
          deltaH: deltaH,
          contentW: width - deltaW,
          contentH: height - deltaH,
          innerW: width - deltaW,
          innerH: height - deltaH,
          startMinWidth: startMinWidth || 0,
          startMinHeight: startMinHeight || 0,
          minW: Math.min(minWidth, maxW),
          minH: Math.min(minHeight, maxH),
          maxW: maxW,
          maxH: maxH,
          autoResize: autoResize,
          scrollW: 0
        }
        self._lastLayoutRect = {}
        return layoutRect
      },
      layoutRect: function (newRect) {
        let self = this
        let curRect = self._layoutRect, lastLayoutRect, size, deltaWidth, deltaHeight, repaintControls
        if (!curRect) {
          curRect = self.initLayoutRect()
        }
        if (newRect) {
          deltaWidth = curRect.deltaW
          deltaHeight = curRect.deltaH
          if (newRect.x !== undefined) {
            curRect.x = newRect.x
          }
          if (newRect.y !== undefined) {
            curRect.y = newRect.y
          }
          if (newRect.minW !== undefined) {
            curRect.minW = newRect.minW
          }
          if (newRect.minH !== undefined) {
            curRect.minH = newRect.minH
          }
          size = newRect.w
          if (size !== undefined) {
            size = size < curRect.minW ? curRect.minW : size
            size = size > curRect.maxW ? curRect.maxW : size
            curRect.w = size
            curRect.innerW = size - deltaWidth
          }
          size = newRect.h
          if (size !== undefined) {
            size = size < curRect.minH ? curRect.minH : size
            size = size > curRect.maxH ? curRect.maxH : size
            curRect.h = size
            curRect.innerH = size - deltaHeight
          }
          size = newRect.innerW
          if (size !== undefined) {
            size = size < curRect.minW - deltaWidth ? curRect.minW - deltaWidth : size
            size = size > curRect.maxW - deltaWidth ? curRect.maxW - deltaWidth : size
            curRect.innerW = size
            curRect.w = size + deltaWidth
          }
          size = newRect.innerH
          if (size !== undefined) {
            size = size < curRect.minH - deltaHeight ? curRect.minH - deltaHeight : size
            size = size > curRect.maxH - deltaHeight ? curRect.maxH - deltaHeight : size
            curRect.innerH = size
            curRect.h = size + deltaHeight
          }
          if (newRect.contentW !== undefined) {
            curRect.contentW = newRect.contentW
          }
          if (newRect.contentH !== undefined) {
            curRect.contentH = newRect.contentH
          }
          lastLayoutRect = self._lastLayoutRect
          if (lastLayoutRect.x !== curRect.x || lastLayoutRect.y !== curRect.y || lastLayoutRect.w !== curRect.w || lastLayoutRect.h !== curRect.h) {
            repaintControls = Control.repaintControls
            if (repaintControls) {
              if (repaintControls.map && !repaintControls.map[self._id]) {
                repaintControls.push(self)
                repaintControls.map[self._id] = true
              }
            }
            lastLayoutRect.x = curRect.x
            lastLayoutRect.y = curRect.y
            lastLayoutRect.w = curRect.w
            lastLayoutRect.h = curRect.h
          }
          return self
        }
        return curRect
      },
      repaint: function () {
        let self = this
        let style, bodyStyle, bodyElm, rect, borderBox
        let borderW, borderH, lastRepaintRect, round, value
        round = !document.createRange ? Math.round : function (value) {
          return value
        }
        style = self.getEl().style
        rect = self._layoutRect
        lastRepaintRect = self._lastRepaintRect || {}
        borderBox = self.borderBox
        borderW = borderBox.left + borderBox.right
        borderH = borderBox.top + borderBox.bottom
        if (rect.x !== lastRepaintRect.x) {
          style.left = round(rect.x) + 'px'
          lastRepaintRect.x = rect.x
        }
        if (rect.y !== lastRepaintRect.y) {
          style.top = round(rect.y) + 'px'
          lastRepaintRect.y = rect.y
        }
        if (rect.w !== lastRepaintRect.w) {
          value = round(rect.w - borderW)
          style.width = (value >= 0 ? value : 0) + 'px'
          lastRepaintRect.w = rect.w
        }
        if (rect.h !== lastRepaintRect.h) {
          value = round(rect.h - borderH)
          style.height = (value >= 0 ? value : 0) + 'px'
          lastRepaintRect.h = rect.h
        }
        if (self._hasBody && rect.innerW !== lastRepaintRect.innerW) {
          value = round(rect.innerW)
          bodyElm = self.getEl('body')
          if (bodyElm) {
            bodyStyle = bodyElm.style
            bodyStyle.width = (value >= 0 ? value : 0) + 'px'
          }
          lastRepaintRect.innerW = rect.innerW
        }
        if (self._hasBody && rect.innerH !== lastRepaintRect.innerH) {
          value = round(rect.innerH)
          bodyElm = bodyElm || self.getEl('body')
          if (bodyElm) {
            bodyStyle = bodyStyle || bodyElm.style
            bodyStyle.height = (value >= 0 ? value : 0) + 'px'
          }
          lastRepaintRect.innerH = rect.innerH
        }
        self._lastRepaintRect = lastRepaintRect
        self.fire('repaint', {}, false)
      },
      updateLayoutRect: function () {
        let self = this
        self.parent()._lastRect = null
        funcs.css(self.getEl(), {
          width: '',
          height: ''
        })
        self._layoutRect = self._lastRepaintRect = self._lastLayoutRect = null
        self.initLayoutRect()
      },
      on: function (name, callback) {
        let self = this
        function resolveCallbackName (name) {
          let callback, scope
          if (typeof name !== 'string') {
            return name
          }
          return function (e) {
            if (!callback) {
              self.parentsAndSelf().each(function (ctrl) {
                let callbacks = ctrl.settings.callbacks
                if (callbacks && (callback = callbacks[name])) {
                  scope = ctrl
                  return false
                }
              })
            }
            if (!callback) {
              e.action = name
              this.fire('execute', e)
              return
            }
            return callback.call(scope, e)
          }
        }
        getEventDispatcher(self).on(name, resolveCallbackName(callback))
        return self
      },
      off: function (name, callback) {
        getEventDispatcher(this).off(name, callback)
        return this
      },
      fire: function (name, args, bubble) {
        let self = this
        args = args || {}
        if (!args.control) {
          args.control = self
        }
        args = getEventDispatcher(self).fire(name, args)
        if (bubble !== false && self.parent) {
          let parent_1 = self.parent()
          while (parent_1 && !args.isPropagationStopped()) {
            parent_1.fire(name, args, false)
            parent_1 = parent_1.parent()
          }
        }
        return args
      },
      hasEventListeners: function (name) {
        return getEventDispatcher(this).has(name)
      },
      parents: function (selector) {
        let self = this
        let ctrl, parents = new Collection$2()
        for (ctrl = self.parent(); ctrl; ctrl = ctrl.parent()) {
          parents.add(ctrl)
        }
        if (selector) {
          parents = parents.filter(selector)
        }
        return parents
      },
      parentsAndSelf: function (selector) {
        return new Collection$2(this).add(this.parents(selector))
      },
      next: function () {
        let parentControls = this.parent().items()
        return parentControls[parentControls.indexOf(this) + 1]
      },
      prev: function () {
        let parentControls = this.parent().items()
        return parentControls[parentControls.indexOf(this) - 1]
      },
      innerHtml: function (html) {
        this.$el.html(html)
        return this
      },
      getEl: function (suffix) {
        let id = suffix ? this._id + '-' + suffix : this._id
        if (!this._elmCache[id]) {
          this._elmCache[id] = $('#' + id)[0]
        }
        return this._elmCache[id]
      },
      show: function () {
        return this.visible(true)
      },
      hide: function () {
        return this.visible(false)
      },
      focus: function () {
        try {
          this.getEl().focus()
        } catch (ex) {
        }
        return this
      },
      blur: function () {
        this.getEl().blur()
        return this
      },
      aria: function (name, value) {
        let self = this, elm = self.getEl(self.ariaTarget)
        if (typeof value === 'undefined') {
          return self._aria[name]
        }
        self._aria[name] = value
        if (self.state.get('rendered')) {
          elm.setAttribute(name === 'role' ? name : 'aria-' + name, value)
        }
        return self
      },
      encode: function (text, translate) {
        if (translate !== false) {
          text = this.translate(text)
        }
        return (text || '').replace(/[&<>"]/g, function (match) {
          return '&#' + match.charCodeAt(0) + ';'
        })
      },
      translate: function (text) {
        return Control.translate ? Control.translate(text) : text
      },
      before: function (items) {
        let self = this, parent = self.parent()
        if (parent) {
          parent.insert(items, parent.items().indexOf(self), true)
        }
        return self
      },
      after: function (items) {
        let self = this, parent = self.parent()
        if (parent) {
          parent.insert(items, parent.items().indexOf(self))
        }
        return self
      },
      remove: function () {
        let self = this
        let elm = self.getEl()
        let parent = self.parent()
        let newItems, i
        if (self.items) {
          let controls = self.items().toArray()
          i = controls.length
          while (i--) {
            controls[i].remove()
          }
        }
        if (parent && parent.items) {
          newItems = []
          parent.items().each(function (item) {
            if (item !== self) {
              newItems.push(item)
            }
          })
          parent.items().set(newItems)
          parent._lastRect = null
        }
        if (self._eventsRoot && self._eventsRoot === self) {
          $(elm).off()
        }
        let lookup = self.getRoot().controlIdLookup
        if (lookup) {
          delete lookup[self._id]
        }
        if (elm && elm.parentNode) {
          elm.parentNode.removeChild(elm)
        }
        self.state.set('rendered', false)
        self.state.destroy()
        self.fire('remove')
        return self
      },
      renderBefore: function (elm) {
        $(elm).before(this.renderHtml())
        this.postRender()
        return this
      },
      renderTo: function (elm) {
        $(elm || this.getContainerElm()).append(this.renderHtml())
        this.postRender()
        return this
      },
      preRender: function () {
      },
      render: function () {
      },
      renderHtml: function () {
        return '<div id="' + this._id + '" class="' + this.classes + '"></div>'
      },
      postRender: function () {
        let self = this
        let settings = self.settings
        let elm, box, parent, name, parentEventsRoot
        self.$el = $(self.getEl())
        self.state.set('rendered', true)
        for (name in settings) {
          if (name.indexOf('on') === 0) {
            self.on(name.substr(2), settings[name])
          }
        }
        if (self._eventsRoot) {
          for (parent = self.parent(); !parentEventsRoot && parent; parent = parent.parent()) {
            parentEventsRoot = parent._eventsRoot
          }
          if (parentEventsRoot) {
            for (name in parentEventsRoot._nativeEvents) {
              self._nativeEvents[name] = true
            }
          }
        }
        bindPendingEvents(self)
        if (settings.style) {
          elm = self.getEl()
          if (elm) {
            elm.setAttribute('style', settings.style)
            elm.style.cssText = settings.style
          }
        }
        if (self.settings.border) {
          box = self.borderBox
          self.$el.css({
            'border-top-width': box.top,
            'border-right-width': box.right,
            'border-bottom-width': box.bottom,
            'border-left-width': box.left
          })
        }
        let root = self.getRoot()
        if (!root.controlIdLookup) {
          root.controlIdLookup = {}
        }
        root.controlIdLookup[self._id] = self
        for (let key in self._aria) {
          self.aria(key, self._aria[key])
        }
        if (self.state.get('visible') === false) {
          self.getEl().style.display = 'none'
        }
        self.bindStates()
        self.state.on('change:visible', function (e) {
          let state = e.value
          let parentCtrl
          if (self.state.get('rendered')) {
            self.getEl().style.display = state === false ? 'none' : ''
            self.getEl().getBoundingClientRect()
          }
          parentCtrl = self.parent()
          if (parentCtrl) {
            parentCtrl._lastRect = null
          }
          self.fire(state ? 'show' : 'hide')
          $_4tfr2rt3jd09ez2d.add(self)
        })
        self.fire('postrender', {}, false)
      },
      bindStates: function () {
      },
      scrollIntoView: function (align) {
        function getOffset (elm, rootElm) {
          let x, y, parent = elm
          x = y = 0
          while (parent && parent !== rootElm && parent.nodeType) {
            x += parent.offsetLeft || 0
            y += parent.offsetTop || 0
            parent = parent.offsetParent
          }
          return {
            x: x,
            y: y
          }
        }
        let elm = this.getEl(), parentElm = elm.parentNode
        let x, y, width, height, parentWidth, parentHeight
        let pos = getOffset(elm, parentElm)
        x = pos.x
        y = pos.y
        width = elm.offsetWidth
        height = elm.offsetHeight
        parentWidth = parentElm.clientWidth
        parentHeight = parentElm.clientHeight
        if (align === 'end') {
          x -= parentWidth - width
          y -= parentHeight - height
        } else if (align === 'center') {
          x -= parentWidth / 2 - width / 2
          y -= parentHeight / 2 - height / 2
        }
        parentElm.scrollLeft = x
        parentElm.scrollTop = y
        return this
      },
      getRoot: function () {
        let ctrl = this, rootControl
        let parents = []
        while (ctrl) {
          if (ctrl.rootControl) {
            rootControl = ctrl.rootControl
            break
          }
          parents.push(ctrl)
          rootControl = ctrl
          ctrl = ctrl.parent()
        }
        if (!rootControl) {
          rootControl = this
        }
        let i = parents.length
        while (i--) {
          parents[i].rootControl = rootControl
        }
        return rootControl
      },
      reflow: function () {
        $_4tfr2rt3jd09ez2d.remove(this)
        let parent = this.parent()
        if (parent && parent._layout && !parent._layout.isNative()) {
          parent.reflow()
        }
        return this
      }
    }
    Tools.each('text title visible disabled active value'.split(' '), function (name) {
      proto$1[name] = function (value) {
        if (arguments.length === 0) {
          return this.state.get(name)
        }
        if (typeof value !== 'undefined') {
          this.state.set(name, value)
        }
        return this
      }
    })
    Control = Class.extend(proto$1)
    function getEventDispatcher (obj) {
      if (!obj._eventDispatcher) {
        obj._eventDispatcher = new EventDispatcher({
          scope: obj,
          toggleEvent: function (name, state) {
            if (state && EventDispatcher.isNative(name)) {
              if (!obj._nativeEvents) {
                obj._nativeEvents = {}
              }
              obj._nativeEvents[name] = true
              if (obj.state.get('rendered')) {
                bindPendingEvents(obj)
              }
            }
          }
        })
      }
      return obj._eventDispatcher
    }
    function bindPendingEvents (eventCtrl) {
      let i, l, parents, eventRootCtrl, nativeEvents, name
      function delegate (e) {
        let control = eventCtrl.getParentCtrl(e.target)
        if (control) {
          control.fire(e.type, e)
        }
      }
      function mouseLeaveHandler () {
        let ctrl = eventRootCtrl._lastHoverCtrl
        if (ctrl) {
          ctrl.fire('mouseleave', { target: ctrl.getEl() })
          ctrl.parents().each(function (ctrl) {
            ctrl.fire('mouseleave', { target: ctrl.getEl() })
          })
          eventRootCtrl._lastHoverCtrl = null
        }
      }
      function mouseEnterHandler (e) {
        let ctrl = eventCtrl.getParentCtrl(e.target), lastCtrl = eventRootCtrl._lastHoverCtrl, idx = 0, i, parents, lastParents
        if (ctrl !== lastCtrl) {
          eventRootCtrl._lastHoverCtrl = ctrl
          parents = ctrl.parents().toArray().reverse()
          parents.push(ctrl)
          if (lastCtrl) {
            lastParents = lastCtrl.parents().toArray().reverse()
            lastParents.push(lastCtrl)
            for (idx = 0; idx < lastParents.length; idx++) {
              if (parents[idx] !== lastParents[idx]) {
                break
              }
            }
            for (i = lastParents.length - 1; i >= idx; i--) {
              lastCtrl = lastParents[i]
              lastCtrl.fire('mouseleave', { target: lastCtrl.getEl() })
            }
          }
          for (i = idx; i < parents.length; i++) {
            ctrl = parents[i]
            ctrl.fire('mouseenter', { target: ctrl.getEl() })
          }
        }
      }
      function fixWheelEvent (e) {
        e.preventDefault()
        if (e.type === 'mousewheel') {
          e.deltaY = -1 / 40 * e.wheelDelta
          if (e.wheelDeltaX) {
            e.deltaX = -1 / 40 * e.wheelDeltaX
          }
        } else {
          e.deltaX = 0
          e.deltaY = e.detail
        }
        e = eventCtrl.fire('wheel', e)
      }
      nativeEvents = eventCtrl._nativeEvents
      if (nativeEvents) {
        parents = eventCtrl.parents().toArray()
        parents.unshift(eventCtrl)
        for (i = 0, l = parents.length; !eventRootCtrl && i < l; i++) {
          eventRootCtrl = parents[i]._eventsRoot
        }
        if (!eventRootCtrl) {
          eventRootCtrl = parents[parents.length - 1] || eventCtrl
        }
        eventCtrl._eventsRoot = eventRootCtrl
        for (l = i, i = 0; i < l; i++) {
          parents[i]._eventsRoot = eventRootCtrl
        }
        let eventRootDelegates = eventRootCtrl._delegates
        if (!eventRootDelegates) {
          eventRootDelegates = eventRootCtrl._delegates = {}
        }
        for (name in nativeEvents) {
          if (!nativeEvents) {
            return false
          }
          if (name === 'wheel' && !hasWheelEventSupport) {
            if (hasMouseWheelEventSupport) {
              $(eventCtrl.getEl()).on('mousewheel', fixWheelEvent)
            } else {
              $(eventCtrl.getEl()).on('DOMMouseScroll', fixWheelEvent)
            }
            continue
          }
          if (name === 'mouseenter' || name === 'mouseleave') {
            if (!eventRootCtrl._hasMouseEnter) {
              $(eventRootCtrl.getEl()).on('mouseleave', mouseLeaveHandler).on('mouseover', mouseEnterHandler)
              eventRootCtrl._hasMouseEnter = 1
            }
          } else if (!eventRootDelegates[name]) {
            $(eventRootCtrl.getEl()).on(name, delegate)
            eventRootDelegates[name] = true
          }
          nativeEvents[name] = false
        }
      }
    }
    let Control$1 = Control

    let hasTabstopData = function (elm) {
      return !!elm.getAttribute('data-mce-tabstop')
    }
    function KeyboardNavigation (settings) {
      let root = settings.root
      let focusedElement, focusedControl
      function isElement (node) {
        return node && node.nodeType === 1
      }
      try {
        focusedElement = document.activeElement
      } catch (ex) {
        focusedElement = document.body
      }
      focusedControl = root.getParentCtrl(focusedElement)
      function getRole (elm) {
        elm = elm || focusedElement
        if (isElement(elm)) {
          return elm.getAttribute('role')
        }
        return null
      }
      function getParentRole (elm) {
        let role, parent = elm || focusedElement
        while (parent = parent.parentNode) {
          if (role = getRole(parent)) {
            return role
          }
        }
      }
      function getAriaProp (name) {
        let elm = focusedElement
        if (isElement(elm)) {
          return elm.getAttribute('aria-' + name)
        }
      }
      function isTextInputElement (elm) {
        let tagName = elm.tagName.toUpperCase()
        return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT'
      }
      function canFocus (elm) {
        if (isTextInputElement(elm) && !elm.hidden) {
          return true
        }
        if (hasTabstopData(elm)) {
          return true
        }
        if (/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(getRole(elm))) {
          return true
        }
        return false
      }
      function getFocusElements (elm) {
        let elements = []
        function collect (elm) {
          if (elm.nodeType !== 1 || elm.style.display === 'none' || elm.disabled) {
            return
          }
          if (canFocus(elm)) {
            elements.push(elm)
          }
          for (let i = 0; i < elm.childNodes.length; i++) {
            collect(elm.childNodes[i])
          }
        }
        collect(elm || root.getEl())
        return elements
      }
      function getNavigationRoot (targetControl) {
        let navigationRoot, controls
        targetControl = targetControl || focusedControl
        controls = targetControl.parents().toArray()
        controls.unshift(targetControl)
        for (let i = 0; i < controls.length; i++) {
          navigationRoot = controls[i]
          if (navigationRoot.settings.ariaRoot) {
            break
          }
        }
        return navigationRoot
      }
      function focusFirst (targetControl) {
        let navigationRoot = getNavigationRoot(targetControl)
        let focusElements = getFocusElements(navigationRoot.getEl())
        if (navigationRoot.settings.ariaRemember && 'lastAriaIndex' in navigationRoot) {
          moveFocusToIndex(navigationRoot.lastAriaIndex, focusElements)
        } else {
          moveFocusToIndex(0, focusElements)
        }
      }
      function moveFocusToIndex (idx, elements) {
        if (idx < 0) {
          idx = elements.length - 1
        } else if (idx >= elements.length) {
          idx = 0
        }
        if (elements[idx]) {
          elements[idx].focus()
        }
        return idx
      }
      function moveFocus (dir, elements) {
        let idx = -1
        let navigationRoot = getNavigationRoot()
        elements = elements || getFocusElements(navigationRoot.getEl())
        for (let i = 0; i < elements.length; i++) {
          if (elements[i] === focusedElement) {
            idx = i
          }
        }
        idx += dir
        navigationRoot.lastAriaIndex = moveFocusToIndex(idx, elements)
      }
      function left () {
        let parentRole = getParentRole()
        if (parentRole === 'tablist') {
          moveFocus(-1, getFocusElements(focusedElement.parentNode))
        } else if (focusedControl.parent().submenu) {
          cancel()
        } else {
          moveFocus(-1)
        }
      }
      function right () {
        let role = getRole(), parentRole = getParentRole()
        if (parentRole === 'tablist') {
          moveFocus(1, getFocusElements(focusedElement.parentNode))
        } else if (role === 'menuitem' && parentRole === 'menu' && getAriaProp('haspopup')) {
          enter()
        } else {
          moveFocus(1)
        }
      }
      function up () {
        moveFocus(-1)
      }
      function down () {
        let role = getRole(), parentRole = getParentRole()
        if (role === 'menuitem' && parentRole === 'menubar') {
          enter()
        } else if (role === 'button' && getAriaProp('haspopup')) {
          enter({ key: 'down' })
        } else {
          moveFocus(1)
        }
      }
      function tab (e) {
        let parentRole = getParentRole()
        if (parentRole === 'tablist') {
          let elm = getFocusElements(focusedControl.getEl('body'))[0]
          if (elm) {
            elm.focus()
          }
        } else {
          moveFocus(e.shiftKey ? -1 : 1)
        }
      }
      function cancel () {
        focusedControl.fire('cancel')
      }
      function enter (aria) {
        aria = aria || {}
        focusedControl.fire('click', {
          target: focusedElement,
          aria: aria
        })
      }
      root.on('keydown', function (e) {
        function handleNonTabOrEscEvent (e, handler) {
          if (isTextInputElement(focusedElement) || hasTabstopData(focusedElement)) {
            return
          }
          if (getRole(focusedElement) === 'slider') {
            return
          }
          if (handler(e) !== false) {
            e.preventDefault()
          }
        }
        if (e.isDefaultPrevented()) {
          return
        }
        switch (e.keyCode) {
          case 37:
            handleNonTabOrEscEvent(e, left)
            break
          case 39:
            handleNonTabOrEscEvent(e, right)
            break
          case 38:
            handleNonTabOrEscEvent(e, up)
            break
          case 40:
            handleNonTabOrEscEvent(e, down)
            break
          case 27:
            cancel()
            break
          case 14:
          case 13:
          case 32:
            handleNonTabOrEscEvent(e, enter)
            break
          case 9:
            tab(e)
            e.preventDefault()
            break
        }
      })
      root.on('focusin', function (e) {
        focusedElement = e.target
        focusedControl = e.control
      })
      return { focusFirst: focusFirst }
    }

    let selectorCache = {}
    let Container = Control$1.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        settings = self.settings
        if (settings.fixed) {
          self.state.set('fixed', true)
        }
        self._items = new Collection$2()
        if (self.isRtl()) {
          self.classes.add('rtl')
        }
        self.bodyClasses = new ClassList(function () {
          if (self.state.get('rendered')) {
            self.getEl('body').className = this.toString()
          }
        })
        self.bodyClasses.prefix = self.classPrefix
        self.classes.add('container')
        self.bodyClasses.add('container-body')
        if (settings.containerCls) {
          self.classes.add(settings.containerCls)
        }
        self._layout = Factory.create((settings.layout || '') + 'layout')
        if (self.settings.items) {
          self.add(self.settings.items)
        } else {
          self.add(self.render())
        }
        self._hasBody = true
      },
      items: function () {
        return this._items
      },
      find: function (selector) {
        selector = selectorCache[selector] = selectorCache[selector] || new Selector(selector)
        return selector.find(this)
      },
      add: function (items) {
        let self = this
        self.items().add(self.create(items)).parent(self)
        return self
      },
      focus: function (keyboard) {
        let self = this
        let focusCtrl, keyboardNav, items
        if (keyboard) {
          keyboardNav = self.keyboardNav || self.parents().eq(-1)[0].keyboardNav
          if (keyboardNav) {
            keyboardNav.focusFirst(self)
            return
          }
        }
        items = self.find('*')
        if (self.statusbar) {
          items.add(self.statusbar.items())
        }
        items.each(function (ctrl) {
          if (ctrl.settings.autofocus) {
            focusCtrl = null
            return false
          }
          if (ctrl.canFocus) {
            focusCtrl = focusCtrl || ctrl
          }
        })
        if (focusCtrl) {
          focusCtrl.focus()
        }
        return self
      },
      replace: function (oldItem, newItem) {
        let ctrlElm
        let items = this.items()
        let i = items.length
        while (i--) {
          if (items[i] === oldItem) {
            items[i] = newItem
            break
          }
        }
        if (i >= 0) {
          ctrlElm = newItem.getEl()
          if (ctrlElm) {
            ctrlElm.parentNode.removeChild(ctrlElm)
          }
          ctrlElm = oldItem.getEl()
          if (ctrlElm) {
            ctrlElm.parentNode.removeChild(ctrlElm)
          }
        }
        newItem.parent(this)
      },
      create: function (items) {
        let self = this
        let settings
        let ctrlItems = []
        if (!Tools.isArray(items)) {
          items = [items]
        }
        Tools.each(items, function (item) {
          if (item) {
            if (!(item instanceof Control$1)) {
              if (typeof item === 'string') {
                item = { type: item }
              }
              settings = Tools.extend({}, self.settings.defaults, item)
              item.type = settings.type = settings.type || item.type || self.settings.defaultType || (settings.defaults ? settings.defaults.type : null)
              item = Factory.create(settings)
            }
            ctrlItems.push(item)
          }
        })
        return ctrlItems
      },
      renderNew: function () {
        let self = this
        self.items().each(function (ctrl, index) {
          let containerElm
          ctrl.parent(self)
          if (!ctrl.state.get('rendered')) {
            containerElm = self.getEl('body')
            if (containerElm.hasChildNodes() && index <= containerElm.childNodes.length - 1) {
              $(containerElm.childNodes[index]).before(ctrl.renderHtml())
            } else {
              $(containerElm).append(ctrl.renderHtml())
            }
            ctrl.postRender()
            $_4tfr2rt3jd09ez2d.add(ctrl)
          }
        })
        self._layout.applyClasses(self.items().filter(':visible'))
        self._lastRect = null
        return self
      },
      append: function (items) {
        return this.add(items).renderNew()
      },
      prepend: function (items) {
        let self = this
        self.items().set(self.create(items).concat(self.items().toArray()))
        return self.renderNew()
      },
      insert: function (items, index, before) {
        let self = this
        let curItems, beforeItems, afterItems
        items = self.create(items)
        curItems = self.items()
        if (!before && index < curItems.length - 1) {
          index += 1
        }
        if (index >= 0 && index < curItems.length) {
          beforeItems = curItems.slice(0, index).toArray()
          afterItems = curItems.slice(index).toArray()
          curItems.set(beforeItems.concat(items, afterItems))
        }
        return self.renderNew()
      },
      fromJSON: function (data) {
        let self = this
        for (let name_1 in data) {
          self.find('#' + name_1).value(data[name_1])
        }
        return self
      },
      toJSON: function () {
        let self = this, data = {}
        self.find('*').each(function (ctrl) {
          let name = ctrl.name(), value = ctrl.value()
          if (name && typeof value !== 'undefined') {
            data[name] = value
          }
        })
        return data
      },
      renderHtml: function () {
        let self = this, layout = self._layout, role = this.settings.role
        self.preRender()
        layout.preRender(self)
        return '<div id="' + self._id + '" class="' + self.classes + '"' + (role ? ' role="' + this.settings.role + '"' : '') + '>' + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
      },
      postRender: function () {
        let self = this
        let box
        self.items().exec('postRender')
        self._super()
        self._layout.postRender(self)
        self.state.set('rendered', true)
        if (self.settings.style) {
          self.$el.css(self.settings.style)
        }
        if (self.settings.border) {
          box = self.borderBox
          self.$el.css({
            'border-top-width': box.top,
            'border-right-width': box.right,
            'border-bottom-width': box.bottom,
            'border-left-width': box.left
          })
        }
        if (!self.parent()) {
          self.keyboardNav = KeyboardNavigation({ root: self })
        }
        return self
      },
      initLayoutRect: function () {
        let self = this, layoutRect = self._super()
        self._layout.recalc(self)
        return layoutRect
      },
      recalc: function () {
        let self = this
        let rect = self._layoutRect
        let lastRect = self._lastRect
        if (!lastRect || lastRect.w !== rect.w || lastRect.h !== rect.h) {
          self._layout.recalc(self)
          rect = self.layoutRect()
          self._lastRect = {
            x: rect.x,
            y: rect.y,
            w: rect.w,
            h: rect.h
          }
          return true
        }
      },
      reflow: function () {
        let i
        $_4tfr2rt3jd09ez2d.remove(this)
        if (this.visible()) {
          Control$1.repaintControls = []
          Control$1.repaintControls.map = {}
          this.recalc()
          i = Control$1.repaintControls.length
          while (i--) {
            Control$1.repaintControls[i].repaint()
          }
          if (this.settings.layout !== 'flow' && this.settings.layout !== 'stack') {
            this.repaint()
          }
          Control$1.repaintControls = []
        }
        return this
      }
    })

    function getDocumentSize (doc) {
      let documentElement, body, scrollWidth, clientWidth
      let offsetWidth, scrollHeight, clientHeight, offsetHeight
      let max = Math.max
      documentElement = doc.documentElement
      body = doc.body
      scrollWidth = max(documentElement.scrollWidth, body.scrollWidth)
      clientWidth = max(documentElement.clientWidth, body.clientWidth)
      offsetWidth = max(documentElement.offsetWidth, body.offsetWidth)
      scrollHeight = max(documentElement.scrollHeight, body.scrollHeight)
      clientHeight = max(documentElement.clientHeight, body.clientHeight)
      offsetHeight = max(documentElement.offsetHeight, body.offsetHeight)
      return {
        width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
        height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
      }
    }
    function updateWithTouchData (e) {
      let keys, i
      if (e.changedTouches) {
        keys = 'screenX screenY pageX pageY clientX clientY'.split(' ')
        for (i = 0; i < keys.length; i++) {
          e[keys[i]] = e.changedTouches[0][keys[i]]
        }
      }
    }
    function DragHelper (id, settings) {
      let $eventOverlay
      let doc = settings.document || document
      let downButton
      let start, stop, drag, startX, startY
      settings = settings || {}
      function getHandleElm () {
        return doc.getElementById(settings.handle || id)
      }
      start = function (e) {
        let docSize = getDocumentSize(doc)
        let handleElm, cursor
        updateWithTouchData(e)
        e.preventDefault()
        downButton = e.button
        handleElm = getHandleElm()
        startX = e.screenX
        startY = e.screenY
        if (window.getComputedStyle) {
          cursor = window.getComputedStyle(handleElm, null).getPropertyValue('cursor')
        } else {
          cursor = handleElm.runtimeStyle.cursor
        }
        $eventOverlay = $('<div></div>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: docSize.width,
          height: docSize.height,
          zIndex: 2147483647,
          opacity: 0.0001,
          cursor: cursor
        }).appendTo(doc.body)
        $(doc).on('mousemove touchmove', drag).on('mouseup touchend', stop)
        settings.start(e)
      }
      drag = function (e) {
        updateWithTouchData(e)
        if (e.button !== downButton) {
          return stop(e)
        }
        e.deltaX = e.screenX - startX
        e.deltaY = e.screenY - startY
        e.preventDefault()
        settings.drag(e)
      }
      stop = function (e) {
        updateWithTouchData(e)
        $(doc).off('mousemove touchmove', drag).off('mouseup touchend', stop)
        $eventOverlay.remove()
        if (settings.stop) {
          settings.stop(e)
        }
      }
      this.destroy = function () {
        $(getHandleElm()).off()
      }
      $(getHandleElm()).on('mousedown touchstart', start)
    }

    let $_3xsomxt5jd09ez2l = {
      init: function () {
        let self = this
        self.on('repaint', self.renderScroll)
      },
      renderScroll: function () {
        let self = this, margin = 2
        function repaintScroll () {
          let hasScrollH, hasScrollV, bodyElm
          function repaintAxis (axisName, posName, sizeName, contentSizeName, hasScroll, ax) {
            let containerElm, scrollBarElm, scrollThumbElm
            let containerSize, scrollSize, ratio, rect
            let posNameLower, sizeNameLower
            scrollBarElm = self.getEl('scroll' + axisName)
            if (scrollBarElm) {
              posNameLower = posName.toLowerCase()
              sizeNameLower = sizeName.toLowerCase()
              $(self.getEl('absend')).css(posNameLower, self.layoutRect()[contentSizeName] - 1)
              if (!hasScroll) {
                $(scrollBarElm).css('display', 'none')
                return
              }
              $(scrollBarElm).css('display', 'block')
              containerElm = self.getEl('body')
              scrollThumbElm = self.getEl('scroll' + axisName + 't')
              containerSize = containerElm['client' + sizeName] - margin * 2
              containerSize -= hasScrollH && hasScrollV ? scrollBarElm['client' + ax] : 0
              scrollSize = containerElm['scroll' + sizeName]
              ratio = containerSize / scrollSize
              rect = {}
              rect[posNameLower] = containerElm['offset' + posName] + margin
              rect[sizeNameLower] = containerSize
              $(scrollBarElm).css(rect)
              rect = {}
              rect[posNameLower] = containerElm['scroll' + posName] * ratio
              rect[sizeNameLower] = containerSize * ratio
              $(scrollThumbElm).css(rect)
            }
          }
          bodyElm = self.getEl('body')
          hasScrollH = bodyElm.scrollWidth > bodyElm.clientWidth
          hasScrollV = bodyElm.scrollHeight > bodyElm.clientHeight
          repaintAxis('h', 'Left', 'Width', 'contentW', hasScrollH, 'Height')
          repaintAxis('v', 'Top', 'Height', 'contentH', hasScrollV, 'Width')
        }
        function addScroll () {
          function addScrollAxis (axisName, posName, sizeName, deltaPosName, ax) {
            let scrollStart
            let axisId = self._id + '-scroll' + axisName, prefix = self.classPrefix
            $(self.getEl()).append('<div id="' + axisId + '" class="' + prefix + 'scrollbar ' + prefix + 'scrollbar-' + axisName + '">' + '<div id="' + axisId + 't" class="' + prefix + 'scrollbar-thumb"></div>' + '</div>')
            self.draghelper = new DragHelper(axisId + 't', {
              start: function () {
                scrollStart = self.getEl('body')['scroll' + posName]
                $('#' + axisId).addClass(prefix + 'active')
              },
              drag: function (e) {
                let ratio, hasScrollH, hasScrollV, containerSize
                let layoutRect = self.layoutRect()
                hasScrollH = layoutRect.contentW > layoutRect.innerW
                hasScrollV = layoutRect.contentH > layoutRect.innerH
                containerSize = self.getEl('body')['client' + sizeName] - margin * 2
                containerSize -= hasScrollH && hasScrollV ? self.getEl('scroll' + axisName)['client' + ax] : 0
                ratio = containerSize / self.getEl('body')['scroll' + sizeName]
                self.getEl('body')['scroll' + posName] = scrollStart + e['delta' + deltaPosName] / ratio
              },
              stop: function () {
                $('#' + axisId).removeClass(prefix + 'active')
              }
            })
          }
          self.classes.add('scroll')
          addScrollAxis('v', 'Top', 'Height', 'Y', 'Width')
          addScrollAxis('h', 'Left', 'Width', 'X', 'Height')
        }
        if (self.settings.autoScroll) {
          if (!self._hasScroll) {
            self._hasScroll = true
            addScroll()
            self.on('wheel', function (e) {
              let bodyEl = self.getEl('body')
              bodyEl.scrollLeft += (e.deltaX || 0) * 10
              bodyEl.scrollTop += e.deltaY * 10
              repaintScroll()
            })
            $(self.getEl('body')).on('scroll', repaintScroll)
          }
          repaintScroll()
        }
      }
    }

    let Panel = Container.extend({
      Defaults: {
        layout: 'fit',
        containerCls: 'panel'
      },
      Mixins: [$_3xsomxt5jd09ez2l],
      renderHtml: function () {
        let self = this
        let layout = self._layout
        let innerHtml = self.settings.html
        self.preRender()
        layout.preRender(self)
        if (typeof innerHtml === 'undefined') {
          innerHtml = '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>'
        } else {
          if (typeof innerHtml === 'function') {
            innerHtml = innerHtml.call(self)
          }
          self._hasBody = false
        }
        return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1" role="group">' + (self._preBodyHtml || '') + innerHtml + '</div>'
      }
    })

    let $_ali1zut7jd09ez2r = {
      resizeToContent: function () {
        this._layoutRect.autoResize = true
        this._lastRect = null
        this.reflow()
      },
      resizeTo: function (w, h) {
        if (w <= 1 || h <= 1) {
          let rect = funcs.getWindowSize()
          w = w <= 1 ? w * rect.w : w
          h = h <= 1 ? h * rect.h : h
        }
        this._layoutRect.autoResize = false
        return this.layoutRect({
          minW: w,
          minH: h,
          w: w,
          h: h
        }).reflow()
      },
      resizeBy: function (dw, dh) {
        let self = this, rect = self.layoutRect()
        return self.resizeTo(rect.w + dw, rect.h + dh)
      }
    }

    let documentClickHandler
    let documentScrollHandler
    let windowResizeHandler
    let visiblePanels = []
    let zOrder = []
    let hasModal
    function isChildOf (ctrl, parent) {
      while (ctrl) {
        if (ctrl === parent) {
          return true
        }
        ctrl = ctrl.parent()
      }
    }
    function skipOrHidePanels (e) {
      let i = visiblePanels.length
      while (i--) {
        let panel = visiblePanels[i], clickCtrl = panel.getParentCtrl(e.target)
        if (panel.settings.autohide) {
          if (clickCtrl) {
            if (isChildOf(clickCtrl, panel) || panel.parent() === clickCtrl) {
              continue
            }
          }
          e = panel.fire('autohide', { target: e.target })
          if (!e.isDefaultPrevented()) {
            panel.hide()
          }
        }
      }
    }
    function bindDocumentClickHandler () {
      if (!documentClickHandler) {
        documentClickHandler = function (e) {
          if (e.button === 2) {
            return
          }
          skipOrHidePanels(e)
        }
        $(document).on('click touchstart', documentClickHandler)
      }
    }
    function bindDocumentScrollHandler () {
      if (!documentScrollHandler) {
        documentScrollHandler = function () {
          let i
          i = visiblePanels.length
          while (i--) {
            repositionPanel(visiblePanels[i])
          }
        }
        $(window).on('scroll', documentScrollHandler)
      }
    }
    function bindWindowResizeHandler () {
      if (!windowResizeHandler) {
        let docElm_1 = document.documentElement
        let clientWidth_1 = docElm_1.clientWidth, clientHeight_1 = docElm_1.clientHeight
        windowResizeHandler = function () {
          if (!document.all || clientWidth_1 !== docElm_1.clientWidth || clientHeight_1 !== docElm_1.clientHeight) {
            clientWidth_1 = docElm_1.clientWidth
            clientHeight_1 = docElm_1.clientHeight
            FloatPanel.hideAll()
          }
        }
        $(window).on('resize', windowResizeHandler)
      }
    }
    function repositionPanel (panel) {
      let scrollY = funcs.getViewPort().y
      function toggleFixedChildPanels (fixed, deltaY) {
        let parent
        for (let i = 0; i < visiblePanels.length; i++) {
          if (visiblePanels[i] !== panel) {
            parent = visiblePanels[i].parent()
            while (parent && (parent = parent.parent())) {
              if (parent === panel) {
                visiblePanels[i].fixed(fixed).moveBy(0, deltaY).repaint()
              }
            }
          }
        }
      }
      if (panel.settings.autofix) {
        if (!panel.state.get('fixed')) {
          panel._autoFixY = panel.layoutRect().y
          if (panel._autoFixY < scrollY) {
            panel.fixed(true).layoutRect({ y: 0 }).repaint()
            toggleFixedChildPanels(true, scrollY - panel._autoFixY)
          }
        } else {
          if (panel._autoFixY > scrollY) {
            panel.fixed(false).layoutRect({ y: panel._autoFixY }).repaint()
            toggleFixedChildPanels(false, panel._autoFixY - scrollY)
          }
        }
      }
    }
    function addRemove (add, ctrl) {
      let i, zIndex = FloatPanel.zIndex || 65535, topModal
      if (add) {
        zOrder.push(ctrl)
      } else {
        i = zOrder.length
        while (i--) {
          if (zOrder[i] === ctrl) {
            zOrder.splice(i, 1)
          }
        }
      }
      if (zOrder.length) {
        for (i = 0; i < zOrder.length; i++) {
          if (zOrder[i].modal) {
            zIndex++
            topModal = zOrder[i]
          }
          zOrder[i].getEl().style.zIndex = zIndex
          zOrder[i].zIndex = zIndex
          zIndex++
        }
      }
      let modalBlockEl = $('#' + ctrl.classPrefix + 'modal-block', ctrl.getContainerElm())[0]
      if (topModal) {
        $(modalBlockEl).css('z-index', topModal.zIndex - 1)
      } else if (modalBlockEl) {
        modalBlockEl.parentNode.removeChild(modalBlockEl)
        hasModal = false
      }
      FloatPanel.currentZIndex = zIndex
    }
    let FloatPanel = Panel.extend({
      Mixins: [
        $_bbrl2msqjd09ez0r,
        $_ali1zut7jd09ez2r
      ],
      init: function (settings) {
        let self = this
        self._super(settings)
        self._eventsRoot = self
        self.classes.add('floatpanel')
        if (settings.autohide) {
          bindDocumentClickHandler()
          bindWindowResizeHandler()
          visiblePanels.push(self)
        }
        if (settings.autofix) {
          bindDocumentScrollHandler()
          self.on('move', function () {
            repositionPanel(this)
          })
        }
        self.on('postrender show', function (e) {
          if (e.control === self) {
            let $modalBlockEl_1
            let prefix_1 = self.classPrefix
            if (self.modal && !hasModal) {
              $modalBlockEl_1 = $('#' + prefix_1 + 'modal-block', self.getContainerElm())
              if (!$modalBlockEl_1[0]) {
                $modalBlockEl_1 = $('<div id="' + prefix_1 + 'modal-block" class="' + prefix_1 + 'reset ' + prefix_1 + 'fade"></div>').appendTo(self.getContainerElm())
              }
              Delay.setTimeout(function () {
                $modalBlockEl_1.addClass(prefix_1 + 'in')
                $(self.getEl()).addClass(prefix_1 + 'in')
              })
              hasModal = true
            }
            addRemove(true, self)
          }
        })
        self.on('show', function () {
          self.parents().each(function (ctrl) {
            if (ctrl.state.get('fixed')) {
              self.fixed(true)
              return false
            }
          })
        })
        if (settings.popover) {
          self._preBodyHtml = '<div class="' + self.classPrefix + 'arrow"></div>'
          self.classes.add('popover').add('bottom').add(self.isRtl() ? 'end' : 'start')
        }
        self.aria('label', settings.ariaLabel)
        self.aria('labelledby', self._id)
        self.aria('describedby', self.describedBy || self._id + '-none')
      },
      fixed: function (state) {
        let self = this
        if (self.state.get('fixed') !== state) {
          if (self.state.get('rendered')) {
            let viewport = funcs.getViewPort()
            if (state) {
              self.layoutRect().y -= viewport.y
            } else {
              self.layoutRect().y += viewport.y
            }
          }
          self.classes.toggle('fixed', state)
          self.state.set('fixed', state)
        }
        return self
      },
      show: function () {
        let self = this
        let i
        let state = self._super()
        i = visiblePanels.length
        while (i--) {
          if (visiblePanels[i] === self) {
            break
          }
        }
        if (i === -1) {
          visiblePanels.push(self)
        }
        return state
      },
      hide: function () {
        removeVisiblePanel(this)
        addRemove(false, this)
        return this._super()
      },
      hideAll: function () {
        FloatPanel.hideAll()
      },
      close: function () {
        let self = this
        if (!self.fire('close').isDefaultPrevented()) {
          self.remove()
          addRemove(false, self)
        }
        return self
      },
      remove: function () {
        removeVisiblePanel(this)
        this._super()
      },
      postRender: function () {
        let self = this
        if (self.settings.bodyRole) {
          this.getEl('body').setAttribute('role', self.settings.bodyRole)
        }
        return self._super()
      }
    })
    FloatPanel.hideAll = function () {
      let i = visiblePanels.length
      while (i--) {
        let panel = visiblePanels[i]
        if (panel && panel.settings.autohide) {
          panel.hide()
          visiblePanels.splice(i, 1)
        }
      }
    }
    function removeVisiblePanel (panel) {
      let i
      i = visiblePanels.length
      while (i--) {
        if (visiblePanels[i] === panel) {
          visiblePanels.splice(i, 1)
        }
      }
      i = zOrder.length
      while (i--) {
        if (zOrder[i] === panel) {
          zOrder.splice(i, 1)
        }
      }
    }

    let isFixed = function (inlineToolbarContainer) {
      return !!(inlineToolbarContainer && !Env.container)
    }
    let render$1 = function (editor, theme, args) {
      let panel, inlineToolbarContainer
      let DOM = DOMUtils.DOM
      let fixedToolbarContainer = getFixedToolbarContainer(editor)
      if (fixedToolbarContainer) {
        inlineToolbarContainer = DOM.select(fixedToolbarContainer)[0]
      }
      let reposition = function () {
        if (panel && panel.moveRel && panel.visible() && !panel._fixed) {
          let scrollContainer = editor.selection.getScrollContainer(), body = editor.getBody()
          let deltaX = 0, deltaY = 0
          if (scrollContainer) {
            let bodyPos = DOM.getPos(body), scrollContainerPos = DOM.getPos(scrollContainer)
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
      let show = function () {
        if (panel) {
          panel.show()
          reposition()
          DOM.addClass(editor.getBody(), 'mce-edit-focus')
        }
      }
      let hide = function () {
        if (panel) {
          panel.hide()
          FloatPanel.hideAll()
          DOM.removeClass(editor.getBody(), 'mce-edit-focus')
        }
      }
      let render = function () {
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
              items: $_ecdzbsshjd09eyzu.createMenuButtons(editor)
            },
            $_85b7rzsgjd09eyzn.createToolbars(editor, getToolbarSize(editor))
          ]
        })
        $_dprtsys7jd09eyyv.fireBeforeRenderUI(editor)
        if (inlineToolbarContainer) {
          panel.renderTo(inlineToolbarContainer).reflow()
        } else {
          panel.renderTo().reflow()
        }
        $_3lzjdes8jd09eyyw.addKeys(editor, panel)
        show()
        $_7fmw49s9jd09eyyz.addContextualToolbars(editor)
        editor.on('nodeChange', reposition)
        editor.on('ResizeWindow', reposition)
        editor.on('activate', show)
        editor.on('deactivate', hide)
        editor.nodeChanged()
      }
      editor.settings.content_editable = true
      editor.on('focus', function () {
        if (isSkinDisabled(editor) === false && args.skinUiCss) {
          DOM.styleSheetLoader.load(args.skinUiCss, render, render)
        } else {
          render()
        }
      })
      editor.on('blur hide', hide)
      editor.on('remove', function () {
        if (panel) {
          panel.remove()
          panel = null
        }
      })
      if (isSkinDisabled(editor) === false && args.skinUiCss) {
        DOM.styleSheetLoader.load(args.skinUiCss, $_bdv43wsljd09ez0b.fireSkinLoaded(editor))
      } else {
        $_bdv43wsljd09ez0b.fireSkinLoaded(editor)()
      }
      return {}
    }
    let $_52rvpdsmjd09ez0c = { render: render$1 }

    function Throbber (elm, inline) {
      let self = this
      let state
      let classPrefix = Control$1.classPrefix
      let timer
      self.show = function (time, callback) {
        function render () {
          if (state) {
            $(elm).append('<div class="' + classPrefix + 'throbber' + (inline ? ' ' + classPrefix + 'throbber-inline' : '') + '"></div>')
            if (callback) {
              callback()
            }
          }
        }
        self.hide()
        state = true
        if (time) {
          timer = Delay.setTimeout(render, time)
        } else {
          render()
        }
        return self
      }
      self.hide = function () {
        let child = elm.lastChild
        Delay.clearTimeout(timer)
        if (child && child.className.indexOf('throbber') !== -1) {
          child.parentNode.removeChild(child)
        }
        state = false
        return self
      }
    }

    let setup = function (editor, theme) {
      let throbber
      editor.on('ProgressState', function (e) {
        throbber = throbber || new Throbber(theme.panel.getEl('body'))
        if (e.state) {
          throbber.show(e.time)
        } else {
          throbber.hide()
        }
      })
    }
    let $_8ujoczt8jd09ez2s = { setup: setup }

    let renderUI = function (editor, theme, args) {
      let skinUrl = getSkinUrl(editor)
      if (skinUrl) {
        args.skinUiCss = skinUrl + '/skin.min.css'
        editor.contentCSS.push(skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css')
      }
      $_8ujoczt8jd09ez2s.setup(editor, theme)
      return isInline(editor) ? $_52rvpdsmjd09ez0c.render(editor, theme, args) : $_9t8haqs3jd09eyyr.render(editor, theme, args)
    }
    let $_cgj0fhrzjd09eyyl = { renderUI: renderUI }

    let Tooltip = Control$1.extend({
      Mixins: [$_bbrl2msqjd09ez0r],
      Defaults: { classes: 'widget tooltip tooltip-n' },
      renderHtml: function () {
        let self = this, prefix = self.classPrefix
        return '<div id="' + self._id + '" class="' + self.classes + '" role="presentation">' + '<div class="' + prefix + 'tooltip-arrow"></div>' + '<div class="' + prefix + 'tooltip-inner">' + self.encode(self.state.get('text')) + '</div>' + '</div>'
      },
      bindStates: function () {
        let self = this
        self.state.on('change:text', function (e) {
          self.getEl().lastChild.innerHTML = self.encode(e.value)
        })
        return self._super()
      },
      repaint: function () {
        let self = this
        let style, rect
        style = self.getEl().style
        rect = self._layoutRect
        style.left = rect.x + 'px'
        style.top = rect.y + 'px'
        style.zIndex = 65535 + 65535
      }
    })

    let tooltip
    let Widget = Control$1.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        settings = self.settings
        self.canFocus = true
        if (settings.tooltip && Widget.tooltips !== false) {
          self.on('mouseenter', function (e) {
            let tooltip = self.tooltip().moveTo(-65535)
            if (e.control === self) {
              let rel = tooltip.text(settings.tooltip).show().testMoveRel(self.getEl(), [
                'bc-tc',
                'bc-tl',
                'bc-tr'
              ])
              tooltip.classes.toggle('tooltip-n', rel === 'bc-tc')
              tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl')
              tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr')
              tooltip.moveRel(self.getEl(), rel)
            } else {
              tooltip.hide()
            }
          })
          self.on('mouseleave mousedown click', function () {
            self.tooltip().hide()
          })
        }
        self.aria('label', settings.ariaLabel || settings.tooltip)
      },
      tooltip: function () {
        if (!tooltip) {
          tooltip = new Tooltip({ type: 'tooltip' })
          tooltip.renderTo()
        }
        return tooltip
      },
      postRender: function () {
        let self = this, settings = self.settings
        self._super()
        if (!self.parent() && (settings.width || settings.height)) {
          self.initLayoutRect()
          self.repaint()
        }
        if (settings.autofocus) {
          self.focus()
        }
      },
      bindStates: function () {
        let self = this
        function disable (state) {
          self.aria('disabled', state)
          self.classes.toggle('disabled', state)
        }
        function active (state) {
          self.aria('pressed', state)
          self.classes.toggle('active', state)
        }
        self.state.on('change:disabled', function (e) {
          disable(e.value)
        })
        self.state.on('change:active', function (e) {
          active(e.value)
        })
        if (self.state.get('disabled')) {
          disable(true)
        }
        if (self.state.get('active')) {
          active(true)
        }
        return self._super()
      },
      remove: function () {
        this._super()
        if (tooltip) {
          tooltip.remove()
          tooltip = null
        }
      }
    })

    let Progress = Widget.extend({
      Defaults: { value: 0 },
      init: function (settings) {
        let self = this
        self._super(settings)
        self.classes.add('progress')
        if (!self.settings.filter) {
          self.settings.filter = function (value) {
            return Math.round(value)
          }
        }
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = this.classPrefix
        return '<div id="' + id + '" class="' + self.classes + '">' + '<div class="' + prefix + 'bar-container">' + '<div class="' + prefix + 'bar"></div>' + '</div>' + '<div class="' + prefix + 'text">0%</div>' + '</div>'
      },
      postRender: function () {
        let self = this
        self._super()
        self.value(self.settings.value)
        return self
      },
      bindStates: function () {
        let self = this
        function setValue (value) {
          value = self.settings.filter(value)
          self.getEl().lastChild.innerHTML = value + '%'
          self.getEl().firstChild.firstChild.style.width = value + '%'
        }
        self.state.on('change:value', function (e) {
          setValue(e.value)
        })
        setValue(self.state.get('value'))
        return self._super()
      }
    })

    let updateLiveRegion = function (ctx, text) {
      ctx.getEl().lastChild.textContent = text + (ctx.progressBar ? ' ' + ctx.progressBar.value() + '%' : '')
    }
    let Notification = Control$1.extend({
      Mixins: [$_bbrl2msqjd09ez0r],
      Defaults: { classes: 'widget notification' },
      init: function (settings) {
        let self = this
        self._super(settings)
        self.maxWidth = settings.maxWidth
        if (settings.text) {
          self.text(settings.text)
        }
        if (settings.icon) {
          self.icon = settings.icon
        }
        if (settings.color) {
          self.color = settings.color
        }
        if (settings.type) {
          self.classes.add('notification-' + settings.type)
        }
        if (settings.timeout && (settings.timeout < 0 || settings.timeout > 0) && !settings.closeButton) {
          self.closeButton = false
        } else {
          self.classes.add('has-close')
          self.closeButton = true
        }
        if (settings.progressBar) {
          self.progressBar = new Progress()
        }
        self.on('click', function (e) {
          if (e.target.className.indexOf(self.classPrefix + 'close') !== -1) {
            self.close()
          }
        })
      },
      renderHtml: function () {
        let self = this
        let prefix = self.classPrefix
        let icon = '', closeButton = '', progressBar = '', notificationStyle = ''
        if (self.icon) {
          icon = '<i class="' + prefix + 'ico' + ' ' + prefix + 'i-' + self.icon + '"></i>'
        }
        notificationStyle = ' style="max-width: ' + self.maxWidth + 'px;' + (self.color ? 'background-color: ' + self.color + ';"' : '"')
        if (self.closeButton) {
          closeButton = '<button type="button" class="' + prefix + 'close" aria-hidden="true">\xD7</button>'
        }
        if (self.progressBar) {
          progressBar = self.progressBar.renderHtml()
        }
        return '<div id="' + self._id + '" class="' + self.classes + '"' + notificationStyle + ' role="presentation">' + icon + '<div class="' + prefix + 'notification-inner">' + self.state.get('text') + '</div>' + progressBar + closeButton + '<div style="clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;width: 1px;"' + ' aria-live="assertive" aria-relevant="additions" aria-atomic="true"></div>' + '</div>'
      },
      postRender: function () {
        let self = this
        Delay.setTimeout(function () {
          self.$el.addClass(self.classPrefix + 'in')
          updateLiveRegion(self, self.state.get('text'))
        }, 100)
        return self._super()
      },
      bindStates: function () {
        let self = this
        self.state.on('change:text', function (e) {
          self.getEl().firstChild.innerHTML = e.value
          updateLiveRegion(self, e.value)
        })
        if (self.progressBar) {
          self.progressBar.bindStates()
          self.progressBar.state.on('change:value', function (e) {
            updateLiveRegion(self, self.state.get('text'))
          })
        }
        return self._super()
      },
      close: function () {
        let self = this
        if (!self.fire('close').isDefaultPrevented()) {
          self.remove()
        }
        return self
      },
      repaint: function () {
        let self = this
        let style, rect
        style = self.getEl().style
        rect = self._layoutRect
        style.left = rect.x + 'px'
        style.top = rect.y + 'px'
        style.zIndex = 65535 - 1
      }
    })

    function NotificationManagerImpl (editor) {
      let getEditorContainer = function (editor) {
        return editor.inline ? editor.getElement() : editor.getContentAreaContainer()
      }
      let getContainerWidth = function () {
        let container = getEditorContainer(editor)
        return funcs.getSize(container).width
      }
      let prePositionNotifications = function (notifications) {
        $_1z9gljsijd09ez00.each(notifications, function (notification) {
          notification.moveTo(0, 0)
        })
      }
      let positionNotifications = function (notifications) {
        if (notifications.length > 0) {
          let firstItem = notifications.slice(0, 1)[0]
          let container = getEditorContainer(editor)
          firstItem.moveRel(container, 'tc-tc')
          $_1z9gljsijd09ez00.each(notifications, function (notification, index) {
            if (index > 0) {
              notification.moveRel(notifications[index - 1].getEl(), 'bc-tc')
            }
          })
        }
      }
      let reposition = function (notifications) {
        prePositionNotifications(notifications)
        positionNotifications(notifications)
      }
      let open = function (args, closeCallback) {
        let extendedArgs = Tools.extend(args, { maxWidth: getContainerWidth() })
        let notif = new Notification(extendedArgs)
        notif.args = extendedArgs
        if (extendedArgs.timeout > 0) {
          notif.timer = setTimeout(function () {
            notif.close()
            closeCallback()
          }, extendedArgs.timeout)
        }
        notif.on('close', function () {
          closeCallback()
        })
        notif.renderTo()
        return notif
      }
      let close = function (notification) {
        notification.close()
      }
      let getArgs = function (notification) {
        return notification.args
      }
      return {
        open: open,
        close: close,
        reposition: reposition,
        getArgs: getArgs
      }
    }

    let windows = []
    let oldMetaValue = ''
    function toggleFullScreenState (state) {
      let noScaleMetaValue = 'width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0'
      let viewport = $('meta[name=viewport]')[0], contentValue
      if (Env.overrideViewPort === false) {
        return
      }
      if (!viewport) {
        viewport = document.createElement('meta')
        viewport.setAttribute('name', 'viewport')
        document.getElementsByTagName('head')[0].appendChild(viewport)
      }
      contentValue = viewport.getAttribute('content')
      if (contentValue && typeof oldMetaValue !== 'undefined') {
        oldMetaValue = contentValue
      }
      viewport.setAttribute('content', state ? noScaleMetaValue : oldMetaValue)
    }
    function toggleBodyFullScreenClasses (classPrefix, state) {
      if (checkFullscreenWindows() && state === false) {
        $([
          document.documentElement,
          document.body
        ]).removeClass(classPrefix + 'fullscreen')
      }
    }
    function checkFullscreenWindows () {
      for (let i = 0; i < windows.length; i++) {
        if (windows[i]._fullscreen) {
          return true
        }
      }
      return false
    }
    function handleWindowResize () {
      if (!Env.desktop) {
        let lastSize_1 = {
          w: window.innerWidth,
          h: window.innerHeight
        }
        Delay.setInterval(function () {
          let w = window.innerWidth, h = window.innerHeight
          if (lastSize_1.w !== w || lastSize_1.h !== h) {
            lastSize_1 = {
              w: w,
              h: h
            }
            $(window).trigger('resize')
          }
        }, 100)
      }
      function reposition () {
        let i
        let rect = funcs.getWindowSize()
        let layoutRect
        for (i = 0; i < windows.length; i++) {
          layoutRect = windows[i].layoutRect()
          windows[i].moveTo(windows[i].settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2), windows[i].settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2))
        }
      }
      $(window).on('resize', reposition)
    }
    let Window = FloatPanel.extend({
      modal: true,
      Defaults: {
        border: 1,
        layout: 'flex',
        containerCls: 'panel',
        role: 'dialog',
        callbacks: {
          submit: function () {
            this.fire('submit', { data: this.toJSON() })
          },
          close: function () {
            this.close()
          }
        }
      },
      init: function (settings) {
        let self = this
        self._super(settings)
        if (self.isRtl()) {
          self.classes.add('rtl')
        }
        self.classes.add('window')
        self.bodyClasses.add('window-body')
        self.state.set('fixed', true)
        if (settings.buttons) {
          self.statusbar = new Panel({
            layout: 'flex',
            border: '1 0 0 0',
            spacing: 3,
            padding: 10,
            align: 'center',
            pack: self.isRtl() ? 'start' : 'end',
            defaults: { type: 'button' },
            items: settings.buttons
          })
          self.statusbar.classes.add('foot')
          self.statusbar.parent(self)
        }
        self.on('click', function (e) {
          let closeClass = self.classPrefix + 'close'
          if (funcs.hasClass(e.target, closeClass) || funcs.hasClass(e.target.parentNode, closeClass)) {
            self.close()
          }
        })
        self.on('cancel', function () {
          self.close()
        })
        self.aria('describedby', self.describedBy || self._id + '-none')
        self.aria('label', settings.title)
        self._fullscreen = false
      },
      recalc: function () {
        let self = this
        let statusbar = self.statusbar
        let layoutRect, width, x, needsRecalc
        if (self._fullscreen) {
          self.layoutRect(funcs.getWindowSize())
          self.layoutRect().contentH = self.layoutRect().innerH
        }
        self._super()
        layoutRect = self.layoutRect()
        if (self.settings.title && !self._fullscreen) {
          width = layoutRect.headerW
          if (width > layoutRect.w) {
            x = layoutRect.x - Math.max(0, width / 2)
            self.layoutRect({
              w: width,
              x: x
            })
            needsRecalc = true
          }
        }
        if (statusbar) {
          statusbar.layoutRect({ w: self.layoutRect().innerW }).recalc()
          width = statusbar.layoutRect().minW + layoutRect.deltaW
          if (width > layoutRect.w) {
            x = layoutRect.x - Math.max(0, width - layoutRect.w)
            self.layoutRect({
              w: width,
              x: x
            })
            needsRecalc = true
          }
        }
        if (needsRecalc) {
          self.recalc()
        }
      },
      initLayoutRect: function () {
        let self = this
        let layoutRect = self._super()
        let deltaH = 0, headEl
        if (self.settings.title && !self._fullscreen) {
          headEl = self.getEl('head')
          let size = funcs.getSize(headEl)
          layoutRect.headerW = size.width
          layoutRect.headerH = size.height
          deltaH += layoutRect.headerH
        }
        if (self.statusbar) {
          deltaH += self.statusbar.layoutRect().h
        }
        layoutRect.deltaH += deltaH
        layoutRect.minH += deltaH
        layoutRect.h += deltaH
        let rect = funcs.getWindowSize()
        layoutRect.x = self.settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2)
        layoutRect.y = self.settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2)
        return layoutRect
      },
      renderHtml: function () {
        let self = this, layout = self._layout, id = self._id, prefix = self.classPrefix
        let settings = self.settings
        let headerHtml = '', footerHtml = '', html = settings.html
        self.preRender()
        layout.preRender(self)
        if (settings.title) {
          headerHtml = '<div id="' + id + '-head" class="' + prefix + 'window-head">' + '<div id="' + id + '-title" class="' + prefix + 'title">' + self.encode(settings.title) + '</div>' + '<div id="' + id + '-dragh" class="' + prefix + 'dragh"></div>' + '<button type="button" class="' + prefix + 'close" aria-hidden="true">' + '<i class="mce-ico mce-i-remove"></i>' + '</button>' + '</div>'
        }
        if (settings.url) {
          html = '<iframe src="' + settings.url + '" tabindex="-1"></iframe>'
        }
        if (typeof html === 'undefined') {
          html = layout.renderHtml(self)
        }
        if (self.statusbar) {
          footerHtml = self.statusbar.renderHtml()
        }
        return '<div id="' + id + '" class="' + self.classes + '" hidefocus="1">' + '<div class="' + self.classPrefix + 'reset" role="application">' + headerHtml + '<div id="' + id + '-body" class="' + self.bodyClasses + '">' + html + '</div>' + footerHtml + '</div>' + '</div>'
      },
      fullscreen: function (state) {
        let self = this
        let documentElement = document.documentElement
        let slowRendering
        let prefix = self.classPrefix
        let layoutRect
        if (state !== self._fullscreen) {
          $(window).on('resize', function () {
            let time
            if (self._fullscreen) {
              if (!slowRendering) {
                time = new Date().getTime()
                let rect = funcs.getWindowSize()
                self.moveTo(0, 0).resizeTo(rect.w, rect.h)
                if (new Date().getTime() - time > 50) {
                  slowRendering = true
                }
              } else {
                if (!self._timer) {
                  self._timer = Delay.setTimeout(function () {
                    let rect = funcs.getWindowSize()
                    self.moveTo(0, 0).resizeTo(rect.w, rect.h)
                    self._timer = 0
                  }, 50)
                }
              }
            }
          })
          layoutRect = self.layoutRect()
          self._fullscreen = state
          if (!state) {
            self.borderBox = $_91ag6bswjd09ez1u.parseBox(self.settings.border)
            self.getEl('head').style.display = ''
            layoutRect.deltaH += layoutRect.headerH
            $([
              documentElement,
              document.body
            ]).removeClass(prefix + 'fullscreen')
            self.classes.remove('fullscreen')
            self.moveTo(self._initial.x, self._initial.y).resizeTo(self._initial.w, self._initial.h)
          } else {
            self._initial = {
              x: layoutRect.x,
              y: layoutRect.y,
              w: layoutRect.w,
              h: layoutRect.h
            }
            self.borderBox = $_91ag6bswjd09ez1u.parseBox('0')
            self.getEl('head').style.display = 'none'
            layoutRect.deltaH -= layoutRect.headerH + 2
            $([
              documentElement,
              document.body
            ]).addClass(prefix + 'fullscreen')
            self.classes.add('fullscreen')
            let rect = funcs.getWindowSize()
            self.moveTo(0, 0).resizeTo(rect.w, rect.h)
          }
        }
        return self.reflow()
      },
      postRender: function () {
        let self = this
        let startPos
        setTimeout(function () {
          self.classes.add('in')
          self.fire('open')
        }, 0)
        self._super()
        if (self.statusbar) {
          self.statusbar.postRender()
        }
        self.focus()
        this.dragHelper = new DragHelper(self._id + '-dragh', {
          start: function () {
            startPos = {
              x: self.layoutRect().x,
              y: self.layoutRect().y
            }
          },
          drag: function (e) {
            self.moveTo(startPos.x + e.deltaX, startPos.y + e.deltaY)
          }
        })
        self.on('submit', function (e) {
          if (!e.isDefaultPrevented()) {
            self.close()
          }
        })
        windows.push(self)
        toggleFullScreenState(true)
      },
      submit: function () {
        return this.fire('submit', { data: this.toJSON() })
      },
      remove: function () {
        let self = this
        let i
        self.dragHelper.destroy()
        self._super()
        if (self.statusbar) {
          this.statusbar.remove()
        }
        toggleBodyFullScreenClasses(self.classPrefix, false)
        i = windows.length
        while (i--) {
          if (windows[i] === self) {
            windows.splice(i, 1)
          }
        }
        toggleFullScreenState(windows.length > 0)
      },
      getContentWindow: function () {
        let ifr = this.getEl().getElementsByTagName('iframe')[0]
        return ifr ? ifr.contentWindow : null
      }
    })
    handleWindowResize()

    let MessageBox = Window.extend({
      init: function (settings) {
        settings = {
          border: 1,
          padding: 20,
          layout: 'flex',
          pack: 'center',
          align: 'center',
          containerCls: 'panel',
          autoScroll: true,
          buttons: {
            type: 'button',
            text: 'Ok',
            action: 'ok'
          },
          items: {
            type: 'label',
            multiline: true,
            maxWidth: 500,
            maxHeight: 200
          }
        }
        this._super(settings)
      },
      Statics: {
        OK: 1,
        OK_CANCEL: 2,
        YES_NO: 3,
        YES_NO_CANCEL: 4,
        msgBox: function (settings) {
          let buttons
          let callback = settings.callback || function () {
          }
          function createButton (text, status, primary) {
            return {
              type: 'button',
              text: text,
              subtype: primary ? 'primary' : '',
              onClick: function (e) {
                e.control.parents()[1].close()
                callback(status)
              }
            }
          }
          switch (settings.buttons) {
            case MessageBox.OK_CANCEL:
              buttons = [
                createButton('Ok', true, true),
                createButton('Cancel', false)
              ]
              break
            case MessageBox.YES_NO:
            case MessageBox.YES_NO_CANCEL:
              buttons = [
                createButton('Yes', 1, true),
                createButton('No', 0)
              ]
              if (settings.buttons === MessageBox.YES_NO_CANCEL) {
                buttons.push(createButton('Cancel', -1))
              }
              break
            default:
              buttons = [createButton('Ok', true, true)]
              break
          }
          return new Window({
            padding: 20,
            x: settings.x,
            y: settings.y,
            minWidth: 300,
            minHeight: 100,
            layout: 'flex',
            pack: 'center',
            align: 'center',
            buttons: buttons,
            title: settings.title,
            role: 'alertdialog',
            items: {
              type: 'label',
              multiline: true,
              maxWidth: 500,
              maxHeight: 200,
              text: settings.text
            },
            onPostRender: function () {
              this.aria('describedby', this.items()[0]._id)
            },
            onClose: settings.onClose,
            onCancel: function () {
              callback(false)
            }
          }).renderTo(document.body).reflow()
        },
        alert: function (settings, callback) {
          if (typeof settings === 'string') {
            settings = { text: settings }
          }
          settings.callback = callback
          return MessageBox.msgBox(settings)
        },
        confirm: function (settings, callback) {
          if (typeof settings === 'string') {
            settings = { text: settings }
          }
          settings.callback = callback
          settings.buttons = MessageBox.OK_CANCEL
          return MessageBox.msgBox(settings)
        }
      }
    })

    function WindowManagerImpl (editor) {
      let open = function (args, params, closeCallback) {
        let win
        args.title = args.title || ' '
        args.url = args.url || args.file
        if (args.url) {
          args.width = parseInt(args.width || 320, 10)
          args.height = parseInt(args.height || 240, 10)
        }
        if (args.body) {
          args.items = {
            defaults: args.defaults,
            type: args.bodyType || 'form',
            items: args.body,
            data: args.data,
            callbacks: args.commands
          }
        }
        if (!args.url && !args.buttons) {
          args.buttons = [
            {
              text: 'Ok',
              subtype: 'primary',
              onclick: function () {
                win.find('form')[0].submit()
              }
            },
            {
              text: 'Cancel',
              onclick: function () {
                win.close()
              }
            }
          ]
        }
        win = new Window(args)
        win.on('close', function () {
          closeCallback(win)
        })
        if (args.data) {
          win.on('postRender', function () {
            this.find('*').each(function (ctrl) {
              let name = ctrl.name()
              if (name in args.data) {
                ctrl.value(args.data[name])
              }
            })
          })
        }
        win.features = args || {}
        win.params = params || {}
        win = win.renderTo().reflow()
        return win
      }
      let alert = function (message, choiceCallback, closeCallback) {
        let win
        win = MessageBox.alert(message, function () {
          choiceCallback()
        })
        win.on('close', function () {
          closeCallback(win)
        })
        return win
      }
      let confirm = function (message, choiceCallback, closeCallback) {
        let win
        win = MessageBox.confirm(message, function (state) {
          choiceCallback(state)
        })
        win.on('close', function () {
          closeCallback(win)
        })
        return win
      }
      let close = function (window) {
        window.close()
      }
      let getParams = function (window) {
        return window.params
      }
      let setParams = function (window, params) {
        window.params = params
      }
      return {
        open: open,
        alert: alert,
        confirm: confirm,
        close: close,
        getParams: getParams,
        setParams: setParams
      }
    }

    let get = function (editor) {
      let renderUI = function (args) {
        return $_cgj0fhrzjd09eyyl.renderUI(editor, this, args)
      }
      let resizeTo = function (w, h) {
        return $_d42g69sjjd09ez05.resizeTo(editor, w, h)
      }
      let resizeBy = function (dw, dh) {
        return $_d42g69sjjd09ez05.resizeBy(editor, dw, dh)
      }
      let getNotificationManagerImpl = function () {
        return NotificationManagerImpl(editor)
      }
      let getWindowManagerImpl = function () {
        return WindowManagerImpl(editor)
      }
      return {
        renderUI: renderUI,
        resizeTo: resizeTo,
        resizeBy: resizeBy,
        getNotificationManagerImpl: getNotificationManagerImpl,
        getWindowManagerImpl: getWindowManagerImpl
      }
    }
    let $_4szhqryjd09eyyk = { get: get }

    let Layout = Class.extend({
      Defaults: {
        firstControlClass: 'first',
        lastControlClass: 'last'
      },
      init: function (settings) {
        this.settings = Tools.extend({}, this.Defaults, settings)
      },
      preRender: function (container) {
        container.bodyClasses.add(this.settings.containerClass)
      },
      applyClasses: function (items) {
        let self = this
        let settings = self.settings
        let firstClass, lastClass, firstItem, lastItem
        firstClass = settings.firstControlClass
        lastClass = settings.lastControlClass
        items.each(function (item) {
          item.classes.remove(firstClass).remove(lastClass).add(settings.controlClass)
          if (item.visible()) {
            if (!firstItem) {
              firstItem = item
            }
            lastItem = item
          }
        })
        if (firstItem) {
          firstItem.classes.add(firstClass)
        }
        if (lastItem) {
          lastItem.classes.add(lastClass)
        }
      },
      renderHtml: function (container) {
        let self = this
        let html = ''
        self.applyClasses(container.items())
        container.items().each(function (item) {
          html += item.renderHtml()
        })
        return html
      },
      recalc: function () {
      },
      postRender: function () {
      },
      isNative: function () {
        return false
      }
    })

    let AbsoluteLayout = Layout.extend({
      Defaults: {
        containerClass: 'abs-layout',
        controlClass: 'abs-layout-item'
      },
      recalc: function (container) {
        container.items().filter(':visible').each(function (ctrl) {
          let settings = ctrl.settings
          ctrl.layoutRect({
            x: settings.x,
            y: settings.y,
            w: settings.w,
            h: settings.h
          })
          if (ctrl.recalc) {
            ctrl.recalc()
          }
        })
      },
      renderHtml: function (container) {
        return '<div id="' + container._id + '-absend" class="' + container.classPrefix + 'abs-end"></div>' + this._super(container)
      }
    })

    let Button = Widget.extend({
      Defaults: {
        classes: 'widget btn',
        role: 'button'
      },
      init: function (settings) {
        let self = this
        let size
        self._super(settings)
        settings = self.settings
        size = self.settings.size
        self.on('click mousedown', function (e) {
          e.preventDefault()
        })
        self.on('touchstart', function (e) {
          self.fire('click', e)
          e.preventDefault()
        })
        if (settings.subtype) {
          self.classes.add(settings.subtype)
        }
        if (size) {
          self.classes.add('btn-' + size)
        }
        if (settings.icon) {
          self.icon(settings.icon)
        }
      },
      icon: function (icon) {
        if (!arguments.length) {
          return this.state.get('icon')
        }
        this.state.set('icon', icon)
        return this
      },
      repaint: function () {
        let btnElm = this.getEl().firstChild
        let btnStyle
        if (btnElm) {
          btnStyle = btnElm.style
          btnStyle.width = btnStyle.height = '100%'
        }
        this._super()
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = self.classPrefix
        let icon = self.state.get('icon'), image
        let text = self.state.get('text')
        let textHtml = ''
        let ariaPressed
        let settings = self.settings
        image = settings.image
        if (image) {
          icon = 'none'
          if (typeof image !== 'string') {
            image = window.getSelection ? image[0] : image[1]
          }
          image = ' style="background-image: url(\'' + image + '\')"'
        } else {
          image = ''
        }
        if (text) {
          self.classes.add('btn-has-text')
          textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
        }
        icon = icon ? prefix + 'ico ' + prefix + 'i-' + icon : ''
        ariaPressed = typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : ''
        return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1"' + ariaPressed + '>' + '<button id="' + id + '-button" role="presentation" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '</button>' + '</div>'
      },
      bindStates: function () {
        let self = this, $ = self.$, textCls = self.classPrefix + 'txt'
        function setButtonText (text) {
          let $span = $('span.' + textCls, self.getEl())
          if (text) {
            if (!$span[0]) {
              $('button:first', self.getEl()).append('<span class="' + textCls + '"></span>')
              $span = $('span.' + textCls, self.getEl())
            }
            $span.html(self.encode(text))
          } else {
            $span.remove()
          }
          self.classes.toggle('btn-has-text', !!text)
        }
        self.state.on('change:text', function (e) {
          setButtonText(e.value)
        })
        self.state.on('change:icon', function (e) {
          let icon = e.value
          let prefix = self.classPrefix
          self.settings.icon = icon
          icon = icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : ''
          let btnElm = self.getEl().firstChild
          let iconElm = btnElm.getElementsByTagName('i')[0]
          if (icon) {
            if (!iconElm || iconElm !== btnElm.firstChild) {
              iconElm = document.createElement('i')
              btnElm.insertBefore(iconElm, btnElm.firstChild)
            }
            iconElm.className = icon
          } else if (iconElm) {
            btnElm.removeChild(iconElm)
          }
          setButtonText(self.state.get('text'))
        })
        return self._super()
      }
    })

    let BrowseButton = Button.extend({
      init: function (settings) {
        let self = this
        settings = Tools.extend({
          text: 'Browse...',
          multiple: false,
          accept: null
        }, settings)
        self._super(settings)
        self.classes.add('browsebutton')
        if (settings.multiple) {
          self.classes.add('multiple')
        }
      },
      postRender: function () {
        let self = this
        let input = funcs.create('input', {
          type: 'file',
          id: self._id + '-browse',
          accept: self.settings.accept
        })
        self._super()
        $(input).on('change', function (e) {
          let files = e.target.files
          self.value = function () {
            if (!files.length) {
              return null
            } else if (self.settings.multiple) {
              return files
            } else {
              return files[0]
            }
          }
          e.preventDefault()
          if (files.length) {
            self.fire('change', e)
          }
        })
        $(input).on('click', function (e) {
          e.stopPropagation()
        })
        $(self.getEl('button')).on('click', function (e) {
          e.stopPropagation()
          input.click()
        })
        self.getEl().appendChild(input)
      },
      remove: function () {
        $(this.getEl('button')).off()
        $(this.getEl('input')).off()
        this._super()
      }
    })

    let ButtonGroup = Container.extend({
      Defaults: {
        defaultType: 'button',
        role: 'group'
      },
      renderHtml: function () {
        let self = this, layout = self._layout
        self.classes.add('btn-group')
        self.preRender()
        layout.preRender(self)
        return '<div id="' + self._id + '" class="' + self.classes + '">' + '<div id="' + self._id + '-body">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
      }
    })

    let Checkbox = Widget.extend({
      Defaults: {
        classes: 'checkbox',
        role: 'checkbox',
        checked: false
      },
      init: function (settings) {
        let self = this
        self._super(settings)
        self.on('click mousedown', function (e) {
          e.preventDefault()
        })
        self.on('click', function (e) {
          e.preventDefault()
          if (!self.disabled()) {
            self.checked(!self.checked())
          }
        })
        self.checked(self.settings.checked)
      },
      checked: function (state) {
        if (!arguments.length) {
          return this.state.get('checked')
        }
        this.state.set('checked', state)
        return this
      },
      value: function (state) {
        if (!arguments.length) {
          return this.checked()
        }
        return this.checked(state)
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = self.classPrefix
        return '<div id="' + id + '" class="' + self.classes + '" unselectable="on" aria-labelledby="' + id + '-al" tabindex="-1">' + '<i class="' + prefix + 'ico ' + prefix + 'i-checkbox"></i>' + '<span id="' + id + '-al" class="' + prefix + 'label">' + self.encode(self.state.get('text')) + '</span>' + '</div>'
      },
      bindStates: function () {
        let self = this
        function checked (state) {
          self.classes.toggle('checked', state)
          self.aria('checked', state)
        }
        self.state.on('change:text', function (e) {
          self.getEl('al').firstChild.data = self.translate(e.value)
        })
        self.state.on('change:checked change:value', function (e) {
          self.fire('change')
          checked(e.value)
        })
        self.state.on('change:icon', function (e) {
          let icon = e.value
          let prefix = self.classPrefix
          if (typeof icon === 'undefined') {
            return self.settings.icon
          }
          self.settings.icon = icon
          icon = icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : ''
          let btnElm = self.getEl().firstChild
          let iconElm = btnElm.getElementsByTagName('i')[0]
          if (icon) {
            if (!iconElm || iconElm !== btnElm.firstChild) {
              iconElm = document.createElement('i')
              btnElm.insertBefore(iconElm, btnElm.firstChild)
            }
            iconElm.className = icon
          } else if (iconElm) {
            btnElm.removeChild(iconElm)
          }
        })
        if (self.state.get('checked')) {
          checked(true)
        }
        return self._super()
      }
    })

    let VK = tinymce.util.Tools.resolve('tinymce.util.VK')

    let ComboBox = Widget.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        settings = self.settings
        self.classes.add('combobox')
        self.subinput = true
        self.ariaTarget = 'inp'
        settings.menu = settings.menu || settings.values
        if (settings.menu) {
          settings.icon = 'caret'
        }
        self.on('click', function (e) {
          let elm = e.target
          let root = self.getEl()
          if (!$.contains(root, elm) && elm !== root) {
            return
          }
          while (elm && elm !== root) {
            if (elm.id && elm.id.indexOf('-open') !== -1) {
              self.fire('action')
              if (settings.menu) {
                self.showMenu()
                if (e.aria) {
                  self.menu.items()[0].focus()
                }
              }
            }
            elm = elm.parentNode
          }
        })
        self.on('keydown', function (e) {
          let rootControl
          if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
            e.preventDefault()
            self.parents().reverse().each(function (ctrl) {
              if (ctrl.toJSON) {
                rootControl = ctrl
                return false
              }
            })
            self.fire('submit', { data: rootControl.toJSON() })
          }
        })
        self.on('keyup', function (e) {
          if (e.target.nodeName === 'INPUT') {
            let oldValue = self.state.get('value')
            let newValue = e.target.value
            if (newValue !== oldValue) {
              self.state.set('value', newValue)
              self.fire('autocomplete', e)
            }
          }
        })
        self.on('mouseover', function (e) {
          let tooltip = self.tooltip().moveTo(-65535)
          if (self.statusLevel() && e.target.className.indexOf(self.classPrefix + 'status') !== -1) {
            let statusMessage = self.statusMessage() || 'Ok'
            let rel = tooltip.text(statusMessage).show().testMoveRel(e.target, [
              'bc-tc',
              'bc-tl',
              'bc-tr'
            ])
            tooltip.classes.toggle('tooltip-n', rel === 'bc-tc')
            tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl')
            tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr')
            tooltip.moveRel(e.target, rel)
          }
        })
      },
      statusLevel: function (value) {
        if (arguments.length > 0) {
          this.state.set('statusLevel', value)
        }
        return this.state.get('statusLevel')
      },
      statusMessage: function (value) {
        if (arguments.length > 0) {
          this.state.set('statusMessage', value)
        }
        return this.state.get('statusMessage')
      },
      showMenu: function () {
        let self = this
        let settings = self.settings
        let menu
        if (!self.menu) {
          menu = settings.menu || []
          if (menu.length) {
            menu = {
              type: 'menu',
              items: menu
            }
          } else {
            menu.type = menu.type || 'menu'
          }
          self.menu = Factory.create(menu).parent(self).renderTo(self.getContainerElm())
          self.fire('createmenu')
          self.menu.reflow()
          self.menu.on('cancel', function (e) {
            if (e.control === self.menu) {
              self.focus()
            }
          })
          self.menu.on('show hide', function (e) {
            e.control.items().each(function (ctrl) {
              ctrl.active(ctrl.value() === self.value())
            })
          }).fire('show')
          self.menu.on('select', function (e) {
            self.value(e.control.value())
          })
          self.on('focusin', function (e) {
            if (e.target.tagName.toUpperCase() === 'INPUT') {
              self.menu.hide()
            }
          })
          self.aria('expanded', true)
        }
        self.menu.show()
        self.menu.layoutRect({ w: self.layoutRect().w })
        self.menu.moveRel(self.getEl(), self.isRtl() ? [
          'br-tr',
          'tr-br'
        ] : [
          'bl-tl',
          'tl-bl'
        ])
      },
      focus: function () {
        this.getEl('inp').focus()
      },
      repaint: function () {
        let self = this, elm = self.getEl(), openElm = self.getEl('open'), rect = self.layoutRect()
        let width, lineHeight, innerPadding = 0
        let inputElm = elm.firstChild
        if (self.statusLevel() && self.statusLevel() !== 'none') {
          innerPadding = parseInt(funcs.getRuntimeStyle(inputElm, 'padding-right'), 10) - parseInt(funcs.getRuntimeStyle(inputElm, 'padding-left'), 10)
        }
        if (openElm) {
          width = rect.w - funcs.getSize(openElm).width - 10
        } else {
          width = rect.w - 10
        }
        let doc = document
        if (doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
          lineHeight = self.layoutRect().h - 2 + 'px'
        }
        $(inputElm).css({
          width: width - innerPadding,
          lineHeight: lineHeight
        })
        self._super()
        return self
      },
      postRender: function () {
        let self = this
        $(this.getEl('inp')).on('change', function (e) {
          self.state.set('value', e.target.value)
          self.fire('change', e)
        })
        return self._super()
      },
      renderHtml: function () {
        let self = this, id = self._id, settings = self.settings, prefix = self.classPrefix
        let value = self.state.get('value') || ''
        let icon, text, openBtnHtml = '', extraAttrs = '', statusHtml = ''
        if ('spellcheck' in settings) {
          extraAttrs += ' spellcheck="' + settings.spellcheck + '"'
        }
        if (settings.maxLength) {
          extraAttrs += ' maxlength="' + settings.maxLength + '"'
        }
        if (settings.size) {
          extraAttrs += ' size="' + settings.size + '"'
        }
        if (settings.subtype) {
          extraAttrs += ' type="' + settings.subtype + '"'
        }
        statusHtml = '<i id="' + id + '-status" class="mce-status mce-ico" style="display: none"></i>'
        if (self.disabled()) {
          extraAttrs += ' disabled="disabled"'
        }
        icon = settings.icon
        if (icon && icon !== 'caret') {
          icon = prefix + 'ico ' + prefix + 'i-' + settings.icon
        }
        text = self.state.get('text')
        if (icon || text) {
          openBtnHtml = '<div id="' + id + '-open" class="' + prefix + 'btn ' + prefix + 'open" tabIndex="-1" role="button">' + '<button id="' + id + '-action" type="button" hidefocus="1" tabindex="-1">' + (icon !== 'caret' ? '<i class="' + icon + '"></i>' : '<i class="' + prefix + 'caret"></i>') + (text ? (icon ? ' ' : '') + text : '') + '</button>' + '</div>'
          self.classes.add('has-open')
        }
        return '<div id="' + id + '" class="' + self.classes + '">' + '<input id="' + id + '-inp" class="' + prefix + 'textbox" value="' + self.encode(value, false) + '" hidefocus="1"' + extraAttrs + ' placeholder="' + self.encode(settings.placeholder) + '" />' + statusHtml + openBtnHtml + '</div>'
      },
      value: function (value) {
        if (arguments.length) {
          this.state.set('value', value)
          return this
        }
        if (this.state.get('rendered')) {
          this.state.set('value', this.getEl('inp').value)
        }
        return this.state.get('value')
      },
      showAutoComplete: function (items, term) {
        let self = this
        if (items.length === 0) {
          self.hideMenu()
          return
        }
        let insert = function (value, title) {
          return function () {
            self.fire('selectitem', {
              title: title,
              value: value
            })
          }
        }
        if (self.menu) {
          self.menu.items().remove()
        } else {
          self.menu = Factory.create({
            type: 'menu',
            classes: 'combobox-menu',
            layout: 'flow'
          }).parent(self).renderTo()
        }
        Tools.each(items, function (item) {
          self.menu.add({
            text: item.title,
            url: item.previewUrl,
            match: term,
            classes: 'menu-item-ellipsis',
            onclick: insert(item.value, item.title)
          })
        })
        self.menu.renderNew()
        self.hideMenu()
        self.menu.on('cancel', function (e) {
          if (e.control.parent() === self.menu) {
            e.stopPropagation()
            self.focus()
            self.hideMenu()
          }
        })
        self.menu.on('select', function () {
          self.focus()
        })
        let maxW = self.layoutRect().w
        self.menu.layoutRect({
          w: maxW,
          minW: 0,
          maxW: maxW
        })
        self.menu.repaint()
        self.menu.reflow()
        self.menu.show()
        self.menu.moveRel(self.getEl(), self.isRtl() ? [
          'br-tr',
          'tr-br'
        ] : [
          'bl-tl',
          'tl-bl'
        ])
      },
      hideMenu: function () {
        if (this.menu) {
          this.menu.hide()
        }
      },
      bindStates: function () {
        let self = this
        self.state.on('change:value', function (e) {
          if (self.getEl('inp').value !== e.value) {
            self.getEl('inp').value = e.value
          }
        })
        self.state.on('change:disabled', function (e) {
          self.getEl('inp').disabled = e.value
        })
        self.state.on('change:statusLevel', function (e) {
          let statusIconElm = self.getEl('status')
          let prefix = self.classPrefix, value = e.value
          funcs.css(statusIconElm, 'display', value === 'none' ? 'none' : '')
          funcs.toggleClass(statusIconElm, prefix + 'i-checkmark', value === 'ok')
          funcs.toggleClass(statusIconElm, prefix + 'i-warning', value === 'warn')
          funcs.toggleClass(statusIconElm, prefix + 'i-error', value === 'error')
          self.classes.toggle('has-status', value !== 'none')
          self.repaint()
        })
        funcs.on(self.getEl('status'), 'mouseleave', function () {
          self.tooltip().hide()
        })
        self.on('cancel', function (e) {
          if (self.menu && self.menu.visible()) {
            e.stopPropagation()
            self.hideMenu()
          }
        })
        let focusIdx = function (idx, menu) {
          if (menu && menu.items().length > 0) {
            menu.items().eq(idx)[0].focus()
          }
        }
        self.on('keydown', function (e) {
          let keyCode = e.keyCode
          if (e.target.nodeName === 'INPUT') {
            if (keyCode === VK.DOWN) {
              e.preventDefault()
              self.fire('autocomplete')
              focusIdx(0, self.menu)
            } else if (keyCode === VK.UP) {
              e.preventDefault()
              focusIdx(-1, self.menu)
            }
          }
        })
        return self._super()
      },
      remove: function () {
        $(this.getEl('inp')).off()
        if (this.menu) {
          this.menu.remove()
        }
        this._super()
      }
    })

    let ColorBox = ComboBox.extend({
      init: function (settings) {
        let self = this
        settings.spellcheck = false
        if (settings.onaction) {
          settings.icon = 'none'
        }
        self._super(settings)
        self.classes.add('colorbox')
        self.on('change keyup postrender', function () {
          self.repaintColor(self.value())
        })
      },
      repaintColor: function (value) {
        let openElm = this.getEl('open')
        let elm = openElm ? openElm.getElementsByTagName('i')[0] : null
        if (elm) {
          try {
            elm.style.background = value
          } catch (ex) {
          }
        }
      },
      bindStates: function () {
        let self = this
        self.state.on('change:value', function (e) {
          if (self.state.get('rendered')) {
            self.repaintColor(e.value)
          }
        })
        return self._super()
      }
    })

    let PanelButton = Button.extend({
      showPanel: function () {
        let self = this, settings = self.settings
        self.classes.add('opened')
        if (!self.panel) {
          let panelSettings = settings.panel
          if (panelSettings.type) {
            panelSettings = {
              layout: 'grid',
              items: panelSettings
            }
          }
          panelSettings.role = panelSettings.role || 'dialog'
          panelSettings.popover = true
          panelSettings.autohide = true
          panelSettings.ariaRoot = true
          self.panel = new FloatPanel(panelSettings).on('hide', function () {
            self.classes.remove('opened')
          }).on('cancel', function (e) {
            e.stopPropagation()
            self.focus()
            self.hidePanel()
          }).parent(self).renderTo(self.getContainerElm())
          self.panel.fire('show')
          self.panel.reflow()
        } else {
          self.panel.show()
        }
        let rel = self.panel.testMoveRel(self.getEl(), settings.popoverAlign || (self.isRtl() ? [
          'bc-tc',
          'bc-tl',
          'bc-tr'
        ] : [
          'bc-tc',
          'bc-tr',
          'bc-tl'
        ]))
        self.panel.classes.toggle('start', rel === 'bc-tl')
        self.panel.classes.toggle('end', rel === 'bc-tr')
        self.panel.moveRel(self.getEl(), rel)
      },
      hidePanel: function () {
        let self = this
        if (self.panel) {
          self.panel.hide()
        }
      },
      postRender: function () {
        let self = this
        self.aria('haspopup', true)
        self.on('click', function (e) {
          if (e.control === self) {
            if (self.panel && self.panel.visible()) {
              self.hidePanel()
            } else {
              self.showPanel()
              self.panel.focus(!!e.aria)
            }
          }
        })
        return self._super()
      },
      remove: function () {
        if (this.panel) {
          this.panel.remove()
          this.panel = null
        }
        return this._super()
      }
    })

    let DOM$3 = DOMUtils.DOM
    let ColorButton = PanelButton.extend({
      init: function (settings) {
        this._super(settings)
        this.classes.add('splitbtn')
        this.classes.add('colorbutton')
      },
      color: function (color) {
        if (color) {
          this._color = color
          this.getEl('preview').style.backgroundColor = color
          return this
        }
        return this._color
      },
      resetColor: function () {
        this._color = null
        this.getEl('preview').style.backgroundColor = null
        return this
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = self.classPrefix, text = self.state.get('text')
        let icon = self.settings.icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : ''
        let image = self.settings.image ? ' style="background-image: url(\'' + self.settings.image + '\')"' : ''
        let textHtml = ''
        if (text) {
          self.classes.add('btn-has-text')
          textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
        }
        return '<div id="' + id + '" class="' + self.classes + '" role="button" tabindex="-1" aria-haspopup="true">' + '<button role="presentation" hidefocus="1" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + '<span id="' + id + '-preview" class="' + prefix + 'preview"></span>' + textHtml + '</button>' + '<button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">' + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>'
      },
      postRender: function () {
        let self = this, onClickHandler = self.settings.onclick
        self.on('click', function (e) {
          if (e.aria && e.aria.key === 'down') {
            return
          }
          if (e.control === self && !DOM$3.getParent(e.target, '.' + self.classPrefix + 'open')) {
            e.stopImmediatePropagation()
            onClickHandler.call(self, e)
          }
        })
        delete self.settings.onclick
        return self._super()
      }
    })

    let Color = tinymce.util.Tools.resolve('tinymce.util.Color')

    let ColorPicker = Widget.extend({
      Defaults: { classes: 'widget colorpicker' },
      init: function (settings) {
        this._super(settings)
      },
      postRender: function () {
        let self = this
        let color = self.color()
        let hsv, hueRootElm, huePointElm, svRootElm, svPointElm
        hueRootElm = self.getEl('h')
        huePointElm = self.getEl('hp')
        svRootElm = self.getEl('sv')
        svPointElm = self.getEl('svp')
        function getPos (elm, event) {
          let pos = funcs.getPos(elm)
          let x, y
          x = event.pageX - pos.x
          y = event.pageY - pos.y
          x = Math.max(0, Math.min(x / elm.clientWidth, 1))
          y = Math.max(0, Math.min(y / elm.clientHeight, 1))
          return {
            x: x,
            y: y
          }
        }
        function updateColor (hsv, hueUpdate) {
          let hue = (360 - hsv.h) / 360
          funcs.css(huePointElm, { top: hue * 100 + '%' })
          if (!hueUpdate) {
            funcs.css(svPointElm, {
              left: hsv.s + '%',
              top: 100 - hsv.v + '%'
            })
          }
          svRootElm.style.background = Color({
            s: 100,
            v: 100,
            h: hsv.h
          }).toHex()
          self.color().parse({
            s: hsv.s,
            v: hsv.v,
            h: hsv.h
          })
        }
        function updateSaturationAndValue (e) {
          let pos
          pos = getPos(svRootElm, e)
          hsv.s = pos.x * 100
          hsv.v = (1 - pos.y) * 100
          updateColor(hsv)
          self.fire('change')
        }
        function updateHue (e) {
          let pos
          pos = getPos(hueRootElm, e)
          hsv = color.toHsv()
          hsv.h = (1 - pos.y) * 360
          updateColor(hsv, true)
          self.fire('change')
        }
        self._repaint = function () {
          hsv = color.toHsv()
          updateColor(hsv)
        }
        self._super()
        self._svdraghelper = new DragHelper(self._id + '-sv', {
          start: updateSaturationAndValue,
          drag: updateSaturationAndValue
        })
        self._hdraghelper = new DragHelper(self._id + '-h', {
          start: updateHue,
          drag: updateHue
        })
        self._repaint()
      },
      rgb: function () {
        return this.color().toRgb()
      },
      value: function (value) {
        let self = this
        if (arguments.length) {
          self.color().parse(value)
          if (self._rendered) {
            self._repaint()
          }
        } else {
          return self.color().toHex()
        }
      },
      color: function () {
        if (!this._color) {
          this._color = Color()
        }
        return this._color
      },
      renderHtml: function () {
        let self = this
        let id = self._id
        let prefix = self.classPrefix
        let hueHtml
        let stops = '#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000'
        function getOldIeFallbackHtml () {
          let i, l, html = '', gradientPrefix, stopsList
          gradientPrefix = 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='
          stopsList = stops.split(',')
          for (i = 0, l = stopsList.length - 1; i < l; i++) {
            html += '<div class="' + prefix + 'colorpicker-h-chunk" style="' + 'height:' + 100 / l + '%;' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ');' + '-ms-' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ')' + '"></div>'
          }
          return html
        }
        let gradientCssText = 'background: -ms-linear-gradient(top,' + stops + ');' + 'background: linear-gradient(to bottom,' + stops + ');'
        hueHtml = '<div id="' + id + '-h" class="' + prefix + 'colorpicker-h" style="' + gradientCssText + '">' + getOldIeFallbackHtml() + '<div id="' + id + '-hp" class="' + prefix + 'colorpicker-h-marker"></div>' + '</div>'
        return '<div id="' + id + '" class="' + self.classes + '">' + '<div id="' + id + '-sv" class="' + prefix + 'colorpicker-sv">' + '<div class="' + prefix + 'colorpicker-overlay1">' + '<div class="' + prefix + 'colorpicker-overlay2">' + '<div id="' + id + '-svp" class="' + prefix + 'colorpicker-selector1">' + '<div class="' + prefix + 'colorpicker-selector2"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + hueHtml + '</div>'
      }
    })

    let DropZone = Widget.extend({
      init: function (settings) {
        let self = this
        settings = Tools.extend({
          height: 100,
          text: 'Drop an image here',
          multiple: false,
          accept: null
        }, settings)
        self._super(settings)
        self.classes.add('dropzone')
        if (settings.multiple) {
          self.classes.add('multiple')
        }
      },
      renderHtml: function () {
        let self = this
        let attrs, elm
        let cfg = self.settings
        attrs = {
          id: self._id,
          hidefocus: '1'
        }
        elm = funcs.create('div', attrs, '<span>' + this.translate(cfg.text) + '</span>')
        if (cfg.height) {
          funcs.css(elm, 'height', cfg.height + 'px')
        }
        if (cfg.width) {
          funcs.css(elm, 'width', cfg.width + 'px')
        }
        elm.className = self.classes
        return elm.outerHTML
      },
      postRender: function () {
        let self = this
        let toggleDragClass = function (e) {
          e.preventDefault()
          self.classes.toggle('dragenter')
          self.getEl().className = self.classes
        }
        let filter = function (files) {
          let accept = self.settings.accept
          if (typeof accept !== 'string') {
            return files
          }
          let re = new RegExp('(' + accept.split(/\s*,\s*/).join('|') + ')$', 'i')
          return Tools.grep(files, function (file) {
            return re.test(file.name)
          })
        }
        self._super()
        self.$el.on('dragover', function (e) {
          e.preventDefault()
        })
        self.$el.on('dragenter', toggleDragClass)
        self.$el.on('dragleave', toggleDragClass)
        self.$el.on('drop', function (e) {
          e.preventDefault()
          if (self.state.get('disabled')) {
            return
          }
          let files = filter(e.dataTransfer.files)
          self.value = function () {
            if (!files.length) {
              return null
            } else if (self.settings.multiple) {
              return files
            } else {
              return files[0]
            }
          }
          if (files.length) {
            self.fire('change', e)
          }
        })
      },
      remove: function () {
        this.$el.off()
        this._super()
      }
    })

    let Path = Widget.extend({
      init: function (settings) {
        let self = this
        if (!settings.delimiter) {
          settings.delimiter = '\xBB'
        }
        self._super(settings)
        self.classes.add('path')
        self.canFocus = true
        self.on('click', function (e) {
          let index
          let target = e.target
          if (index = target.getAttribute('data-index')) {
            self.fire('select', {
              value: self.row()[index],
              index: index
            })
          }
        })
        self.row(self.settings.row)
      },
      focus: function () {
        let self = this
        self.getEl().firstChild.focus()
        return self
      },
      row: function (row) {
        if (!arguments.length) {
          return this.state.get('row')
        }
        this.state.set('row', row)
        return this
      },
      renderHtml: function () {
        let self = this
        return '<div id="' + self._id + '" class="' + self.classes + '">' + self._getDataPathHtml(self.state.get('row')) + '</div>'
      },
      bindStates: function () {
        let self = this
        self.state.on('change:row', function (e) {
          self.innerHtml(self._getDataPathHtml(e.value))
        })
        return self._super()
      },
      _getDataPathHtml: function (data) {
        let self = this
        let parts = data || []
        let i, l, html = ''
        let prefix = self.classPrefix
        for (i = 0, l = parts.length; i < l; i++) {
          html += (i > 0 ? '<div class="' + prefix + 'divider" aria-hidden="true"> ' + self.settings.delimiter + ' </div>' : '') + '<div role="button" class="' + prefix + 'path-item' + (i === l - 1 ? ' ' + prefix + 'last' : '') + '" data-index="' + i + '" tabindex="-1" id="' + self._id + '-' + i + '" aria-level="' + (i + 1) + '">' + parts[i].name + '</div>'
        }
        if (!html) {
          html = '<div class="' + prefix + 'path-item">\xA0</div>'
        }
        return html
      }
    })

    let ElementPath = Path.extend({
      postRender: function () {
        let self = this, editor = self.settings.editor
        function isHidden (elm) {
          if (elm.nodeType === 1) {
            if (elm.nodeName === 'BR' || !!elm.getAttribute('data-mce-bogus')) {
              return true
            }
            if (elm.getAttribute('data-mce-type') === 'bookmark') {
              return true
            }
          }
          return false
        }
        if (editor.settings.elementpath !== false) {
          self.on('select', function (e) {
            editor.focus()
            editor.selection.select(this.row()[e.index].element)
            editor.nodeChanged()
          })
          editor.on('nodeChange', function (e) {
            let outParents = []
            let parents = e.parents
            let i = parents.length
            while (i--) {
              if (parents[i].nodeType === 1 && !isHidden(parents[i])) {
                let args = editor.fire('ResolveName', {
                  name: parents[i].nodeName.toLowerCase(),
                  target: parents[i]
                })
                if (!args.isDefaultPrevented()) {
                  outParents.push({
                    name: args.name,
                    element: parents[i]
                  })
                }
                if (args.isPropagationStopped()) {
                  break
                }
              }
            }
            self.row(outParents)
          })
        }
        return self._super()
      }
    })

    let FormItem = Container.extend({
      Defaults: {
        layout: 'flex',
        align: 'center',
        defaults: { flex: 1 }
      },
      renderHtml: function () {
        let self = this, layout = self._layout, prefix = self.classPrefix
        self.classes.add('formitem')
        layout.preRender(self)
        return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<div id="' + self._id + '-title" class="' + prefix + 'title">' + self.settings.title + '</div>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>'
      }
    })

    let Form = Container.extend({
      Defaults: {
        containerCls: 'form',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        flex: 1,
        padding: 15,
        labelGap: 30,
        spacing: 10,
        callbacks: {
          submit: function () {
            this.submit()
          }
        }
      },
      preRender: function () {
        let self = this, items = self.items()
        if (!self.settings.formItemDefaults) {
          self.settings.formItemDefaults = {
            layout: 'flex',
            autoResize: 'overflow',
            defaults: { flex: 1 }
          }
        }
        items.each(function (ctrl) {
          let formItem
          let label = ctrl.settings.label
          if (label) {
            formItem = new FormItem(Tools.extend({
              items: {
                type: 'label',
                id: ctrl._id + '-l',
                text: label,
                flex: 0,
                forId: ctrl._id,
                disabled: ctrl.disabled()
              }
            }, self.settings.formItemDefaults))
            formItem.type = 'formitem'
            ctrl.aria('labelledby', ctrl._id + '-l')
            if (typeof ctrl.settings.flex === 'undefined') {
              ctrl.settings.flex = 1
            }
            self.replace(ctrl, formItem)
            formItem.add(ctrl)
          }
        })
      },
      submit: function () {
        return this.fire('submit', { data: this.toJSON() })
      },
      postRender: function () {
        let self = this
        self._super()
        self.fromJSON(self.settings.data)
      },
      bindStates: function () {
        let self = this
        self._super()
        function recalcLabels () {
          let maxLabelWidth = 0
          let labels = []
          let i, labelGap, items
          if (self.settings.labelGapCalc === false) {
            return
          }
          if (self.settings.labelGapCalc === 'children') {
            items = self.find('formitem')
          } else {
            items = self.items()
          }
          items.filter('formitem').each(function (item) {
            let labelCtrl = item.items()[0], labelWidth = labelCtrl.getEl().clientWidth
            maxLabelWidth = labelWidth > maxLabelWidth ? labelWidth : maxLabelWidth
            labels.push(labelCtrl)
          })
          labelGap = self.settings.labelGap || 0
          i = labels.length
          while (i--) {
            labels[i].settings.minWidth = maxLabelWidth + labelGap
          }
        }
        self.on('show', recalcLabels)
        recalcLabels()
      }
    })

    let FieldSet = Form.extend({
      Defaults: {
        containerCls: 'fieldset',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        flex: 1,
        padding: '25 15 5 15',
        labelGap: 30,
        spacing: 10,
        border: 1
      },
      renderHtml: function () {
        let self = this, layout = self._layout, prefix = self.classPrefix
        self.preRender()
        layout.preRender(self)
        return '<fieldset id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<legend id="' + self._id + '-title" class="' + prefix + 'fieldset-title">' + self.settings.title + '</legend>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</fieldset>'
      }
    })

    let unique$1 = 0
    let generate = function (prefix) {
      let date = new Date()
      let time = date.getTime()
      let random = Math.floor(Math.random() * 1000000000)
      unique$1++
      return prefix + '_' + random + unique$1 + String(time)
    }
    let $_bscuiau4jd09ez63 = { generate: generate }

    let fromHtml = function (html, scope) {
      let doc = scope || document
      let div = doc.createElement('div')
      div.innerHTML = html
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html)
        throw 'HTML must have a single root node'
      }
      return fromDom(div.childNodes[0])
    }
    let fromTag = function (tag, scope) {
      let doc = scope || document
      let node = doc.createElement(tag)
      return fromDom(node)
    }
    let fromText = function (text, scope) {
      let doc = scope || document
      let node = doc.createTextNode(text)
      return fromDom(node)
    }
    let fromDom = function (node) {
      if (node === null || node === undefined) { throw new Error('Node cannot be null or undefined') }
      return { dom: $_4iv73osfjd09eyzh.constant(node) }
    }
    let fromPoint = function (doc, x, y) {
      return $_dqtixqsejd09eyzf.from(doc.dom().elementFromPoint(x, y)).map(fromDom)
    }
    let $_1p2zlou5jd09ez64 = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    }

    let cached = function (f) {
      let called = false
      let r
      return function () {
        if (!called) {
          called = true
          r = f.apply(null, arguments)
        }
        return r
      }
    }
    let $_c18ax4u9jd09ez6g = { cached: cached }

    let $_7qkno9ubjd09ez6j = {
      ATTRIBUTE: 2,
      CDATA_SECTION: 4,
      COMMENT: 8,
      DOCUMENT: 9,
      DOCUMENT_TYPE: 10,
      DOCUMENT_FRAGMENT: 11,
      ELEMENT: 1,
      TEXT: 3,
      PROCESSING_INSTRUCTION: 7,
      ENTITY_REFERENCE: 5,
      ENTITY: 6,
      NOTATION: 12
    }

    let name = function (element) {
      let r = element.dom().nodeName
      return r.toLowerCase()
    }
    let type = function (element) {
      return element.dom().nodeType
    }
    let value = function (element) {
      return element.dom().nodeValue
    }
    let isType = function (t) {
      return function (element) {
        return type(element) === t
      }
    }
    let isComment = function (element) {
      return type(element) === $_7qkno9ubjd09ez6j.COMMENT || name(element) === '#comment'
    }
    let isElement = isType($_7qkno9ubjd09ez6j.ELEMENT)
    let isText = isType($_7qkno9ubjd09ez6j.TEXT)
    let isDocument = isType($_7qkno9ubjd09ez6j.DOCUMENT)
    let $_4lqsjouajd09ez6h = {
      name: name,
      type: type,
      value: value,
      isElement: isElement,
      isText: isText,
      isDocument: isDocument,
      isComment: isComment
    }

    let inBody = function (element) {
      let dom = $_4lqsjouajd09ez6h.isText(element) ? element.dom().parentNode : element.dom()
      return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom)
    }
    let body = $_c18ax4u9jd09ez6g.cached(function () {
      return getBody($_1p2zlou5jd09ez64.fromDom(document))
    })
    let getBody = function (doc) {
      let body = doc.dom().body
      if (body === null || body === undefined) { throw 'Body is not available yet' }
      return $_1p2zlou5jd09ez64.fromDom(body)
    }
    let $_w0rbbu8jd09ez6d = {
      body: body,
      getBody: getBody,
      inBody: inBody
    }

    let typeOf = function (x) {
      if (x === null) { return 'null' }
      let t = typeof x
      if (t === 'object' && Array.prototype.isPrototypeOf(x)) { return 'array' }
      if (t === 'object' && String.prototype.isPrototypeOf(x)) { return 'string' }
      return t
    }
    let isType$1 = function (type) {
      return function (value) {
        return typeOf(value) === type
      }
    }
    let $_6urfrtudjd09ez72 = {
      isString: isType$1('string'),
      isObject: isType$1('object'),
      isArray: isType$1('array'),
      isNull: isType$1('null'),
      isBoolean: isType$1('boolean'),
      isUndefined: isType$1('undefined'),
      isFunction: isType$1('function'),
      isNumber: isType$1('number')
    }

    function Immutable () {
      let fields = arguments
      return function () {
        let values = new Array(arguments.length)
        for (let i = 0; i < values.length; i++) { values[i] = arguments[i] }
        if (fields.length !== values.length) { throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments') }
        let struct = {}
        $_1z9gljsijd09ez00.each(fields, function (name, i) {
          struct[name] = $_4iv73osfjd09eyzh.constant(values[i])
        })
        return struct
      }
    }

    let keys = (function () {
      let fastKeys = Object.keys
      let slowKeys = function (o) {
        let r = []
        for (let i in o) {
          if (o.hasOwnProperty(i)) {
            r.push(i)
          }
        }
        return r
      }
      return fastKeys === undefined ? slowKeys : fastKeys
    }())
    let each$1 = function (obj, f) {
      let props = keys(obj)
      for (let k = 0, len = props.length; k < len; k++) {
        let i = props[k]
        let x = obj[i]
        f(x, i, obj)
      }
    }
    let objectMap = function (obj, f) {
      return tupleMap(obj, function (x, i, obj) {
        return {
          k: i,
          v: f(x, i, obj)
        }
      })
    }
    let tupleMap = function (obj, f) {
      let r = {}
      each$1(obj, function (x, i) {
        let tuple = f(x, i, obj)
        r[tuple.k] = tuple.v
      })
      return r
    }
    let bifilter = function (obj, pred) {
      let t = {}
      let f = {}
      each$1(obj, function (x, i) {
        let branch = pred(x, i) ? t : f
        branch[i] = x
      })
      return {
        t: t,
        f: f
      }
    }
    let mapToArray = function (obj, f) {
      let r = []
      each$1(obj, function (value, name) {
        r.push(f(value, name))
      })
      return r
    }
    let find$1 = function (obj, pred) {
      let props = keys(obj)
      for (let k = 0, len = props.length; k < len; k++) {
        let i = props[k]
        let x = obj[i]
        if (pred(x, i, obj)) {
          return $_dqtixqsejd09eyzf.some(x)
        }
      }
      return $_dqtixqsejd09eyzf.none()
    }
    let values = function (obj) {
      return mapToArray(obj, function (v) {
        return v
      })
    }
    let size = function (obj) {
      return values(obj).length
    }
    let $_d595kxuhjd09ez78 = {
      bifilter: bifilter,
      each: each$1,
      map: objectMap,
      mapToArray: mapToArray,
      tupleMap: tupleMap,
      find: find$1,
      keys: keys,
      values: values,
      size: size
    }

    let sort$1 = function (arr) {
      return arr.slice(0).sort()
    }
    let reqMessage = function (required, keys) {
      throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.')
    }
    let unsuppMessage = function (unsupported) {
      throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '))
    }
    let validateStrArr = function (label, array) {
      if (!$_6urfrtudjd09ez72.isArray(array)) { throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.') }
      $_1z9gljsijd09ez00.each(array, function (a) {
        if (!$_6urfrtudjd09ez72.isString(a)) { throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.') }
      })
    }
    let invalidTypeMessage = function (incorrect, type) {
      throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.')
    }
    let checkDupes = function (everything) {
      let sorted = sort$1(everything)
      let dupe = $_1z9gljsijd09ez00.find(sorted, function (s, i) {
        return i < sorted.length - 1 && s === sorted[i + 1]
      })
      dupe.each(function (d) {
        throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].')
      })
    }
    let $_g9zeoguijd09ez7b = {
      sort: sort$1,
      reqMessage: reqMessage,
      unsuppMessage: unsuppMessage,
      validateStrArr: validateStrArr,
      invalidTypeMessage: invalidTypeMessage,
      checkDupes: checkDupes
    }

    function MixedBag (required, optional) {
      let everything = required.concat(optional)
      if (everything.length === 0) { throw new Error('You must specify at least one required or optional field.') }
      $_g9zeoguijd09ez7b.validateStrArr('required', required)
      $_g9zeoguijd09ez7b.validateStrArr('optional', optional)
      $_g9zeoguijd09ez7b.checkDupes(everything)
      return function (obj) {
        let keys = $_d595kxuhjd09ez78.keys(obj)
        let allReqd = $_1z9gljsijd09ez00.forall(required, function (req) {
          return $_1z9gljsijd09ez00.contains(keys, req)
        })
        if (!allReqd) { $_g9zeoguijd09ez7b.reqMessage(required, keys) }
        let unsupported = $_1z9gljsijd09ez00.filter(keys, function (key) {
          return !$_1z9gljsijd09ez00.contains(everything, key)
        })
        if (unsupported.length > 0) { $_g9zeoguijd09ez7b.unsuppMessage(unsupported) }
        let r = {}
        $_1z9gljsijd09ez00.each(required, function (req) {
          r[req] = $_4iv73osfjd09eyzh.constant(obj[req])
        })
        $_1z9gljsijd09ez00.each(optional, function (opt) {
          r[opt] = $_4iv73osfjd09eyzh.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_dqtixqsejd09eyzf.some(obj[opt]) : $_dqtixqsejd09eyzf.none())
        })
        return r
      }
    }

    let $_bvnitduejd09ez73 = {
      immutable: Immutable,
      immutableBag: MixedBag
    }

    let toArray = function (target, f) {
      let r = []
      let recurse = function (e) {
        r.push(e)
        return f(e)
      }
      let cur = f(target)
      do {
        cur = cur.bind(recurse)
      } while (cur.isSome())
      return r
    }
    let $_5kvp2vujjd09ez7d = { toArray: toArray }

    let global = typeof window !== 'undefined' ? window : Function('return this;')()

    let path = function (parts, scope) {
      let o = scope !== undefined && scope !== null ? scope : global
      for (let i = 0; i < parts.length && o !== undefined && o !== null; ++i) { o = o[parts[i]] }
      return o
    }
    let resolve = function (p, scope) {
      let parts = p.split('.')
      return path(parts, scope)
    }
    let step = function (o, part) {
      if (o[part] === undefined || o[part] === null) { o[part] = {} }
      return o[part]
    }
    let forge = function (parts, target) {
      let o = target !== undefined ? target : global
      for (let i = 0; i < parts.length; ++i) { o = step(o, parts[i]) }
      return o
    }
    let namespace = function (name, target) {
      let parts = name.split('.')
      return forge(parts, target)
    }
    let $_fo7tkmunjd09ez7n = {
      path: path,
      resolve: resolve,
      forge: forge,
      namespace: namespace
    }

    let unsafe = function (name, scope) {
      return $_fo7tkmunjd09ez7n.resolve(name, scope)
    }
    let getOrDie = function (name, scope) {
      let actual = unsafe(name, scope)
      if (actual === undefined || actual === null) { throw name + ' not available on this browser' }
      return actual
    }
    let $_frczq2umjd09ez7l = { getOrDie: getOrDie }

    let node = function () {
      let f = $_frczq2umjd09ez7l.getOrDie('Node')
      return f
    }
    let compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0
    }
    let documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING)
    }
    let documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY)
    }
    let $_u0u9huljd09ez7k = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    }

    let firstMatch = function (regexes, s) {
      for (let i = 0; i < regexes.length; i++) {
        let x = regexes[i]
        if (x.test(s)) { return x }
      }
      return undefined
    }
    let find$2 = function (regexes, agent) {
      let r = firstMatch(regexes, agent)
      if (!r) {
        return {
          major: 0,
          minor: 0
        }
      }
      let group = function (i) {
        return Number(agent.replace(r, '$' + i))
      }
      return nu(group(1), group(2))
    }
    let detect = function (versionRegexes, agent) {
      let cleanedAgent = String(agent).toLowerCase()
      if (versionRegexes.length === 0) { return unknown() }
      return find$2(versionRegexes, cleanedAgent)
    }
    let unknown = function () {
      return nu(0, 0)
    }
    let nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      }
    }
    let $_9xisnjusjd09ez7v = {
      nu: nu,
      detect: detect,
      unknown: unknown
    }

    let edge = 'Edge'
    let chrome = 'Chrome'
    let ie = 'IE'
    let opera = 'Opera'
    let firefox = 'Firefox'
    let safari = 'Safari'
    let isBrowser = function (name, current) {
      return function () {
        return current === name
      }
    }
    let unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: $_9xisnjusjd09ez7v.unknown()
      })
    }
    let nu$1 = function (info) {
      let current = info.current
      let version = info.version
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      }
    }
    let $_gi5k6lurjd09ez7s = {
      unknown: unknown$1,
      nu: nu$1,
      edge: $_4iv73osfjd09eyzh.constant(edge),
      chrome: $_4iv73osfjd09eyzh.constant(chrome),
      ie: $_4iv73osfjd09eyzh.constant(ie),
      opera: $_4iv73osfjd09eyzh.constant(opera),
      firefox: $_4iv73osfjd09eyzh.constant(firefox),
      safari: $_4iv73osfjd09eyzh.constant(safari)
    }

    let windows$1 = 'Windows'
    let ios = 'iOS'
    let android = 'Android'
    let linux = 'Linux'
    let osx = 'OSX'
    let solaris = 'Solaris'
    let freebsd = 'FreeBSD'
    let isOS = function (name, current) {
      return function () {
        return current === name
      }
    }
    let unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: $_9xisnjusjd09ez7v.unknown()
      })
    }
    let nu$2 = function (info) {
      let current = info.current
      let version = info.version
      return {
        current: current,
        version: version,
        isWindows: isOS(windows$1, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      }
    }
    let $_9yr44vutjd09ez7w = {
      unknown: unknown$2,
      nu: nu$2,
      windows: $_4iv73osfjd09eyzh.constant(windows$1),
      ios: $_4iv73osfjd09eyzh.constant(ios),
      android: $_4iv73osfjd09eyzh.constant(android),
      linux: $_4iv73osfjd09eyzh.constant(linux),
      osx: $_4iv73osfjd09eyzh.constant(osx),
      solaris: $_4iv73osfjd09eyzh.constant(solaris),
      freebsd: $_4iv73osfjd09eyzh.constant(freebsd)
    }

    function DeviceType (os, browser, userAgent) {
      let isiPad = os.isiOS() && /ipad/i.test(userAgent) === true
      let isiPhone = os.isiOS() && !isiPad
      let isAndroid3 = os.isAndroid() && os.version.major === 3
      let isAndroid4 = os.isAndroid() && os.version.major === 4
      let isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true
      let isTouch = os.isiOS() || os.isAndroid()
      let isPhone = isTouch && !isTablet
      let iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false
      return {
        isiPad: $_4iv73osfjd09eyzh.constant(isiPad),
        isiPhone: $_4iv73osfjd09eyzh.constant(isiPhone),
        isTablet: $_4iv73osfjd09eyzh.constant(isTablet),
        isPhone: $_4iv73osfjd09eyzh.constant(isPhone),
        isTouch: $_4iv73osfjd09eyzh.constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: $_4iv73osfjd09eyzh.constant(iOSwebview)
      }
    }

    let detect$1 = function (candidates, userAgent) {
      let agent = String(userAgent).toLowerCase()
      return $_1z9gljsijd09ez00.find(candidates, function (candidate) {
        return candidate.search(agent)
      })
    }
    let detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        let version = $_9xisnjusjd09ez7v.detect(browser.versionRegexes, userAgent)
        return {
          current: browser.name,
          version: version
        }
      })
    }
    let detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        let version = $_9xisnjusjd09ez7v.detect(os.versionRegexes, userAgent)
        return {
          current: os.name,
          version: version
        }
      })
    }
    let $_cowg82uvjd09ez81 = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    }

    let addToStart = function (str, prefix) {
      return prefix + str
    }
    let addToEnd = function (str, suffix) {
      return str + suffix
    }
    let removeFromStart = function (str, numChars) {
      return str.substring(numChars)
    }
    let removeFromEnd = function (str, numChars) {
      return str.substring(0, str.length - numChars)
    }
    let $_fdzex2uyjd09ez8a = {
      addToStart: addToStart,
      addToEnd: addToEnd,
      removeFromStart: removeFromStart,
      removeFromEnd: removeFromEnd
    }

    let first = function (str, count) {
      return str.substr(0, count)
    }
    let last$1 = function (str, count) {
      return str.substr(str.length - count, str.length)
    }
    let head$1 = function (str) {
      return str === '' ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.some(str.substr(0, 1))
    }
    let tail = function (str) {
      return str === '' ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.some(str.substring(1))
    }
    let $_70hdxvuzjd09ez8b = {
      first: first,
      last: last$1,
      head: head$1,
      tail: tail
    }

    let checkRange = function (str, substr, start) {
      if (substr === '') { return true }
      if (str.length < substr.length) { return false }
      let x = str.substr(start, start + substr.length)
      return x === substr
    }
    let supplant = function (str, obj) {
      let isStringOrNumber = function (a) {
        let t = typeof a
        return t === 'string' || t === 'number'
      }
      return str.replace(/\${([^{}]*)}/g, function (a, b) {
        let value = obj[b]
        return isStringOrNumber(value) ? value : a
      })
    }
    let removeLeading = function (str, prefix) {
      return startsWith(str, prefix) ? $_fdzex2uyjd09ez8a.removeFromStart(str, prefix.length) : str
    }
    let removeTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? $_fdzex2uyjd09ez8a.removeFromEnd(str, prefix.length) : str
    }
    let ensureLeading = function (str, prefix) {
      return startsWith(str, prefix) ? str : $_fdzex2uyjd09ez8a.addToStart(str, prefix)
    }
    let ensureTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? str : $_fdzex2uyjd09ez8a.addToEnd(str, prefix)
    }
    let contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1
    }
    let capitalize = function (str) {
      return $_70hdxvuzjd09ez8b.head(str).bind(function (head) {
        return $_70hdxvuzjd09ez8b.tail(str).map(function (tail) {
          return head.toUpperCase() + tail
        })
      }).getOr(str)
    }
    let startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0)
    }
    let endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length)
    }
    let trim = function (str) {
      return str.replace(/^\s+|\s+$/g, '')
    }
    let lTrim = function (str) {
      return str.replace(/^\s+/g, '')
    }
    let rTrim = function (str) {
      return str.replace(/\s+$/g, '')
    }
    let $_8ul4mruxjd09ez88 = {
      supplant: supplant,
      startsWith: startsWith,
      removeLeading: removeLeading,
      removeTrailing: removeTrailing,
      ensureLeading: ensureLeading,
      ensureTrailing: ensureTrailing,
      endsWith: endsWith,
      contains: contains$1,
      trim: trim,
      lTrim: lTrim,
      rTrim: rTrim,
      capitalize: capitalize
    }

    let normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
    let checkContains = function (target) {
      return function (uastring) {
        return $_8ul4mruxjd09ez88.contains(uastring, target)
      }
    }
    let browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          let monstrosity = $_8ul4mruxjd09ez88.contains(uastring, 'edge/') && $_8ul4mruxjd09ez88.contains(uastring, 'chrome') && $_8ul4mruxjd09ez88.contains(uastring, 'safari') && $_8ul4mruxjd09ez88.contains(uastring, 'applewebkit')
          return monstrosity
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return $_8ul4mruxjd09ez88.contains(uastring, 'chrome') && !$_8ul4mruxjd09ez88.contains(uastring, 'chromeframe')
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return $_8ul4mruxjd09ez88.contains(uastring, 'msie') || $_8ul4mruxjd09ez88.contains(uastring, 'trident')
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return ($_8ul4mruxjd09ez88.contains(uastring, 'safari') || $_8ul4mruxjd09ez88.contains(uastring, 'mobile/')) && $_8ul4mruxjd09ez88.contains(uastring, 'applewebkit')
        }
      }
    ]
    let oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return $_8ul4mruxjd09ez88.contains(uastring, 'iphone') || $_8ul4mruxjd09ez88.contains(uastring, 'ipad')
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      }
    ]
    let $_ax3pjiuwjd09ez84 = {
      browsers: $_4iv73osfjd09eyzh.constant(browsers),
      oses: $_4iv73osfjd09eyzh.constant(oses)
    }

    let detect$2 = function (userAgent) {
      let browsers = $_ax3pjiuwjd09ez84.browsers()
      let oses = $_ax3pjiuwjd09ez84.oses()
      let browser = $_cowg82uvjd09ez81.detectBrowser(browsers, userAgent).fold($_gi5k6lurjd09ez7s.unknown, $_gi5k6lurjd09ez7s.nu)
      let os = $_cowg82uvjd09ez81.detectOs(oses, userAgent).fold($_9yr44vutjd09ez7w.unknown, $_9yr44vutjd09ez7w.nu)
      let deviceType = DeviceType(os, browser, userAgent)
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      }
    }
    let $_3xsa03uqjd09ez7r = { detect: detect$2 }

    let detect$3 = $_c18ax4u9jd09ez6g.cached(function () {
      let userAgent = navigator.userAgent
      return $_3xsa03uqjd09ez7r.detect(userAgent)
    })
    let $_3g4tb5upjd09ez7p = { detect: detect$3 }

    let ELEMENT = $_7qkno9ubjd09ez6j.ELEMENT
    let DOCUMENT = $_7qkno9ubjd09ez6j.DOCUMENT
    let is = function (element, selector) {
      let elem = element.dom()
      if (elem.nodeType !== ELEMENT) { return false } else if (elem.matches !== undefined) { return elem.matches(selector) } else if (elem.msMatchesSelector !== undefined) { return elem.msMatchesSelector(selector) } else if (elem.webkitMatchesSelector !== undefined) { return elem.webkitMatchesSelector(selector) } else if (elem.mozMatchesSelector !== undefined) { return elem.mozMatchesSelector(selector) } else { throw new Error('Browser lacks native selectors') }
    }
    let bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0
    }
    let all = function (selector, scope) {
      let base = scope === undefined ? document : scope.dom()
      return bypassSelector(base) ? [] : $_1z9gljsijd09ez00.map(base.querySelectorAll(selector), $_1p2zlou5jd09ez64.fromDom)
    }
    let one = function (selector, scope) {
      let base = scope === undefined ? document : scope.dom()
      return bypassSelector(base) ? $_dqtixqsejd09eyzf.none() : $_dqtixqsejd09eyzf.from(base.querySelector(selector)).map($_1p2zlou5jd09ez64.fromDom)
    }
    let $_7by9jqv0jd09ez8c = {
      all: all,
      is: is,
      one: one
    }

    let eq = function (e1, e2) {
      return e1.dom() === e2.dom()
    }
    let isEqualNode = function (e1, e2) {
      return e1.dom().isEqualNode(e2.dom())
    }
    let member = function (element, elements) {
      return $_1z9gljsijd09ez00.exists(elements, $_4iv73osfjd09eyzh.curry(eq, element))
    }
    let regularContains = function (e1, e2) {
      let d1 = e1.dom(), d2 = e2.dom()
      return d1 === d2 ? false : d1.contains(d2)
    }
    let ieContains = function (e1, e2) {
      return $_u0u9huljd09ez7k.documentPositionContainedBy(e1.dom(), e2.dom())
    }
    let browser = $_3g4tb5upjd09ez7p.detect().browser
    let contains$2 = browser.isIE() ? ieContains : regularContains
    let $_4qjd66ukjd09ez7e = {
      eq: eq,
      isEqualNode: isEqualNode,
      member: member,
      contains: contains$2,
      is: $_7by9jqv0jd09ez8c.is
    }

    let owner = function (element) {
      return $_1p2zlou5jd09ez64.fromDom(element.dom().ownerDocument)
    }
    let documentElement = function (element) {
      let doc = owner(element)
      return $_1p2zlou5jd09ez64.fromDom(doc.dom().documentElement)
    }
    let defaultView = function (element) {
      let el = element.dom()
      let defaultView = el.ownerDocument.defaultView
      return $_1p2zlou5jd09ez64.fromDom(defaultView)
    }
    let parent = function (element) {
      let dom = element.dom()
      return $_dqtixqsejd09eyzf.from(dom.parentNode).map($_1p2zlou5jd09ez64.fromDom)
    }
    let findIndex$1 = function (element) {
      return parent(element).bind(function (p) {
        let kin = children(p)
        return $_1z9gljsijd09ez00.findIndex(kin, function (elem) {
          return $_4qjd66ukjd09ez7e.eq(element, elem)
        })
      })
    }
    let parents = function (element, isRoot) {
      let stop = $_6urfrtudjd09ez72.isFunction(isRoot) ? isRoot : $_4iv73osfjd09eyzh.constant(false)
      let dom = element.dom()
      let ret = []
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        let rawParent = dom.parentNode
        let parent = $_1p2zlou5jd09ez64.fromDom(rawParent)
        ret.push(parent)
        if (stop(parent) === true) { break } else { dom = rawParent }
      }
      return ret
    }
    let siblings = function (element) {
      let filterSelf = function (elements) {
        return $_1z9gljsijd09ez00.filter(elements, function (x) {
          return !$_4qjd66ukjd09ez7e.eq(element, x)
        })
      }
      return parent(element).map(children).map(filterSelf).getOr([])
    }
    let offsetParent = function (element) {
      let dom = element.dom()
      return $_dqtixqsejd09eyzf.from(dom.offsetParent).map($_1p2zlou5jd09ez64.fromDom)
    }
    let prevSibling = function (element) {
      let dom = element.dom()
      return $_dqtixqsejd09eyzf.from(dom.previousSibling).map($_1p2zlou5jd09ez64.fromDom)
    }
    let nextSibling = function (element) {
      let dom = element.dom()
      return $_dqtixqsejd09eyzf.from(dom.nextSibling).map($_1p2zlou5jd09ez64.fromDom)
    }
    let prevSiblings = function (element) {
      return $_1z9gljsijd09ez00.reverse($_5kvp2vujjd09ez7d.toArray(element, prevSibling))
    }
    let nextSiblings = function (element) {
      return $_5kvp2vujjd09ez7d.toArray(element, nextSibling)
    }
    let children = function (element) {
      let dom = element.dom()
      return $_1z9gljsijd09ez00.map(dom.childNodes, $_1p2zlou5jd09ez64.fromDom)
    }
    let child = function (element, index) {
      let children = element.dom().childNodes
      return $_dqtixqsejd09eyzf.from(children[index]).map($_1p2zlou5jd09ez64.fromDom)
    }
    let firstChild = function (element) {
      return child(element, 0)
    }
    let lastChild = function (element) {
      return child(element, element.dom().childNodes.length - 1)
    }
    let childNodesCount = function (element) {
      return element.dom().childNodes.length
    }
    let hasChildNodes = function (element) {
      return element.dom().hasChildNodes()
    }
    let spot = $_bvnitduejd09ez73.immutable('element', 'offset')
    let leaf = function (element, offset) {
      let cs = children(element)
      return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset)
    }
    let $_2jgjijucjd09ez6k = {
      owner: owner,
      defaultView: defaultView,
      documentElement: documentElement,
      parent: parent,
      findIndex: findIndex$1,
      parents: parents,
      siblings: siblings,
      prevSibling: prevSibling,
      offsetParent: offsetParent,
      prevSiblings: prevSiblings,
      nextSibling: nextSibling,
      nextSiblings: nextSiblings,
      children: children,
      child: child,
      firstChild: firstChild,
      lastChild: lastChild,
      childNodesCount: childNodesCount,
      hasChildNodes: hasChildNodes,
      leaf: leaf
    }

    let all$1 = function (predicate) {
      return descendants($_w0rbbu8jd09ez6d.body(), predicate)
    }
    let ancestors = function (scope, predicate, isRoot) {
      return $_1z9gljsijd09ez00.filter($_2jgjijucjd09ez6k.parents(scope, isRoot), predicate)
    }
    let siblings$1 = function (scope, predicate) {
      return $_1z9gljsijd09ez00.filter($_2jgjijucjd09ez6k.siblings(scope), predicate)
    }
    let children$1 = function (scope, predicate) {
      return $_1z9gljsijd09ez00.filter($_2jgjijucjd09ez6k.children(scope), predicate)
    }
    let descendants = function (scope, predicate) {
      let result = []
      $_1z9gljsijd09ez00.each($_2jgjijucjd09ez6k.children(scope), function (x) {
        if (predicate(x)) {
          result = result.concat([x])
        }
        result = result.concat(descendants(x, predicate))
      })
      return result
    }
    let $_7fuz92u7jd09ez6a = {
      all: all$1,
      ancestors: ancestors,
      siblings: siblings$1,
      children: children$1,
      descendants: descendants
    }

    let all$2 = function (selector) {
      return $_7by9jqv0jd09ez8c.all(selector)
    }
    let ancestors$1 = function (scope, selector, isRoot) {
      return $_7fuz92u7jd09ez6a.ancestors(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      }, isRoot)
    }
    let siblings$2 = function (scope, selector) {
      return $_7fuz92u7jd09ez6a.siblings(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      })
    }
    let children$2 = function (scope, selector) {
      return $_7fuz92u7jd09ez6a.children(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      })
    }
    let descendants$1 = function (scope, selector) {
      return $_7by9jqv0jd09ez8c.all(selector, scope)
    }
    let $_33abczu6jd09ez69 = {
      all: all$2,
      ancestors: ancestors$1,
      siblings: siblings$2,
      children: children$2,
      descendants: descendants$1
    }

    let trim$1 = Tools.trim
    let hasContentEditableState = function (value) {
      return function (node) {
        if (node && node.nodeType === 1) {
          if (node.contentEditable === value) {
            return true
          }
          if (node.getAttribute('data-mce-contenteditable') === value) {
            return true
          }
        }
        return false
      }
    }
    let isContentEditableTrue = hasContentEditableState('true')
    let isContentEditableFalse = hasContentEditableState('false')
    let create = function (type, title, url, level, attach) {
      return {
        type: type,
        title: title,
        url: url,
        level: level,
        attach: attach
      }
    }
    let isChildOfContentEditableTrue = function (node) {
      while (node = node.parentNode) {
        let value = node.contentEditable
        if (value && value !== 'inherit') {
          return isContentEditableTrue(node)
        }
      }
      return false
    }
    let select = function (selector, root) {
      return $_1z9gljsijd09ez00.map($_33abczu6jd09ez69.descendants($_1p2zlou5jd09ez64.fromDom(root), selector), function (element) {
        return element.dom()
      })
    }
    let getElementText = function (elm) {
      return elm.innerText || elm.textContent
    }
    let getOrGenerateId = function (elm) {
      return elm.id ? elm.id : $_bscuiau4jd09ez63.generate('h')
    }
    let isAnchor = function (elm) {
      return elm && elm.nodeName === 'A' && (elm.id || elm.name)
    }
    let isValidAnchor = function (elm) {
      return isAnchor(elm) && isEditable(elm)
    }
    let isHeader = function (elm) {
      return elm && /^(H[1-6])$/.test(elm.nodeName)
    }
    let isEditable = function (elm) {
      return isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm)
    }
    let isValidHeader = function (elm) {
      return isHeader(elm) && isEditable(elm)
    }
    let getLevel = function (elm) {
      return isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0
    }
    let headerTarget = function (elm) {
      let headerId = getOrGenerateId(elm)
      let attach = function () {
        elm.id = headerId
      }
      return create('header', getElementText(elm), '#' + headerId, getLevel(elm), attach)
    }
    let anchorTarget = function (elm) {
      let anchorId = elm.id || elm.name
      let anchorText = getElementText(elm)
      return create('anchor', anchorText || '#' + anchorId, '#' + anchorId, 0, $_4iv73osfjd09eyzh.noop)
    }
    let getHeaderTargets = function (elms) {
      return $_1z9gljsijd09ez00.map($_1z9gljsijd09ez00.filter(elms, isValidHeader), headerTarget)
    }
    let getAnchorTargets = function (elms) {
      return $_1z9gljsijd09ez00.map($_1z9gljsijd09ez00.filter(elms, isValidAnchor), anchorTarget)
    }
    let getTargetElements = function (elm) {
      let elms = select('h1,h2,h3,h4,h5,h6,a:not([href])', elm)
      return elms
    }
    let hasTitle = function (target) {
      return trim$1(target.title).length > 0
    }
    let find$3 = function (elm) {
      let elms = getTargetElements(elm)
      return $_1z9gljsijd09ez00.filter(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle)
    }
    let $_vqn4ru3jd09ez5w = { find: find$3 }

    let getActiveEditor = function () {
      return window.tinymce ? window.tinymce.activeEditor : EditorManager.activeEditor
    }
    let history = {}
    let HISTORY_LENGTH = 5
    let clearHistory = function () {
      history = {}
    }
    let toMenuItem = function (target) {
      return {
        title: target.title,
        value: {
          title: { raw: target.title },
          url: target.url,
          attach: target.attach
        }
      }
    }
    let toMenuItems = function (targets) {
      return Tools.map(targets, toMenuItem)
    }
    let staticMenuItem = function (title, url) {
      return {
        title: title,
        value: {
          title: title,
          url: url,
          attach: $_4iv73osfjd09eyzh.noop
        }
      }
    }
    let isUniqueUrl = function (url, targets) {
      let foundTarget = $_1z9gljsijd09ez00.exists(targets, function (target) {
        return target.url === url
      })
      return !foundTarget
    }
    let getSetting = function (editorSettings, name, defaultValue) {
      let value = name in editorSettings ? editorSettings[name] : defaultValue
      return value === false ? null : value
    }
    let createMenuItems = function (term, targets, fileType, editorSettings) {
      let separator = { title: '-' }
      let fromHistoryMenuItems = function (history) {
        let historyItems = history.hasOwnProperty(fileType) ? history[fileType] : []
        let uniqueHistory = $_1z9gljsijd09ez00.filter(historyItems, function (url) {
          return isUniqueUrl(url, targets)
        })
        return Tools.map(uniqueHistory, function (url) {
          return {
            title: url,
            value: {
              title: url,
              url: url,
              attach: $_4iv73osfjd09eyzh.noop
            }
          }
        })
      }
      let fromMenuItems = function (type) {
        let filteredTargets = $_1z9gljsijd09ez00.filter(targets, function (target) {
          return target.type === type
        })
        return toMenuItems(filteredTargets)
      }
      let anchorMenuItems = function () {
        let anchorMenuItems = fromMenuItems('anchor')
        let topAnchor = getSetting(editorSettings, 'anchor_top', '#top')
        let bottomAchor = getSetting(editorSettings, 'anchor_bottom', '#bottom')
        if (topAnchor !== null) {
          anchorMenuItems.unshift(staticMenuItem('<top>', topAnchor))
        }
        if (bottomAchor !== null) {
          anchorMenuItems.push(staticMenuItem('<bottom>', bottomAchor))
        }
        return anchorMenuItems
      }
      let join = function (items) {
        return $_1z9gljsijd09ez00.foldl(items, function (a, b) {
          let bothEmpty = a.length === 0 || b.length === 0
          return bothEmpty ? a.concat(b) : a.concat(separator, b)
        }, [])
      }
      if (editorSettings.typeahead_urls === false) {
        return []
      }
      return fileType === 'file' ? join([
        filterByQuery(term, fromHistoryMenuItems(history)),
        filterByQuery(term, fromMenuItems('header')),
        filterByQuery(term, anchorMenuItems())
      ]) : filterByQuery(term, fromHistoryMenuItems(history))
    }
    let addToHistory = function (url, fileType) {
      let items = history[fileType]
      if (!/^https?/.test(url)) {
        return
      }
      if (items) {
        if ($_1z9gljsijd09ez00.indexOf(items, url) === -1) {
          history[fileType] = items.slice(0, HISTORY_LENGTH).concat(url)
        }
      } else {
        history[fileType] = [url]
      }
    }
    let filterByQuery = function (term, menuItems) {
      let lowerCaseTerm = term.toLowerCase()
      let result = Tools.grep(menuItems, function (item) {
        return item.title.toLowerCase().indexOf(lowerCaseTerm) !== -1
      })
      return result.length === 1 && result[0].title === term ? [] : result
    }
    let getTitle = function (linkDetails) {
      let title = linkDetails.title
      return title.raw ? title.raw : title
    }
    let setupAutoCompleteHandler = function (ctrl, editorSettings, bodyElm, fileType) {
      let autocomplete = function (term) {
        let linkTargets = $_vqn4ru3jd09ez5w.find(bodyElm)
        let menuItems = createMenuItems(term, linkTargets, fileType, editorSettings)
        ctrl.showAutoComplete(menuItems, term)
      }
      ctrl.on('autocomplete', function () {
        autocomplete(ctrl.value())
      })
      ctrl.on('selectitem', function (e) {
        let linkDetails = e.value
        ctrl.value(linkDetails.url)
        let title = getTitle(linkDetails)
        if (fileType === 'image') {
          ctrl.fire('change', {
            meta: {
              alt: title,
              attach: linkDetails.attach
            }
          })
        } else {
          ctrl.fire('change', {
            meta: {
              text: title,
              attach: linkDetails.attach
            }
          })
        }
        ctrl.focus()
      })
      ctrl.on('click', function (e) {
        if (ctrl.value().length === 0 && e.target.nodeName === 'INPUT') {
          autocomplete('')
        }
      })
      ctrl.on('PostRender', function () {
        ctrl.getRoot().on('submit', function (e) {
          if (!e.isDefaultPrevented()) {
            addToHistory(ctrl.value(), fileType)
          }
        })
      })
    }
    let statusToUiState = function (result) {
      let status = result.status, message = result.message
      if (status === 'valid') {
        return {
          status: 'ok',
          message: message
        }
      } else if (status === 'unknown') {
        return {
          status: 'warn',
          message: message
        }
      } else if (status === 'invalid') {
        return {
          status: 'warn',
          message: message
        }
      } else {
        return {
          status: 'none',
          message: ''
        }
      }
    }
    let setupLinkValidatorHandler = function (ctrl, editorSettings, fileType) {
      let validatorHandler = editorSettings.filepicker_validator_handler
      if (validatorHandler) {
        let validateUrl_1 = function (url) {
          if (url.length === 0) {
            ctrl.statusLevel('none')
            return
          }
          validatorHandler({
            url: url,
            type: fileType
          }, function (result) {
            let uiState = statusToUiState(result)
            ctrl.statusMessage(uiState.message)
            ctrl.statusLevel(uiState.status)
          })
        }
        ctrl.state.on('change:value', function (e) {
          validateUrl_1(e.value)
        })
      }
    }
    let FilePicker = ComboBox.extend({
      Statics: { clearHistory: clearHistory },
      init: function (settings) {
        let self = this, editor = getActiveEditor(), editorSettings = editor.settings
        let actionCallback, fileBrowserCallback, fileBrowserCallbackTypes
        let fileType = settings.filetype
        settings.spellcheck = false
        fileBrowserCallbackTypes = editorSettings.file_picker_types || editorSettings.file_browser_callback_types
        if (fileBrowserCallbackTypes) {
          fileBrowserCallbackTypes = Tools.makeMap(fileBrowserCallbackTypes, /[, ]/)
        }
        if (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType]) {
          fileBrowserCallback = editorSettings.file_picker_callback
          if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
            actionCallback = function () {
              let meta = self.fire('beforecall').meta
              meta = Tools.extend({ filetype: fileType }, meta)
              fileBrowserCallback.call(editor, function (value, meta) {
                self.value(value).fire('change', { meta: meta })
              }, self.value(), meta)
            }
          } else {
            fileBrowserCallback = editorSettings.file_browser_callback
            if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
              actionCallback = function () {
                fileBrowserCallback(self.getEl('inp').id, self.value(), fileType, window)
              }
            }
          }
        }
        if (actionCallback) {
          settings.icon = 'browse'
          settings.onaction = actionCallback
        }
        self._super(settings)
        self.classes.add('filepicker')
        setupAutoCompleteHandler(self, editorSettings, editor.getBody(), fileType)
        setupLinkValidatorHandler(self, editorSettings, fileType)
      }
    })

    let FitLayout = AbsoluteLayout.extend({
      recalc: function (container) {
        let contLayoutRect = container.layoutRect(), paddingBox = container.paddingBox
        container.items().filter(':visible').each(function (ctrl) {
          ctrl.layoutRect({
            x: paddingBox.left,
            y: paddingBox.top,
            w: contLayoutRect.innerW - paddingBox.right - paddingBox.left,
            h: contLayoutRect.innerH - paddingBox.top - paddingBox.bottom
          })
          if (ctrl.recalc) {
            ctrl.recalc()
          }
        })
      }
    })

    let FlexLayout = AbsoluteLayout.extend({
      recalc: function (container) {
        let i, l, items, contLayoutRect, contPaddingBox, contSettings, align, pack, spacing, totalFlex, availableSpace, direction
        let ctrl, ctrlLayoutRect, ctrlSettings, flex
        let maxSizeItems = []
        let size, maxSize, ratio, rect, pos, maxAlignEndPos
        let sizeName, minSizeName, posName, maxSizeName, beforeName, innerSizeName, deltaSizeName, contentSizeName
        let alignAxisName, alignInnerSizeName, alignSizeName, alignMinSizeName, alignBeforeName, alignAfterName
        let alignDeltaSizeName, alignContentSizeName
        let max = Math.max, min = Math.min
        items = container.items().filter(':visible')
        contLayoutRect = container.layoutRect()
        contPaddingBox = container.paddingBox
        contSettings = container.settings
        direction = container.isRtl() ? contSettings.direction || 'row-reversed' : contSettings.direction
        align = contSettings.align
        pack = container.isRtl() ? contSettings.pack || 'end' : contSettings.pack
        spacing = contSettings.spacing || 0
        if (direction === 'row-reversed' || direction === 'column-reverse') {
          items = items.set(items.toArray().reverse())
          direction = direction.split('-')[0]
        }
        if (direction === 'column') {
          posName = 'y'
          sizeName = 'h'
          minSizeName = 'minH'
          maxSizeName = 'maxH'
          innerSizeName = 'innerH'
          beforeName = 'top'
          deltaSizeName = 'deltaH'
          contentSizeName = 'contentH'
          alignBeforeName = 'left'
          alignSizeName = 'w'
          alignAxisName = 'x'
          alignInnerSizeName = 'innerW'
          alignMinSizeName = 'minW'
          alignAfterName = 'right'
          alignDeltaSizeName = 'deltaW'
          alignContentSizeName = 'contentW'
        } else {
          posName = 'x'
          sizeName = 'w'
          minSizeName = 'minW'
          maxSizeName = 'maxW'
          innerSizeName = 'innerW'
          beforeName = 'left'
          deltaSizeName = 'deltaW'
          contentSizeName = 'contentW'
          alignBeforeName = 'top'
          alignSizeName = 'h'
          alignAxisName = 'y'
          alignInnerSizeName = 'innerH'
          alignMinSizeName = 'minH'
          alignAfterName = 'bottom'
          alignDeltaSizeName = 'deltaH'
          alignContentSizeName = 'contentH'
        }
        availableSpace = contLayoutRect[innerSizeName] - contPaddingBox[beforeName] - contPaddingBox[beforeName]
        maxAlignEndPos = totalFlex = 0
        for (i = 0, l = items.length; i < l; i++) {
          ctrl = items[i]
          ctrlLayoutRect = ctrl.layoutRect()
          ctrlSettings = ctrl.settings
          flex = ctrlSettings.flex
          availableSpace -= i < l - 1 ? spacing : 0
          if (flex > 0) {
            totalFlex += flex
            if (ctrlLayoutRect[maxSizeName]) {
              maxSizeItems.push(ctrl)
            }
            ctrlLayoutRect.flex = flex
          }
          availableSpace -= ctrlLayoutRect[minSizeName]
          size = contPaddingBox[alignBeforeName] + ctrlLayoutRect[alignMinSizeName] + contPaddingBox[alignAfterName]
          if (size > maxAlignEndPos) {
            maxAlignEndPos = size
          }
        }
        rect = {}
        if (availableSpace < 0) {
          rect[minSizeName] = contLayoutRect[minSizeName] - availableSpace + contLayoutRect[deltaSizeName]
        } else {
          rect[minSizeName] = contLayoutRect[innerSizeName] - availableSpace + contLayoutRect[deltaSizeName]
        }
        rect[alignMinSizeName] = maxAlignEndPos + contLayoutRect[alignDeltaSizeName]
        rect[contentSizeName] = contLayoutRect[innerSizeName] - availableSpace
        rect[alignContentSizeName] = maxAlignEndPos
        rect.minW = min(rect.minW, contLayoutRect.maxW)
        rect.minH = min(rect.minH, contLayoutRect.maxH)
        rect.minW = max(rect.minW, contLayoutRect.startMinWidth)
        rect.minH = max(rect.minH, contLayoutRect.startMinHeight)
        if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
          rect.w = rect.minW
          rect.h = rect.minH
          container.layoutRect(rect)
          this.recalc(container)
          if (container._lastRect === null) {
            let parentCtrl = container.parent()
            if (parentCtrl) {
              parentCtrl._lastRect = null
              parentCtrl.recalc()
            }
          }
          return
        }
        ratio = availableSpace / totalFlex
        for (i = 0, l = maxSizeItems.length; i < l; i++) {
          ctrl = maxSizeItems[i]
          ctrlLayoutRect = ctrl.layoutRect()
          maxSize = ctrlLayoutRect[maxSizeName]
          size = ctrlLayoutRect[minSizeName] + ctrlLayoutRect.flex * ratio
          if (size > maxSize) {
            availableSpace -= ctrlLayoutRect[maxSizeName] - ctrlLayoutRect[minSizeName]
            totalFlex -= ctrlLayoutRect.flex
            ctrlLayoutRect.flex = 0
            ctrlLayoutRect.maxFlexSize = maxSize
          } else {
            ctrlLayoutRect.maxFlexSize = 0
          }
        }
        ratio = availableSpace / totalFlex
        pos = contPaddingBox[beforeName]
        rect = {}
        if (totalFlex === 0) {
          if (pack === 'end') {
            pos = availableSpace + contPaddingBox[beforeName]
          } else if (pack === 'center') {
            pos = Math.round(contLayoutRect[innerSizeName] / 2 - (contLayoutRect[innerSizeName] - availableSpace) / 2) + contPaddingBox[beforeName]
            if (pos < 0) {
              pos = contPaddingBox[beforeName]
            }
          } else if (pack === 'justify') {
            pos = contPaddingBox[beforeName]
            spacing = Math.floor(availableSpace / (items.length - 1))
          }
        }
        rect[alignAxisName] = contPaddingBox[alignBeforeName]
        for (i = 0, l = items.length; i < l; i++) {
          ctrl = items[i]
          ctrlLayoutRect = ctrl.layoutRect()
          size = ctrlLayoutRect.maxFlexSize || ctrlLayoutRect[minSizeName]
          if (align === 'center') {
            rect[alignAxisName] = Math.round(contLayoutRect[alignInnerSizeName] / 2 - ctrlLayoutRect[alignSizeName] / 2)
          } else if (align === 'stretch') {
            rect[alignSizeName] = max(ctrlLayoutRect[alignMinSizeName] || 0, contLayoutRect[alignInnerSizeName] - contPaddingBox[alignBeforeName] - contPaddingBox[alignAfterName])
            rect[alignAxisName] = contPaddingBox[alignBeforeName]
          } else if (align === 'end') {
            rect[alignAxisName] = contLayoutRect[alignInnerSizeName] - ctrlLayoutRect[alignSizeName] - contPaddingBox.top
          }
          if (ctrlLayoutRect.flex > 0) {
            size += ctrlLayoutRect.flex * ratio
          }
          rect[sizeName] = size
          rect[posName] = pos
          ctrl.layoutRect(rect)
          if (ctrl.recalc) {
            ctrl.recalc()
          }
          pos += size + spacing
        }
      }
    })

    let FlowLayout = Layout.extend({
      Defaults: {
        containerClass: 'flow-layout',
        controlClass: 'flow-layout-item',
        endClass: 'break'
      },
      recalc: function (container) {
        container.items().filter(':visible').each(function (ctrl) {
          if (ctrl.recalc) {
            ctrl.recalc()
          }
        })
      },
      isNative: function () {
        return true
      }
    })

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ? $_dqtixqsejd09eyzf.some(scope) : $_6urfrtudjd09ez72.isFunction(isRoot) && isRoot(scope) ? $_dqtixqsejd09eyzf.none() : ancestor(scope, a, isRoot)
    }

    let first$1 = function (predicate) {
      return descendant($_w0rbbu8jd09ez6d.body(), predicate)
    }
    let ancestor = function (scope, predicate, isRoot) {
      let element = scope.dom()
      let stop = $_6urfrtudjd09ez72.isFunction(isRoot) ? isRoot : $_4iv73osfjd09eyzh.constant(false)
      while (element.parentNode) {
        element = element.parentNode
        let el = $_1p2zlou5jd09ez64.fromDom(element)
        if (predicate(el)) { return $_dqtixqsejd09eyzf.some(el) } else if (stop(el)) { break }
      }
      return $_dqtixqsejd09eyzf.none()
    }
    let closest = function (scope, predicate, isRoot) {
      let is = function (scope) {
        return predicate(scope)
      }
      return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot)
    }
    let sibling = function (scope, predicate) {
      let element = scope.dom()
      if (!element.parentNode) { return $_dqtixqsejd09eyzf.none() }
      return child$1($_1p2zlou5jd09ez64.fromDom(element.parentNode), function (x) {
        return !$_4qjd66ukjd09ez7e.eq(scope, x) && predicate(x)
      })
    }
    let child$1 = function (scope, predicate) {
      let result = $_1z9gljsijd09ez00.find(scope.dom().childNodes, $_4iv73osfjd09eyzh.compose(predicate, $_1p2zlou5jd09ez64.fromDom))
      return result.map($_1p2zlou5jd09ez64.fromDom)
    }
    let descendant = function (scope, predicate) {
      let descend = function (element) {
        for (let i = 0; i < element.childNodes.length; i++) {
          if (predicate($_1p2zlou5jd09ez64.fromDom(element.childNodes[i]))) { return $_dqtixqsejd09eyzf.some($_1p2zlou5jd09ez64.fromDom(element.childNodes[i])) }
          let res = descend(element.childNodes[i])
          if (res.isSome()) { return res }
        }
        return $_dqtixqsejd09eyzf.none()
      }
      return descend(scope.dom())
    }
    let $_eyf8qdv6jd09ez92 = {
      first: first$1,
      ancestor: ancestor,
      closest: closest,
      sibling: sibling,
      child: child$1,
      descendant: descendant
    }

    let first$2 = function (selector) {
      return $_7by9jqv0jd09ez8c.one(selector)
    }
    let ancestor$1 = function (scope, selector, isRoot) {
      return $_eyf8qdv6jd09ez92.ancestor(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      }, isRoot)
    }
    let sibling$1 = function (scope, selector) {
      return $_eyf8qdv6jd09ez92.sibling(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      })
    }
    let child$2 = function (scope, selector) {
      return $_eyf8qdv6jd09ez92.child(scope, function (e) {
        return $_7by9jqv0jd09ez8c.is(e, selector)
      })
    }
    let descendant$1 = function (scope, selector) {
      return $_7by9jqv0jd09ez8c.one(selector, scope)
    }
    let closest$1 = function (scope, selector, isRoot) {
      return ClosestOrAncestor($_7by9jqv0jd09ez8c.is, ancestor$1, scope, selector, isRoot)
    }
    let $_41jmrcv5jd09ez90 = {
      first: first$2,
      ancestor: ancestor$1,
      sibling: sibling$1,
      child: child$2,
      descendant: descendant$1,
      closest: closest$1
    }

    let toggleFormat = function (editor, fmt) {
      return function () {
        editor.execCommand('mceToggleFormat', false, fmt)
      }
    }
    let postRenderFormat = function (editor, name) {
      return function () {
        let self = this
        if (editor.formatter) {
          editor.formatter.formatChanged(name, function (state) {
            self.active(state)
          })
        } else {
          editor.on('init', function () {
            editor.formatter.formatChanged(name, function (state) {
              self.active(state)
            })
          })
        }
      }
    }
    let $_fral3qv9jd09ez9d = {
      toggleFormat: toggleFormat,
      postRenderFormat: postRenderFormat
    }

    let register = function (editor) {
      editor.addMenuItem('align', {
        text: 'Align',
        menu: [
          {
            text: 'Left',
            icon: 'alignleft',
            onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, 'alignleft')
          },
          {
            text: 'Center',
            icon: 'aligncenter',
            onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, 'aligncenter')
          },
          {
            text: 'Right',
            icon: 'alignright',
            onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, 'alignright')
          },
          {
            text: 'Justify',
            icon: 'alignjustify',
            onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, 'alignjustify')
          }
        ]
      })
      Tools.each({
        alignleft: [
          'Align left',
          'JustifyLeft'
        ],
        aligncenter: [
          'Align center',
          'JustifyCenter'
        ],
        alignright: [
          'Align right',
          'JustifyRight'
        ],
        alignjustify: [
          'Justify',
          'JustifyFull'
        ],
        alignnone: [
          'No alignment',
          'JustifyNone'
        ]
      }, function (item, name) {
        editor.addButton(name, {
          active: false,
          tooltip: item[0],
          cmd: item[1],
          onPostRender: $_fral3qv9jd09ez9d.postRenderFormat(editor, name)
        })
      })
    }
    let $_aiy410v8jd09ez9c = { register: register }

    let getSpecifiedFontProp = function (propName, rootElm, elm) {
      while (elm !== rootElm) {
        if (elm.style[propName]) {
          let foundStyle = elm.style[propName]
          return foundStyle !== '' ? $_dqtixqsejd09eyzf.some(foundStyle) : $_dqtixqsejd09eyzf.none()
        }
        elm = elm.parentNode
      }
      return $_dqtixqsejd09eyzf.none()
    }
    let round = function (number, precision) {
      let factor = Math.pow(10, precision)
      return Math.round(number * factor) / factor
    }
    let toPt = function (fontSize, precision) {
      if (/[0-9.]+px$/.test(fontSize)) {
        return round(parseInt(fontSize, 10) * 72 / 96, precision || 0) + 'pt'
      }
      return fontSize
    }
    let normalizeFontFamily = function (fontFamily) {
      return fontFamily.replace(/[\'\"]/g, '').replace(/,\s+/g, ',')
    }
    let getComputedFontProp = function (propName, elm) {
      return $_dqtixqsejd09eyzf.from(DOMUtils.DOM.getStyle(elm, propName, true))
    }
    let getFontProp = function (propName) {
      return function (rootElm, elm) {
        return $_dqtixqsejd09eyzf.from(elm).map($_1p2zlou5jd09ez64.fromDom).filter($_4lqsjouajd09ez6h.isElement).bind(function (element) {
          return getSpecifiedFontProp(propName, rootElm, element.dom()).or(getComputedFontProp(propName, element.dom()))
        }).getOr('')
      }
    }
    let $_abi7twvbjd09ez9i = {
      getFontSize: getFontProp('fontSize'),
      getFontFamily: $_4iv73osfjd09eyzh.compose(normalizeFontFamily, getFontProp('fontFamily')),
      toPt: toPt
    }

    let getFirstFont = function (fontFamily) {
      return fontFamily ? fontFamily.split(',')[0] : ''
    }
    let findMatchingValue = function (items, fontFamily) {
      let value
      Tools.each(items, function (item) {
        if (item.value.toLowerCase() === fontFamily.toLowerCase()) {
          value = item.value
        }
      })
      Tools.each(items, function (item) {
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
          let fontFamily = $_abi7twvbjd09ez9i.getFontFamily(editor.getBody(), e.element)
          let match = findMatchingValue(items, fontFamily)
          self.value(match || null)
          if (!match && fontFamily) {
            self.text(getFirstFont(fontFamily))
          }
        })
      }
    }
    let createFormats = function (formats) {
      formats = formats.replace(/;$/, '').split(';')
      let i = formats.length
      while (i--) {
        formats[i] = formats[i].split('=')
      }
      return formats
    }
    let getFontItems = function (editor) {
      let defaultFontsFormats = 'Andale Mono=andale mono,monospace;' + 'Arial=arial,helvetica,sans-serif;' + 'Arial Black=arial black,sans-serif;' + 'Book Antiqua=book antiqua,palatino,serif;' + 'Comic Sans MS=comic sans ms,sans-serif;' + 'Courier New=courier new,courier,monospace;' + 'Georgia=georgia,palatino,serif;' + 'Helvetica=helvetica,arial,sans-serif;' + 'Impact=impact,sans-serif;' + 'Symbol=symbol;' + 'Tahoma=tahoma,arial,helvetica,sans-serif;' + 'Terminal=terminal,monaco,monospace;' + 'Times New Roman=times new roman,times,serif;' + 'Trebuchet MS=trebuchet ms,geneva,sans-serif;' + 'Verdana=verdana,geneva,sans-serif;' + 'Webdings=webdings;' + 'Wingdings=wingdings,zapf dingbats'
      let fonts = createFormats(editor.settings.font_formats || defaultFontsFormats)
      return Tools.map(fonts, function (font) {
        return {
          text: { raw: font[0] },
          value: font[1],
          textStyle: font[1].indexOf('dings') === -1 ? 'font-family:' + font[1] : ''
        }
      })
    }
    let registerButtons = function (editor) {
      editor.addButton('fontselect', function () {
        let items = getFontItems(editor)
        return {
          type: 'listbox',
          text: 'Font Family',
          tooltip: 'Font Family',
          values: items,
          fixedWidth: true,
          onPostRender: createFontNameListBoxChangeHandler(editor, items),
          onselect: function (e) {
            if (e.control.settings.value) {
              editor.execCommand('FontName', false, e.control.settings.value)
            }
          }
        }
      })
    }
    let register$1 = function (editor) {
      registerButtons(editor)
    }
    let $_6bvg21vajd09ez9f = { register: register$1 }

    let findMatchingValue$1 = function (items, pt, px) {
      let value
      Tools.each(items, function (item) {
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
          px = $_abi7twvbjd09ez9i.getFontSize(editor.getBody(), e.element)
          if (px) {
            for (precision = 3; !match && precision >= 0; precision--) {
              pt = $_abi7twvbjd09ez9i.toPt(px, precision)
              match = findMatchingValue$1(items, pt, px)
            }
          }
          self.value(match || null)
          if (!match) {
            self.text(pt)
          }
        })
      }
    }
    let getFontSizeItems = function (editor) {
      let defaultFontsizeFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
      let fontsizeFormats = editor.settings.fontsize_formats || defaultFontsizeFormats
      return Tools.map(fontsizeFormats.split(' '), function (item) {
        let text = item, value = item
        let values = item.split('=')
        if (values.length > 1) {
          text = values[0]
          value = values[1]
        }
        return {
          text: text,
          value: value
        }
      })
    }
    let registerButtons$1 = function (editor) {
      editor.addButton('fontsizeselect', function () {
        let items = getFontSizeItems(editor)
        return {
          type: 'listbox',
          text: 'Font Sizes',
          tooltip: 'Font Sizes',
          values: items,
          fixedWidth: true,
          onPostRender: createFontSizeListBoxChangeHandler(editor, items),
          onclick: function (e) {
            if (e.control.settings.value) {
              editor.execCommand('FontSize', false, e.control.settings.value)
            }
          }
        }
      })
    }
    let register$2 = function (editor) {
      registerButtons$1(editor)
    }
    let $_4t8uvgvcjd09ez9m = { register: register$2 }

    let defaultBlocks = 'Paragraph=p;' + 'Heading 1=h1;' + 'Heading 2=h2;' + 'Heading 3=h3;' + 'Heading 4=h4;' + 'Heading 5=h5;' + 'Heading 6=h6;' + 'Preformatted=pre'
    let createFormats$1 = function (formats) {
      formats = formats.replace(/;$/, '').split(';')
      let i = formats.length
      while (i--) {
        formats[i] = formats[i].split('=')
      }
      return formats
    }
    let createListBoxChangeHandler = function (editor, items, formatName) {
      return function () {
        let self = this
        editor.on('nodeChange', function (e) {
          let formatter = editor.formatter
          let value = null
          Tools.each(e.parents, function (node) {
            Tools.each(items, function (item) {
              if (formatName) {
                if (formatter.matchNode(node, formatName, { value: item.value })) {
                  value = item.value
                }
              } else {
                if (formatter.matchNode(node, item.value)) {
                  value = item.value
                }
              }
              if (value) {
                return false
              }
            })
            if (value) {
              return false
            }
          })
          self.value(value)
        })
      }
    }
    let lazyFormatSelectBoxItems = function (editor, blocks) {
      return function () {
        let items = []
        Tools.each(blocks, function (block) {
          items.push({
            text: block[0],
            value: block[1],
            textStyle: function () {
              return editor.formatter.getCssText(block[1])
            }
          })
        })
        return {
          type: 'listbox',
          text: blocks[0][0],
          values: items,
          fixedWidth: true,
          onselect: function (e) {
            if (e.control) {
              let fmt = e.control.value()
              $_fral3qv9jd09ez9d.toggleFormat(editor, fmt)()
            }
          },
          onPostRender: createListBoxChangeHandler(editor, items)
        }
      }
    }
    let buildMenuItems = function (editor, blocks) {
      return Tools.map(blocks, function (block) {
        return {
          text: block[0],
          onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, block[1]),
          textStyle: function () {
            return editor.formatter.getCssText(block[1])
          }
        }
      })
    }
    let register$3 = function (editor) {
      let blocks = createFormats$1(editor.settings.block_formats || defaultBlocks)
      editor.addMenuItem('blockformats', {
        text: 'Blocks',
        menu: buildMenuItems(editor, blocks)
      })
      editor.addButton('formatselect', lazyFormatSelectBoxItems(editor, blocks))
    }
    let $_cpddmfvdjd09ez9p = { register: register$3 }

    let hideMenuObjects = function (editor, menu) {
      let count = menu.length
      Tools.each(menu, function (item) {
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
    let hideFormatMenuItems = function (editor, menu) {
      let count = menu.items().length
      menu.items().each(function (item) {
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
      let createMenu = function (formats) {
        let menu = []
        if (!formats) {
          return
        }
        Tools.each(formats, function (format) {
          let menuItem = {
            text: format.title,
            icon: format.icon
          }
          if (format.items) {
            menuItem.menu = createMenu(format.items)
          } else {
            let formatName = format.format || 'custom' + count++
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
      let createStylesMenu = function () {
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
      editor.on('init', function () {
        Tools.each(newFormats, function (format) {
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
              $_fral3qv9jd09ez9d.toggleFormat(editor, this.settings.format)()
            }
            if (this.settings.cmd) {
              editor.execCommand(this.settings.cmd)
            }
          }
        }
      }
    }
    let registerMenuItems = function (editor, formatMenu) {
      editor.addMenuItem('formats', {
        text: 'Formats',
        menu: formatMenu
      })
    }
    let registerButtons$2 = function (editor, formatMenu) {
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
    let register$4 = function (editor) {
      let formatMenu = createFormatMenu(editor)
      registerMenuItems(editor, formatMenu)
      registerButtons$2(editor, formatMenu)
    }
    let $_c1yml7vejd09ez9r = { register: register$4 }

    let createCustomMenuItems = function (editor, names) {
      let items, nameList
      if (typeof names === 'string') {
        nameList = names.split(' ')
      } else if (Tools.isArray(names)) {
        return $_1z9gljsijd09ez00.flatten(Tools.map(names, function (names) {
          return createCustomMenuItems(editor, names)
        }))
      }
      items = Tools.grep(nameList, function (name) {
        return name === '|' || name in editor.menuItems
      })
      return Tools.map(items, function (name) {
        return name === '|' ? { text: '-' } : editor.menuItems[name]
      })
    }
    let isSeparator$1 = function (menuItem) {
      return menuItem && menuItem.text === '-'
    }
    let trimMenuItems = function (menuItems) {
      let menuItems2 = $_1z9gljsijd09ez00.filter(menuItems, function (menuItem, i, menuItems) {
        return !isSeparator$1(menuItem) || !isSeparator$1(menuItems[i - 1])
      })
      return $_1z9gljsijd09ez00.filter(menuItems2, function (menuItem, i, menuItems) {
        return !isSeparator$1(menuItem) || i > 0 && i < menuItems.length - 1
      })
    }
    let createContextMenuItems = function (editor, context) {
      let outputMenuItems = [{ text: '-' }]
      let menuItems = Tools.grep(editor.menuItems, function (menuItem) {
        return menuItem.context === context
      })
      Tools.each(menuItems, function (menuItem) {
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
    let createInsertMenu = function (editor) {
      let insertButtonItems = editor.settings.insert_button_items
      if (insertButtonItems) {
        return trimMenuItems(createCustomMenuItems(editor, insertButtonItems))
      } else {
        return trimMenuItems(createContextMenuItems(editor, 'insert'))
      }
    }
    let registerButtons$3 = function (editor) {
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
    let register$5 = function (editor) {
      registerButtons$3(editor)
    }
    let $_50u432vfjd09ez9w = { register: register$5 }

    let registerFormatButtons = function (editor) {
      Tools.each({
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strikethrough: 'Strikethrough',
        subscript: 'Subscript',
        superscript: 'Superscript'
      }, function (text, name) {
        editor.addButton(name, {
          active: false,
          tooltip: text,
          onPostRender: $_fral3qv9jd09ez9d.postRenderFormat(editor, name),
          onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, name)
        })
      })
    }
    let registerCommandButtons = function (editor) {
      Tools.each({
        outdent: [
          'Decrease indent',
          'Outdent'
        ],
        indent: [
          'Increase indent',
          'Indent'
        ],
        cut: [
          'Cut',
          'Cut'
        ],
        copy: [
          'Copy',
          'Copy'
        ],
        paste: [
          'Paste',
          'Paste'
        ],
        help: [
          'Help',
          'mceHelp'
        ],
        selectall: [
          'Select all',
          'SelectAll'
        ],
        visualaid: [
          'Visual aids',
          'mceToggleVisualAid'
        ],
        newdocument: [
          'New document',
          'mceNewDocument'
        ],
        removeformat: [
          'Clear formatting',
          'RemoveFormat'
        ],
        remove: [
          'Remove',
          'Delete'
        ]
      }, function (item, name) {
        editor.addButton(name, {
          tooltip: item[0],
          cmd: item[1]
        })
      })
    }
    let registerCommandToggleButtons = function (editor) {
      Tools.each({
        blockquote: [
          'Blockquote',
          'mceBlockQuote'
        ],
        subscript: [
          'Subscript',
          'Subscript'
        ],
        superscript: [
          'Superscript',
          'Superscript'
        ]
      }, function (item, name) {
        editor.addButton(name, {
          active: false,
          tooltip: item[0],
          cmd: item[1],
          onPostRender: $_fral3qv9jd09ez9d.postRenderFormat(editor, name)
        })
      })
    }
    let registerButtons$4 = function (editor) {
      registerFormatButtons(editor)
      registerCommandButtons(editor)
      registerCommandToggleButtons(editor)
    }
    let registerMenuItems$1 = function (editor) {
      Tools.each({
        bold: [
          'Bold',
          'Bold',
          'Meta+B'
        ],
        italic: [
          'Italic',
          'Italic',
          'Meta+I'
        ],
        underline: [
          'Underline',
          'Underline',
          'Meta+U'
        ],
        strikethrough: [
          'Strikethrough',
          'Strikethrough'
        ],
        subscript: [
          'Subscript',
          'Subscript'
        ],
        superscript: [
          'Superscript',
          'Superscript'
        ],
        removeformat: [
          'Clear formatting',
          'RemoveFormat'
        ],
        newdocument: [
          'New document',
          'mceNewDocument'
        ],
        cut: [
          'Cut',
          'Cut',
          'Meta+X'
        ],
        copy: [
          'Copy',
          'Copy',
          'Meta+C'
        ],
        paste: [
          'Paste',
          'Paste',
          'Meta+V'
        ],
        selectall: [
          'Select all',
          'SelectAll',
          'Meta+A'
        ]
      }, function (item, name) {
        editor.addMenuItem(name, {
          text: item[0],
          icon: name,
          shortcut: item[2],
          cmd: item[1]
        })
      })
      editor.addMenuItem('codeformat', {
        text: 'Code',
        icon: 'code',
        onclick: $_fral3qv9jd09ez9d.toggleFormat(editor, 'code')
      })
    }
    let register$6 = function (editor) {
      registerButtons$4(editor)
      registerMenuItems$1(editor)
    }
    let $_2w8562vgjd09eza0 = { register: register$6 }

    let toggleUndoRedoState = function (editor, type) {
      return function () {
        let self = this
        let checkState = function () {
          let typeFn = type === 'redo' ? 'hasRedo' : 'hasUndo'
          return editor.undoManager ? editor.undoManager[typeFn]() : false
        }
        self.disabled(!checkState())
        editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', function () {
          self.disabled(editor.readonly || !checkState())
        })
      }
    }
    let registerMenuItems$2 = function (editor) {
      editor.addMenuItem('undo', {
        text: 'Undo',
        icon: 'undo',
        shortcut: 'Meta+Z',
        onPostRender: toggleUndoRedoState(editor, 'undo'),
        cmd: 'undo'
      })
      editor.addMenuItem('redo', {
        text: 'Redo',
        icon: 'redo',
        shortcut: 'Meta+Y',
        onPostRender: toggleUndoRedoState(editor, 'redo'),
        cmd: 'redo'
      })
    }
    let registerButtons$5 = function (editor) {
      editor.addButton('undo', {
        tooltip: 'Undo',
        onPostRender: toggleUndoRedoState(editor, 'undo'),
        cmd: 'undo'
      })
      editor.addButton('redo', {
        tooltip: 'Redo',
        onPostRender: toggleUndoRedoState(editor, 'redo'),
        cmd: 'redo'
      })
    }
    let register$7 = function (editor) {
      registerMenuItems$2(editor)
      registerButtons$5(editor)
    }
    let $_4fgarevhjd09eza4 = { register: register$7 }

    let toggleVisualAidState = function (editor) {
      return function () {
        let self = this
        editor.on('VisualAid', function (e) {
          self.active(e.hasVisual)
        })
        self.active(editor.hasVisual)
      }
    }
    let registerMenuItems$3 = function (editor) {
      editor.addMenuItem('visualaid', {
        text: 'Visual aids',
        selectable: true,
        onPostRender: toggleVisualAidState(editor),
        cmd: 'mceToggleVisualAid'
      })
    }
    let register$8 = function (editor) {
      registerMenuItems$3(editor)
    }
    let $_9ixd2zvijd09eza5 = { register: register$8 }

    let setupEnvironment = function () {
      Widget.tooltips = !Env.iOS
      Control$1.translate = function (text) {
        return EditorManager.translate(text)
      }
    }
    let setupUiContainer = function (editor) {
      if (editor.settings.ui_container) {
        Env.container = $_41jmrcv5jd09ez90.descendant($_1p2zlou5jd09ez64.fromDom(document.body), editor.settings.ui_container).fold($_4iv73osfjd09eyzh.constant(null), function (elm) {
          return elm.dom()
        })
      }
    }
    let setupRtlMode = function (editor) {
      if (editor.rtl) {
        Control$1.rtl = true
      }
    }
    let setupHideFloatPanels = function (editor) {
      editor.on('mousedown', function () {
        FloatPanel.hideAll()
      })
    }
    let setup$1 = function (editor) {
      setupRtlMode(editor)
      setupHideFloatPanels(editor)
      setupUiContainer(editor)
      setupEnvironment()
      $_cpddmfvdjd09ez9p.register(editor)
      $_aiy410v8jd09ez9c.register(editor)
      $_2w8562vgjd09eza0.register(editor)
      $_4fgarevhjd09eza4.register(editor)
      $_4t8uvgvcjd09ez9m.register(editor)
      $_6bvg21vajd09ez9f.register(editor)
      $_c1yml7vejd09ez9r.register(editor)
      $_9ixd2zvijd09eza5.register(editor)
      $_50u432vfjd09ez9w.register(editor)
    }
    let $_cxwtjjv4jd09ez8x = { setup: setup$1 }

    let GridLayout = AbsoluteLayout.extend({
      recalc: function (container) {
        let settings, rows, cols, items, contLayoutRect, width, height, rect, ctrlLayoutRect, ctrl, x, y, posX, posY, ctrlSettings, contPaddingBox, align, spacingH, spacingV, alignH, alignV, maxX, maxY
        let colWidths = []
        let rowHeights = []
        let ctrlMinWidth, ctrlMinHeight, availableWidth, availableHeight, reverseRows, idx
        settings = container.settings
        items = container.items().filter(':visible')
        contLayoutRect = container.layoutRect()
        cols = settings.columns || Math.ceil(Math.sqrt(items.length))
        rows = Math.ceil(items.length / cols)
        spacingH = settings.spacingH || settings.spacing || 0
        spacingV = settings.spacingV || settings.spacing || 0
        alignH = settings.alignH || settings.align
        alignV = settings.alignV || settings.align
        contPaddingBox = container.paddingBox
        reverseRows = 'reverseRows' in settings ? settings.reverseRows : container.isRtl()
        if (alignH && typeof alignH === 'string') {
          alignH = [alignH]
        }
        if (alignV && typeof alignV === 'string') {
          alignV = [alignV]
        }
        for (x = 0; x < cols; x++) {
          colWidths.push(0)
        }
        for (y = 0; y < rows; y++) {
          rowHeights.push(0)
        }
        for (y = 0; y < rows; y++) {
          for (x = 0; x < cols; x++) {
            ctrl = items[y * cols + x]
            if (!ctrl) {
              break
            }
            ctrlLayoutRect = ctrl.layoutRect()
            ctrlMinWidth = ctrlLayoutRect.minW
            ctrlMinHeight = ctrlLayoutRect.minH
            colWidths[x] = ctrlMinWidth > colWidths[x] ? ctrlMinWidth : colWidths[x]
            rowHeights[y] = ctrlMinHeight > rowHeights[y] ? ctrlMinHeight : rowHeights[y]
          }
        }
        availableWidth = contLayoutRect.innerW - contPaddingBox.left - contPaddingBox.right
        for (maxX = 0, x = 0; x < cols; x++) {
          maxX += colWidths[x] + (x > 0 ? spacingH : 0)
          availableWidth -= (x > 0 ? spacingH : 0) + colWidths[x]
        }
        availableHeight = contLayoutRect.innerH - contPaddingBox.top - contPaddingBox.bottom
        for (maxY = 0, y = 0; y < rows; y++) {
          maxY += rowHeights[y] + (y > 0 ? spacingV : 0)
          availableHeight -= (y > 0 ? spacingV : 0) + rowHeights[y]
        }
        maxX += contPaddingBox.left + contPaddingBox.right
        maxY += contPaddingBox.top + contPaddingBox.bottom
        rect = {}
        rect.minW = maxX + (contLayoutRect.w - contLayoutRect.innerW)
        rect.minH = maxY + (contLayoutRect.h - contLayoutRect.innerH)
        rect.contentW = rect.minW - contLayoutRect.deltaW
        rect.contentH = rect.minH - contLayoutRect.deltaH
        rect.minW = Math.min(rect.minW, contLayoutRect.maxW)
        rect.minH = Math.min(rect.minH, contLayoutRect.maxH)
        rect.minW = Math.max(rect.minW, contLayoutRect.startMinWidth)
        rect.minH = Math.max(rect.minH, contLayoutRect.startMinHeight)
        if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
          rect.w = rect.minW
          rect.h = rect.minH
          container.layoutRect(rect)
          this.recalc(container)
          if (container._lastRect === null) {
            let parentCtrl = container.parent()
            if (parentCtrl) {
              parentCtrl._lastRect = null
              parentCtrl.recalc()
            }
          }
          return
        }
        if (contLayoutRect.autoResize) {
          rect = container.layoutRect(rect)
          rect.contentW = rect.minW - contLayoutRect.deltaW
          rect.contentH = rect.minH - contLayoutRect.deltaH
        }
        let flexV
        if (settings.packV === 'start') {
          flexV = 0
        } else {
          flexV = availableHeight > 0 ? Math.floor(availableHeight / rows) : 0
        }
        let totalFlex = 0
        let flexWidths = settings.flexWidths
        if (flexWidths) {
          for (x = 0; x < flexWidths.length; x++) {
            totalFlex += flexWidths[x]
          }
        } else {
          totalFlex = cols
        }
        let ratio = availableWidth / totalFlex
        for (x = 0; x < cols; x++) {
          colWidths[x] += flexWidths ? flexWidths[x] * ratio : ratio
        }
        posY = contPaddingBox.top
        for (y = 0; y < rows; y++) {
          posX = contPaddingBox.left
          height = rowHeights[y] + flexV
          for (x = 0; x < cols; x++) {
            if (reverseRows) {
              idx = y * cols + cols - 1 - x
            } else {
              idx = y * cols + x
            }
            ctrl = items[idx]
            if (!ctrl) {
              break
            }
            ctrlSettings = ctrl.settings
            ctrlLayoutRect = ctrl.layoutRect()
            width = Math.max(colWidths[x], ctrlLayoutRect.startMinWidth)
            ctrlLayoutRect.x = posX
            ctrlLayoutRect.y = posY
            align = ctrlSettings.alignH || (alignH ? alignH[x] || alignH[0] : null)
            if (align === 'center') {
              ctrlLayoutRect.x = posX + width / 2 - ctrlLayoutRect.w / 2
            } else if (align === 'right') {
              ctrlLayoutRect.x = posX + width - ctrlLayoutRect.w
            } else if (align === 'stretch') {
              ctrlLayoutRect.w = width
            }
            align = ctrlSettings.alignV || (alignV ? alignV[x] || alignV[0] : null)
            if (align === 'center') {
              ctrlLayoutRect.y = posY + height / 2 - ctrlLayoutRect.h / 2
            } else if (align === 'bottom') {
              ctrlLayoutRect.y = posY + height - ctrlLayoutRect.h
            } else if (align === 'stretch') {
              ctrlLayoutRect.h = height
            }
            ctrl.layoutRect(ctrlLayoutRect)
            posX += width + spacingH
            if (ctrl.recalc) {
              ctrl.recalc()
            }
          }
          posY += height + spacingV
        }
      }
    })

    let Iframe$1 = Widget.extend({
      renderHtml: function () {
        let self = this
        self.classes.add('iframe')
        self.canFocus = false
        return '<iframe id="' + self._id + '" class="' + self.classes + '" tabindex="-1" src="' + (self.settings.url || 'javascript:\'\'') + '" frameborder="0"></iframe>'
      },
      src: function (src) {
        this.getEl().src = src
      },
      html: function (html, callback) {
        let self = this, body = this.getEl().contentWindow.document.body
        if (!body) {
          Delay.setTimeout(function () {
            self.html(html)
          })
        } else {
          body.innerHTML = html
          if (callback) {
            callback()
          }
        }
        return this
      }
    })

    let InfoBox = Widget.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        self.classes.add('widget').add('infobox')
        self.canFocus = false
      },
      severity: function (level) {
        this.classes.remove('error')
        this.classes.remove('warning')
        this.classes.remove('success')
        this.classes.add(level)
      },
      help: function (state) {
        this.state.set('help', state)
      },
      renderHtml: function () {
        let self = this, prefix = self.classPrefix
        return '<div id="' + self._id + '" class="' + self.classes + '">' + '<div id="' + self._id + '-body">' + self.encode(self.state.get('text')) + '<button role="button" tabindex="-1">' + '<i class="' + prefix + 'ico ' + prefix + 'i-help"></i>' + '</button>' + '</div>' + '</div>'
      },
      bindStates: function () {
        let self = this
        self.state.on('change:text', function (e) {
          self.getEl('body').firstChild.data = self.encode(e.value)
          if (self.state.get('rendered')) {
            self.updateLayoutRect()
          }
        })
        self.state.on('change:help', function (e) {
          self.classes.toggle('has-help', e.value)
          if (self.state.get('rendered')) {
            self.updateLayoutRect()
          }
        })
        return self._super()
      }
    })

    let Label = Widget.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        self.classes.add('widget').add('label')
        self.canFocus = false
        if (settings.multiline) {
          self.classes.add('autoscroll')
        }
        if (settings.strong) {
          self.classes.add('strong')
        }
      },
      initLayoutRect: function () {
        let self = this, layoutRect = self._super()
        if (self.settings.multiline) {
          let size = funcs.getSize(self.getEl())
          if (size.width > layoutRect.maxW) {
            layoutRect.minW = layoutRect.maxW
            self.classes.add('multiline')
          }
          self.getEl().style.width = layoutRect.minW + 'px'
          layoutRect.startMinH = layoutRect.h = layoutRect.minH = Math.min(layoutRect.maxH, funcs.getSize(self.getEl()).height)
        }
        return layoutRect
      },
      repaint: function () {
        let self = this
        if (!self.settings.multiline) {
          self.getEl().style.lineHeight = self.layoutRect().h + 'px'
        }
        return self._super()
      },
      severity: function (level) {
        this.classes.remove('error')
        this.classes.remove('warning')
        this.classes.remove('success')
        this.classes.add(level)
      },
      renderHtml: function () {
        let self = this
        let targetCtrl, forName, forId = self.settings.forId
        let text = self.settings.html ? self.settings.html : self.encode(self.state.get('text'))
        if (!forId && (forName = self.settings.forName)) {
          targetCtrl = self.getRoot().find('#' + forName)[0]
          if (targetCtrl) {
            forId = targetCtrl._id
          }
        }
        if (forId) {
          return '<label id="' + self._id + '" class="' + self.classes + '"' + (forId ? ' for="' + forId + '"' : '') + '>' + text + '</label>'
        }
        return '<span id="' + self._id + '" class="' + self.classes + '">' + text + '</span>'
      },
      bindStates: function () {
        let self = this
        self.state.on('change:text', function (e) {
          self.innerHtml(self.encode(e.value))
          if (self.state.get('rendered')) {
            self.updateLayoutRect()
          }
        })
        return self._super()
      }
    })

    let Toolbar$1 = Container.extend({
      Defaults: {
        role: 'toolbar',
        layout: 'flow'
      },
      init: function (settings) {
        let self = this
        self._super(settings)
        self.classes.add('toolbar')
      },
      postRender: function () {
        let self = this
        self.items().each(function (ctrl) {
          ctrl.classes.add('toolbar-item')
        })
        return self._super()
      }
    })

    let MenuBar = Toolbar$1.extend({
      Defaults: {
        role: 'menubar',
        containerCls: 'menubar',
        ariaRoot: true,
        defaults: { type: 'menubutton' }
      }
    })

    function isChildOf$1 (node, parent) {
      while (node) {
        if (parent === node) {
          return true
        }
        node = node.parentNode
      }
      return false
    }
    let MenuButton = Button.extend({
      init: function (settings) {
        let self = this
        self._renderOpen = true
        self._super(settings)
        settings = self.settings
        self.classes.add('menubtn')
        if (settings.fixedWidth) {
          self.classes.add('fixed-width')
        }
        self.aria('haspopup', true)
        self.state.set('menu', settings.menu || self.render())
      },
      showMenu: function (toggle) {
        let self = this
        let menu
        if (self.menu && self.menu.visible() && toggle !== false) {
          return self.hideMenu()
        }
        if (!self.menu) {
          menu = self.state.get('menu') || []
          self.classes.add('opened')
          if (menu.length) {
            menu = {
              type: 'menu',
              animate: true,
              items: menu
            }
          } else {
            menu.type = menu.type || 'menu'
            menu.animate = true
          }
          if (!menu.renderTo) {
            self.menu = Factory.create(menu).parent(self).renderTo()
          } else {
            self.menu = menu.parent(self).show().renderTo()
          }
          self.fire('createmenu')
          self.menu.reflow()
          self.menu.on('cancel', function (e) {
            if (e.control.parent() === self.menu) {
              e.stopPropagation()
              self.focus()
              self.hideMenu()
            }
          })
          self.menu.on('select', function () {
            self.focus()
          })
          self.menu.on('show hide', function (e) {
            if (e.control === self.menu) {
              self.activeMenu(e.type === 'show')
              self.classes.toggle('opened', e.type === 'show')
            }
            self.aria('expanded', e.type === 'show')
          }).fire('show')
        }
        self.menu.show()
        self.menu.layoutRect({ w: self.layoutRect().w })
        self.menu.repaint()
        self.menu.moveRel(self.getEl(), self.isRtl() ? [
          'br-tr',
          'tr-br'
        ] : [
          'bl-tl',
          'tl-bl'
        ])
        self.fire('showmenu')
      },
      hideMenu: function () {
        let self = this
        if (self.menu) {
          self.menu.items().each(function (item) {
            if (item.hideMenu) {
              item.hideMenu()
            }
          })
          self.menu.hide()
        }
      },
      activeMenu: function (state) {
        this.classes.toggle('active', state)
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = self.classPrefix
        let icon = self.settings.icon, image
        let text = self.state.get('text')
        let textHtml = ''
        image = self.settings.image
        if (image) {
          icon = 'none'
          if (typeof image !== 'string') {
            image = window.getSelection ? image[0] : image[1]
          }
          image = ' style="background-image: url(\'' + image + '\')"'
        } else {
          image = ''
        }
        if (text) {
          self.classes.add('btn-has-text')
          textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
        }
        icon = self.settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : ''
        self.aria('role', self.parent() instanceof MenuBar ? 'menuitem' : 'button')
        return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1" aria-labelledby="' + id + '">' + '<button id="' + id + '-open" role="presentation" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>'
      },
      postRender: function () {
        let self = this
        self.on('click', function (e) {
          if (e.control === self && isChildOf$1(e.target, self.getEl())) {
            self.focus()
            self.showMenu(!e.aria)
            if (e.aria) {
              self.menu.items().filter(':visible')[0].focus()
            }
          }
        })
        self.on('mouseenter', function (e) {
          let overCtrl = e.control
          let parent = self.parent()
          let hasVisibleSiblingMenu
          if (overCtrl && parent && overCtrl instanceof MenuButton && overCtrl.parent() === parent) {
            parent.items().filter('MenuButton').each(function (ctrl) {
              if (ctrl.hideMenu && ctrl !== overCtrl) {
                if (ctrl.menu && ctrl.menu.visible()) {
                  hasVisibleSiblingMenu = true
                }
                ctrl.hideMenu()
              }
            })
            if (hasVisibleSiblingMenu) {
              overCtrl.focus()
              overCtrl.showMenu()
            }
          }
        })
        return self._super()
      },
      bindStates: function () {
        let self = this
        self.state.on('change:menu', function () {
          if (self.menu) {
            self.menu.remove()
          }
          self.menu = null
        })
        return self._super()
      },
      remove: function () {
        this._super()
        if (this.menu) {
          this.menu.remove()
        }
      }
    })

    let Menu = FloatPanel.extend({
      Defaults: {
        defaultType: 'menuitem',
        border: 1,
        layout: 'stack',
        role: 'application',
        bodyRole: 'menu',
        ariaRoot: true
      },
      init: function (settings) {
        let self = this
        settings.autohide = true
        settings.constrainToViewport = true
        if (typeof settings.items === 'function') {
          settings.itemsFactory = settings.items
          settings.items = []
        }
        if (settings.itemDefaults) {
          let items = settings.items
          let i = items.length
          while (i--) {
            items[i] = Tools.extend({}, settings.itemDefaults, items[i])
          }
        }
        self._super(settings)
        self.classes.add('menu')
        if (settings.animate && Env.ie !== 11) {
          self.classes.add('animate')
        }
      },
      repaint: function () {
        this.classes.toggle('menu-align', true)
        this._super()
        this.getEl().style.height = ''
        this.getEl('body').style.height = ''
        return this
      },
      cancel: function () {
        let self = this
        self.hideAll()
        self.fire('select')
      },
      load: function () {
        let self = this
        let time, factory
        function hideThrobber () {
          if (self.throbber) {
            self.throbber.hide()
            self.throbber = null
          }
        }
        factory = self.settings.itemsFactory
        if (!factory) {
          return
        }
        if (!self.throbber) {
          self.throbber = new Throbber(self.getEl('body'), true)
          if (self.items().length === 0) {
            self.throbber.show()
            self.fire('loading')
          } else {
            self.throbber.show(100, function () {
              self.items().remove()
              self.fire('loading')
            })
          }
          self.on('hide close', hideThrobber)
        }
        self.requestTime = time = new Date().getTime()
        self.settings.itemsFactory(function (items) {
          if (items.length === 0) {
            self.hide()
            return
          }
          if (self.requestTime !== time) {
            return
          }
          self.getEl().style.width = ''
          self.getEl('body').style.width = ''
          hideThrobber()
          self.items().remove()
          self.getEl('body').innerHTML = ''
          self.add(items)
          self.renderNew()
          self.fire('loaded')
        })
      },
      hideAll: function () {
        let self = this
        this.find('menuitem').exec('hideMenu')
        return self._super()
      },
      preRender: function () {
        let self = this
        self.items().each(function (ctrl) {
          let settings = ctrl.settings
          if (settings.icon || settings.image || settings.selectable) {
            self._hasIcons = true
            return false
          }
        })
        if (self.settings.itemsFactory) {
          self.on('postrender', function () {
            if (self.settings.itemsFactory) {
              self.load()
            }
          })
        }
        self.on('show hide', function (e) {
          if (e.control === self) {
            if (e.type === 'show') {
              Delay.setTimeout(function () {
                self.classes.add('in')
              }, 0)
            } else {
              self.classes.remove('in')
            }
          }
        })
        return self._super()
      }
    })

    let ListBox = MenuButton.extend({
      init: function (settings) {
        let self = this
        let values, selected, selectedText, lastItemCtrl
        function setSelected (menuValues) {
          for (let i = 0; i < menuValues.length; i++) {
            selected = menuValues[i].selected || settings.value === menuValues[i].value
            if (selected) {
              selectedText = selectedText || menuValues[i].text
              self.state.set('value', menuValues[i].value)
              return true
            }
            if (menuValues[i].menu) {
              if (setSelected(menuValues[i].menu)) {
                return true
              }
            }
          }
        }
        self._super(settings)
        settings = self.settings
        self._values = values = settings.values
        if (values) {
          if (typeof settings.value !== 'undefined') {
            setSelected(values)
          }
          if (!selected && values.length > 0) {
            selectedText = values[0].text
            self.state.set('value', values[0].value)
          }
          self.state.set('menu', values)
        }
        self.state.set('text', settings.text || selectedText)
        self.classes.add('listbox')
        self.on('select', function (e) {
          let ctrl = e.control
          if (lastItemCtrl) {
            e.lastControl = lastItemCtrl
          }
          if (settings.multiple) {
            ctrl.active(!ctrl.active())
          } else {
            self.value(e.control.value())
          }
          lastItemCtrl = ctrl
        })
      },
      bindStates: function () {
        let self = this
        function activateMenuItemsByValue (menu, value) {
          if (menu instanceof Menu) {
            menu.items().each(function (ctrl) {
              if (!ctrl.hasMenus()) {
                ctrl.active(ctrl.value() === value)
              }
            })
          }
        }
        function getSelectedItem (menuValues, value) {
          let selectedItem
          if (!menuValues) {
            return
          }
          for (let i = 0; i < menuValues.length; i++) {
            if (menuValues[i].value === value) {
              return menuValues[i]
            }
            if (menuValues[i].menu) {
              selectedItem = getSelectedItem(menuValues[i].menu, value)
              if (selectedItem) {
                return selectedItem
              }
            }
          }
        }
        self.on('show', function (e) {
          activateMenuItemsByValue(e.control, self.value())
        })
        self.state.on('change:value', function (e) {
          let selectedItem = getSelectedItem(self.state.get('menu'), e.value)
          if (selectedItem) {
            self.text(selectedItem.text)
          } else {
            self.text(self.settings.text)
          }
        })
        return self._super()
      }
    })

    let toggleTextStyle = function (ctrl, state) {
      let textStyle = ctrl._textStyle
      if (textStyle) {
        let textElm = ctrl.getEl('text')
        textElm.setAttribute('style', textStyle)
        if (state) {
          textElm.style.color = ''
          textElm.style.backgroundColor = ''
        }
      }
    }
    let MenuItem = Widget.extend({
      Defaults: {
        border: 0,
        role: 'menuitem'
      },
      init: function (settings) {
        let self = this
        let text
        self._super(settings)
        settings = self.settings
        self.classes.add('menu-item')
        if (settings.menu) {
          self.classes.add('menu-item-expand')
        }
        if (settings.preview) {
          self.classes.add('menu-item-preview')
        }
        text = self.state.get('text')
        if (text === '-' || text === '|') {
          self.classes.add('menu-item-sep')
          self.aria('role', 'separator')
          self.state.set('text', '-')
        }
        if (settings.selectable) {
          self.aria('role', 'menuitemcheckbox')
          self.classes.add('menu-item-checkbox')
          settings.icon = 'selected'
        }
        if (!settings.preview && !settings.selectable) {
          self.classes.add('menu-item-normal')
        }
        self.on('mousedown', function (e) {
          e.preventDefault()
        })
        if (settings.menu && !settings.ariaHideMenu) {
          self.aria('haspopup', true)
        }
      },
      hasMenus: function () {
        return !!this.settings.menu
      },
      showMenu: function () {
        let self = this
        let settings = self.settings
        let menu
        let parent = self.parent()
        parent.items().each(function (ctrl) {
          if (ctrl !== self) {
            ctrl.hideMenu()
          }
        })
        if (settings.menu) {
          menu = self.menu
          if (!menu) {
            menu = settings.menu
            if (menu.length) {
              menu = {
                type: 'menu',
                animate: true,
                items: menu
              }
            } else {
              menu.type = menu.type || 'menu'
              menu.animate = true
            }
            if (parent.settings.itemDefaults) {
              menu.itemDefaults = parent.settings.itemDefaults
            }
            menu = self.menu = Factory.create(menu).parent(self).renderTo()
            menu.reflow()
            menu.on('cancel', function (e) {
              e.stopPropagation()
              self.focus()
              menu.hide()
            })
            menu.on('show hide', function (e) {
              if (e.control.items) {
                e.control.items().each(function (ctrl) {
                  ctrl.active(ctrl.settings.selected)
                })
              }
            }).fire('show')
            menu.on('hide', function (e) {
              if (e.control === menu) {
                self.classes.remove('selected')
              }
            })
            menu.submenu = true
          } else {
            menu.show()
          }
          menu._parentMenu = parent
          menu.classes.add('menu-sub')
          let rel = menu.testMoveRel(self.getEl(), self.isRtl() ? [
            'tl-tr',
            'bl-br',
            'tr-tl',
            'br-bl'
          ] : [
            'tr-tl',
            'br-bl',
            'tl-tr',
            'bl-br'
          ])
          menu.moveRel(self.getEl(), rel)
          menu.rel = rel
          rel = 'menu-sub-' + rel
          menu.classes.remove(menu._lastRel).add(rel)
          menu._lastRel = rel
          self.classes.add('selected')
          self.aria('expanded', true)
        }
      },
      hideMenu: function () {
        let self = this
        if (self.menu) {
          self.menu.items().each(function (item) {
            if (item.hideMenu) {
              item.hideMenu()
            }
          })
          self.menu.hide()
          self.aria('expanded', false)
        }
        return self
      },
      renderHtml: function () {
        let self = this
        let id = self._id
        let settings = self.settings
        let prefix = self.classPrefix
        let text = self.state.get('text')
        let icon = self.settings.icon, image = '', shortcut = settings.shortcut
        let url = self.encode(settings.url), iconHtml = ''
        function convertShortcut (shortcut) {
          let i, value, replace = {}
          if (Env.mac) {
            replace = {
              alt: '&#x2325;',
              ctrl: '&#x2318;',
              shift: '&#x21E7;',
              meta: '&#x2318;'
            }
          } else {
            replace = { meta: 'Ctrl' }
          }
          shortcut = shortcut.split('+')
          for (i = 0; i < shortcut.length; i++) {
            value = replace[shortcut[i].toLowerCase()]
            if (value) {
              shortcut[i] = value
            }
          }
          return shortcut.join('+')
        }
        function escapeRegExp (str) {
          return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        }
        function markMatches (text) {
          let match = settings.match || ''
          return match ? text.replace(new RegExp(escapeRegExp(match), 'gi'), function (match) {
            return '!mce~match[' + match + ']mce~match!'
          }) : text
        }
        function boldMatches (text) {
          return text.replace(new RegExp(escapeRegExp('!mce~match['), 'g'), '<b>').replace(new RegExp(escapeRegExp(']mce~match!'), 'g'), '</b>')
        }
        if (icon) {
          self.parent().classes.add('menu-has-icons')
        }
        if (settings.image) {
          image = ' style="background-image: url(\'' + settings.image + '\')"'
        }
        if (shortcut) {
          shortcut = convertShortcut(shortcut)
        }
        icon = prefix + 'ico ' + prefix + 'i-' + (self.settings.icon || 'none')
        iconHtml = text !== '-' ? '<i class="' + icon + '"' + image + '></i>\xA0' : ''
        text = boldMatches(self.encode(markMatches(text)))
        url = boldMatches(self.encode(markMatches(url)))
        return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1">' + iconHtml + (text !== '-' ? '<span id="' + id + '-text" class="' + prefix + 'text">' + text + '</span>' : '') + (shortcut ? '<div id="' + id + '-shortcut" class="' + prefix + 'menu-shortcut">' + shortcut + '</div>' : '') + (settings.menu ? '<div class="' + prefix + 'caret"></div>' : '') + (url ? '<div class="' + prefix + 'menu-item-link">' + url + '</div>' : '') + '</div>'
      },
      postRender: function () {
        let self = this, settings = self.settings
        let textStyle = settings.textStyle
        if (typeof textStyle === 'function') {
          textStyle = textStyle.call(this)
        }
        if (textStyle) {
          let textElm = self.getEl('text')
          if (textElm) {
            textElm.setAttribute('style', textStyle)
            self._textStyle = textStyle
          }
        }
        self.on('mouseenter click', function (e) {
          if (e.control === self) {
            if (!settings.menu && e.type === 'click') {
              self.fire('select')
              Delay.requestAnimationFrame(function () {
                self.parent().hideAll()
              })
            } else {
              self.showMenu()
              if (e.aria) {
                self.menu.focus(true)
              }
            }
          }
        })
        self._super()
        return self
      },
      hover: function () {
        let self = this
        self.parent().items().each(function (ctrl) {
          ctrl.classes.remove('selected')
        })
        self.classes.toggle('selected', true)
        return self
      },
      active: function (state) {
        toggleTextStyle(this, state)
        if (typeof state !== 'undefined') {
          this.aria('checked', state)
        }
        return this._super(state)
      },
      remove: function () {
        this._super()
        if (this.menu) {
          this.menu.remove()
        }
      }
    })

    let Radio = Checkbox.extend({
      Defaults: {
        classes: 'radio',
        role: 'radio'
      }
    })

    let ResizeHandle = Widget.extend({
      renderHtml: function () {
        let self = this, prefix = self.classPrefix
        self.classes.add('resizehandle')
        if (self.settings.direction === 'both') {
          self.classes.add('resizehandle-both')
        }
        self.canFocus = false
        return '<div id="' + self._id + '" class="' + self.classes + '">' + '<i class="' + prefix + 'ico ' + prefix + 'i-resize"></i>' + '</div>'
      },
      postRender: function () {
        let self = this
        self._super()
        self.resizeDragHelper = new DragHelper(this._id, {
          start: function () {
            self.fire('ResizeStart')
          },
          drag: function (e) {
            if (self.settings.direction !== 'both') {
              e.deltaX = 0
            }
            self.fire('Resize', e)
          },
          stop: function () {
            self.fire('ResizeEnd')
          }
        })
      },
      remove: function () {
        if (this.resizeDragHelper) {
          this.resizeDragHelper.destroy()
        }
        return this._super()
      }
    })

    function createOptions (options) {
      let strOptions = ''
      if (options) {
        for (let i = 0; i < options.length; i++) {
          strOptions += '<option value="' + options[i] + '">' + options[i] + '</option>'
        }
      }
      return strOptions
    }
    let SelectBox = Widget.extend({
      Defaults: {
        classes: 'selectbox',
        role: 'selectbox',
        options: []
      },
      init: function (settings) {
        let self = this
        self._super(settings)
        if (self.settings.size) {
          self.size = self.settings.size
        }
        if (self.settings.options) {
          self._options = self.settings.options
        }
        self.on('keydown', function (e) {
          let rootControl
          if (e.keyCode === 13) {
            e.preventDefault()
            self.parents().reverse().each(function (ctrl) {
              if (ctrl.toJSON) {
                rootControl = ctrl
                return false
              }
            })
            self.fire('submit', { data: rootControl.toJSON() })
          }
        })
      },
      options: function (state) {
        if (!arguments.length) {
          return this.state.get('options')
        }
        this.state.set('options', state)
        return this
      },
      renderHtml: function () {
        let self = this
        let options, size = ''
        options = createOptions(self._options)
        if (self.size) {
          size = ' size = "' + self.size + '"'
        }
        return '<select id="' + self._id + '" class="' + self.classes + '"' + size + '>' + options + '</select>'
      },
      bindStates: function () {
        let self = this
        self.state.on('change:options', function (e) {
          self.getEl().innerHTML = createOptions(e.value)
        })
        return self._super()
      }
    })

    function constrain (value, minVal, maxVal) {
      if (value < minVal) {
        value = minVal
      }
      if (value > maxVal) {
        value = maxVal
      }
      return value
    }
    function setAriaProp (el, name, value) {
      el.setAttribute('aria-' + name, value)
    }
    function updateSliderHandle (ctrl, value) {
      let maxHandlePos, shortSizeName, sizeName, stylePosName, styleValue, handleEl
      if (ctrl.settings.orientation === 'v') {
        stylePosName = 'top'
        sizeName = 'height'
        shortSizeName = 'h'
      } else {
        stylePosName = 'left'
        sizeName = 'width'
        shortSizeName = 'w'
      }
      handleEl = ctrl.getEl('handle')
      maxHandlePos = (ctrl.layoutRect()[shortSizeName] || 100) - funcs.getSize(handleEl)[sizeName]
      styleValue = maxHandlePos * ((value - ctrl._minValue) / (ctrl._maxValue - ctrl._minValue)) + 'px'
      handleEl.style[stylePosName] = styleValue
      handleEl.style.height = ctrl.layoutRect().h + 'px'
      setAriaProp(handleEl, 'valuenow', value)
      setAriaProp(handleEl, 'valuetext', '' + ctrl.settings.previewFilter(value))
      setAriaProp(handleEl, 'valuemin', ctrl._minValue)
      setAriaProp(handleEl, 'valuemax', ctrl._maxValue)
    }
    let Slider = Widget.extend({
      init: function (settings) {
        let self = this
        if (!settings.previewFilter) {
          settings.previewFilter = function (value) {
            return Math.round(value * 100) / 100
          }
        }
        self._super(settings)
        self.classes.add('slider')
        if (settings.orientation === 'v') {
          self.classes.add('vertical')
        }
        self._minValue = $_6urfrtudjd09ez72.isNumber(settings.minValue) ? settings.minValue : 0
        self._maxValue = $_6urfrtudjd09ez72.isNumber(settings.maxValue) ? settings.maxValue : 100
        self._initValue = self.state.get('value')
      },
      renderHtml: function () {
        let self = this, id = self._id, prefix = self.classPrefix
        return '<div id="' + id + '" class="' + self.classes + '">' + '<div id="' + id + '-handle" class="' + prefix + 'slider-handle" role="slider" tabindex="-1"></div>' + '</div>'
      },
      reset: function () {
        this.value(this._initValue).repaint()
      },
      postRender: function () {
        let self = this
        let minValue, maxValue, screenCordName, stylePosName, sizeName, shortSizeName
        function toFraction (min, max, val) {
          return (val + min) / (max - min)
        }
        function fromFraction (min, max, val) {
          return val * (max - min) - min
        }
        function handleKeyboard (minValue, maxValue) {
          function alter (delta) {
            let value
            value = self.value()
            value = fromFraction(minValue, maxValue, toFraction(minValue, maxValue, value) + delta * 0.05)
            value = constrain(value, minValue, maxValue)
            self.value(value)
            self.fire('dragstart', { value: value })
            self.fire('drag', { value: value })
            self.fire('dragend', { value: value })
          }
          self.on('keydown', function (e) {
            switch (e.keyCode) {
              case 37:
              case 38:
                alter(-1)
                break
              case 39:
              case 40:
                alter(1)
                break
            }
          })
        }
        function handleDrag (minValue, maxValue, handleEl) {
          let startPos, startHandlePos, maxHandlePos, handlePos, value
          self._dragHelper = new DragHelper(self._id, {
            handle: self._id + '-handle',
            start: function (e) {
              startPos = e[screenCordName]
              startHandlePos = parseInt(self.getEl('handle').style[stylePosName], 10)
              maxHandlePos = (self.layoutRect()[shortSizeName] || 100) - funcs.getSize(handleEl)[sizeName]
              self.fire('dragstart', { value: value })
            },
            drag: function (e) {
              let delta = e[screenCordName] - startPos
              handlePos = constrain(startHandlePos + delta, 0, maxHandlePos)
              handleEl.style[stylePosName] = handlePos + 'px'
              value = minValue + handlePos / maxHandlePos * (maxValue - minValue)
              self.value(value)
              self.tooltip().text('' + self.settings.previewFilter(value)).show().moveRel(handleEl, 'bc tc')
              self.fire('drag', { value: value })
            },
            stop: function () {
              self.tooltip().hide()
              self.fire('dragend', { value: value })
            }
          })
        }
        minValue = self._minValue
        maxValue = self._maxValue
        if (self.settings.orientation === 'v') {
          screenCordName = 'screenY'
          stylePosName = 'top'
          sizeName = 'height'
          shortSizeName = 'h'
        } else {
          screenCordName = 'screenX'
          stylePosName = 'left'
          sizeName = 'width'
          shortSizeName = 'w'
        }
        self._super()
        handleKeyboard(minValue, maxValue)
        handleDrag(minValue, maxValue, self.getEl('handle'))
      },
      repaint: function () {
        this._super()
        updateSliderHandle(this, this.value())
      },
      bindStates: function () {
        let self = this
        self.state.on('change:value', function (e) {
          updateSliderHandle(self, e.value)
        })
        return self._super()
      }
    })

    let Spacer = Widget.extend({
      renderHtml: function () {
        let self = this
        self.classes.add('spacer')
        self.canFocus = false
        return '<div id="' + self._id + '" class="' + self.classes + '"></div>'
      }
    })

    let SplitButton = MenuButton.extend({
      Defaults: {
        classes: 'widget btn splitbtn',
        role: 'button'
      },
      repaint: function () {
        let self = this
        let elm = self.getEl()
        let rect = self.layoutRect()
        let mainButtonElm, menuButtonElm
        self._super()
        mainButtonElm = elm.firstChild
        menuButtonElm = elm.lastChild
        $(mainButtonElm).css({
          width: rect.w - funcs.getSize(menuButtonElm).width,
          height: rect.h - 2
        })
        $(menuButtonElm).css({ height: rect.h - 2 })
        return self
      },
      activeMenu: function (state) {
        let self = this
        $(self.getEl().lastChild).toggleClass(self.classPrefix + 'active', state)
      },
      renderHtml: function () {
        let self = this
        let id = self._id
        let prefix = self.classPrefix
        let image
        let icon = self.state.get('icon')
        let text = self.state.get('text')
        let settings = self.settings
        let textHtml = '', ariaPressed
        image = settings.image
        if (image) {
          icon = 'none'
          if (typeof image !== 'string') {
            image = window.getSelection ? image[0] : image[1]
          }
          image = ' style="background-image: url(\'' + image + '\')"'
        } else {
          image = ''
        }
        icon = settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : ''
        if (text) {
          self.classes.add('btn-has-text')
          textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>'
        }
        ariaPressed = typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : ''
        return '<div id="' + id + '" class="' + self.classes + '" role="button"' + ariaPressed + ' tabindex="-1">' + '<button type="button" hidefocus="1" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '</button>' + '<button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">' + (self._menuBtnText ? (icon ? '\xA0' : '') + self._menuBtnText : '') + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>'
      },
      postRender: function () {
        let self = this, onClickHandler = self.settings.onclick
        self.on('click', function (e) {
          let node = e.target
          if (e.control === this) {
            while (node) {
              if (e.aria && e.aria.key !== 'down' || node.nodeName === 'BUTTON' && node.className.indexOf('open') === -1) {
                e.stopImmediatePropagation()
                if (onClickHandler) {
                  onClickHandler.call(this, e)
                }
                return
              }
              node = node.parentNode
            }
          }
        })
        delete self.settings.onclick
        return self._super()
      }
    })

    let StackLayout = FlowLayout.extend({
      Defaults: {
        containerClass: 'stack-layout',
        controlClass: 'stack-layout-item',
        endClass: 'break'
      },
      isNative: function () {
        return true
      }
    })

    let TabPanel = Panel.extend({
      Defaults: {
        layout: 'absolute',
        defaults: { type: 'panel' }
      },
      activateTab: function (idx) {
        let activeTabElm
        if (this.activeTabId) {
          activeTabElm = this.getEl(this.activeTabId)
          $(activeTabElm).removeClass(this.classPrefix + 'active')
          activeTabElm.setAttribute('aria-selected', 'false')
        }
        this.activeTabId = 't' + idx
        activeTabElm = this.getEl('t' + idx)
        activeTabElm.setAttribute('aria-selected', 'true')
        $(activeTabElm).addClass(this.classPrefix + 'active')
        this.items()[idx].show().fire('showtab')
        this.reflow()
        this.items().each(function (item, i) {
          if (idx !== i) {
            item.hide()
          }
        })
      },
      renderHtml: function () {
        let self = this
        let layout = self._layout
        let tabsHtml = ''
        let prefix = self.classPrefix
        self.preRender()
        layout.preRender(self)
        self.items().each(function (ctrl, i) {
          let id = self._id + '-t' + i
          ctrl.aria('role', 'tabpanel')
          ctrl.aria('labelledby', id)
          tabsHtml += '<div id="' + id + '" class="' + prefix + 'tab" ' + 'unselectable="on" role="tab" aria-controls="' + ctrl._id + '" aria-selected="false" tabIndex="-1">' + self.encode(ctrl.settings.title) + '</div>'
        })
        return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + '<div id="' + self._id + '-head" class="' + prefix + 'tabs" role="tablist">' + tabsHtml + '</div>' + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>' + '</div>'
      },
      postRender: function () {
        let self = this
        self._super()
        self.settings.activeTab = self.settings.activeTab || 0
        self.activateTab(self.settings.activeTab)
        this.on('click', function (e) {
          let targetParent = e.target.parentNode
          if (targetParent && targetParent.id === self._id + '-head') {
            let i = targetParent.childNodes.length
            while (i--) {
              if (targetParent.childNodes[i] === e.target) {
                self.activateTab(i)
              }
            }
          }
        })
      },
      initLayoutRect: function () {
        let self = this
        let rect, minW, minH
        minW = funcs.getSize(self.getEl('head')).width
        minW = minW < 0 ? 0 : minW
        minH = 0
        self.items().each(function (item) {
          minW = Math.max(minW, item.layoutRect().minW)
          minH = Math.max(minH, item.layoutRect().minH)
        })
        self.items().each(function (ctrl) {
          ctrl.settings.x = 0
          ctrl.settings.y = 0
          ctrl.settings.w = minW
          ctrl.settings.h = minH
          ctrl.layoutRect({
            x: 0,
            y: 0,
            w: minW,
            h: minH
          })
        })
        let headH = funcs.getSize(self.getEl('head')).height
        self.settings.minWidth = minW
        self.settings.minHeight = minH + headH
        rect = self._super()
        rect.deltaH += headH
        rect.innerH = rect.h - rect.deltaH
        return rect
      }
    })

    let TextBox = Widget.extend({
      init: function (settings) {
        let self = this
        self._super(settings)
        self.classes.add('textbox')
        if (settings.multiline) {
          self.classes.add('multiline')
        } else {
          self.on('keydown', function (e) {
            let rootControl
            if (e.keyCode === 13) {
              e.preventDefault()
              self.parents().reverse().each(function (ctrl) {
                if (ctrl.toJSON) {
                  rootControl = ctrl
                  return false
                }
              })
              self.fire('submit', { data: rootControl.toJSON() })
            }
          })
          self.on('keyup', function (e) {
            self.state.set('value', e.target.value)
          })
        }
      },
      repaint: function () {
        let self = this
        let style, rect, borderBox, borderW, borderH = 0, lastRepaintRect
        style = self.getEl().style
        rect = self._layoutRect
        lastRepaintRect = self._lastRepaintRect || {}
        let doc = document
        if (!self.settings.multiline && doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
          style.lineHeight = rect.h - borderH + 'px'
        }
        borderBox = self.borderBox
        borderW = borderBox.left + borderBox.right + 8
        borderH = borderBox.top + borderBox.bottom + (self.settings.multiline ? 8 : 0)
        if (rect.x !== lastRepaintRect.x) {
          style.left = rect.x + 'px'
          lastRepaintRect.x = rect.x
        }
        if (rect.y !== lastRepaintRect.y) {
          style.top = rect.y + 'px'
          lastRepaintRect.y = rect.y
        }
        if (rect.w !== lastRepaintRect.w) {
          style.width = rect.w - borderW + 'px'
          lastRepaintRect.w = rect.w
        }
        if (rect.h !== lastRepaintRect.h) {
          style.height = rect.h - borderH + 'px'
          lastRepaintRect.h = rect.h
        }
        self._lastRepaintRect = lastRepaintRect
        self.fire('repaint', {}, false)
        return self
      },
      renderHtml: function () {
        let self = this
        let settings = self.settings
        let attrs, elm
        attrs = {
          id: self._id,
          hidefocus: '1'
        }
        Tools.each([
          'rows',
          'spellcheck',
          'maxLength',
          'size',
          'readonly',
          'min',
          'max',
          'step',
          'list',
          'pattern',
          'placeholder',
          'required',
          'multiple'
        ], function (name) {
          attrs[name] = settings[name]
        })
        if (self.disabled()) {
          attrs.disabled = 'disabled'
        }
        if (settings.subtype) {
          attrs.type = settings.subtype
        }
        elm = funcs.create(settings.multiline ? 'textarea' : 'input', attrs)
        elm.value = self.state.get('value')
        elm.className = self.classes
        return elm.outerHTML
      },
      value: function (value) {
        if (arguments.length) {
          this.state.set('value', value)
          return this
        }
        if (this.state.get('rendered')) {
          this.state.set('value', this.getEl().value)
        }
        return this.state.get('value')
      },
      postRender: function () {
        let self = this
        self.getEl().value = self.state.get('value')
        self._super()
        self.$el.on('change', function (e) {
          self.state.set('value', e.target.value)
          self.fire('change', e)
        })
      },
      bindStates: function () {
        let self = this
        self.state.on('change:value', function (e) {
          if (self.getEl().value !== e.value) {
            self.getEl().value = e.value
          }
        })
        self.state.on('change:disabled', function (e) {
          self.getEl().disabled = e.value
        })
        return self._super()
      },
      remove: function () {
        this.$el.off()
        this._super()
      }
    })

    let getApi = function () {
      return {
        Selector: Selector,
        Collection: Collection$2,
        ReflowQueue: $_4tfr2rt3jd09ez2d,
        Control: Control$1,
        Factory: Factory,
        KeyboardNavigation: KeyboardNavigation,
        Container: Container,
        DragHelper: DragHelper,
        Scrollable: $_3xsomxt5jd09ez2l,
        Panel: Panel,
        Movable: $_bbrl2msqjd09ez0r,
        Resizable: $_ali1zut7jd09ez2r,
        FloatPanel: FloatPanel,
        Window: Window,
        MessageBox: MessageBox,
        Tooltip: Tooltip,
        Widget: Widget,
        Progress: Progress,
        Notification: Notification,
        Layout: Layout,
        AbsoluteLayout: AbsoluteLayout,
        Button: Button,
        ButtonGroup: ButtonGroup,
        Checkbox: Checkbox,
        ComboBox: ComboBox,
        ColorBox: ColorBox,
        PanelButton: PanelButton,
        ColorButton: ColorButton,
        ColorPicker: ColorPicker,
        Path: Path,
        ElementPath: ElementPath,
        FormItem: FormItem,
        Form: Form,
        FieldSet: FieldSet,
        FilePicker: FilePicker,
        FitLayout: FitLayout,
        FlexLayout: FlexLayout,
        FlowLayout: FlowLayout,
        FormatControls: $_cxwtjjv4jd09ez8x,
        GridLayout: GridLayout,
        Iframe: Iframe$1,
        InfoBox: InfoBox,
        Label: Label,
        Toolbar: Toolbar$1,
        MenuBar: MenuBar,
        MenuButton: MenuButton,
        MenuItem: MenuItem,
        Throbber: Throbber,
        Menu: Menu,
        ListBox: ListBox,
        Radio: Radio,
        ResizeHandle: ResizeHandle,
        SelectBox: SelectBox,
        Slider: Slider,
        Spacer: Spacer,
        SplitButton: SplitButton,
        StackLayout: StackLayout,
        TabPanel: TabPanel,
        TextBox: TextBox,
        DropZone: DropZone,
        BrowseButton: BrowseButton
      }
    }
    let appendTo = function (target) {
      if (target.ui) {
        Tools.each(getApi(), function (ref, key) {
          target.ui[key] = ref
        })
      } else {
        target.ui = getApi()
      }
    }
    let registerToFactory = function () {
      Tools.each(getApi(), function (ref, key) {
        Factory.add(key, ref)
      })
    }
    let Api = {
      appendTo: appendTo,
      registerToFactory: registerToFactory
    }

    Api.registerToFactory()
    Api.appendTo(window.tinymce ? window.tinymce : {})
    ThemeManager.add('modern', function (editor) {
      $_cxwtjjv4jd09ez8x.setup(editor)
      return $_4szhqryjd09eyyk.get(editor)
    })
    function Theme () {
    }

    return Theme
  }())
})()
