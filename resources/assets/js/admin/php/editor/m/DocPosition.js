'use strict'

import { Features } from './Features'

let compareDocumentPosition = (a, b, match) => (a.compareDocumentPosition(b) & match) !== 0
let documentPositionPreceding = (a, b) => compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING)
let documentPositionContainedBy = (a, b) => compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY)

let node = () => {
  return Features.getOrDie('Node')
}

let DocPosition = { documentPositionPreceding, documentPositionContainedBy }

export { DocPosition }
