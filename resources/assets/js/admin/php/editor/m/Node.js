'use strict'

import { Nodes } from './Nodes'
import { SelectorUtils } from './SelectorUtils'

let all = selector => SelectorUtils.all(selector)
let descendants = (scope, selector) => SelectorUtils.all(selector, scope)
let siblings = (scope, selector) => Nodes.siblings(scope, e => SelectorUtils.is(e, selector))
let children = (scope, selector) => Nodes.children(scope, e => SelectorUtils.is(e, selector))
let ancestors = (scope, selector, isRoot) => Nodes.ancestors(scope, e => SelectorUtils.is(e, selector), isRoot)

let Node = {
  all,
  ancestors,
  siblings,
  children,
  descendants
}

export { Node }
