'use strict'

import { UI } from './UI'
import { Renderer } from './Renderer'
import { SkinStyles } from './SkinStyles'
import { EditorManager } from './EditorManager'

let isInline = editor => editor.getParam('inline', false, 'boolean')

let getSkinUrl = editor => {
  let settings = editor.settings
  let skin = settings.skin
  let skinUrl = settings.skin_url

  if (skin !== false) {
    let skinName = skin || 'lightgray'

    if (skinUrl) {
      skinUrl = editor.documentBaseURI.toAbsolute(skinUrl)
    } else {
      skinUrl = `${EditorManager.baseURL}/skins/${skinName}`
    }
  }

  return skinUrl
}

let renderUI = (editor, theme, args) => {
  let skinUrl = getSkinUrl(editor)

  if (skinUrl) {
    args.skinUiCss = `${skinUrl}/skin.min.css`
    editor.contentCSS.push(`${skinUrl}/content${editor.inline ? '.inline' : ''}.min.css`)
  }

  SkinStyles.setup(editor, theme)

  return isInline(editor)
    ? UI.render(editor, theme, args)
    : Renderer.render(editor, theme, args)
}

let UIrenderer = { renderUI }

export { UIrenderer }
