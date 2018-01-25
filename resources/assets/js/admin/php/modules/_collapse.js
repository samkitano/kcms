'use strict'

import { inArray } from '../helpers'
import {getCollapsed, putCollapsed, delCollapsed, getHidden, putHidden} from './_local-storage'

$(document).on('click', '.collapser', function (e) {
  e.preventDefault()

  let $this = $(this)
  let $bar = $this.closest('.has-collapse')
  let $target = $bar.siblings('.collapsible')
  let collapse = $target.data('collapse')

  if ($target.hasClass('open')) {
    $target.removeClass('open').addClass('close')
    $this.text('⇩') // TODO: animate this thing
    $target.slideUp()
    $bar.addClass('rounded-b')

    if (collapse !== undefined) {
      let collapseLS = getCollapsed() || []

      if (!collapseLS[collapse]) {
        collapseLS.push(collapse)
      }

      putCollapsed(collapseLS)
    }
  } else {
    $target.addClass('open').removeClass('close')
    $this.text('⇧')
    $target.slideDown()
    $bar.removeClass('rounded-b')
    delCollapsed(collapse)
  }
})

// uncollapse not collapsed divs
$(document).ready(function () {
  let collapsed = getCollapsed()
  let $divs = $('.collapsible')

  $divs.each(function (a, b) {
    if (inArray($(b).data('collapse'), collapsed)) {
      $(b).removeClass('open').addClass('close').slideUp('fast')
      $(b).siblings('.has-collapse').find('a').text('⇩')
    }
  })
})

