'use strict'

import { FireThemeItems } from './FireThemeItems'

let fireSkinLoaded = editor => {
  let done = () => {
    editor._skinLoaded = true
    FireThemeItems.fireSkinLoaded(editor)
  }

  return () => {
    if (editor.initialized) {
      done()
    } else {
      editor.on('init', done)
    }
  }
}

let SkinLoaded = { fireSkinLoaded }

export { SkinLoaded }
