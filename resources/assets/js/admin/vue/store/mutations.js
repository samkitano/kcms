// import { find } from 'lodash'

let mutations = {
  /**
   * Collapse a collapsible div
   * The identifier is the (hopefully unique) translated content
   *
   * @param {Object} state The store state object
   * @param {String} str   The unique identifier of the collapsible window
   * @constructor
   */
  COLLAPSE_WINDOW (state, str) {
    state.collapsedWindows.push(str)
  },
  /**
   * Expand a collapsed div
   * The identifier is the (hopefully unique) translated content
   *
   * @param {Object} state The store state object
   * @param {String} str   The unique identifier of the collapsed window
   * @constructor
   */
  EXPAND_WINDOW (state, str) {
    state.collapsedWindows.splice(state.hiddenAlerts.indexOf(str), 1)
  },

  /**
   * Hide an alert "permanently"
   * Alerts can be manually restored
   * As with collapsible windows, the identifier is the translated content
   *
   * @param {Object} state The store state object
   * @param {String} str   The alert's unique identifier
   * @constructor
   */
  HIDE_ALERT (state, str) {
    state.hiddenAlerts.push(str)
  },
  /**
   * Restore a hidden alert
   *
   * @param {Object} state The store state object
   * @param {String} str   The alert's unique identifier
   * @constructor
   */
  RESTORE_ALERT (state, str) {
    state.hiddenAlerts.splice(state.hiddenAlerts.indexOf(str), 1)
  },
  /**
   * Restore all hidden alerts
   *
   * @param {Object} state The store state object
   * @constructor
   */
  RESTORE_ALL_ALERTS (state) {
    state.hiddenAlerts = []
  },

  /**
   * Stores the original profile of the authenticated user
   *
   * @param {Object} state The store state object
   * @param {Object} data  The profile data
   * @constructor
   */
  SET_ORIGINAL_PROFILE (state, data) {
    state.currentProfileOriginalData = data
  }
}

export default mutations
