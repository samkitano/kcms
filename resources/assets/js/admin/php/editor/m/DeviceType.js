'use strict'

import { Utils } from './Utils'

function DeviceType (os, browser, userAgent) {
  let isiPad = os.isiOS() && /ipad/i.test(userAgent) === true
  let isiPhone = os.isiOS() && !isiPad
  let isAndroid3 = os.isAndroid() && os.version.major === 3
  let isAndroid4 = os.isAndroid() && os.version.major === 4
  let isTablet = isiPad || isAndroid3 || (isAndroid4 && /mobile/i.test(userAgent) === true)
  let isTouch = os.isiOS() || os.isAndroid()
  let isPhone = isTouch && !isTablet
  let iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false

  return {
    isiPad: Utils.constant(isiPad),
    isiPhone: Utils.constant(isiPhone),
    isTablet: Utils.constant(isTablet),
    isPhone: Utils.constant(isPhone),
    isTouch: Utils.constant(isTouch),
    isAndroid: os.isAndroid,
    isiOS: os.isiOS,
    isWebView: Utils.constant(iOSwebview)
  }
}

export { DeviceType }
