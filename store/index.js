export const actions = {
  nuxtClientInit({ dispatch }, { app }) {
    if (process.client) {
      let user = app.$fireAuth.currentUser
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch('user/updateUser', {
          uid,
          email,
          displayName,
          photoURL,
        })
        dispatch('user/getPendingTasks', {})
      }
    }
  },
}
