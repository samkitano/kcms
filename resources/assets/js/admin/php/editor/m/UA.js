'use strict'

import { Cache } from './Cache'
import { Platform } from './Platform'

let detect = Cache.cached(() => {
  let userAgent = navigator.userAgent

  return Platform.detect(userAgent)
})

let UA = { detect }

export { UA }
