'use strict'

import { Layout } from './Layout'

let FlowLayout = Layout.extend({
  Defaults: {
    containerClass: 'flow-layout',
    controlClass: 'flow-layout-item',
    endClass: 'break'
  },
  recalc: container => {
    container.items().filter(':visible').each(ctrl => {
      if (ctrl.recalc) {
        ctrl.recalc()
      }
    })
  },
  isNative: () => true
})

export { FlowLayout }
