'use strict'

import { Types } from './Types'

let name = element => element.dom().nodeName.toLowerCase()
let type = element => element.dom().nodeType
let value = element => element.dom().nodeValue
let isType = t => element => type(element) === t
let isComment = element => type(element) === Types.COMMENT || name(element) === '#comment'

let isElement = isType(Types.ELEMENT)
let isText = isType(Types.TEXT)
let isDocument = isType(Types.DOCUMENT)

let CheckType = {
  name,
  type,
  value,
  isElement,
  isText,
  isDocument,
  isComment
}

export { CheckType }
