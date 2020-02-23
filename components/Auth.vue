<template>
  <div>
    <p>login value {{ isLoggedIn }}</p>
    <p>user details {{ user }}</p>
    <div v-if="isLoggedIn">
      <p>Hello {{ username }}</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
      </p>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
        <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import netlifyIdentity from 'netlify-identity-widget'

if (process.client) {
  netlifyIdentity.init({
    APIUrl: 'https://witless.netlify.com/.netlify/identity',
    logo: true // you can try false and see what happens
  })
}
export default {
  data: () => ({
    currentUser: null
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser'
    }),
    username() {
      return this.user ? this.user.username : ', there!'
    }
  },
  methods: {
    ...mapActions('user', {
      updateUser: 'updateUser'
    }),
    triggerNetlifyIdentityAction(action) {
      if (action == 'login' || action == 'signup') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, (user) => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type
          }
          this.updateUser({
            currentUser: this.currentUser
          })
          netlifyIdentity.close()
        })
      } else if (action == 'logout') {
        this.currentUser = null
        this.updateUser({
          currentUser: this.currentUser
        })
        netlifyIdentity.logout()
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>
