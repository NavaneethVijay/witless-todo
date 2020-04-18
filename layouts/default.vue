<template>
  <v-app dark>
    <div id="scroll-area-1" class="layout-main">
      <Loader />
      <Header class="header" />
      <v-container>
        <div class="router-content">
          <nuxt class="nuxt-content-main" :class="{ auth: isLoggedIn }" />
        </div>
        <v-btn
          v-if="isLoggedIn"
          style="z-index: 10; bottom: 70px"
          fixed
          bottom
          right
          to="/tasks/add"
          :light="$vuetify.theme.dark"
          color="primary"
          fab
        >
          <v-icon small color="black">fas fa-plus</v-icon>
        </v-btn>
      </v-container>
      <BottomSheet v-if="isLoggedIn" />
    </div>
    <v-footer fixed v-if="!isLoggedIn">
      <v-col class="text-center" cols="12">
        Witless &copy; {{ new Date().getFullYear() }}. Built with
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"
          >NuxtJs</a
        >
        and
        <a
          href="https://vuetifyjs.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Vuetify</a
        >
      </v-col>

      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import BottomSheet from '@/components/BottomSheet'
export default {
  components: {
    Header,
    Loader,
    BottomSheet,
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Tasks', icon: 'fas fa-tasks', link: '/' },
        { title: 'My Lists', icon: 'fas fa-tag', link: '/lists' },
        { title: 'Profile', icon: 'fas fa-user', link: '/profile' },
      ],
      mini: true,
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
    }),
  },
}
</script>

<style lang="scss">
.layout-main {
  margin-bottom: 50px;
  .container {
    @media (max-width: 1024px) {
      padding: 0;
    }
  }
}
.router-content {
  display: flex;
}
.nuxt-content-main {
  position: relative;
  padding: 10px;
  margin: 10px;
  width: 100%;
  &.auth {
    @media (min-width: 1024px) {
      max-width: 50%;
      margin: auto;
    }
  }
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
