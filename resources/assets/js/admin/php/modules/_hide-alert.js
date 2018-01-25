'use strict'

import { inArray } from '../helpers'
import { getHidden } from './_local-storage'

// unhide not hidden alerts
$(document).ready(function () {
  let hidden = getHidden()
  let $alerts = $('.k-alert')

  $alerts.each(function (a, b) {
    if (!inArray($(b).data('hide'), hidden)) $(b).removeClass('hidden')
  })
})
