<template>
  <div class="auth-main">
    <div>
      <div class="logo-holder">
        <img src="/logo.svg" alt="witless" />
        <h1>Welcome to Witless</h1>
        <p>Task management made easy</p>
      </div>
      <div class="auth-buttons-main">
        <button
          class="button block sign-in"
          @click="triggerNetlifyIdentityAction('login')"
        >
          Sign In
        </button>
        <button
          class="button block sign-up"
          @click="triggerNetlifyIdentityAction('signup')"
        >
          Sign Up
        </button>
      </div>
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
      }
    }
  }
}
</script>
<style lang="scss">
.auth-main {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.logo-holder {
  text-align: center;
  img {
    width: 200px;
    height: auto;
    margin: auto;
    fill: #fff;
  }
  h1 {
    font-weight: normal;
  }
  p {
    opacity: 0.3;
  }
}
.auth-buttons-main {
  box-sizing: border-box;
  padding: 0 40px;
  margin-top: 40px;
}
</style>
