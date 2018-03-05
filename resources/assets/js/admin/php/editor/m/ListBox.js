'use strict'

import { Menu } from './Menu'
import { MenuButton } from './MenuButton'

let ListBox = MenuButton.extend({
  init: function (settings) {
    let values, selected, selectedText, lastItemCtrl
    let self = this

    function setSelected (menuValues) {
      for (let i = 0; i < menuValues.length; i++) {
        selected = menuValues[i].selected || settings.value === menuValues[i].value

        if (selected) {
          selectedText = selectedText || menuValues[i].text
          self.state.set('value', menuValues[i].value)

          return true
        }

        if (menuValues[i].menu) {
          if (setSelected(menuValues[i].menu)) {
            return true
          }
        }
      }
    }

    self._super(settings)
    settings = self.settings
    self._values = values = settings.values

    if (values) {
      if (typeof settings.value !== 'undefined') {
        setSelected(values)
      }

      if (!selected && values.length > 0) {
        selectedText = values[0].text
        self.state.set('value', values[0].value)
      }

      self.state.set('menu', values)
    }

    self.state.set('text', settings.text || selectedText)
    self.classes.add('listbox')
    self.on('select', function (e) {
      let ctrl = e.control

      if (lastItemCtrl) {
        e.lastControl = lastItemCtrl
      }

      if (settings.multiple) {
        ctrl.active(!ctrl.active())
      } else {
        self.value(e.control.value())
      }

      lastItemCtrl = ctrl
    })
  },
  bindStates: function () {
    let self = this

    function activateMenuItemsByValue (menu, value) {
      if (menu instanceof Menu) {
        menu.items().each(function (ctrl) {
          if (!ctrl.hasMenus()) {
            ctrl.active(ctrl.value() === value)
          }
        })
      }
    }

    function getSelectedItem (menuValues, value) {
      let selectedItem

      if (!menuValues) {
        return
      }

      for (let i = 0; i < menuValues.length; i++) {
        if (menuValues[i].value === value) {
          return menuValues[i]
        }

        if (menuValues[i].menu) {
          selectedItem = getSelectedItem(menuValues[i].menu, value)

          if (selectedItem) {
            return selectedItem
          }
        }
      }
    }

    self.on('show', function (e) {
      activateMenuItemsByValue(e.control, self.value())
    })

    self.state.on('change:value', function (e) {
      let selectedItem = getSelectedItem(self.state.get('menu'), e.value)

      if (selectedItem) {
        self.text(selectedItem.text)
      } else {
        self.text(self.settings.text)
      }
    })

    return self._super()
  }
})

export { ListBox }
