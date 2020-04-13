export const actions = {
  nuxtClientInit({ dispatch }, { app }) {
    if (process.client) {
      let user = app.$fireAuth.currentUser
      if (user) {
        dispatch('user/fetchCurrentUserDetails')
      }
    }
  }
}
