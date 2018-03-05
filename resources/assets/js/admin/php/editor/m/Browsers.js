'use strict'

import { Nus } from './Nus'
import { Utils } from './Utils'

let ie = 'IE'
let edge = 'Edge'
let opera = 'Opera'
let chrome = 'Chrome'
let safari = 'Safari'
let firefox = 'Firefox'

let isBrowser = (name, current) => () => current === name

let unknown = () => nu({
  current: undefined,
  version: Nus.unknown()
})

let nu = info => {
  let current = info.current
  let version = info.version

  return {
    current,
    version,
    isEdge: isBrowser(edge, current),
    isChrome: isBrowser(chrome, current),
    isIE: isBrowser(ie, current),
    isOpera: isBrowser(opera, current),
    isFirefox: isBrowser(firefox, current),
    isSafari: isBrowser(safari, current)
  }
}

let Browsers = {
  unknown,
  nu,
  edge: Utils.constant(edge),
  chrome: Utils.constant(chrome),
  ie: Utils.constant(ie),
  opera: Utils.constant(opera),
  firefox: Utils.constant(firefox),
  safari: Utils.constant(safari)
}

export { Browsers }
