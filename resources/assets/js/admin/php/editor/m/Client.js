'use strict'

import { Nus } from './Nus'
import { ObjectTools } from './ObjectTools'

let detect = (candidates, userAgent) => {
  let agent = String(userAgent).toLowerCase()

  return ObjectTools.find(candidates, candidate => candidate.search(agent))
}

let detectBrowser = (browsers, userAgent) => detect(browsers, userAgent).map(browser => {
  let version = Nus.detect(browser.versionRegexes, userAgent)

  return {
    current: browser.name,
    version: version
  }
})

let detectOs = (oses, userAgent) => detect(oses, userAgent).map(os => {
  let version = Nus.detect(os.versionRegexes, userAgent)

  return {
    current: os.name,
    version
  }
})

let Client = { detectBrowser, detectOs }

export { Client }
