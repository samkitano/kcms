/* global $ */
'use strict'

let stubs = {
  $knob: $('<span>', { 'class': 'sw-knob' }),
  $off: $('<span>', { 'class': 'sw-off' }),
  $on: $('<span>', { 'class': 'sw-on' }),
  $switcher: $('<span>', { 'class': 'switchify' }).hide(),
  $toggler: $('<span>', { 'class': 'sw-toggler' })
}

let sw = {
  /**
   * Initialize
   *
   * @param {Object} swPlugin
   * @param {Object} opts
   */
  init (swPlugin, opts) {
    this.setStyles(opts, swPlugin)

    swPlugin.$this.each(function (idx, el) {
      if (el.hasOwnProperty('switchify')) {
        return
      }

      this.build($(el), swPlugin, opts)
    }.bind(this))

    this.behaviour(swPlugin)
  },

  /**
   * Build the switch
   *
   * @param {Object} $input
   * @param {Object} swPlugin
   * @param {Object} opts
   */
  build ($input, swPlugin, opts) {
    let name = $input.attr('name').replace(/(\[])+$/, '')
    let value = $input.attr('value') || ''
    let type = $input.attr('type')
    let $switcher = stubs
      .$switcher
      .clone()
      .attr({ 'input-name': name, 'input-value': value, 'input-type': type })

    if (swPlugin.swStyles.direction === 'rtl') {
      $switcher.addClass('rtl')
    }

    let data = {
      els: {
        $toggler: stubs.$toggler.clone(),
        $on: stubs.$on.clone().html($input.attr('data-chkdtxt') || opts.checkedText),
        $off: stubs.$off.clone().html($input.attr('data-unchkdtxt') || opts.uncheckedText),
        $knob: stubs.$knob.clone()
      },
      $input,
      $switcher
    }

    data.els.$toggler
      .append(data.els.$on, data.els.$knob, data.els.$off)
      .appendTo(data.$switcher)

    $input.before(data.$switcher)

    if ($input[0].checked) {
      data.switcherChecked = true
      this.check(data, swPlugin, false, true)
    } else {
      data.switcherChecked = false
      this.uncheck(data, swPlugin, false, true)
    }

    let existing = swPlugin.checkboxes.group[name]

    if (existing) {
      existing.group[value] = data
      existing.length++
    } else {
      existing = { group: {}, length: 1 }
      swPlugin.checkboxes.group[name] = existing
      existing.group[value] = data
      swPlugin.checkboxes.groupLength++
    }

    swPlugin.$switchers = swPlugin.$switchers.add(data.$switcher)
    $input[0].switchify = data
    swPlugin.checkboxes.length++

    data.$switcher.show()

    $input.on('change', function () {
      this.followUp({ type, name, value }, swPlugin)
    }.bind(this))
  },

  /**
   * Style stubs
   *
   * @param {Object} opts
   * @param {Object} swPlugin
   */
  setStyles (opts, swPlugin) {
    stubs.$switcher.css({
      'width': `${opts.width}px`,
      'line-height': '2rem'
    })

    swPlugin.swStyles.swWidth = opts.width
    swPlugin.swStyles.swHeight = 26
    swPlugin.swStyles.knobOffset = 3
    swPlugin.swStyles.knobWidth = swPlugin.swStyles.swHeight - 2
    swPlugin.swStyles.knobHeight = swPlugin.swStyles.swHeight - 2

    stubs.$knob.css({
      'width': swPlugin.swStyles.knobWidth,
      'height': swPlugin.swStyles.knobHeight
    })

    let amountOn = swPlugin.swStyles.knobWidth / 2 + swPlugin.swStyles.knobOffset
    let amountOff = swPlugin.swStyles.swWidth - swPlugin.swStyles.knobWidth / 2 - swPlugin.swStyles.knobOffset

    swPlugin.trsfrmOn = `translateX(${swPlugin.animDirection}${amountOn}px)`
    swPlugin.trsfrmOff = `translateX(${swPlugin.animDirection}${amountOff}px)`

    swPlugin.trsfrmOn = {
      '-webkit-transform': swPlugin.trsfrmOn,
      '-moz-transform': swPlugin.trsfrmOn,
      '-o-transform': swPlugin.trsfrmOn,
      '-ms-transform': swPlugin.trsfrmOn,
      'transform': swPlugin.trsfrmOn
    }

    swPlugin.trsfrmOff = {
      '-webkit-transform': swPlugin.trsfrmOff,
      '-moz-transform': swPlugin.trsfrmOff,
      '-o-transform': swPlugin.trsfrmOff,
      '-ms-transform': swPlugin.trsfrmOff,
      'transform': swPlugin.trsfrmOff
    }

    stubs.$toggler.css('font-size', '')
    stubs.$toggler.css({ 'font-size': '.7rem' })
    stubs.$switcher.css('margin', '')
  },

  /**
   * Return input data
   *
   * @param {Object} swPlugin
   * @param {Object} info
   */
  getData: (swPlugin, info) => swPlugin.checkboxes.group[info.name].group[info.value],

  /**
   * Toggle switch
   *
   * @param {Object}  info
   * @param {Object}  swPlugin
   * @param {Boolean} external
   */
  toggle (info, swPlugin, external = false) {
    let data = this.getData(swPlugin, info)
    let status = external
      ? data.$input[0].checked ? 'check' : 'uncheck'
      : data.$input[0].checked ? 'uncheck' : 'check'

    this[status](data, swPlugin, external)
  },

  /**
   * Track state changes in switches
   *
   * @param {Object} info
   * @param {Object} swPlugin
   */
  followUp (info, swPlugin) {
    let data = this.getData(swPlugin, info)

    if (data.$input[0].checked !== data.switcherChecked) {
      this.toggle(info, swPlugin, true)
    }
  },

  /**
   * Uncheck checkbox
   *
   * @param {Object}  data
   * @param {Object}  swPlugin
   * @param {Boolean} external
   * @param {Boolean} preserveState
   */
  uncheck (data, swPlugin, external, preserveState) {
    data.els
      .$toggler
      .css(swPlugin.trsfrmOff)
      .removeClass('on')
      .addClass('off')

    data.switcherChecked = false

    if (preserveState) {
      return
    }

    if (!external) {
      data.$input.prop('checked', false)
    }
  },

  /**
   * Check checkbox
   *
   * @param {Object} data
   * @param {Object} swPlugin
   * @param {Boolean} external
   * @param {Boolean} preserveState
   */
  check (data, swPlugin, external, preserveState) {
    data.els
      .$toggler
      .css(swPlugin.trsfrmOn)
      .addClass('on')
      .removeClass('off')

    data.switcherChecked = true

    if (preserveState) {
      return
    }

    if (!external) {
      data.$input.prop('checked', true)
    }
  },

  /**
   * Set plugin behaviour
   *
   * @param {Object} swPlugin
   */
  behaviour (swPlugin) {
    swPlugin.$this.on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })

    swPlugin.$switchers.on('click', function (e) {
      let obj = {
        name: e.currentTarget.getAttribute('input-name'),
        type: e.currentTarget.getAttribute('input-type'),
        value: e.currentTarget.getAttribute('input-value')
      }

      this.toggle(obj, swPlugin)

      e.preventDefault()
      e.stopPropagation()
    }.bind(this))
  }
}

/**
 * jQuery plugin
 *
 * @param {Object} opts
 *
 * @returns {$}
 */
$.fn.switchify = function (opts) {
  let swPlugin = {
    checkboxes: {
      group: {},
      groupLength: 0,
      length: 0
    },
    $switchers: $([]),
    swStyles: {}
  }

  swPlugin.$this = this.filter('input[type=checkbox]')

  if (!swPlugin.$this.length) {
    return this
  }

  swPlugin.swStyles.direction = window.getComputedStyle(swPlugin.$this[0], null).direction || 'ltr'
  swPlugin.animDirection = (swPlugin.swStyles.direction === 'rtl') ? '' : '-'

  opts = $.extend({
    checkedText: 'ON',
    uncheckedText: 'OFF',
    width: 100,
    height: 26
  }, opts || {})

  swPlugin.$this.css('display', 'none')
  sw.init(swPlugin, opts)

  return this
}

window.onload = function () {
  $(':checkbox').switchify()
}
