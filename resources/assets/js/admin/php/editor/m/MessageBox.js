'use strict'

import { Window } from './Window'

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
        onCancel: () => {
          callback(false)
        }
      }).renderTo(document.body).reflow()
    },
    alert: (settings, callback) => {
      if (typeof settings === 'string') {
        settings = { text: settings }
      }

      settings.callback = callback

      return MessageBox.msgBox(settings)
    },
    confirm: (settings, callback) => {
      if (typeof settings === 'string') {
        settings = { text: settings }
      }

      settings.callback = callback
      settings.buttons = MessageBox.OK_CANCEL

      return MessageBox.msgBox(settings)
    }
  }
})

export { MessageBox }
