'use strict'

let fireSkinLoaded = editor => editor.fire('SkinLoaded')
let fireResizeEditor = editor => editor.fire('ResizeEditor')
let fireBeforeRenderUI = editor => editor.fire('BeforeRenderUI')

let FireThemeItems = { fireSkinLoaded, fireResizeEditor, fireBeforeRenderUI }

export { FireThemeItems }
