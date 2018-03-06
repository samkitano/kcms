/* global $ */
'use strict'

let dt = require('datatables.net-bs4')
let $dtFilter = $('#dt-search')
let $dataTables = $('[data-dt]')

window.$.DataTable = dt

if ($dataTables.length) {
  $dataTables.each(function () {
    let $table = $(this)

    // init datatables
    $table.DataTable({
      language: {
        decimal: ',',
        thousands: '.',
        // lengthMenu: translate('dataTables.lengthMenu'),
        // zeroRecords: translate('dataTables.zeroRecords'),
        // info: translate('dataTables.info'),
        // infoEmpty: translate('dataTables.infoEmpty'),
        // infoFiltered: translate('dataTables.infoFiltered'),
        // search: translate('dataTables.search'),
        // searchPlaceholder: translate('dataTables.searchPlaceholder')
        paginate: {
          first: '«',
          last: '»',
          previous: '‹',
          next: '›'
        }
      },
      stateSave: true,
      paging: true,
      pagingType: 'full_numbers',
      info: true
    })
  })
}
// DT search
$(document).on('keyup', $dtFilter, function () {
  let $button = $('.clear-dt-search')

  if (!$button.length) {
    return
  }

  let $table = $dataTables.DataTable()

  if ($dtFilter.val()) {
    $button.removeClass('off').addClass('on')
  } else {
    $button.addClass('off').removeClass('on')
  }

  $table.search($dtFilter.val()).draw()
})

// clear dt-search
$(document).on('click', '.clear-dt-search', function () {
  $dtFilter.val('').trigger('keyup').focus()
})

// clear dt-search on document loaded, and set the focus there
$(document).ready(function () {
  if ($dtFilter.val()) {
    $dtFilter.val('').trigger('keyup').focus()
  }
})
