'use strict'

import { Utils } from './Utils'
import { Tools } from './Tools'
import { Anchors } from './Anchors'
import { ComboBox } from './ComboBox'
import { ObjectTools } from './ObjectTools'
import { EditorManager } from './EditorManager'

let getActiveEditor = () =>
  window.tinymce
    ? window.tinymce.activeEditor
    : EditorManager.activeEditor

let history = {}
let HISTORY_LENGTH = 5

let clearHistory = () => {
  history = {}
}

let toMenuItem = target => ({
  title: target.title,
  value: {
    title: {raw: target.title},
    url: target.url,
    attach: target.attach
  }
})

let toMenuItems = targets => Tools.map(targets, toMenuItem)

let staticMenuItem = (title, url) => ({
  title,
  value: {
    title,
    url,
    attach: Utils.noop
  }
})

let isUniqueUrl = (url, targets) => {
  let foundTarget = ObjectTools.exists(targets, target => target.url === url)

  return !foundTarget
}

let getSetting = (editorSettings, name, defaultValue) => {
  let value = name in editorSettings
    ? editorSettings[name]
    : defaultValue

  return value === false
    ? null
    : value
}

let createMenuItems = (term, targets, fileType, editorSettings) => {
  let separator = { title: '-' }

  let fromHistoryMenuItems = history => {
    let historyItems = history.hasOwnProperty(fileType)
      ? history[fileType]
      : []

    let uniqueHistory = ObjectTools.filter(historyItems, url => isUniqueUrl(url, targets))

    return Tools.map(uniqueHistory, url => ({
      title: url,
      value: {
        title: url,
        url: url,
        attach: Utils.noop
      }
    }))
  }

  let fromMenuItems = type => {
    let filteredTargets = ObjectTools.filter(targets, target => target.type === type)

    return toMenuItems(filteredTargets)
  }

  let anchorMenuItems = () => {
    let anchorMenuItems = fromMenuItems('anchor')
    let topAnchor = getSetting(editorSettings, 'anchor_top', '#top')
    let bottomAchor = getSetting(editorSettings, 'anchor_bottom', '#bottom')

    if (topAnchor !== null) {
      anchorMenuItems.unshift(staticMenuItem('<top>', topAnchor))
    }

    if (bottomAchor !== null) {
      anchorMenuItems.push(staticMenuItem('<bottom>', bottomAchor))
    }

    return anchorMenuItems
  }

  let join = items => ObjectTools.foldl(items, (a, b) => {
    let bothEmpty = a.length === 0 || b.length === 0

    return bothEmpty
      ? a.concat(b)
      : a.concat(separator, b)
  }, [])

  if (editorSettings.typeahead_urls === false) {
    return []
  }

  return fileType === 'file'
    ? join([
      filterByQuery(term, fromHistoryMenuItems(history)),
      filterByQuery(term, fromMenuItems('header')),
      filterByQuery(term, anchorMenuItems())
    ])
    : filterByQuery(term, fromHistoryMenuItems(history))
}

let addToHistory = (url, fileType) => {
  let items = history[fileType]

  if (!/^https?/.test(url)) {
    return
  }

  if (items) {
    if (ObjectTools.indexOf(items, url) === -1) {
      history[fileType] = items.slice(0, HISTORY_LENGTH).concat(url)
    }
  } else {
    history[fileType] = [url]
  }
}

let filterByQuery = (term, menuItems) => {
  let lowerCaseTerm = term.toLowerCase()
  let result = Tools.grep(
    menuItems,
    item => item.title.toLowerCase().indexOf(lowerCaseTerm) !== -1
  )

  return result.length === 1 && result[0].title === term
    ? []
    : result
}

let getTitle = linkDetails => {
  let title = linkDetails.title

  return title.raw
    ? title.raw
    : title
}

let setupAutoCompleteHandler = (ctrl, editorSettings, bodyElm, fileType) => {
  let autocomplete = term => {
    let linkTargets = Anchors.find(bodyElm)
    let menuItems = createMenuItems(term, linkTargets, fileType, editorSettings)

    ctrl.showAutoComplete(menuItems, term)
  }

  ctrl.on('autocomplete', () => {
    autocomplete(ctrl.value())
  })

  ctrl.on('selectitem', e => {
    let linkDetails = e.value

    ctrl.value(linkDetails.url)

    let title = getTitle(linkDetails)

    if (fileType === 'image') {
      ctrl.fire('change', {
        meta: {
          alt: title,
          attach: linkDetails.attach
        }
      })
    } else {
      ctrl.fire('change', {
        meta: {
          text: title,
          attach: linkDetails.attach
        }
      })
    }

    ctrl.focus()
  })

  ctrl.on('click', e => {
    if (ctrl.value().length === 0 && e.target.nodeName === 'INPUT') {
      autocomplete('')
    }
  })

  ctrl.on('PostRender', () => {
    ctrl.getRoot().on('submit', e => {
      if (!e.isDefaultPrevented()) {
        addToHistory(ctrl.value(), fileType)
      }
    })
  })
}

let statusToUiState = result => {
  let status = result.status
  let message = result.message

  if (status === 'valid') {
    return {
      status: 'ok',
      message: message
    }
  } else if (status === 'unknown') {
    return {
      status: 'warn',
      message: message
    }
  } else if (status === 'invalid') {
    return {
      status: 'warn',
      message: message
    }
  } else {
    return {
      status: 'none',
      message: ''
    }
  }
}

let setupLinkValidatorHandler = (ctrl, editorSettings, fileType) => {
  let validatorHandler = editorSettings.filepicker_validator_handler

  if (validatorHandler) {
    let validateUrl = url => {
      if (url.length === 0) {
        ctrl.statusLevel('none')

        return
      }

      validatorHandler({
        url,
        type: fileType
      }, result => {
        let uiState = statusToUiState(result)

        ctrl.statusMessage(uiState.message)
        ctrl.statusLevel(uiState.status)
      })
    }

    ctrl.state.on('change:value', e => {
      validateUrl(e.value)
    })
  }
}

let FilePicker = ComboBox.extend({
  Statics: { clearHistory },
  init: function (settings) {
    let actionCallback, fileBrowserCallback, fileBrowserCallbackTypes
    let self = this
    let editor = getActiveEditor()
    let editorSettings = editor.settings
    let fileType = settings.filetype

    settings.spellcheck = false
    fileBrowserCallbackTypes = editorSettings.file_picker_types ||
      editorSettings.file_browser_callback_types

    if (fileBrowserCallbackTypes) {
      fileBrowserCallbackTypes = Tools.makeMap(fileBrowserCallbackTypes, /[, ]/)
    }

    if (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType]) {
      fileBrowserCallback = editorSettings.file_picker_callback

      if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
        actionCallback = function () {
          let meta = self.fire('beforecall').meta

          meta = Tools.extend({ filetype: fileType }, meta)

          fileBrowserCallback.call(editor, (value, meta) => {
            self.value(value).fire('change', { meta })
          }, self.value(), meta)
        }
      } else {
        fileBrowserCallback = editorSettings.file_browser_callback

        if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
          actionCallback = () => {
            fileBrowserCallback(self.getEl('inp').id, self.value(), fileType, window)
          }
        }
      }
    }

    if (actionCallback) {
      settings.icon = 'browse'
      settings.onaction = actionCallback
    }

    self._super(settings)
    self.classes.add('filepicker')

    setupAutoCompleteHandler(self, editorSettings, editor.getBody(), fileType)
    setupLinkValidatorHandler(self, editorSettings, fileType)
  }
})

export { FilePicker }
