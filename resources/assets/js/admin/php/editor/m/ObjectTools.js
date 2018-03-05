'use strict'

import { Retrieve } from './Retrieve'

let pure = x => [x]
let push = Array.prototype.push
let slice = Array.prototype.slice
let contains = (xs, x) => rawIndexOf(xs, x) > -1
let exists = (xs, pred) => findIndex(xs, pred).isSome()
let difference = (a1, a2) => filter(a1, x => !contains(a2, x))
let head = xs => xs.length === 0 ? Retrieve.none() : Retrieve.some(xs[0])
let equal = (a1, a2) => a1.length === a2.length && forall(a1, (x, i) => x === a2[i])
let last = xs => xs.length === 0 ? Retrieve.none() : Retrieve.some(xs[xs.length - 1])

let rawIndexOf = ((() => {
  let pIndexOf = Array.prototype.indexOf
  let slowIndex = (xs, x) => slowIndexOf(xs, x)
  let fastIndex = (xs, x) => pIndexOf.call(xs, x)

  return pIndexOf === undefined
    ? slowIndex
    : fastIndex
})())

let indexOf = (xs, x) => {
  let r = rawIndexOf(xs, x)

  return r === -1
    ? Retrieve.none()
    : Retrieve.some(r)
}

let range = (num, f) => {
  let r = []

  for (let i = 0; i < num; i++) {
    r.push(f(i))
  }

  return r
}

let chunk = (array, size) => {
  let r = []

  for (let i = 0; i < array.length; i += size) {
    let s = array.slice(i, i + size)

    r.push(s)
  }

  return r
}

let map = (xs, f) => {
  let len = xs.length
  let r = new Array(len)

  for (let i = 0; i < len; i++) {
    let x = xs[i]
    r[i] = f(x, i, xs)
  }

  return r
}

let each = (xs, f) => {
  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]

    f(x, i, xs)
  }
}

let eachr = (xs, f) => {
  for (let i = xs.length - 1; i >= 0; i--) {
    let x = xs[i]

    f(x, i, xs)
  }
}

let partition = (xs, pred) => {
  let pass = []
  let fail = []

  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]
    let arr = pred(x, i, xs)
      ? pass
      : fail

    arr.push(x)
  }

  return { pass, fail }
}

let filter = (xs, pred) => {
  let r = []

  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]

    if (pred(x, i, xs)) {
      r.push(x)
    }
  }

  return r
}

let groupBy = (xs, f) => {
  if (xs.length === 0) {
    return []
  } else {
    let wasType = f(xs[0])
    let r = []
    let group = []

    for (let i = 0, len = xs.length; i < len; i++) {
      let x = xs[i]
      let type = f(x)

      if (type !== wasType) {
        r.push(group)
        group = []
      }

      wasType = type
      group.push(x)
    }

    if (group.length !== 0) {
      r.push(group)
    }

    return r
  }
}

let foldr = (xs, f, acc) => {
  eachr(xs, x => {
    acc = f(acc, x)
  })

  return acc
}

let foldl = (xs, f, acc) => {
  each(xs, x => {
    acc = f(acc, x)
  })

  return acc
}

let find = (xs, pred) => {
  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]

    if (pred(x, i, xs)) {
      return Retrieve.some(x)
    }
  }

  return Retrieve.none()
}

let findIndex = (xs, pred) => {
  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]

    if (pred(x, i, xs)) {
      return Retrieve.some(i)
    }
  }

  return Retrieve.none()
}

let slowIndexOf = (xs, x) => {
  for (let i = 0, len = xs.length; i < len; ++i) {
    if (xs[i] === x) {
      return i
    }
  }

  return -1
}

let flatten = xs => {
  let r = []

  for (let i = 0, len = xs.length; i < len; ++i) {
    if (!Array.prototype.isPrototypeOf(xs[i])) {
      throw new Error(`Arr.flatten item ${i} was not an array, input: ${xs}`)
    }

    push.apply(r, xs[i])
  }

  return r
}

let bind = (xs, f) => {
  let output = map(xs, f)

  return flatten(output)
}

let forall = (xs, pred) => {
  for (let i = 0, len = xs.length; i < len; ++i) {
    let x = xs[i]

    if (pred(x, i, xs) !== true) {
      return false
    }
  }

  return true
}

let reverse = xs => {
  let r = slice.call(xs, 0)

  r.reverse()

  return r
}

let mapToObject = (xs, f) => {
  let r = {}

  for (let i = 0, len = xs.length; i < len; i++) {
    let x = xs[i]

    r[String(x)] = f(x, i)
  }

  return r
}

let sort = (xs, comparator) => {
  let copy = slice.call(xs, 0)

  copy.sort(comparator)

  return copy
}

let ObjectTools = {
  map,
  each,
  eachr,
  partition,
  filter,
  groupBy,
  indexOf,
  foldr,
  foldl,
  find,
  findIndex,
  flatten,
  bind,
  forall,
  exists,
  contains,
  equal,
  reverse,
  chunk,
  difference,
  mapToObject,
  pure,
  sort,
  range,
  head,
  last
}

export { ObjectTools }
