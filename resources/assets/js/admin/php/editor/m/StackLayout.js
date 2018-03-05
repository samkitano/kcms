'use strict'

import { FlowLayout } from './FlowLayout'

let StackLayout = FlowLayout.extend({
  Defaults: {
    containerClass: 'stack-layout',
    controlClass: 'stack-layout-item',
    endClass: 'break'
  },
  isNative: () => true
})

export { StackLayout }
