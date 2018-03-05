'use strict'

import { Path } from './Path'

let ElementPath = Path.extend({
  postRender: function () {
    let self = this
    let editor = self.settings.editor

    function isHidden (elm) {
      if (elm.nodeType === 1) {
        if (elm.nodeName === 'BR' || !!elm.getAttribute('data-mce-bogus')) {
          return true
        }

        if (elm.getAttribute('data-mce-type') === 'bookmark') {
          return true
        }
      }

      return false
    }

    if (editor.settings.elementpath !== false) {
      self.on('select', function (e) {
        editor.focus()
        editor.selection.select(this.row()[e.index].element)
        editor.nodeChanged()
      })

      editor.on('nodeChange', function (e) {
        let outParents = []
        let parents = e.parents
        let i = parents.length

        while (i--) {
          if (parents[i].nodeType === 1 && !isHidden(parents[i])) {
            let args = editor.fire('ResolveName', {
              name: parents[i].nodeName.toLowerCase(),
              target: parents[i]
            })

            if (!args.isDefaultPrevented()) {
              outParents.push({
                name: args.name,
                element: parents[i]
              })
            }

            if (args.isPropagationStopped()) {
              break
            }
          }
        }

        self.row(outParents)
      })
    }

    return self._super()
  }
})

export { ElementPath }
