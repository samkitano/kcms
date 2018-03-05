'use strict'

import { Utils } from './Utils'
import { StrUtil } from './StrUtil'

let normalVersionRegex = /.*?version\/ ?([0-9]+).([0-9]+).*/

let checkContains = target => uastring => StrUtil.contains(uastring, target)

let browsers = [
  {
    name: 'Edge',
    versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
    search: uastring =>
      StrUtil.contains(uastring, 'edge/') &&
      StrUtil.contains(uastring, 'chrome') &&
      StrUtil.contains(uastring, 'safari') &&
      StrUtil.contains(uastring, 'applewebkit')
  },
  {
    name: 'Chrome',
    versionRegexes: [
      /.*?chrome\/([0-9]+)\.([0-9]+).*/,
      normalVersionRegex
    ],
    search: uastring =>
      StrUtil.contains(uastring, 'chrome') && !StrUtil.contains(uastring, 'chromeframe')
  },
  {
    name: 'IE',
    versionRegexes: [
      /.*?msie ?([0-9]+)\.([0-9]+).*/,
      /.*?rv:([0-9]+)\.([0-9]+).*/
    ],
    search: uastring =>
      StrUtil.contains(uastring, 'msie') || StrUtil.contains(uastring, 'trident')
  },
  {
    name: 'Opera',
    versionRegexes: [
      normalVersionRegex,
      /.*?opera\/([0-9]+)\.([0-9]+).*/
    ],
    search: checkContains('opera')
  },
  {
    name: 'Firefox',
    versionRegexes: [/.*?firefox\/ ?([0-9]+)\.([0-9]+).*/],
    search: checkContains('firefox')
  },
  {
    name: 'Safari',
    versionRegexes: [
      normalVersionRegex,
      /.*?cpu os ([0-9]+)_([0-9]+).*/
    ],
    search: uastring => (StrUtil.contains(uastring, 'safari') ||
      StrUtil.contains(uastring, 'mobile/')) &&
      StrUtil.contains(uastring, 'applewebkit')
  }
]

let oses = [
  {
    name: 'Windows',
    search: checkContains('win'),
    versionRegexes: [/.*?windows nt ?([0-9]+)\.([0-9]+).*/]
  },
  {
    name: 'iOS',
    search: uastring => StrUtil.contains(uastring, 'iphone') || StrUtil.contains(uastring, 'ipad'),
    versionRegexes: [
      /.*?version\/ ?([0-9]+)\.([0-9]+).*/,
      /.*cpu os ([0-9]+)_([0-9]+).*/,
      /.*cpu iphone os ([0-9]+)_([0-9]+).*/
    ]
  },
  {
    name: 'Android',
    search: checkContains('android'),
    versionRegexes: [/.*?android ?([0-9]+)\.([0-9]+).*/]
  },
  {
    name: 'OSX',
    search: checkContains('os x'),
    versionRegexes: [/.*?os x\?([0-9]+)_([0-9]+).*/]
  },
  {
    name: 'Linux',
    search: checkContains('linux'),
    versionRegexes: []
  },
  {
    name: 'Solaris',
    search: checkContains('sunos'),
    versionRegexes: []
  },
  {
    name: 'FreeBSD',
    search: checkContains('freebsd'),
    versionRegexes: []
  }
]

let BrOses = {
  browsers: Utils.constant(browsers),
  oses: Utils.constant(oses)
}

export { BrOses }
