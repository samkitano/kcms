'use strict'

let toArray = (target, f) => {
  let r = []

  let recurse = e => {
    r.push(e)

    return f(e)
  }

  let cur = f(target)

  do {
    cur = cur.bind(recurse)
  } while (cur.isSome())

  return r
}

let Siblings = { toArray }

export { Siblings }
