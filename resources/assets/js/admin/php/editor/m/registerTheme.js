'use strict'

import { Api } from './Api'
import { ThemeManager } from './ThemeManager'
import { Notifications } from './Notifications'
import { FormatControls } from './FormatControls'

function registerTheme () {
  Api.registerToFactory()
  Api.appendTo(window.tinymce ? window.tinymce : {})

  ThemeManager.add('kcms', function (editor) {
    FormatControls.setup(editor)

    return Notifications.get(editor)
  })

  function Theme () {}

  return Theme
}

export { registerTheme }
