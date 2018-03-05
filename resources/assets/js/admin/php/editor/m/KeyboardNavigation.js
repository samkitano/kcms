/* eslint-disable no-cond-assign */
'use strict'

let hasTabstopData = function (elm) {
  return !!elm.getAttribute('data-mce-tabstop')
}

function KeyboardNavigation (settings) {
  let focusedElement, focusedControl
  let root = settings.root

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
    let role
    let parent = elm || focusedElement

    while (parent = parent.parentNode) {
      if (role = getRole(parent)) {
        return role
      }
    }
  }

  function getAriaProp (name) {
    let elm = focusedElement

    if (isElement(elm)) {
      return elm.getAttribute(`aria-${name}`)
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
    let role = getRole()
    let parentRole = getParentRole()

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
    let role = getRole()
    let parentRole = getParentRole()

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
      aria
    })
  }

  root.on('keydown', e => {
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

  root.on('focusin', e => {
    focusedElement = e.target
    focusedControl = e.control
  })

  return { focusFirst }
}

export { KeyboardNavigation }
