/**
 * Store the original data when updating user profile
 *
 * @param commit
 * @param data
 */
export const setOriginalProfile = ({ commit }, data) => {
  let original = {}

  for (let f in data) {
    if (data.hasOwnProperty(f)) {
      original[f] = data[f].value
    }
  }

  commit('SET_ORIGINAL_PROFILE', original)
}

export const collapseWindow = ({ commit }, wndw) => {
  commit('COLLAPSE_WINDOW', wndw)
}

export const expandWindow = ({ commit }, wndw) => {
  commit('EXPAND_WINDOW', wndw)
}

export const restoreAllWindows = ({ commit }) => {
  commit('RESTORE_ALL_WINDOWS')
}

export const hideAlert = ({ commit }, alert) => {
  commit('HIDE_ALERT', alert)
}

export const restoreAlert = ({ commit }, alert) => {
  commit('RESTORE_ALERT', alert)
}

export const restoreAllAlerts = ({ commit }) => {
  commit('RESTORE_ALL_ALERTS')
}
