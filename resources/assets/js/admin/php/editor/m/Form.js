'use strict'

import { Tools } from './Tools'
import { FormItem } from './FormItem'
import { Container } from './Container'

let Form = Container.extend({
  Defaults: {
    containerCls: 'form',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    flex: 1,
    padding: 15,
    labelGap: 30,
    spacing: 10,
    callbacks: {
      submit: function () {
        this.submit()
      }
    }
  },
  preRender: function () {
    let self = this
    let items = self.items()

    if (!self.settings.formItemDefaults) {
      self.settings.formItemDefaults = {
        layout: 'flex',
        autoResize: 'overflow',
        defaults: { flex: 1 }
      }
    }

    items.each(function (ctrl) {
      let formItem
      let label = ctrl.settings.label

      if (label) {
        formItem = new FormItem(Tools.extend({
          items: {
            type: 'label',
            id: `${ctrl._id}-l`,
            text: label,
            flex: 0,
            forId: ctrl._id,
            disabled: ctrl.disabled()
          }
        }, self.settings.formItemDefaults))

        formItem.type = 'formitem'
        ctrl.aria('labelledby', `${ctrl._id}-l`)

        if (typeof ctrl.settings.flex === 'undefined') {
          ctrl.settings.flex = 1
        }

        self.replace(ctrl, formItem)
        formItem.add(ctrl)
      }
    })
  },
  submit: function () {
    return this.fire('submit', { data: this.toJSON() })
  },
  postRender: function () {
    let self = this

    self._super()
    self.fromJSON(self.settings.data)
  },
  bindStates: function () {
    let self = this
    self._super()

    function recalcLabels () {
      let i, labelGap, items
      let maxLabelWidth = 0
      let labels = []

      if (self.settings.labelGapCalc === false) {
        return
      }

      if (self.settings.labelGapCalc === 'children') {
        items = self.find('formitem')
      } else {
        items = self.items()
      }

      items.filter('formitem').each(function (item) {
        let labelCtrl = item.items()[0]
        let labelWidth = labelCtrl.getEl().clientWidth

        maxLabelWidth = labelWidth > maxLabelWidth
          ? labelWidth
          : maxLabelWidth

        labels.push(labelCtrl)
      })

      labelGap = self.settings.labelGap || 0
      i = labels.length

      while (i--) {
        labels[i].settings.minWidth = maxLabelWidth + labelGap
      }
    }

    self.on('show', recalcLabels)

    recalcLabels()
  }
})

export { Form }
