<template>
  <div class="auth-main">
    <div>
      <div class="logo-holder">
        <img src="/logo.svg" alt="witless" />
      </div>
      <div class="app-main-title">
        <h1>Plan your day with Witless</h1>
      </div>
      <div class="app-info-main">
        <p>
          Whether you're planning a holiday, creating a shopping list or
          managing multiple work projects.
        </p>
      </div>
      <div class="auth-buttons-main">
        <button class="button  sign-in" @click="googleSignUp">
          Continue with google
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import login from '@/mixins/login'
export default {
  mixins: [login],
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
  }
}
</script>
<style lang="scss">
.auth-main {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #1b1b1b;
  max-width: 1440px;
  margin: auto;
  border-radius: 20px;
  padding: 1.8rem;
  border-bottom: 2px solid #14ffec;
  @media (min-width: 1024px) {
    padding: 5% 0;
  }
}
.logo-holder {
  img {
    width: 100px;
    height: 100px;
    margin: auto;
    fill: #fff;
  }
}
.app-main-title {
  h1 {
    font-size: 2.5rem;
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }
}
.app-info-main {
  p {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 100;
    line-height: 30px;
    @media (min-width: 1024px) {
      font-size: 1.4rem;
      max-width: 60%;
    }
  }
}
.auth-buttons-main {
  box-sizing: border-box;
  padding: 0;
  margin-top: 40px;
  @media (min-width: 1024px) {
    button {
      cursor: pointer;
    }
  }
}
</style>
