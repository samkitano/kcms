'use strict'

import { Retrieve } from './Retrieve'

let keys = ((() => {
  let fastKeys = Object.keys

  let slowKeys = function (o) {
    let r = []

    for (let i in o) {
      if (o.hasOwnProperty(i)) {
        r.push(i)
      }
    }

    return r
  }

  return fastKeys === undefined
    ? slowKeys
    : fastKeys
})())

let values = obj => mapToArray(obj, v => v)
let size = obj => values(obj).length

let each = (obj, f) => {
  let props = keys(obj)

  for (let k = 0, len = props.length; k < len; k++) {
    let i = props[k]
    let x = obj[i]

    f(x, i, obj)
  }
}

let map = (obj, f) => tupleMap(obj, (x, i, obj) => ({
  k: i,
  v: f(x, i, obj)
}))

let tupleMap = (obj, f) => {
  let r = {}

  each(obj, (x, i) => {
    let tuple = f(x, i, obj)

    r[tuple.k] = tuple.v
  })

  return r
}

let bifilter = (obj, pred) => {
  let t = {}
  let f = {}

  each(obj, (x, i) => {
    let branch = pred(x, i)
      ? t
      : f
    branch[i] = x
  })

  return {t, f}
}

let mapToArray = (obj, f) => {
  let r = []

  each(obj, (value, name) => {
    r.push(f(value, name))
  })

  return r
}

let find = (obj, pred) => {
  let props = keys(obj)

  for (let k = 0, len = props.length; k < len; k++) {
    let i = props[k]
    let x = obj[i]

    if (pred(x, i, obj)) {
      return Retrieve.some(x)
    }
  }

  return Retrieve.none()
}

let ObjectUtils = {
  bifilter,
  each,
  map,
  mapToArray,
  tupleMap,
  find,
  keys,
  values,
  size
}

export { ObjectUtils }
