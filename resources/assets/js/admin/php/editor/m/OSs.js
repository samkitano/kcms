'use strict'

import { Nus } from './Nus'
import { Utils } from './Utils'

let ios = 'iOS'
let osx = 'OSX'
let linux = 'Linux'
let solaris = 'Solaris'
let windows = 'Windows'
let freebsd = 'FreeBSD'
let android = 'Android'

let isOS = (name, current) => () => current === name

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
    isWindows: isOS(windows, current),
    isiOS: isOS(ios, current),
    isAndroid: isOS(android, current),
    isOSX: isOS(osx, current),
    isLinux: isOS(linux, current),
    isSolaris: isOS(solaris, current),
    isFreeBSD: isOS(freebsd, current)
  }
}

let OSs = {
  unknown,
  nu,
  windows: Utils.constant(windows),
  ios: Utils.constant(ios),
  android: Utils.constant(android),
  linux: Utils.constant(linux),
  osx: Utils.constant(osx),
  solaris: Utils.constant(solaris),
  freebsd: Utils.constant(freebsd)
}

export { OSs }
