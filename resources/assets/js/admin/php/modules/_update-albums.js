/* global $ */

'use strict'

import axios from 'axios'

$('.update-album').on('click', function (e) {
  e.preventDefault()

  let $this = $(this)
  let endpoint = $this.data('endpoint')
  let album = $('input.album_name').val()
  let payload = {
    _method: 'PATCH',
    album
  }

  $.each($('.media'), function (a, b) {
    let $el = $(b)
    let key = $el.data('resourceid')
    let name = $el.find('span.media_name').text().trim()
    let description = $el.find('span.media_description').text().trim()
    let obj = {}

    obj.order = $el.data('order')
    obj.name = name
    obj.description = description

    payload[key] = obj
  })

  console.log(payload)
})
