'use strict'

import { Env } from './Env'
import { Body } from './Body'
import { Utils } from './Utils'
import { Widget } from './Widget'
import { Parent } from './Parent'
import { Control } from './Control'
import { UndoRedo } from './UndoRedo'
import { Registrar } from './Registrar'
import { CustomMenu } from './CustomMenu'
import { VisualAids } from './VisualAids'
import { FloatPanel } from './FloatPanel'
import { Formatting } from './Formatting'
import { FontPicker } from './FontPicker'
import { FormatMenu } from './FormatMenu'
import { FormatButtons } from './FormatButtons'
import { EditorManager } from './EditorManager'
import { FontSizePicker } from './FontSizePicker'

let setupEnvironment = () => {
  Widget.tooltips = !Env.iOS
  Control.translate = text => EditorManager.translate(text)
}

let setupUiContainer = editor => {
  if (editor.settings.ui_container) {
    Env.container = Parent.descendant(
      Body.fromDom(document.body),
      editor.settings.ui_container
    ).fold(Utils.constant(null), function (elm) {
      return elm.dom()
    })
  }
}

let setupRtlMode = editor => {
  if (editor.rtl) {
    Control.rtl = true
  }
}

let setupHideFloatPanels = editor => {
  editor.on('mousedown', () => {
    FloatPanel.hideAll()
  })
}

let setup = editor => {
  setupRtlMode(editor)
  setupHideFloatPanels(editor)
  setupUiContainer(editor)
  setupEnvironment()
  Formatting.register(editor)
  Registrar.register(editor)
  FormatButtons.register(editor)
  UndoRedo.register(editor)
  FontSizePicker.register(editor)
  FontPicker.register(editor)
  FormatMenu.register(editor)
  VisualAids.register(editor)
  CustomMenu.register(editor)
}

let FormatControls = { setup }

export { FormatControls }
