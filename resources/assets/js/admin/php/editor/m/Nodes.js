'use strict'

import { Body } from './Body'
import { Selected } from './Selected'
import { ObjectTools } from './ObjectTools'

let all = predicate => descendants(Body.body(), predicate)
let siblings = (scope, predicate) => ObjectTools.filter(Selected.siblings(scope), predicate)
let children = (scope, predicate) => ObjectTools.filter(Selected.children(scope), predicate)
let ancestors = (scope, predicate, isRoot) => ObjectTools.filter(Selected.parents(scope, isRoot), predicate)

let descendants = (scope, predicate) => {
  let result = []

  ObjectTools.each(Selected.children(scope), x => {
    if (predicate(x)) {
      result = result.concat([x])
    }

    result = result.concat(descendants(x, predicate))
  })

  return result
}

let Nodes = {
  all,
  ancestors,
  siblings,
  children,
  descendants
}

export { Nodes }
