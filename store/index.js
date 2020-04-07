import { firebase } from '~/plugins/firebase'

export const actions = {
  nuxtClientInit({ dispatch }) {
    let user = firebase.auth().currentUser
    if (user) {
      const { uid, email, displayName, photoURL } = user
      dispatch('user/updateUser', {
        uid,
        email,
        displayName,
        photoURL,
      })
    }
  },
}
