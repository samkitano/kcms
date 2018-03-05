'use strict'

import { Checkbox } from './Checkbox'

let Radio = Checkbox.extend({
  Defaults: {
    classes: 'radio',
    role: 'radio'
  }
})

export { Radio }
