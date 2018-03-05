'use strict'

import { Class } from './Class'

function unique (array) {
  let item
  let uniqueItems = []
  let i = array.length

  while (i--) {
    item = array[i]

    if (!item.__checked) {
      uniqueItems.push(item)
      item.__checked = 1
    }
  }

  i = uniqueItems.length

  while (i--) {
    delete uniqueItems[i].__checked
  }

  return uniqueItems
}

let expression = /^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\.]+))?(?:\[@?([\w\\]+)([\^\$*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i
let chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*]|['"][^'"]*['"]|[^[\]'"]+)+]|\\.|[^ >+~,([\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
let whiteSpace = /^\s*|\s*$/g
let Collection

let Selector = Class.extend({
  init: function (selector) {
    let match = this.match

    function compileNameFilter (name) {
      if (name) {
        name = name.toLowerCase()

        return function (item) {
          return name === '*' || item.type === name
        }
      }
    }

    function compileIdFilter (id) {
      if (id) {
        return function (item) {
          return item._name === id
        }
      }
    }

    function compileClassesFilter (classes) {
      if (classes) {
        classes = classes.split('.')

        return function (item) {
          let i = classes.length

          while (i--) {
            if (!item.classes.contains(classes[i])) {
              return false
            }
          }

          return true
        }
      }
    }

    function compileAttrFilter (name, cmp, check) {
      if (name) {
        return function (item) {
          let value = item[name] ? item[name]() : ''

          if (!cmp) {
            return !!check
          } else {
            if (cmp === '=') {
              return value === check
            } else {
              if (cmp === '*=') {
                return value.indexOf(check) >= 0
              } else {
                if (cmp === '~=') {
                  return (` ${value} `).indexOf(` ${check} `) >= 0
                } else {
                  if (cmp === '!=') {
                    return value !== check
                  } else {
                    if (cmp === '^=') {
                      return value.indexOf(check) === 0
                    } else {
                      if (cmp === '$=') {
                        return value.substr(value.length - check.length) === check
                      } else {
                        return false
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    function compilePsuedoFilter (name) {
      let notSelectors
      if (name) {
        name = /(?:not\((.+)\))|(.+)/i.exec(name)

        if (!name[1]) {
          name = name[2]

          return function (item, index, length) {
            if (name === 'first') {
              return index === 0
            } else {
              if (name === 'last') {
                return index === length - 1
              } else {
                if (name === 'even') {
                  return index % 2 === 0
                } else {
                  if (name === 'odd') {
                    return index % 2 === 1
                  } else {
                    if (item[name]) {
                      return item[name]()
                    } else {
                      return false
                    }
                  }
                }
              }
            }
          }
        }

        notSelectors = parseChunks(name[1], [])

        return function (item) {
          return !match(item, notSelectors)
        }
      }
    }

    function compile (selector, filters, direct) {
      let parts

      function add (filter) {
        if (filter) {
          filters.push(filter)
        }
      }

      parts = expression.exec(selector.replace(whiteSpace, ''))

      add(compileNameFilter(parts[1]))
      add(compileIdFilter(parts[2]))
      add(compileClassesFilter(parts[3]))
      add(compileAttrFilter(parts[4], parts[5], parts[6]))
      add(compilePsuedoFilter(parts[7]))

      filters.pseudo = !!parts[7]
      filters.direct = direct

      return filters
    }

    function parseChunks (selector, selectors) {
      let extra, matches, i
      let parts = []

      do {
        chunker.exec('')
        matches = chunker.exec(selector)

        if (matches) {
          selector = matches[3]
          parts.push(matches[1])

          if (matches[2]) {
            extra = matches[3]

            break
          }
        }
      } while (matches)

      if (extra) {
        parseChunks(extra, selectors)
      }

      selector = []

      for (i = 0; i < parts.length; i++) {
        if (parts[i] !== '>') {
          selector.push(compile(parts[i], [], parts[i - 1] === '>'))
        }
      }

      selectors.push(selector)

      return selectors
    }

    this._selectors = parseChunks(selector, [])
  },
  match: function (control, selectors) {
    let i, l, si, sl, selector, fi, fl, filters, index, length, siblings, count, item
    selectors = selectors || this._selectors

    for (i = 0, l = selectors.length; i < l; i++) {
      selector = selectors[i]
      sl = selector.length
      item = control
      count = 0

      for (si = sl - 1; si >= 0; si--) {
        filters = selector[si]

        while (item) {
          if (filters.pseudo) {
            siblings = item.parent().items()
            index = length = siblings.length

            while (index--) {
              if (siblings[index] === item) {
                break
              }
            }
          }

          for (fi = 0, fl = filters.length; fi < fl; fi++) {
            if (!filters[fi](item, index, length)) {
              fi = fl + 1

              break
            }
          }

          if (fi === fl) {
            count++
            break
          } else {
            if (si === sl - 1) {
              break
            }
          }

          item = item.parent()
        }
      }

      if (count === sl) {
        return true
      }
    }

    return false
  },
  find: function (container) {
    let i, l
    let matches = []
    let selectors = this._selectors

    function collect (items, selector, index) {
      let i, l, fi, fl, item
      let filters = selector[index]

      for (i = 0, l = items.length; i < l; i++) {
        item = items[i]

        for (fi = 0, fl = filters.length; fi < fl; fi++) {
          if (!filters[fi](item, i, l)) {
            fi = fl + 1

            break
          }
        }

        if (fi === fl) {
          if (index === selector.length - 1) {
            matches.push(item)
          } else {
            if (item.items) {
              collect(item.items(), selector, index + 1)
            }
          }
        } else if (filters.direct) {
          return
        }

        if (item.items) {
          collect(item.items(), selector, index)
        }
      }
    }

    if (container.items) {
      for (i = 0, l = selectors.length; i < l; i++) {
        collect(container.items(), selectors[i], 0)
      }

      if (l > 1) {
        matches = unique(matches)
      }
    }

    if (!Collection) {
      Collection = Selector.Collection
    }

    return new Collection(matches)
  }
})

export { Selector }
