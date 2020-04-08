import { mapActions, mapMutations } from 'vuex'
import firebase from 'firebase'
export default {
  methods: {
    ...mapMutations('ui', {
      showLoader: 'setLoader',
      hideLoader: 'unsetLoader',
    }),
    ...mapActions('user', {
      createNewList: 'createNewList',
      getTasks: 'getTasks',
    }),
    async googleSignUp() {
      this.showLoader()
      var provider = new firebase.auth.GoogleAuthProvider()
      this.$fireAuth
        .signInWithPopup(provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken

          // Check if  user exists in firestore
          const { uid } = result.user
          var docRef = this.$fireStore.collection('users').doc(uid)
          docRef
            .get()
            .then(async (doc) => {
              if (!doc.exists) {
                // The signed-in user info. Create new user on firestore
                const { uid, email, displayName, photoURL } = result.user

                this.$fireStore
                  .collection('users')
                  .doc(uid)
                  .set({
                    email,
                    photoURL,
                    displayName,
                  })
                  .then(async () => {
                    await this.createNewList('default')
                  })
              }
            })
            .catch((error) => {
              this.hideLoader()
              console.log('Error getting document:', error)
            })
          await this.getTasks({ status: 'pending' })
          this.hideLoader()
        })
        .catch((error) => {
          this.hideLoader()
          console.error(error)
        })
    },
  },
}
