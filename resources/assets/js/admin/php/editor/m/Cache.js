'use strict'

let cached = function (f) {
  let called = false
  let r

  return function () {
    if (!called) {
      called = true
      r = f.apply(null, arguments)
    }

    return r
  }
}

let Cache = { cached }

export { Cache }
