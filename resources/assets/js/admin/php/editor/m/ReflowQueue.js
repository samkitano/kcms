'use strict'

import { Delay } from './Delay'

let animationFrameRequested
let dirtyCtrls = {}

let ReflowQueue = {
  add: ctrl => {
    let parent = ctrl.parent()

    if (parent) {
      if (!parent._layout || parent._layout.isNative()) {
        return
      }

      if (!dirtyCtrls[parent._id]) {
        dirtyCtrls[parent._id] = parent
      }

      if (!animationFrameRequested) {
        animationFrameRequested = true

        Delay.requestAnimationFrame(() => {
          let id, ctrl
          animationFrameRequested = false

          for (id in dirtyCtrls) {
            ctrl = dirtyCtrls[id]

            if (ctrl.state.get('rendered')) {
              ctrl.reflow()
            }
          }

          dirtyCtrls = {}
        }, document.body)
      }
    }
  },
  remove: ctrl => {
    if (dirtyCtrls[ctrl._id]) {
      delete dirtyCtrls[ctrl._id]
    }
  }
}

export { ReflowQueue }
