import { getHidden, delHidden, resetHidden } from './_local-storage'
import { translate } from '../helpers'

let addHiddenElement = (txt, link) => `<p class="p-2 text-sm flex justify-between"><span>${txt}</span> ${addUnhideButton(link)}</p>`

let addUnhideButton = (link) => `<a
    class="unhide-alert self-center text-xs ml-1 no-outline px-1 py-1 leading-none border rounded hover:text-blue-darker hover:bg-blue-lightest"
    data-unhide="${link}"
    href="#">${translate('actions.unhide')}</a>`

let addUnhideAllButton = () => `<a class="inline-block unhide-alert-all text-sm my-4 ml-2 no-outline px-1 py-1 border rounded hover:text-blue-darker hover:bg-blue-lightest"
    href="#">${translate('actions.unhide_all')}</a>`

let fillSettings = () => {
  let $alertSettingsContainer = $('.settings_hidden-alerts')

  if (!$alertSettingsContainer) return false

  let store = getHidden()

  if (store === null || store.length === 0) {
    $alertSettingsContainer.html(`<p class="p-4 text-lg">${translate('alerts.no_hidden_alerts')}</p>`)

    return false
  }

  let html = addUnhideAllButton()

  for (let h in store) {
    html += addHiddenElement(translate(`alerts.${store[h]}`), store[h])
  }

  $alertSettingsContainer.html(html)
}

fillSettings()

$(document).on('click', '.unhide-alert', function (e) {
  e.preventDefault()
  delHidden($(this).data('unhide'))
  fillSettings()
})

$(document).on('click', '.unhide-alert-all', function (e) {
  e.preventDefault()
  resetHidden()
  fillSettings()
})
