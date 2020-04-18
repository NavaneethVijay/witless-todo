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
        <div class="google-btn" @click="googleSignUp">
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p class="btn-text"><b>Continue with google</b></p>
        </div>
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
    currentUser: null,
  }),
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
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.google-btn {
  width: max-content;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  @media (min-width: 1024px) {
    cursor: pointer;
  }
  display: flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  .google-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
    cursor: inherit;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    padding: 0 20px;
    cursor: inherit;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

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
