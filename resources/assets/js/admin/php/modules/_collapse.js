/* global $ */
'use strict'

import { getCollapsed, putCollapsed, delCollapsed } from './_local-storage'
import { inArray } from '../helpers'
import { translate } from './_translate'

$(document).on('click', '.collapse-button', function (e) {
  e.preventDefault()

  let $this = $(this)

  let $bar = $this.closest('.panel-title')
  let $target = $bar.siblings('.panel-body')
  let name = $this.data('target')
  let collapseLS = getCollapsed() || []

  $this.toggleClass('collapsed')
  $target.toggleClass('collapsed')
  $bar.toggleClass('rounded-b')

  if ($target.hasClass('collapsed')) {
    $target.slideUp()
    $this.attr('title', translate('actions.expand'))

    if (name !== undefined) {
      if (!inArray(name, collapseLS)) {
        collapseLS.push(name)
      }

      putCollapsed(collapseLS)
    }
  } else {
    $target.slideDown()
    $this.attr('title', translate('actions.collapse'))
    delCollapsed(name)
  }
})

// uncollapse not collapsed divs
$(document).ready(function () {
  let collapsed = getCollapsed()
  let $triggers = $('.collapse-button')

  $triggers.each(function (a, b) {
    if (inArray($(b).data('target'), collapsed)) {
      let $parent = $(b).closest('.panel-title')

      $(b).attr('title', translate('actions.expand'))
      $(b).toggleClass('collapsed')
      $parent.siblings('.panel-body').toggleClass('collapsed').slideUp('fast')
      $parent.toggleClass('rounded-b')
    }
  })
})
