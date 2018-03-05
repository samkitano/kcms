'use strict'

import { Utils } from './Utils'
import { ObjectTools } from './ObjectTools'

function Immutable () {
  let fields = arguments

  return function () {
    let values = new Array(arguments.length)

    for (let i = 0; i < values.length; i++) {
      values[i] = arguments[i]
    }

    if (fields.length !== values.length) {
      throw new Error(`Wrong number of arguments to struct. Expected "[${fields.length}]", got ${values.length} arguments`)
    }

    let struct = {}

    ObjectTools.each(fields, (name, i) => {
      struct[name] = Utils.constant(values[i])
    })

    return struct
  }
}

export { Immutable }
