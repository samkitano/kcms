'use strict'

import { Env } from './Env'
import { Retrieve } from './Retrieve'
import { DOMUtils } from './DOMUtils'

let getUiContainerDelta = function () {
  let uiContainer = Env.container

  if (uiContainer && DOMUtils.DOM.getStyle(uiContainer, 'position', true) !== 'static') {
    let containerPos = DOMUtils.DOM.getPos(uiContainer)
    let dx = uiContainer.scrollLeft - containerPos.x
    let dy = uiContainer.scrollTop - containerPos.y

    return Retrieve.some({
      x: dx,
      y: dy
    })
  } else {
    return Retrieve.none()
  }
}

let UiContainerDelta = { getUiContainerDelta }

export { UiContainerDelta }
