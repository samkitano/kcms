/* eslint-disable no-new-func */
'use strict'

let global = typeof window !== 'undefined' ? window : Function('return this;')()

let path = (parts, scope) => {
  let o = scope !== undefined && scope !== null ? scope : global

  for (let i = 0; i < parts.length && o !== undefined && o !== null; ++i) {
    o = o[parts[i]]
  }

  return o
}

let resolve = (p, scope) => {
  let parts = p.split('.')

  return path(parts, scope)
}

let step = (o, part) => {
  if (o[part] === undefined || o[part] === null) { o[part] = {} }

  return o[part]
}

let forge = (parts, target) => {
  let o = target !== undefined
    ? target
    : global

  for (let i = 0; i < parts.length; ++i) {
    o = step(o, parts[i])
  }

  return o
}

let namespace = function (name, target) {
  let parts = name.split('.')

  return forge(parts, target)
}

let PathResolver = {
  path,
  resolve,
  forge,
  namespace
}

export { PathResolver }
