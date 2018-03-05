'use strict'

import { Tools } from './Tools'
import { Format } from './Format'

let register = editor => {
  editor.addMenuItem('align', {
    text: 'Align',
    menu: [
      {
        text: 'Left',
        icon: 'alignleft',
        onclick: Format.toggleFormat(editor, 'alignleft')
      },
      {
        text: 'Center',
        icon: 'aligncenter',
        onclick: Format.toggleFormat(editor, 'aligncenter')
      },
      {
        text: 'Right',
        icon: 'alignright',
        onclick: Format.toggleFormat(editor, 'alignright')
      },
      {
        text: 'Justify',
        icon: 'alignjustify',
        onclick: Format.toggleFormat(editor, 'alignjustify')
      }
    ]
  })

  Tools.each({
    alignleft: [
      'Align left',
      'JustifyLeft'
    ],
    aligncenter: [
      'Align center',
      'JustifyCenter'
    ],
    alignright: [
      'Align right',
      'JustifyRight'
    ],
    alignjustify: [
      'Justify',
      'JustifyFull'
    ],
    alignnone: [
      'No alignment',
      'JustifyNone'
    ]
  }, function (item, name) {
    editor.addButton(name, {
      active: false,
      tooltip: item[0],
      cmd: item[1],
      onPostRender: Format.postRenderFormat(editor, name)
    })
  })
}

let Registrar = { register }

export { Registrar }
