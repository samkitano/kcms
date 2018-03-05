'use strict'

import { Window } from './Window'
import { MessageBox } from './MessageBox'

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

    win.on('close', () => {
      closeCallback(win)
    })

    if (args.data) {
      win.on('postRender', function () {
        this.find('*').each(ctrl => {
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

  let alert = (message, choiceCallback, closeCallback) => {
    let win

    win = MessageBox.alert(message, () => {
      choiceCallback()
    })

    win.on('close', () => {
      closeCallback(win)
    })

    return win
  }

  let confirm = (message, choiceCallback, closeCallback) => {
    let win

    win = MessageBox.confirm(message, state => {
      choiceCallback(state)
    })

    win.on('close', () => {
      closeCallback(win)
    })

    return win
  }

  let close = window => {
    window.close()
  }

  let getParams = window => window.params

  let setParams = (window, params) => {
    window.params = params
  }

  return {
    open,
    alert,
    confirm,
    close,
    getParams,
    setParams
  }
}

export { WindowManagerImpl }
