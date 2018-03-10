/* global $ */

/*
* Draggable - reorderable list
*
* Inspired on this pen by Mark Meves: https://codepen.io/h1p3/pen/jbWNVR
*
* Not tested with multiple instances, or old crappy browsers.
*
* WARNING: DO NOT CHANGE IMPORTS ORDER!
* TimelineLite has to be imported before Draggable
*/

'use strict'

import { find } from 'lodash'
import TimelineLite from 'gsap/TimelineLite'
import * as Draggable from 'gsap/Draggable'

function sortableList (listElem) {
  /**
   * We need to uniquely identify each list item, so we
   * can figure out where to insert the 'data-order'
   * attribute, in order to assign the due order
   * values, as the original element position
   * does not actually change in the DOM.
   *
   * @type {string}
   */
  const elIdentifier = 'data-sortableid'

  /**
   * Class to be assigned to all children of the list
   * so you don't  have to specify any particular
   * class to identify elements as a list item.
   *
   * @type {string}
   */
  const listItemClass = 'sortable-list-item'

  /**
   * The class which will be used as a handle
   * Can be the whole list item container,
   * a panel title, whatever suits you.
   *
   * @type {string}
   */
  const handleClass = 'knob'

  /**
   * Animation stuff. No idea for what purpose
   *
   * @type {number}
   */
  const momentum = 0.2

  /**
   * Animation stuff. Not my cuppa. Tango guy myself.
   *
   * @type {number}
   */
  const waltz = 0.35

  /**
   * First we ID the list items
   */
  assignIdsToItems()

  /**
   * Then start the fun
   */
  $(`.${handleClass}`, listElem).mousedown(onHandleDrag)

  function assignIdsToItems () {
    let els = listElem.children()

    $.each(els, function (a, b) {
      $(b).attr(elIdentifier, a)
      $(b).removeClass(listItemClass).addClass(listItemClass)
    })
  }

  function onHandleDrag () {
    let knob = $(this)
    let movingTile = findMovingTileFromHandle()

    startDragSession(movingTile, knob)

    function findMovingTileFromHandle () {
      let found
      let current = knob

      while (current.length) {
        if (current.hasClass(listItemClass)) {
          found = current
          break
        }

        current = current.parent()
      }

      return found
    }
  }

  function startDragSession (movingTile, knob) {
    let killable, checkUpperThreshold, checkLowerThreshold, knobCenterY
    let movingItem, pointerToScrubberCenterDelta, knobCenterWaypoint
    let itemIndex = buildItemIndex()

    if (itemIndex) {
      listen()
    }

    function listen () {
      killable = Draggable.create(movingTile, {
        bounds: listElem,
        onPress: onPress,
        onDragStart: onDragStart,
        onDrag: onDrag,
        onRelease: onRelease,
        zIndexBoost: false
      })[0]
    }

    function buildItemIndex () {
      let itemIndexAttempt = new ItemIndex(movingTile, knob)
      let ok = itemIndexAttempt.execute()

      if (ok) {
        return itemIndexAttempt
      }
    }

    function onPress () {
      movingItem = itemIndex.movingItem()

      let knobCenterY = movingItem.knobCenterY()

      knobCenterWaypoint = knobCenterY
      pointerToScrubberCenterDelta = knobCenterY - this.pointerY

      resetThresholds()

      movingItem.whenPress()
    }

    function onDragStart () {}

    function onDrag () {
      knobCenterY = this.pointerY + pointerToScrubberCenterDelta

      knobCenterWaypoint > knobCenterY
        ? checkUpperThreshold()
        : checkLowerThreshold()
    }

    function onRelease () {
      stopListening()
      movingItem.dropIt()
      changeOrderAttrs()
    }

    function changeOrderAttrs () {
      let items = itemIndex.items
      let order = []
      let fst = find(items, { prevItemId: null })
      let nxt = fst.nextItemId

      order.push(fst.id)

      while (nxt !== null) {
        order.push(nxt)
        nxt = find(items, { id: nxt }).nextItemId
      }

      order.push(items.length)

      for (let i in order) {
        $(`[${elIdentifier}="${order[i]}"]`).attr('data-order', parseInt(i) + 1)
      }
    }

    function resetThresholds () {
      let aboveTileCenterY, belowTileCenterY
      let prevItem = movingItem.previousItem()
      let nextItem = movingItem.nextItem()

      if (prevItem) {
        aboveTileCenterY = prevItem.tileCenterY()

        checkUpperThreshold = () => {
          if (aboveTileCenterY >= knobCenterY) {
            whenBreached(true)
          }
        }
      } else {
        checkUpperThreshold = whenNoThreshold
      }

      if (nextItem) {
        belowTileCenterY = nextItem.tileCenterY()

        checkLowerThreshold = () => {
          if (belowTileCenterY <= knobCenterY) {
            whenBreached(false)
          }
        }
      } else {
        checkLowerThreshold = whenNoThreshold
      }
    }

    function whenNoThreshold () {}

    function whenBreached (isUpper) {
      let ok = reorder(isUpper, knobCenterY, itemIndex)

      if (ok) {
        knobCenterWaypoint = movingItem.tileCenterY()

        resetThresholds()
      } else {
        stopListening()
      }
    }

    function stopListening () {
      killable.kill()
    }
  }

  function reorder (breachedUpper, knobCenterY, itemIndex) {
    let originalTopItem, originalBottomItem, newOrder, origOrder
    let items = itemIndex.items
    let movingItem = itemIndex.movingItem()

    determineNewOrder()
    correctLinks()

    return calculateNewTopsAndAnimate(newOrder, origOrder, itemIndex)

    function correctLinks () {
      let next, rest
      let anyStationaryUpper = originalTopItem.previousItem()
      let anyStationaryLower = originalBottomItem.nextItem()
      let body = streamViaMap(streamViaArray(newOrder), id => items[id])

      if (anyStationaryLower) {
        rest = () => {
          let x = body()

          if (x) {
            return x
          }

          next = () => null

          return anyStationaryLower
        }
      } else {
        rest = body
      }

      if (anyStationaryUpper) {
        next = () => {
          next = rest
          return anyStationaryUpper
        }
      } else {
        next = rest
      }

      let first = next()

      if (!anyStationaryUpper) {
        first.prevItemId = null
        itemIndex.headItemId = first.id
      }

      let prev = first
      let curr = next()

      while (curr) {
        prev.twoWayJoinToNext(curr)

        prev = curr
        curr = next()
      }

      if (!anyStationaryLower) {
        prev.nextItemId = null
      }
    }

    function determineNewOrder () {
      let arr, next, yes
      let a = []
      let origOrd = []
      let curr = movingItem

      if (breachedUpper) {
        a.push(movingItem.id)

        arr = []
        next = () => {
          curr = curr.previousItem()
          return curr
        }

        yes = item => knobCenterY <= item.tileCenterY()

        originalBottomItem = movingItem
      } else {
        arr = a

        next = () => {
          origOrd.push(curr.id)
          curr = curr.nextItem()

          return curr
        }

        yes = item => knobCenterY >= item.tileCenterY()

        originalTopItem = movingItem
      }

      let item = next()

      while (item) {
        if (!yes(item)) {
          break
        }

        arr.push(item.id)
        item = next()
      }

      if (breachedUpper) {
        originalTopItem = items[arr[arr.length - 1]]

        let i = arr.length

        while (i--) {
          let d = arr[i]

          a.push(d)
          origOrd.push(d)
        }

        origOrd.push(movingItem.id)
      } else {
        originalBottomItem = items[a[a.length - 1]]

        a.push(movingItem.id)
      }

      newOrder = a
      origOrder = origOrd
    }
  }

  function calculateNewTopsAndAnimate (newOrd, oldOrd, idx) {
    let items = idx.items

    function f (d) {
      return items[d]
    }

    let next = streamViaMap(streamViaArray(oldOrd), f)
    let gutters = []
    let prev = next()
    let curr = next()
    let origFirst = prev

    while (curr) {
      gutters.push(curr.cachedTop - (prev.cachedTop + prev.height()))

      prev = curr
      curr = next()
    }

    let nextGutter = streamViaArray(gutters)

    next = streamViaMap(streamViaArray(newOrd), f)
    prev = next()
    curr = next()

    prev.prevTop = prev.cachedTop
    prev.cachedTop = origFirst.cachedTop
    prev.whenNewTop()

    while (curr) {
      curr.prevTop = curr.cachedTop
      curr.cachedTop = prev.cachedTop + prev.height() + nextGutter()

      curr.whenNewTop()

      prev = curr
      curr = next()
    }

    return true
  }

  function animationMethods (o) {
    o.whenPress = function () {
      let el = this.element()
      let tl = new TimelineLite()

      this.topBeforeDrag = this.cachedTop
      this.origYtrnsfrm = yTransformOf(el.css('transform'))

      tl.to(el, 0, { zIndex: 1 })

      tl.to(el, momentum, {
        autoAlpha: 0.75,
        scale: 0.95
      })

      this.playAsOnlyTimeline(tl)
    }

    o.dropIt = function () {
      let origYtransform = this.origYtrnsfrm

      if (origYtransform === false) {
        throw new Error('Fix me! Original Y transform value not available.')
      } else {
        let el = this.element()
        let tl = new TimelineLite()
        let cleanDelta = this.cachedTop - this.topBeforeDrag
        let intendedYtransform = origYtransform + cleanDelta

        tl.to(el, waltz, {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: intendedYtransform
        })

        tl.to(el, 0, {
          zIndex: 0
        })

        this.playAsOnlyTimeline(tl)
      }
    }

    o.whenNewTop = function () {
      let delta

      if (this.timeline) {
        this.stopExistingTimeline()

        let currentTop = this.element().position().top

        delta = this.cachedTop - currentTop
      } else {
        delta = this.cachedTop - this.prevTop
      }

      let tl = new TimelineLite()
      let y = relativePixelsStringViaDelta(delta)

      tl.to(this.element(), waltz, { y })

      this.playAsOnlyTimeline(tl)
    }

    o.playAsOnlyTimeline = function (tl) {
      if (this.timeline) {
        this.stopExistingTimeline()
      }

      this.timeline = tl

      let me = this

      tl.eventCallback('onComplete', () => {
        me.timeline = null
      })

      tl.play()
    }

    o.stopExistingTimeline = function () {
      this.timeline.pause()
      this.timeline = null
    }

    let yTransformOf = buildMatrixMatcher(5)

    function buildMatrixMatcher (d) {
      let f = s => {
        f = buildMatcher(d, 'matrix')
        return f(s)
      }

      return s => f(s)
    }

    function buildMatcher (d, termString) {
      let rx = buildRegExp(d, termString)

      return s => {
        let md = rx.exec(s)
        return md ? Number(md[1]) : false
      }
    }

    function buildRegExp (d, s) {
      let i
      let a = [`^${s}\\(`]
      let arr = []

      if (d > 0) {
        i = d

        while (i--) {
          arr.push(numberRxs)
        }
      }

      arr.push(`(${numberRxs})`)

      let dd = 5 - d

      if (dd > 0) {
        i = dd

        while (i--) {
          arr.push(numberRxs)
        }
      }

      a.push(optionalSpaceRxs)
      a.push(arr.join(',[ ]*'))
      a.push(optionalSpaceRxs)

      a.push('\\)$')

      return RegExp(a.join(''))
    }

    let numberRxs = '-?\\d+(?:\\.\\d+)?(?:e-?\\d+)?'
    let optionalSpaceRxs = '[ ]*'
  }

  function relativePixelsStringViaDelta (delta) {
    return delta < 0 ? `-=${-1 * delta}px` : `+=${delta}px`
  }

  function ItemIndex (movingTile, knob) {
    this.execute = function () {
      let go = catalogItems(this, movingTile, knob)

      if (go) {
        go = sortAndLinkItems(this)
      }

      this.execute = null

      return go
    }

    Object.setPrototypeOf(this, ItemIndexMethods)
  }

  let ItemIndexMethods = {
    description: function () {
      let a = []
      let curr = this.headItem()

      while (curr) {
        a.push(curr.description())
        curr = curr.nextItem()
      }

      return `(${a.join(',')})`
    },
    headItem: function () {
      return this.items[ this.headItemId ]
    },
    movingItem: function () {
      return this.items[ this.movingItemId ]
    }
  }

  function catalogItems (results, movingTile, knob) {
    let mutables = []
    let immutables = []
    let movingDOMelement = movingTile[0]
    let next = streamViaArray(listElem.children())
    let itemPrototype = {
      description: describeItemMethod,
      tileCenterY: function () {
        return this.cachedTop + immutables[this.id].radius
      },
      radius: function () {
        return immutables[this.id].radius
      },
      height: function () {
        return immutables[this.id].height
      },
      element: function () {
        return immutables[this.id].element
      }
    }

    function lookup (id) {
      return id === null ? null : mutables[id]
    }

    linkedListMethods(itemPrototype, lookup)
    animationMethods(itemPrototype)

    let movingItemId = null
    let listItem = next()

    while (listItem) {
      if (movingDOMelement === listItem) {
        addMovingItem()
        break
      } else {
        addNonMovingItem()
      }

      listItem = next()
    }

    listItem = next()

    while (listItem) {
      addNonMovingItem()

      listItem = next()
    }

    function addMovingItem () {
      let d = beginItem()

      immutables[d].element = movingTile

      finishItem(d)

      let item = mutables[d]
      let sc = knobCenterDepthInItem(item)

      item.knobCenterY = () => item.cachedTop + sc
      item.whenNewTop = function () {}
      movingItemId = d
    }

    function knobCenterDepthInItem () {
      let top = knob.position().top
      let h = knob.height()

      return top + (h / 2)
    }

    function addNonMovingItem () {
      let d = beginItem()

      immutables[d].element = $(listItem)

      finishItem(d)
    }

    function beginItem () {
      let d = immutables.length

      immutables[d] = {}
      mutables[d] = { id: d }

      return d
    }

    function finishItem (d) {
      let im = immutables[d]
      let mu = mutables[d]
      let el = im.element
      let h = el.height()
      let top = el.position().top

      im.height = h
      im.radius = h / 2
      mu.cachedTop = top

      Object.setPrototypeOf(mu, itemPrototype)
    }

    if (movingItemId === null) {
      return false
    }

    results.items = mutables
    results.movingItemId = movingItemId

    return true
  }

  function sortAndLinkItems (self) {
    let items = self.items
    let a = mapViaStream(streamViaArray(items), item => item.id)

    a.sort((d, dd) => {
      let top = items[d].cachedTop
      let top_ = items[dd].cachedTop

      return top < top_ ? -1 : top > top_ ? 1 : 0
    })

    let next = streamViaMap(streamViaArray(a), id => items[id])

    let headItem = next()

    if (headItem) {
      let curr = next()

      headItem.prevItemId = null

      if (curr) {
        let prev = headItem

        while (curr) {
          prev.twoWayJoinToNext(curr)
          prev = curr
          curr = next()
        }

        prev.nextItemId = null
      }
    }

    if (headItem) {
      self.headItemId = headItem.id
      return true
    }

    return false
  }

  function describeItemMethod () {
    return `(${this.id}:${this.cachedTop})`
  }

  function linkedListMethods (o, lookup) {
    o.nextItem = function () {
      return lookup(this.nextItemId)
    }

    o.previousItem = function () {
      return lookup(this.prevItemId)
    }

    o.twoWayJoinToAnyPrevious = function (prv) {
      if (prv) {
        prv.twoWayJoinToNext(this)
      } else {
        this.prevItemId = null
      }
    }

    o.twoWayJoinToAnyNext = function (nxt) {
      if (nxt) {
        this.twoWayJoinToNext(nxt)
      } else {
        this.nextItemId = null
      }
    }

    o.twoWayJoinToNext = function (item) {
      item.prevItemId = this.id
      this.nextItemId = item.id
    }
  }

  function mapViaStream (next, f) {
    let a = []
    let next_ = streamViaMap(next, f)
    let curr = next_()

    while (curr !== null) {
      a.push(curr)
      curr = next_()
    }

    return a
  }

  function streamViaMap (next, f) {
    return () => {
      let curr = next()

      return curr === null ? null : f(curr)
    }
  }

  function streamViaArray (a) {
    let lastIndex = a.length - 1
    let d = -1

    return () => {
      if (lastIndex === d) {
        return null
      }

      d += 1

      return a[d]
    }
  }
}

sortableList($('#sortable-list'))
