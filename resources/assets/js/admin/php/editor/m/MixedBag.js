'use strict'

import { Utils } from './Utils'
import { Alerts } from './Alerts'
import { Retrieve } from './Retrieve'
import { ObjectUtils } from './ObjectUtils'
import { ObjectTools } from './ObjectTools'

function MixedBag (required, optional) {
  let everything = required.concat(optional)

  if (everything.length === 0) {
    throw new Error('You must specify at least one required or optional field.')
  }

  Alerts.validateStrArr('required', required)
  Alerts.validateStrArr('optional', optional)
  Alerts.checkDupes(everything)

  return obj => {
    let keys = ObjectUtils.keys(obj)
    let allReqd = ObjectTools.forall(required, req => ObjectTools.contains(keys, req))

    if (!allReqd) {
      Alerts.reqMessage(required, keys)
    }

    let unsupported = ObjectTools.filter(keys, key => !ObjectTools.contains(everything, key))

    if (unsupported.length > 0) {
      Alerts.unsuppMessage(unsupported)
    }

    let r = {}

    ObjectTools.each(required, req => {
      r[req] = Utils.constant(obj[req])
    })

    ObjectTools.each(optional, opt => {
      r[opt] = Utils.constant(Object.prototype.hasOwnProperty.call(obj, opt)
        ? Retrieve.some(obj[opt])
        : Retrieve.none())
    })

    return r
  }
}

export { MixedBag }
