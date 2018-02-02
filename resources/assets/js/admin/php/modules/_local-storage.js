'use strict'

/**
 * Get hidden alerts
 *
 * @returns {any}
 */
let getHidden = () => JSON.parse(localStorage.getItem('hidden_alerts'))

/**
 * Get collapsed windows
 *
 * @returns {any}
 */
let getCollapsed = () => JSON.parse(localStorage.getItem('collapsed'))

/**
 * Put an alert on the hidden list
 *
 * @param {array} hide
 */
let putHidden = (hide) => localStorage.setItem('hidden_alerts', JSON.stringify(hide))

/**
 * Put a collapsed div on the collapsed list
 *
 * @param {array} collapse
 */
let putCollapsed = (collapse) => localStorage.setItem('collapsed', JSON.stringify(collapse))

/**
 * Reset hidden alerts
 */
let resetHidden = () => localStorage.removeItem('hidden_alerts')

/**
 * Remove an alert from the hidden list
 *
 * @param {string} hidden The alert to remove from hidden list
 *
 */
let delHidden = (hidden) => {
  let store = getHidden()
  let i = store.indexOf(hidden)

  store.splice(i, 1)

  putHidden(store)
}

/**
 * Remove a collapsed div from the collapsed list
 *
 * @param {string} collapse The alert to remove from hidden list
 *
 */
let delCollapsed = (collapse) => {
  let store = getCollapsed()
  let i = store.indexOf(collapse)

  store.splice(i, 1)

  putCollapsed(store)
}

export {
  delCollapsed,
  delHidden,
  getHidden,
  getCollapsed,
  putCollapsed,
  putHidden,
  resetHidden
}
