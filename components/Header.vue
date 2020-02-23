<template>
  <div>
    <header class="app-header">
      <NuxtLink class="app-title" to="/">
        <h1 class="app-title"><i class="icofont-deer-head" />Witless</h1>
      </NuxtLink>
      <DropdownMenu v-model="show" :right="true" :interactive="true">
        <i class="icofont-ui-user" />
        <div slot="dropdown">
          <ul class="dropdown-list">
            <li class="dropdown-list-item">
              <nuxt-link to="/profile">Profile</nuxt-link>
            </li>
            <li class="dropdown-list-item">
              <nuxt-link to="/manage/lists">Manage Lists</nuxt-link>
            </li>
            <li class="dropdown-list-item-divider"></li>
            <li class="dropdown-list-item">Settings</li>
          </ul>
        </div>
      </DropdownMenu>
    </header>
    <div class="search-main">
      <form action method="post">
        <input id placeholder="Forgot something?" type="text" name="search" />
      </form>
    </div>
  </div>
</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'
export default {
  components: {
    DropdownMenu
  },
  data() {
    return {
      show: false
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
</style>
