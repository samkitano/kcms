'use strict'

import { Retrieve } from './Retrieve'

let first = (str, count) => str.substr(0, count)
let last = (str, count) => str.substr(str.length - count, str.length)
let head = str => str === '' ? Retrieve.none() : Retrieve.some(str.substr(0, 1))
let tail = str => str === '' ? Retrieve.none() : Retrieve.some(str.substring(1))

let Str = { first, last, head, tail }

export { Str }
