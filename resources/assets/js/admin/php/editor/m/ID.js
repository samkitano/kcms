'use strict'

let unique = 0

let generate = function (prefix) {
  let date = new Date()
  let time = date.getTime()
  let random = Math.floor(Math.random() * 1000000000)

  unique++

  return `${prefix}_${random}${unique}${String(time)}`
}

let ID = { generate }

export { ID }
