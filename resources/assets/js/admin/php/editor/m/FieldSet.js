'use strict'

import { Form } from './Form'

let FieldSet = Form.extend({
  Defaults: {
    containerCls: 'fieldset',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    flex: 1,
    padding: '25 15 5 15',
    labelGap: 30,
    spacing: 10,
    border: 1
  },
  renderHtml: function () {
    let self = this
    let layout = self._layout
    let prefix = self.classPrefix

    self.preRender()
    layout.preRender(self)

    return '<fieldset id="' + self._id + '" class="' + self.classes +
      '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<legend id="' + self._id +
        '-title" class="' + prefix + 'fieldset-title">' + self.settings.title +
        '</legend>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' +
      (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</fieldset>'
  }
})

export { FieldSet }
