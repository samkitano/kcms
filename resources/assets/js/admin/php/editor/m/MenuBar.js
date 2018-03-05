'use strict'

import { Toolbar } from './Toolbar'

let MenuBar = Toolbar.extend({
  Defaults: {
    role: 'menubar',
    containerCls: 'menubar',
    ariaRoot: true,
    defaults: { type: 'menubutton' }
  }
})

export { MenuBar }
