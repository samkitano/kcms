'use strict'

import { Utils } from './Utils'

let never = Utils.never
let always = Utils.always
let none = () => NONE

let NONE = ((() => {
  let eq = o => o.isNone()
  let call = thunk => thunk()
  let id = n => n
  let noop = () => {}
  let me = {
    fold: (n, s) => n(),
    is: never,
    isSome: never,
    isNone: always,
    getOr: id,
    getOrThunk: call,
    getOrDie: msg => { throw new Error(msg || 'error: getOrDie called on none.') },
    or: id,
    orThunk: call,
    map: none,
    ap: none,
    each: noop,
    bind: none,
    flatten: none,
    exists: never,
    forall: always,
    filter: none,
    equals: eq,
    equals_: eq,
    toArray: () => [],
    toString: Utils.constant('none()')
  }

  if (Object.freeze) {
    Object.freeze(me)
  }

  return me
})())

let some = a => {
  let cnstt = () => a
  let self = () => me
  let map = f => some(f(a))
  let bind = f => f(a)

  let me = {
    fold: (n, s) => s(a),
    is: v => a === v,
    isSome: always,
    isNone: never,
    getOr: cnstt,
    getOrThunk: cnstt,
    getOrDie: cnstt,
    or: self,
    orThunk: self,
    map,
    ap: optfab => optfab.fold(none, fab => some(fab(a))),
    each: f => { f(a) },
    bind: bind,
    flatten: cnstt,
    exists: bind,
    forall: bind,
    filter: f => f(a) ? me : NONE,
    equals: o => o.is(a),
    equals_: (o, elementEq) => o.fold(never, b => elementEq(a, b)),
    toArray: () => [a],
    toString: () => `some(${a})`
  }

  return me
}

let from = value => value === null || value === undefined ? NONE : some(value)

let Retrieve = { some, none, from }

export { Retrieve }
