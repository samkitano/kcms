'use strict'

import { OSs } from './OSs'
import { Client } from './Client'
import { BrOses } from './BrOses'
import { Browsers } from './Browsers'
import { DeviceType } from './DeviceType'

let detect = function (userAgent) {
  let browsers = BrOses.browsers()
  let oses = BrOses.oses()
  let browser = Client.detectBrowser(browsers, userAgent).fold(Browsers.unknown, Browsers.nu)
  let os = Client.detectOs(oses, userAgent).fold(OSs.unknown, OSs.nu)
  let deviceType = DeviceType(os, browser, userAgent)

  return {
    browser,
    os,
    deviceType
  }
}

let Platform = { detect }

export { Platform }
