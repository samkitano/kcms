'use strict'

import { Container } from './Container'

let Toolbar = Container.extend({
  Defaults: {
    role: 'toolbar',
    layout: 'flow'
  },
  init: function (settings) {
    let self = this
    self._super(settings)
    self.classes.add('toolbar')
  },
  postRender: function () {
    let self = this

    self.items().each(function (ctrl) {
      ctrl.classes.add('toolbar-item')
    })

    return self._super()
  }
})

export { Toolbar }
