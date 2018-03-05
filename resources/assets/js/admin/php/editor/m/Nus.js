'use strict'

let firstMatch = (regexes, s) => {
  for (let i = 0; i < regexes.length; i++) {
    let x = regexes[i]

    if (x.test(s)) {
      return x
    }
  }

  return undefined
}

let find = (regexes, agent) => {
  let r = firstMatch(regexes, agent)

  if (!r) {
    return { major: 0, minor: 0 }
  }

  let group = i => Number(agent.replace(r, `$${i}`))

  return nu(group(1), group(2))
}

let detect = (versionRegexes, agent) => {
  let cleanedAgent = String(agent).toLowerCase()

  if (versionRegexes.length === 0) {
    return unknown()
  }

  return find(versionRegexes, cleanedAgent)
}

let unknown = () => nu(0, 0)

let nu = (major, minor) => ({ major, minor })

let Nus = { nu, detect, unknown }

export { Nus }
