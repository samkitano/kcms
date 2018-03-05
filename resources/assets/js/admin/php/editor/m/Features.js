'use strict'

import { PathResolver } from './PathResolver'

let unsafe = (name, scope) => PathResolver.resolve(name, scope)

let getOrDie = (name, scope) => {
  let actual = unsafe(name, scope)

  if (actual === undefined || actual === null) {
    throw new Error(`${name} not available on this browser`)
  }

  return actual
}

let Features = { getOrDie }

export { Features }
