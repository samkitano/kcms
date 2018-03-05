'use strict'

import { $ } from './$'
import { Delay } from './Delay'
import { Control } from './Control'

function Throbber (elm, inline) {
  let timer, state
  let classPrefix = Control.classPrefix
  let self = this

  self.show = (time, callback) => {
    function render () {
      if (state) {
        $(elm).append(`<div class="${classPrefix}throbber${inline ? ' ' + classPrefix + 'throbber-inline' : ''}"></div>`)
        if (callback) {
          callback()
        }
      }
    }

    self.hide()
    state = true

    if (time) {
      timer = Delay.setTimeout(render, time)
    } else {
      render()
    }

    return self
  }

  self.hide = () => {
    let child = elm.lastChild

    Delay.clearTimeout(timer)

    if (child && child.className.indexOf('throbber') !== -1) {
      child.parentNode.removeChild(child)
    }

    state = false

    return self
  }
}

export { Throbber }
