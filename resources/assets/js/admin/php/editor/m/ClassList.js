'use strict'

import { Tools } from './Tools'

function noop () {}

function ClassList (onchange) {
  this.cls = []
  this.cls._map = {}
  this.onchange = onchange || noop
  this.prefix = ''
}

Tools.extend(ClassList.prototype, {
  add: function (cls) {
    if (cls && !this.contains(cls)) {
      this.cls._map[cls] = true
      this.cls.push(cls)
      this._change()
    }

    return this
  },
  remove: function (cls) {
    if (this.contains(cls)) {
      let i = void 0

      for (i = 0; i < this.cls.length; i++) {
        if (this.cls[i] === cls) {
          break
        }
      }

      this.cls.splice(i, 1)

      delete this.cls._map[cls]

      this._change()
    }

    return this
  },
  toggle: function (cls, state) {
    let curState = this.contains(cls)

    if (curState !== state) {
      if (curState) {
        this.remove(cls)
      } else {
        this.add(cls)
      }

      this._change()
    }

    return this
  },
  contains: function (cls) {
    return !!this.cls._map[cls]
  },
  _change: function () {
    delete this.clsValue

    this.onchange.call(this)
  }
})

ClassList.prototype.toString = function () {
  let value

  if (this.clsValue) {
    return this.clsValue
  }

  value = ''

  for (let i = 0; i < this.cls.length; i++) {
    if (i > 0) {
      value += ' '
    }

    value += this.prefix + this.cls[i]
  }

  return value
}

export { ClassList }
