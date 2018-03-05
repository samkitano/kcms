'use strict'

import { Class } from './Class'
import { Tools } from './Tools'
import { Binding } from './Binding'
import { Observable } from './Observable'

function isNode (node) {
  return node.nodeType > 0
}

function isEqual (a, b) {
  let k, checked

  if (a === b) {
    return true
  }

  if (a === null || b === null) {
    return a === b
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b
  }

  if (Tools.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    k = a.length

    while (k--) {
      if (!isEqual(a[k], b[k])) {
        return false
      }
    }
  }

  if (isNode(a) || isNode(b)) {
    return a === b
  }

  checked = {}

  for (k in b) {
    if (!isEqual(a[k], b[k])) {
      return false
    }

    checked[k] = true
  }

  for (k in a) {
    if (!checked[k] && !isEqual(a[k], b[k])) {
      return false
    }
  }

  return true
}

let ObservableObject = Class.extend({
  Mixins: [Observable],
  init: function (data) {
    let name, value

    data = data || {}

    for (name in data) {
      value = data[name]

      if (value instanceof Binding) {
        data[name] = value.create(this, name)
      }
    }

    this.data = data
  },
  set: function (name, value) {
    let key, args
    let oldValue = this.data[name]

    if (value instanceof Binding) {
      value = value.create(this, name)
    }

    if (typeof name === 'object') {
      for (key in name) {
        this.set(key, name[key])
      }

      return this
    }

    if (!isEqual(oldValue, value)) {
      this.data[name] = value

      args = {
        target: this,
        name,
        value,
        oldValue
      }

      this.fire(`change:${name}`, args)
      this.fire(`change`, args)
    }

    return this
  },
  get: function (name) {
    return this.data[name]
  },
  has: function (name) {
    return name in this.data
  },
  bind: function (name) {
    return Binding.create(this, name)
  },
  destroy: function () {
    this.fire('destroy')
  }
})

export { ObservableObject }
