/* global $ */
'use strict'

import axios from 'axios'
import swal from 'sweetalert2'
import Cropper from './_cropper'

// todo: don't hide buttons: disable
// todo: normalize reset btns

$('.button-dropdown.fx a.fx').on('click', function (e) {
  let cropper, w, h, x, y, options, $sHeader
  let $this = $(this)
  let fxName = $this.text()
  let $container = $this.closest('div.fx')
  let action = $this.data('fx')
  let filter = $this.data('filter') || false
  let type = $this.data('type') || 'button'
  let min = $this.data('min') || '0'
  let max = $this.data('max') || '100'
  let step = $this.data('step') || 1
  let def = $this.data('default') || '0'
  let imageId = $container.data('imageid')
  let imageUrl = $this.data('src') || $container.data('src')
  let html = $(`#${type}_tpl`).html()
  let holderID = `fx_${action}`
  let listeners = []
  let baseUri = `/admin/manipulations/${imageId}/axn/${action}`
  let $resetBtn = $('.button.reset')

  e.preventDefault()

  $('.dropdown-content').not('.hidden').hide()

  prepareHtml()
  openDialog()
  prepareDialog()

  $resetBtn.on('click', function () {
    $('.swal2-image').attr('src', imageUrl)
    $('.swal2-content input.range').val(def)
    $('.fx-val').html(def)
  })

  if (type === 'crop') {
    options = {
      aspectRatio: NaN,
      viewMode: 1,
      crop: function (e) {
        w = e.detail.width
        h = e.detail.height
        x = e.detail.x
        y = e.detail.y
      }
    }

    initCrop(options)

    $resetBtn.on('click', function () {
      $sHeader.addClass('img-container')
      $('.swal2-image').attr('src', imageUrl)
      $('#crop_options').show()
      $('.apply').show()
      $(this).hide()

      initCrop(options)
    })

    $('.aspect').on('click', function () {
      let $this = $(this)
      let aspectStr = $this.data('aspect')

      $('.aspect').removeClass('active')
      $this.addClass('active')

      options.aspectRatio = getAspect(aspectStr)

      initCrop(options)
    })
  }

  if (type === 'range' || type === 'rotate' || type === 'rgb') {
    registerRangeListeners()
  }

  if (type === 'flip') {
    $('#flip_h').on('click', function () {
      getData(`${baseUri}/h`)
    })

    $('#flip_v').on('click', function () {
      getData(`${baseUri}/v`)
    })

    $('#flip_b').on('click', function () {
      getData(`${baseUri}/h/axn/${action}/v`)
    })
  }

  if (type === 'rotate') {
    registerRangeListeners()

    $('#rotate_90').on('click', function () {
      getData(`${baseUri}/90`)
    })

    $('#rotate_180').on('click', function () {
      getData(`${baseUri}/180`)
    })
  }

  if (type === 'apply') {
    $('.apply').on('click', function () {
      if (action === 'filter') {
        getData(`${baseUri}/${filter}`)
      } else {
        getData(baseUri)
      }
    })
  }

  function initCrop (opts) {
    let img = document.getElementById('cropping')

    $resetBtn = $('#reset_crop')

    $resetBtn.hide()

    if (cropper) {
      cropper.destroy()
    }

    cropper = new Cropper(img, opts)

    $('.apply').on('click', function () {
      $(this).hide()
      $('#crop_options').hide()

      getData(`${baseUri}/${w}/${h}/${x}/${y}`)

      $sHeader.removeClass('img-container')
    })
  }

  function prepareHtml () {
    if (type === 'range' || type === 'rotate') {
      html = html.replace('__FX_NAME__', fxName)
      html = html.replace('__MIN_VAL__', min)
      html = html.replace('__MAX_VAL__', max)
      html = html.replace(/__DEFAULT_VALUE__/g, def)
      html = html.replace(/__RANGE_ID__/g, holderID)
      html = html.replace(/__MIN_VAL__/g, min)
      html = html.replace(/__MAX_VAL__/g, max)
      html = html.replace('__STEP__', step)
    }

    if (type === 'rgb') {
      html = html.replace('__FX_NAME__', fxName)
      html = html.replace('__MIN_VAL__', min)
      html = html.replace('__MAX_VAL__', max)
      html = html.replace(/__DEFAULT_VALUE__/g, def)
      html = html.replace(/__RANGE_ID_R__/g, `${holderID}_R`)
      html = html.replace(/__RANGE_ID_G__/g, `${holderID}_G`)
      html = html.replace(/__RANGE_ID_B__/g, `${holderID}_B`)
      html = html.replace(/__MIN_VAL__/g, min)
      html = html.replace(/__MAX_VAL__/g, max)
      html = html.replace('__STEP__', step)
    }
  }

  function openDialog () {
    swal({
      title: fxName,
      html,
      imageUrl,
      showCancelButton: true,
      imageAlt: 'Edit Image',
      width: '90%'
    }).then((r) => {
      // if (r.dismiss === swal.DismissReason.cancel) {
      //   axios.get(`/admin/manipulations/${imageId}/destroy`)
      // }
    })
  }

  function previewRanged (rg) {
    if ($.isArray(rg)) {
      let r = $(`#${rg[0]}`).val()
      let g = $(`#${rg[1]}`).val()
      let b = $(`#${rg[2]}`).val()

      getData(`${baseUri}/${r}/${g}/${b}`)
    } else {
      let el = document.getElementById(rg)
      let val = el.value

      getData(`${baseUri}/${val}`)
    }
  }

  function getData (uri) {
    disableInputs()

    axios.get(uri)
      .then((r) => {
        $('.swal2-image').attr('src', r.data)

        if (cropper) {
          cropper.destroy()
          $('#reset_crop').show()
        }

        enableInputs()
      })
      .catch((e) => {
        enableInputs()
        console.log(e)
      })
  }

  function disableInputs () {
    let els = document.querySelectorAll('input')
    let btns = document.querySelectorAll('button')

    for (let i = 0; i < els.length; i++) {
      els[i].setAttribute('disabled', 'disabled')
    }

    for (let i = 0; i < btns.length; i++) {
      btns[i].setAttribute('disabled', 'disabled')
    }
  }

  function enableInputs () {
    let els = document.querySelectorAll('input')
    let btns = document.querySelectorAll('button')

    for (let i = 0; i < els.length; i++) {
      els[i].removeAttribute('disabled')
    }

    for (let i = 0; i < btns.length; i++) {
      btns[i].removeAttribute('disabled')
    }
  }

  function registerRangeListeners () {
    let ranges = document.querySelectorAll('input[type="range"]')
    let rangeNames = []

    for (let i = 0; i < ranges.length; i++) {
      let rng = ranges[i]
      let id = rng.id

      rangeNames.push(id)

      let f = () => {
        let holder = document.getElementsByClassName(id)[0]

        holder.innerHTML = rng.value
      }

      listeners.push(f)

      rng.addEventListener('mousedown', function () {
        listeners[i]()
        rng.addEventListener('mousemove', listeners[i])
      })

      rng.addEventListener('mouseup', function () {
        listeners[i]()
        rng.removeEventListener('mousemove', listeners[i])

        previewRanged(type === 'rgb' ? rangeNames : rangeNames[i])
      })
    }
  }

  function getAspect (aspectStr) {
    switch (aspectStr) {
      case 169:
        return 16 / 9
      case 43:
        return 4 / 3
      case 23:
        return 2 / 3
      case 11:
        return 1
      default:
        return NaN
    }
  }

  function prepareDialog () {
    $sHeader = $('.swal2-header')

    $sHeader.find('div').remove() // to ease debugging
    $sHeader.find('ul').remove()

    $sHeader.addClass('img-container')
    $sHeader.find('.swal2-image').attr('id', 'cropping').addClass('hidden')
  }
})
