'use strict'

import { funcs } from './funcs'
import { Tools } from './Tools'
import { ObjectTools } from './ObjectTools'
import { Notification } from './Notification'

function NotificationManagerImpl (editor) {
  let getEditorContainer = editor =>
    editor.inline
      ? editor.getElement()
      : editor.getContentAreaContainer()

  let getContainerWidth = () => {
    let container = getEditorContainer(editor)

    return funcs.getSize(container).width
  }

  let prePositionNotifications = notifications => {
    ObjectTools.each(notifications, notification => {
      notification.moveTo(0, 0)
    })
  }

  let positionNotifications = notifications => {
    if (notifications.length > 0) {
      let firstItem = notifications.slice(0, 1)[0]
      let container = getEditorContainer(editor)

      firstItem.moveRel(container, 'tc-tc')

      ObjectTools.each(notifications, (notification, index) => {
        if (index > 0) {
          notification.moveRel(notifications[index - 1].getEl(), 'bc-tc')
        }
      })
    }
  }

  let reposition = notifications => {
    prePositionNotifications(notifications)
    positionNotifications(notifications)
  }

  let open = (args, closeCallback) => {
    let extendedArgs = Tools.extend(args, { maxWidth: getContainerWidth() })
    let notif = new Notification(extendedArgs)

    notif.args = extendedArgs

    if (extendedArgs.timeout > 0) {
      notif.timer = setTimeout(() => {
        notif.close()
        closeCallback()
      }, extendedArgs.timeout)
    }

    notif.on('close', () => {
      closeCallback()
    })

    notif.renderTo()

    return notif
  }

  let close = notification => { notification.close() }
  let getArgs = notification => notification.args

  return {
    open,
    close,
    reposition,
    getArgs
  }
}

export { NotificationManagerImpl }
