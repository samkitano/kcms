'use strict'

import { Body } from './Body'
import { Utils } from './Utils'
import { Retrieve } from './Retrieve'
import { VarTypes } from './VarTypes'
import { Selection } from './Selection'
import { ObjectTools } from './ObjectTools'
import { ClosestOrAncestor } from './ClosestOrAncestor'

let first = predicate => descendant(Body.body(), predicate)

let ancestor = (scope, predicate, isRoot) => {
  let element = scope.dom()
  let stop = VarTypes.isFunction(isRoot)
    ? isRoot
    : Utils.constant(false)

  while (element.parentNode) {
    element = element.parentNode

    let el = Body.fromDom(element)

    if (predicate(el)) {
      return Retrieve.some(el)
    } else if (stop(el)) {
      break
    }
  }

  return Retrieve.none()
}

let closest = (scope, predicate, isRoot) => {
  let is = scope => predicate(scope)

  return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot)
}

let sibling = (scope, predicate) => {
  let element = scope.dom()

  if (!element.parentNode) {
    return Retrieve.none()
  }

  return child(Body.fromDom(element.parentNode), x => !Selection.eq(scope, x) && predicate(x))
}

let child = (scope, predicate) => {
  let result = ObjectTools.find(scope.dom().childNodes, Utils.compose(predicate, Body.fromDom))

  return result.map(Body.fromDom)
}

let descendant = (scope, predicate) => {
  let descend = element => {
    for (let i = 0; i < element.childNodes.length; i++) {
      if (predicate(Body.fromDom(element.childNodes[i]))) {
        return Retrieve.some(Body.fromDom(element.childNodes[i]))
      }

      let res = descend(element.childNodes[i])

      if (res.isSome()) {
        return res
      }
    }

    return Retrieve.none()
  }

  return descend(scope.dom())
}

let Parents = {
  first,
  ancestor,
  closest,
  sibling,
  child,
  descendant
}

export { Parents }
