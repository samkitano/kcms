'use strict'

let Binding = function (settings) {
  this.create = settings.create
}

Binding.create = (model, name) => new Binding({
  create: (otherModel, otherName) => {
    let bindings

    let fromSelfToOther = e => {
      otherModel.set(otherName, e.value)
    }

    let fromOtherToSelf = e => {
      model.set(name, e.value)
    }

    otherModel.on(`change:${otherName}`, fromOtherToSelf)
    model.on(`change:${name}`, fromSelfToOther)
    bindings = otherModel._bindings

    if (!bindings) {
      bindings = otherModel._bindings = []

      otherModel.on('destroy', () => {
        let i = bindings.length

        while (i--) {
          bindings[i]()
        }
      })
    }

    bindings.push(() => {
      model.off(`change:${name}`, fromSelfToOther)
    })

    return model.get(name)
  }
})

export { Binding }
