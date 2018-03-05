'use strict'

import { AbsoluteLayout } from './AbsoluteLayout'

let FlexLayout = AbsoluteLayout.extend({
  recalc: function (container) {
    let i, l, items, contLayoutRect, contPaddingBox, contSettings, align, pack, spacing
    let ctrl, ctrlLayoutRect, ctrlSettings, flex, direction, availableSpace, totalFlex
    let size, maxSize, ratio, rect, pos, maxAlignEndPos, contentSizeName, alignAfterName
    let sizeName, minSizeName, posName, maxSizeName, beforeName, innerSizeName, deltaSizeName
    let alignAxisName, alignInnerSizeName, alignSizeName, alignMinSizeName, alignBeforeName
    let alignDeltaSizeName, alignContentSizeName
    let maxSizeItems = []
    let max = Math.max
    let min = Math.min

    items = container.items().filter(':visible')
    contLayoutRect = container.layoutRect()
    contPaddingBox = container.paddingBox
    contSettings = container.settings
    direction = container.isRtl() ? contSettings.direction || 'row-reversed' : contSettings.direction
    align = contSettings.align
    pack = container.isRtl() ? contSettings.pack || 'end' : contSettings.pack
    spacing = contSettings.spacing || 0

    if (direction === 'row-reversed' || direction === 'column-reverse') {
      items = items.set(items.toArray().reverse())
      direction = direction.split('-')[0]
    }

    if (direction === 'column') {
      posName = 'y'
      sizeName = 'h'
      minSizeName = 'minH'
      maxSizeName = 'maxH'
      innerSizeName = 'innerH'
      beforeName = 'top'
      deltaSizeName = 'deltaH'
      contentSizeName = 'contentH'
      alignBeforeName = 'left'
      alignSizeName = 'w'
      alignAxisName = 'x'
      alignInnerSizeName = 'innerW'
      alignMinSizeName = 'minW'
      alignAfterName = 'right'
      alignDeltaSizeName = 'deltaW'
      alignContentSizeName = 'contentW'
    } else {
      posName = 'x'
      sizeName = 'w'
      minSizeName = 'minW'
      maxSizeName = 'maxW'
      innerSizeName = 'innerW'
      beforeName = 'left'
      deltaSizeName = 'deltaW'
      contentSizeName = 'contentW'
      alignBeforeName = 'top'
      alignSizeName = 'h'
      alignAxisName = 'y'
      alignInnerSizeName = 'innerH'
      alignMinSizeName = 'minH'
      alignAfterName = 'bottom'
      alignDeltaSizeName = 'deltaH'
      alignContentSizeName = 'contentH'
    }

    availableSpace = contLayoutRect[innerSizeName] - contPaddingBox[beforeName] - contPaddingBox[beforeName]
    maxAlignEndPos = totalFlex = 0

    for (i = 0, l = items.length; i < l; i++) {
      ctrl = items[i]
      ctrlLayoutRect = ctrl.layoutRect()
      ctrlSettings = ctrl.settings
      flex = ctrlSettings.flex
      availableSpace -= i < l - 1 ? spacing : 0

      if (flex > 0) {
        totalFlex += flex

        if (ctrlLayoutRect[maxSizeName]) {
          maxSizeItems.push(ctrl)
        }

        ctrlLayoutRect.flex = flex
      }

      availableSpace -= ctrlLayoutRect[minSizeName]
      size = contPaddingBox[alignBeforeName] + ctrlLayoutRect[alignMinSizeName] + contPaddingBox[alignAfterName]

      if (size > maxAlignEndPos) {
        maxAlignEndPos = size
      }
    }

    rect = {}

    if (availableSpace < 0) {
      rect[minSizeName] = contLayoutRect[minSizeName] - availableSpace + contLayoutRect[deltaSizeName]
    } else {
      rect[minSizeName] = contLayoutRect[innerSizeName] - availableSpace + contLayoutRect[deltaSizeName]
    }

    rect[alignMinSizeName] = maxAlignEndPos + contLayoutRect[alignDeltaSizeName]
    rect[contentSizeName] = contLayoutRect[innerSizeName] - availableSpace
    rect[alignContentSizeName] = maxAlignEndPos

    rect.minW = min(rect.minW, contLayoutRect.maxW)
    rect.minH = min(rect.minH, contLayoutRect.maxH)
    rect.minW = max(rect.minW, contLayoutRect.startMinWidth)
    rect.minH = max(rect.minH, contLayoutRect.startMinHeight)

    if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
      rect.w = rect.minW
      rect.h = rect.minH
      container.layoutRect(rect)

      this.recalc(container)

      if (container._lastRect === null) {
        let parentCtrl = container.parent()

        if (parentCtrl) {
          parentCtrl._lastRect = null
          parentCtrl.recalc()
        }
      }

      return
    }

    ratio = availableSpace / totalFlex

    for (i = 0, l = maxSizeItems.length; i < l; i++) {
      ctrl = maxSizeItems[i]
      ctrlLayoutRect = ctrl.layoutRect()
      maxSize = ctrlLayoutRect[maxSizeName]
      size = ctrlLayoutRect[minSizeName] + ctrlLayoutRect.flex * ratio

      if (size > maxSize) {
        availableSpace -= ctrlLayoutRect[maxSizeName] - ctrlLayoutRect[minSizeName]
        totalFlex -= ctrlLayoutRect.flex
        ctrlLayoutRect.flex = 0
        ctrlLayoutRect.maxFlexSize = maxSize
      } else {
        ctrlLayoutRect.maxFlexSize = 0
      }
    }

    ratio = availableSpace / totalFlex
    pos = contPaddingBox[beforeName]
    rect = {}

    if (totalFlex === 0) {
      if (pack === 'end') {
        pos = availableSpace + contPaddingBox[beforeName]
      } else if (pack === 'center') {
        pos = Math.round(
          contLayoutRect[innerSizeName] / 2 - (contLayoutRect[innerSizeName] - availableSpace) / 2
        ) + contPaddingBox[beforeName]

        if (pos < 0) {
          pos = contPaddingBox[beforeName]
        }
      } else if (pack === 'justify') {
        pos = contPaddingBox[beforeName]
        spacing = Math.floor(availableSpace / (items.length - 1))
      }
    }

    rect[alignAxisName] = contPaddingBox[alignBeforeName]

    for (i = 0, l = items.length; i < l; i++) {
      ctrl = items[i]
      ctrlLayoutRect = ctrl.layoutRect()
      size = ctrlLayoutRect.maxFlexSize || ctrlLayoutRect[minSizeName]

      if (align === 'center') {
        rect[alignAxisName] = Math.round(contLayoutRect[alignInnerSizeName] / 2 - ctrlLayoutRect[alignSizeName] / 2)
      } else if (align === 'stretch') {
        rect[alignSizeName] = max(ctrlLayoutRect[alignMinSizeName] ||
          0, contLayoutRect[alignInnerSizeName] - contPaddingBox[alignBeforeName] - contPaddingBox[alignAfterName])
        rect[alignAxisName] = contPaddingBox[alignBeforeName]
      } else if (align === 'end') {
        rect[alignAxisName] = contLayoutRect[alignInnerSizeName] - ctrlLayoutRect[alignSizeName] - contPaddingBox.top
      }

      if (ctrlLayoutRect.flex > 0) {
        size += ctrlLayoutRect.flex * ratio
      }

      rect[sizeName] = size
      rect[posName] = pos
      ctrl.layoutRect(rect)

      if (ctrl.recalc) {
        ctrl.recalc()
      }

      pos += size + spacing
    }
  }
})

export { FlexLayout }
