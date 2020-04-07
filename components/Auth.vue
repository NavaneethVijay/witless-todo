<template>
  <div class="auth-main">
    <div>
      <div class="logo-holder">
        <img src="/logo.svg" alt="witless" />
        <h1>Welcome to Witless</h1>
        <p>Task management made easy</p>
      </div>
      <div class="auth-buttons-main">
        <button class="button block sign-in" @click="googleSignUp">
          Continue with google
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import login from '@/mixins/login'
export default {
  data: () => ({
    currentUser: null,
  }),
  mixins: [login],
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser',
    }),
    username() {
      return this.user ? this.user.username : ', there!'
    },
  },
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
