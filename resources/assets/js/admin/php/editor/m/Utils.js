'use strict'

let noop = () => {}
let noarg = f => () => f()
let compose = (fa, fb) => () => fa(fb.apply(null, arguments))
let constant = value => () => value
let identity = x => x
let tripleEquals = (a, b) => a === b
let apply = f => f()
let call = f => { f() }
let not = f => () => !f.apply(null, arguments)
let die = msg => () => { throw new Error(msg) }

let curry = f => {
  let args = new Array(arguments.length - 1)

  for (let i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i]
  }

  return () => {
    let newArgs = new Array(arguments.length)

    for (let j = 0; j < newArgs.length; j++) {
      newArgs[j] = arguments[j]
    }

    let all = args.concat(newArgs)

    return f.apply(null, all)
  }
}

let never = constant(false)
let always = constant(true)
let Utils = {
  noop,
  noarg,
  compose,
  constant,
  identity,
  tripleEquals,
  curry,
  not,
  die,
  apply,
  call,
  never,
  always
}

export { Utils }
