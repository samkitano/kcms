/* global $ */
'use strict'

$('.dropdown').on('click', function (e) {
  e.preventDefault()

  $('.dropdown-content').not('.hidden').hide()
  $(this).next('.dropdown-content').toggle('hidden').toggleClass('hidden')
})

$(document).on('mouseenter mouseleave', '.dropdown-content li', function () {
  $(this).find('.dropdown-content').toggle('hidden')
})

// TODO or not TODO: click outside
