'use strict'

import { AbsoluteLayout } from './AbsoluteLayout'

let GridLayout = AbsoluteLayout.extend({
  recalc: function (container) {
    let settings, rows, cols, items, contLayoutRect, width, height, rect
    let x, y, posX, posY, ctrlSettings, contPaddingBox, align, spacingH
    let maxX, maxY, alignH, alignV, ctrlLayoutRect, ctrl, spacingV, idx
    let ctrlMinWidth, ctrlMinHeight, availableWidth, availableHeight, reverseRows
    let colWidths = []
    let rowHeights = []

    settings = container.settings
    items = container.items().filter(':visible')
    contLayoutRect = container.layoutRect()
    cols = settings.columns || Math.ceil(Math.sqrt(items.length))
    rows = Math.ceil(items.length / cols)
    spacingH = settings.spacingH || settings.spacing || 0
    spacingV = settings.spacingV || settings.spacing || 0
    alignH = settings.alignH || settings.align
    alignV = settings.alignV || settings.align
    contPaddingBox = container.paddingBox
    reverseRows = 'reverseRows' in settings ? settings.reverseRows : container.isRtl()

    if (alignH && typeof alignH === 'string') {
      alignH = [alignH]
    }

    if (alignV && typeof alignV === 'string') {
      alignV = [alignV]
    }

    for (x = 0; x < cols; x++) {
      colWidths.push(0)
    }

    for (y = 0; y < rows; y++) {
      rowHeights.push(0)
    }

    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {
        ctrl = items[y * cols + x]

        if (!ctrl) {
          break
        }

        ctrlLayoutRect = ctrl.layoutRect()
        ctrlMinWidth = ctrlLayoutRect.minW
        ctrlMinHeight = ctrlLayoutRect.minH
        colWidths[x] = ctrlMinWidth > colWidths[x] ? ctrlMinWidth : colWidths[x]
        rowHeights[y] = ctrlMinHeight > rowHeights[y] ? ctrlMinHeight : rowHeights[y]
      }
    }

    availableWidth = contLayoutRect.innerW - contPaddingBox.left - contPaddingBox.right

    for (maxX = 0, x = 0; x < cols; x++) {
      maxX += colWidths[x] + (x > 0 ? spacingH : 0)
      availableWidth -= (x > 0 ? spacingH : 0) + colWidths[x]
    }

    availableHeight = contLayoutRect.innerH - contPaddingBox.top - contPaddingBox.bottom

    for (maxY = 0, y = 0; y < rows; y++) {
      maxY += rowHeights[y] + (y > 0 ? spacingV : 0)
      availableHeight -= (y > 0 ? spacingV : 0) + rowHeights[y]
    }

    maxX += contPaddingBox.left + contPaddingBox.right
    maxY += contPaddingBox.top + contPaddingBox.bottom
    rect = {}
    rect.minW = maxX + (contLayoutRect.w - contLayoutRect.innerW)
    rect.minH = maxY + (contLayoutRect.h - contLayoutRect.innerH)
    rect.contentW = rect.minW - contLayoutRect.deltaW
    rect.contentH = rect.minH - contLayoutRect.deltaH
    rect.minW = Math.min(rect.minW, contLayoutRect.maxW)
    rect.minH = Math.min(rect.minH, contLayoutRect.maxH)
    rect.minW = Math.max(rect.minW, contLayoutRect.startMinWidth)
    rect.minH = Math.max(rect.minH, contLayoutRect.startMinHeight)

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

    if (contLayoutRect.autoResize) {
      rect = container.layoutRect(rect)
      rect.contentW = rect.minW - contLayoutRect.deltaW
      rect.contentH = rect.minH - contLayoutRect.deltaH
    }

    let flexV

    if (settings.packV === 'start') {
      flexV = 0
    } else {
      flexV = availableHeight > 0 ? Math.floor(availableHeight / rows) : 0
    }

    let totalFlex = 0
    let flexWidths = settings.flexWidths

    if (flexWidths) {
      for (x = 0; x < flexWidths.length; x++) {
        totalFlex += flexWidths[x]
      }
    } else {
      totalFlex = cols
    }

    let ratio = availableWidth / totalFlex

    for (x = 0; x < cols; x++) {
      colWidths[x] += flexWidths
        ? flexWidths[x] * ratio
        : ratio
    }

    posY = contPaddingBox.top

    for (y = 0; y < rows; y++) {
      posX = contPaddingBox.left
      height = rowHeights[y] + flexV

      for (x = 0; x < cols; x++) {
        if (reverseRows) {
          idx = y * cols + cols - 1 - x
        } else {
          idx = y * cols + x
        }

        ctrl = items[idx]

        if (!ctrl) {
          break
        }

        ctrlSettings = ctrl.settings
        ctrlLayoutRect = ctrl.layoutRect()
        width = Math.max(colWidths[x], ctrlLayoutRect.startMinWidth)
        ctrlLayoutRect.x = posX
        ctrlLayoutRect.y = posY
        align = ctrlSettings.alignH || (alignH ? alignH[x] || alignH[0] : null)

        if (align === 'center') {
          ctrlLayoutRect.x = posX + width / 2 - ctrlLayoutRect.w / 2
        } else if (align === 'right') {
          ctrlLayoutRect.x = posX + width - ctrlLayoutRect.w
        } else if (align === 'stretch') {
          ctrlLayoutRect.w = width
        }

        align = ctrlSettings.alignV || (alignV ? alignV[x] || alignV[0] : null)

        if (align === 'center') {
          ctrlLayoutRect.y = posY + height / 2 - ctrlLayoutRect.h / 2
        } else if (align === 'bottom') {
          ctrlLayoutRect.y = posY + height - ctrlLayoutRect.h
        } else if (align === 'stretch') {
          ctrlLayoutRect.h = height
        }

        ctrl.layoutRect(ctrlLayoutRect)
        posX += width + spacingH

        if (ctrl.recalc) {
          ctrl.recalc()
        }
      }

      posY += height + spacingV
    }
  }
})

export { GridLayout }
