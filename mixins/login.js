import { mapActions, mapMutations } from 'vuex'
import firebase from 'firebase'
export default {
  methods: {
    ...mapMutations('ui', {
      showLoader: 'setLoader',
      hideLoader: 'unsetLoader'
    }),
    ...mapActions('user', {
      updateUser: 'updateUser',
      createNewList: 'createNewList',
      getTasks: 'getTasks'
    }),
    async googleSignUp() {
      this.showLoader()
      var provider = new firebase.auth.GoogleAuthProvider()
      this.$fireAuth
        .signInWithPopup(provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken

          // Check if  user exists in firestore
          const { uid } = result.user
          var docRef = await this.$fireStore.collection('users').doc(uid)
          docRef
            .get()
            .then(async (doc) => {
              // The signed-in user info. Create new user on firestore
              const { uid, email, displayName, photoURL } = result.user

              this.updateUser({
                uid,
                email,
                displayName,
                photoURL
              })

              if (!doc.exists) {
                this.$fireStore
                  .collection('users')
                  .doc(uid)
                  .set({
                    email,
                    photoURL,
                    displayName
                  })
                  .then(async () => {
                    await this.createNewList('default')
                    this.createNewList('important')
                    this.createNewList('work')
                    this.createNewList('family')
                  })
              }
              await this.getTasks({ status: 'pending' })
              await this.getTasks({ status: 'completed' })
            })
            .catch((error) => {
              this.hideLoader()
              console.log('Error getting document:', error)
            })

          this.hideLoader()
        })
        .catch((error) => {
          this.hideLoader()
          console.error(error)
        })
    }
  }
}
