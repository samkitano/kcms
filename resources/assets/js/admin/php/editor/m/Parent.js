'use strict'

import { Parents } from './Parents'
import { SelectorUtils } from './SelectorUtils'
import { ClosestOrAncestor } from './ClosestOrAncestor'

let first = selector => SelectorUtils.one(selector)
let descendant = (scope, selector) => SelectorUtils.one(selector, scope)
let child = (scope, selector) => Parents.child(scope, e => SelectorUtils.is(e, selector))
let sibling = (scope, selector) => Parents.sibling(scope, e => SelectorUtils.is(e, selector))
let ancestor = (scope, selector, isRoot) => Parents.ancestor(scope, e => SelectorUtils.is(e, selector), isRoot)
let closest = (scope, selector, isRoot) => ClosestOrAncestor(SelectorUtils.is, ancestor, scope, selector, isRoot)

let Parent = {
  first,
  ancestor,
  sibling,
  child,
  descendant,
  closest
}

export { Parent }
