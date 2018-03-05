/* eslint-disable no-unused-vars */
import { handleWindowResize } from './m/Window'
import { registerTheme } from './m/registerTheme'

(function () {
  let kcms = (function () {
    'use strict'
    handleWindowResize()
    registerTheme()
  }())
})()
