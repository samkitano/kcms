'use strict'

import { Throbber } from './Throbber'

let setup = (editor, theme) => {
  let throbber

  editor.on('ProgressState', e => {
    throbber = throbber || new Throbber(theme.panel.getEl('body'))

    if (e.state) {
      throbber.show(e.time)
    } else {
      throbber.hide()
    }
  })
}

let SkinStyles = { setup }

export { SkinStyles }
