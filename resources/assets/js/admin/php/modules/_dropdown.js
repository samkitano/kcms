/* global $ */
'use strict'

$('.dropdown').on('click', function (e) {
  e.preventDefault()

  $('.dropdown-content').hide()
  $(this).next('.dropdown-content').toggle('hidden')
})

$('a[role="presentation"]').on('click', function (e) {
  e.preventDefault()
})

$('.dropdown-content li a').on('click', function () {
  $('.dropdown-content').hide()
})

$(document).on('mouseenter mouseleave', '.dropdown-content li', function () {
  $(this).find('.dropdown-content').toggle('hidden')
})

// TODO or not TODO: click outside
