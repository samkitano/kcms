'use strict'

import { Resizer } from './Resizer'
import { UIrenderer } from './UIrenderer'
import { WindowManagerImpl } from './WindowManagerImpl'
import { NotificationManagerImpl } from './NotificationManagerImpl'

let get = function (editor) {
  let renderUI = function (args) {
    return UIrenderer.renderUI(editor, this, args)
  }

  let resizeTo = (w, h) => Resizer.resizeTo(editor, w, h)
  let resizeBy = (dw, dh) => Resizer.resizeBy(editor, dw, dh)
  let getNotificationManagerImpl = () => NotificationManagerImpl(editor)
  let getWindowManagerImpl = () => WindowManagerImpl(editor)

  return {
    renderUI,
    resizeTo,
    resizeBy,
    getNotificationManagerImpl,
    getWindowManagerImpl
  }
}

let Notifications = { get }

export { Notifications }
