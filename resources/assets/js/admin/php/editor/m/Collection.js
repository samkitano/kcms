'use strict'

import { Tools } from './Tools'
import { Class } from './Class'
import { Selector } from './Selector'

let Collection
let proto
let push = Array.prototype.push
let slice = Array.prototype.slice

proto = {
  length: 0,
  init: function (items) {
    if (items) {
      this.add(items)
    }
  },
  add: function (items) {
    let self = this

    if (!Tools.isArray(items)) {
      if (items instanceof Collection) {
        self.add(items.toArray())
      } else {
        push.call(self, items)
      }
    } else {
      push.apply(self, items)
    }

    return self
  },
  set: function (items) {
    let self = this
    let len = self.length
    let i

    self.length = 0
    self.add(items)

    for (i = self.length; i < len; i++) {
      delete self[i]
    }

    return self
  },
  filter: function (selector) {
    let self = this
    let i, l
    let matches = []
    let item, match

    if (typeof selector === 'string') {
      selector = new Selector(selector)

      match = function (item) {
        return selector.match(item)
      }
    } else {
      match = selector
    }

    for (i = 0, l = self.length; i < l; i++) {
      item = self[i]

      if (match(item)) {
        matches.push(item)
      }
    }

    return new Collection(matches)
  },
  slice: function () {
    return new Collection(slice.apply(this, arguments))
  },
  eq: function (index) {
    return index === -1 ? this.slice(index) : this.slice(index, +index + 1)
  },
  each: function (callback) {
    Tools.each(this, callback)

    return this
  },
  toArray: function () {
    return Tools.toArray(this)
  },
  indexOf: function (ctrl) {
    let self = this
    let i = self.length

    while (i--) {
      if (self[i] === ctrl) {
        break
      }
    }

    return i
  },
  reverse: function () {
    return new Collection(Tools.toArray(this).reverse())
  },
  hasClass: function (cls) {
    return this[0] ? this[0].classes.contains(cls) : false
  },
  prop: function (name, value) {
    let self = this
    let item

    if (value !== undefined) {
      self.each(function (item) {
        if (item[name]) {
          item[name](value)
        }
      })

      return self
    }

    item = self[0]

    if (item && item[name]) {
      return item[name]()
    }
  },
  exec: function (name) {
    let self = this
    let args = Tools.toArray(arguments).slice(1)

    self.each(function (item) {
      if (item[name]) {
        item[name].apply(item, args)
      }
    })

    return self
  },
  remove: function () {
    let i = this.length

    while (i--) {
      this[i].remove()
    }

    return this
  },
  addClass: function (cls) {
    return this.each(function (item) {
      item.classes.add(cls)
    })
  },
  removeClass: function (cls) {
    return this.each(function (item) {
      item.classes.remove(cls)
    })
  }
}

Tools.each('fire on off show hide append prepend before after reflow'.split(' '), function (name) {
  proto[name] = function () {
    let args = Tools.toArray(arguments)

    this.each(function (ctrl) {
      if (name in ctrl) {
        ctrl[name].apply(ctrl, args)
      }
    })

    return this
  }
})

Tools.each('text name disabled active selected checked visible parent value data'.split(' '), function (name) {
  proto[name] = function (value) {
    return this.prop(name, value)
  }
})

Collection = Class.extend(proto)
Selector.Collection = Collection

export { Collection }
