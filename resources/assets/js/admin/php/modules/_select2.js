/* global $ */
'use strict'

require('select2')

$(document).ready(function () {
  $('.select2-simple').select2()

  $('.select2-with-tags').each(function () {
    let $this = $(this)
    let ph = $this.data('placeholder')

    $this.select2({
      allowClear: true,
      placeholder: ph,
      tags: true,
      width: 'resolve'
    })
  })
})
