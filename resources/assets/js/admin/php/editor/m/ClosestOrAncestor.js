'use strict'

import { Retrieve } from './Retrieve'
import { VarTypes } from './VarTypes'

function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
  if (VarTypes.isFunction(isRoot) && isRoot(scope)) {
    if (is(scope, a)) {
      return Retrieve.some(scope)
    } else {
      return Retrieve.none()
    }
  } else {
    if (is(scope, a)) {
      return Retrieve.some(scope)
    } else {
      return ancestor(scope, a, isRoot)
    }
  }
}

export { ClosestOrAncestor }
