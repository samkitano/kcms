'use strict'

import { VarTypes } from './VarTypes'
import { ObjectTools } from './ObjectTools'

let sort = arr => arr.slice(0).sort()

let reqMessage = (required, keys) => {
  throw new Error(`All required keys (${sort(required).join(', ')}) were not specified. Specified keys were: ${sort(keys).join(', ')}.`)
}

let unsuppMessage = unsupported => {
  throw new Error(`Unsupported keys for object: ${sort(unsupported).join(', ')}`)
}

let validateStrArr = (label, array) => {
  if (!VarTypes.isArray(array)) {
    throw new Error(`The ${label} fields must be an array. Was: ${array}.`)
  }

  ObjectTools.each(array, a => {
    if (!VarTypes.isString(a)) {
      throw new Error(`The value ${a} in the ${label} fields was not a string.`)
    }
  })
}

let invalidTypeMessage = (incorrect, type) => {
  throw new Error(`All values need to be of type: ${type}. Keys (${sort(incorrect).join(', ')}) were not.`)
}

let checkDupes = everything => {
  let sorted = sort(everything)

  let dupe = ObjectTools.find(sorted, (s, i) => i < sorted.length - 1 && s === sorted[i + 1])

  dupe.each(d => {
    throw new Error(`The field: ${d} occurs more than once in the combined fields: [${sorted.join(', ')}].`)
  })
}

let Alerts = {
  sort,
  reqMessage,
  unsuppMessage,
  validateStrArr,
  invalidTypeMessage,
  checkDupes
}

export { Alerts }
