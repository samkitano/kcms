import * as actions from './actions'
import mutations from './mutations'

const admin = kitano.admin

export default function () {
  return {
    actions,
    mutations,
    state: {
      admin,
      collapsedWindows: [],
      currentProfileOriginalData: {},
      hiddenAlerts: []
    }
  }
}
