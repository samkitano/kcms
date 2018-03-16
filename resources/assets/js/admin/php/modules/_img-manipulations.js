/* global $ */
'use strict'

import axios from 'axios'
import swal from 'sweetalert2'
import Cropper from './_cropper'

$('.button-dropdown.fx a.fx').on('click', function (e) {
  let cropper, w, h, x, y, options, hasRange, rangeInputs
  let $sHeader, $imgEl
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
  let props = $this.data('props') || false
  let forceAspect = true
  let ratio

  e.preventDefault()

  hideMenus()
  prepareHtml()
  openDialog()
  prepareDialog()

  setTimeout(() => {
    registerListeners()
    listen()
  }, 250) // allow some time to load the image. FIXME: lookup swal events

  function listen () {
    $('.button.reset').on('click', function () {
      if (type === 'crop') {
        $sHeader.addClass('img-container')
        $imgEl.attr('src', imageUrl)

        initCrop(options)

        return
      }

      if (action === 'resize') {
        $imgEl.attr('src', imageUrl)
        initResize()
        return
      }

      $imgEl.attr('src', imageUrl)
      $('.fx_input_range').val(def)
      $('.fx-val').html(def)
      $('.flip').removeClass('active')
      $('.rotate').removeClass('active')
    })

    $('.apply').on('click', function () {
      switch (action) {
        case 'filter':
          getData(`${baseUri}/${filter}`)
          break
        case 'crop':
          getData(`${baseUri}/${w}/${h}/${x}/${y}`)
          disableElements('.apply, .aspect')
          enableElements('.reset')
          $sHeader.removeClass('img-container')
          break
        case 'resize':
          getData(`${baseUri}/${w}/${h}`)
          disableElements('.sizes, .apply, .fx_input')
          enableElements('.reset')
          $('#fx-overlay').remove()
          break
        case 'fit':
          getData(`${baseUri}/${w}/${h}`)
          disableElements('.apply, .fx_input')
          enableElements('.reset')
          break
        default:
          getData(baseUri)
      }
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

      $('.aspect').on('click', function () {
        let $this = $(this)
        let aspectStr = $this.data('aspect')

        $('.aspect').removeClass('active')
        $this.addClass('active')

        options.aspectRatio = getAspect(aspectStr)

        initCrop(options)
      })
    }

    if (type === 'flip') {
      $('#flip_h').on('click', function () {
        $('.flip').removeClass('active')
        $(this).addClass('active')
        getData(`${baseUri}/h`)
      })

      $('#flip_v').on('click', function () {
        $('.flip').removeClass('active')
        $(this).addClass('active')
        getData(`${baseUri}/v`)
      })

      $('#flip_b').on('click', function () {
        $('.flip').removeClass('active')
        $(this).addClass('active')
        getData(`${baseUri}/h/axn/${action}/v`)
      })
    }

    if (type === 'rotate') {
      $('#rotate_90').on('click', function () {
        $('.rotate').removeClass('active')
        $(this).addClass('active')
        getData(`${baseUri}/90`)
      })

      $('#rotate_180').on('click', function () {
        $('.rotate').removeClass('active')
        $(this).addClass('active')
        getData(`${baseUri}/180`)
      })
    }

    if (action === 'resize') {
      initResize()
    }

    if (action === 'fit') {
      initFit()
    }
  }

  function initFit () {
    let $this = $(this)
    let $max = parseInt($this.attr('max'))
    let $min = parseInt($this.attr('min'))

    if ($this.val() > $max || $this.val() < $min) {
      if ($this.val() > $max) {
        $this.val($max)
      }

      if ($this.val() < $min) {
        $this.val($min)
      }

      e.preventDefault()
      return false
    }

    $('.resize').remove()
    enableElements('.apply, .fx_input')
    disableElements('.reset')

    $('.fx_input').bind('keyup keydown change click', function () {
      w = $('#fx_width').val()
      h = $('#fx_height').val()
    })
  }

  function initResize () {
    let ratio = parseInt(props.width) / parseInt(props.height)

    disableElements('.reset')
    enableElements('.sizes, .apply, fx_input')

    $('.swal2-header').append(getOverlay())
    $('.unlock-svg').hide()

    $('#mar').change(function () {
      forceAspect = this.checked

      if (forceAspect) {
        $('.lock-svg').show()
        $('.unlock-svg').hide()

        let currWidth = $('#fx_width').val()
        let newHeight = Math.round(currWidth / ratio)

        $('#fx_height').val(newHeight)

        updateOverlay()
      } else {
        $('.lock-svg').hide()
        $('.unlock-svg').show()
      }
    })

    $('.fx_input').bind('keyup keydown change click', function (e) {
      let $this = $(this)
      let $max = parseInt($this.attr('max'))
      let $min = parseInt($this.attr('min'))

      if ($this.val() > $max || $this.val() < $min) {
        if ($this.val() > $max) {
          $this.val($max)
        }

        if ($this.val() < $min) {
          $this.val($min)
        }

        e.preventDefault()
        updateOverlay()
        return false
      }

      if (forceAspect) {
        if ($this.attr('id') === 'fx_width') {
          adjustHeight($this.val())
        } else {
          adjustWidth($this.val())
        }
      }

      updateOverlay()
    })

    $('.half').on('click', function () {
      $('#fx_width').val(Math.round(w / 2))
      $('#fx_height').val(Math.round(h / 2))
      $('.sizes').removeClass('active')
      $(this).addClass('active')

      updateOverlay()
    })

    $('.third').on('click', function () {
      $('#fx_width').val(Math.round(w / 3))
      $('#fx_height').val(Math.round(h / 3))
      $('.sizes').removeClass('active')
      $(this).addClass('active')

      updateOverlay()
    })

    $('.quarter').on('click', function () {
      $('#fx_width').val(Math.round(w / 4))
      $('#fx_height').val(Math.round(h / 4))
      $('.sizes').removeClass('active')
      $(this).addClass('active')

      updateOverlay()
    })

    w = $('#fx_width').val()
    h = $('#fx_height').val()
  }

  function adjustWidth (height) {
    let newWidth = Math.round(height * ratio)

    $('#fx_width').val(newWidth)
  }

  function adjustHeight (width) {
    let newHeight = Math.round(width / ratio)

    $('#fx_height').val(newHeight)
  }

  function updateOverlay () {
    let sizes = getOverlaySizes()

    $('#fx_ovl_container').css('width', `${sizes.currW}px`)
    $('#fx_ovl_actual').css({ height: `${sizes.ovlH}px`, width: `${sizes.ovlW}px` })
  }

  function getOverlay () {
    let sizes = getOverlaySizes()
    let tpl = `<div id="fx-overlay"><div id="fx_ovl_container" style="width:${sizes.currW}px;height:100%;"><div id="fx_ovl_actual" style="width:${sizes.ovlW}px;height:${sizes.ovlH}px;"></div></div></div>`

    return tpl
  }

  function getOverlaySizes () {
    let w, h, img, imgW, imgH, ratioWidth, ratioHeight, origW, origH

    img = document.getElementById('fxing_image')
    origW = parseInt(props.width)
    origH = parseInt(props.height)
    imgW = img.width
    imgH = img.height
    ratioWidth = imgW / origW
    ratioHeight = imgH / origH

    w = $('#fx_width').val()
    h = $('#fx_height').val()

    return {
      currW: imgW,
      ovlW: Math.round(w * ratioWidth),
      ovlH: Math.round(h * ratioHeight)
    }
  }

  function registerListeners () {
    if (hasRange) {
      registerRangeListeners()
    }
  }

  function initCrop (opts) {
    let img = document.getElementById('fxing_image')

    enableElements('.apply, .aspect')
    disableElements('.reset')

    if (cropper) {
      cropper.destroy()
    }

    cropper = new Cropper(img, opts)
  }

  function prepareHtml () {
    html = html.replace('__MIN_VAL__', min)
    html = html.replace('__MAX_VAL__', max)
    html = html.replace(/__DEFAULT_VALUE__/g, def)
    html = html.replace('__STEP__', step)
    html = html.replace(/__MIN_VAL__/g, min)
    html = html.replace(/__MAX_VAL__/g, max)

    if (type === 'range' || type === 'rotate') {
      html = html.replace(/__RANGE_ID__/g, holderID)
    }

    if (type === 'rgb') {
      html = html.replace(/__RANGE_ID_R__/g, `${holderID}_R`)
      html = html.replace(/__RANGE_ID_G__/g, `${holderID}_G`)
      html = html.replace(/__RANGE_ID_B__/g, `${holderID}_B`)
    }

    if (type === 'wh') {
      html = html.replace(/__MAX_WIDTH__/g, props.width)
      html = html.replace(/__MAX_HEIGHT__/g, props.height)
      html = html.replace(/__DEFAULT_WIDTH__/g, parseInt(props.width) / 2)
      html = html.replace(/__DEFAULT_HEIGHT__/g, parseInt(props.height) / 2)
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

    $imgEl = $('.swal2-image')
    rangeInputs = $('.fx_input_range')
    hasRange = rangeInputs.length > 0
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
    disableElements()

    axios.get(uri)
      .then((r) => {
        $imgEl.attr('src', r.data)

        if (cropper) {
          cropper.destroy()
        }

        enableElements()
      })
      .catch((e) => {
        enableElements()
        console.log(e)
      })
  }

  function disableElements (selector) {
    let els = document.querySelectorAll(selector || 'swal2 input:not([type=hidden]), swal2 button')

    for (let i = 0; i < els.length; i++) {
      disableElement(els[i])
    }
  }

  function disableElement (selector) {
    selector.setAttribute('disabled', 'disabled')
    selector.classList.add('disabled')
  }

  function enableElement (selector) {
    selector.removeAttribute('disabled')
    selector.classList.remove('disabled')
  }

  function enableElements (selector) {
    let els = document.querySelectorAll(selector || 'swal2 input:not([type=hidden]), swal2 button')

    for (let i = 0; i < els.length; i++) {
      enableElement(els[i])
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

    if (type === 'crop') {
      $sHeader.addClass('img-container')
      $sHeader.find('.swal2-image').addClass('hidden')
    }

    $('.swal2-image').attr('id', 'fxing_image')
  }

  function hideMenus () {
    $('.dropdown-content').not('.hidden').hide()
  }
})
