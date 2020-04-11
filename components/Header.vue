<template>
  <div>
    <header class="app-header">
      <NuxtLink class="app-title" to="/">
        <h1 class="app-title-text">
          <i class="icofont-deer-head" /><span>Witless</span>
        </h1>
      </NuxtLink>
    </header>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser'
    }),
    username() {
      return this.user ? this.user.displayName : ', there!'
    }
  },
  methods: {
    ...mapActions('user', {
      updateUser: 'updateUser'
    }),
    logout() {
      this.updateUser({
        currentUser: null
      })
      this.$fireAuth
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
          console.error(error)
        })

      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.dropdown-list {
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 9;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
  &-item {
    padding: 10px;
    &-divider {
      border-bottom: 1px solid #f2f2f2;
    }
  }
}
.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  display: inherit;
}
</style>
