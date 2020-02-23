<template>
  <div>
    <header class="app-header">
      <NuxtLink class="app-title" to="/">
        <h1 class="app-title"><i class="icofont-deer-head" />Witless</h1>
      </NuxtLink>
      <DropdownMenu
        v-if="isLoggedIn"
        v-model="show"
        :right="true"
        :interactive="true"
      >
        <img class="user-image" v-if="user" :src="user.image" alt="" />
        <div slot="dropdown">
          <ul class="dropdown-list">
            <li class="dropdown-list-item">
              <nuxt-link to="/profile">Profile</nuxt-link>
            </li>
            <li class="dropdown-list-item">
              <nuxt-link to="/manage/lists">Manage Lists</nuxt-link>
            </li>
            <li class="dropdown-list-item-divider"></li>
            <li class="dropdown-list-item" @click="logout">Logout</li>
            <li class="dropdown-list-item">Settings</li>
          </ul>
        </div>
      </DropdownMenu>
    </header>
    <div v-if="isLoggedIn" class="search-main">
      <form action method="post">
        <input placeholder="Forgot something?" type="text" name="search" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import netlifyIdentity from 'netlify-identity-widget'

import DropdownMenu from '@innologica/vue-dropdown-menu'
export default {
  components: {
    DropdownMenu
  },
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
      return this.user ? this.user.username : ', there!'
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
      netlifyIdentity.logout()
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
