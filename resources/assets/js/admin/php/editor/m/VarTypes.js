'use strict'

let typeOf = function (x) {
  if (x === null) {
    return 'null'
  }

  let t = typeof x

  if (t === 'object' && Array.prototype.isPrototypeOf(x)) {
    return 'array'
  }

  if (t === 'object' && String.prototype.isPrototypeOf(x)) {
    return 'string'
  }

  return t
}

let isType = function (type) {
  return function (value) {
    return typeOf(value) === type
  }
}

let VarTypes = {
  isString: isType('string'),
  isObject: isType('object'),
  isArray: isType('array'),
  isNull: isType('null'),
  isBoolean: isType('boolean'),
  isUndefined: isType('undefined'),
  isFunction: isType('function'),
  isNumber: isType('number')
}

export { VarTypes }
