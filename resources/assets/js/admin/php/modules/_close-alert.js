'use strict'

import { getHidden, putHidden } from './_local-storage'

// Close alerts
$('.close-alert-button').on('click', function () {
  let $this = $(this)
  let $target = $this.closest('.k-alert')
  let hide = $target.data('hide')

  $target.hide(400)

  if (hide !== undefined) {
    let hiddenLS = getHidden() || []

    if (!hiddenLS[hide]) {
      hiddenLS.push(hide)
    }

    putHidden(hiddenLS)
  }
})
