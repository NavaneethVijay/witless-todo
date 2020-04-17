<template>
  <v-app dark>
    <v-system-bar height="5px" color="primary"></v-system-bar>
    <div class="layout-main" id="scroll-area-1">
      <Loader />
      <Header v-if="isLoggedIn" class="header" />
      <v-container>
        <div class="router-content">
          <v-card height="max-content" class="hidden-sm-and-down">
            <v-navigation-drawer
              :light="$vuetify.theme.dark"
              permanent
              floating
              color="primary"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Witless
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Plan your day with Witless
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense nav>
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  :to="item.link"
                  link
                >
                  <v-list-item-icon>
                    <v-icon small>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>

          <nuxt class="nuxt-content-main" />
        </div>
        <v-btn
          style="z-index: 10; bottom: 70px"
          fixed
          bottom
          right
          to="/tasks/add"
          :light="$vuetify.theme.dark"
          color="primary"
          fab
        >
          <v-icon small>fas fa-plus</v-icon>
        </v-btn>
      </v-container>
      <BottomSheet class="hidden-sm-and-up" v-if="isLoggedIn" />
    </div>
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
    BottomSheet
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Tasks', icon: 'fas fa-tasks', link: '/' },
        { title: 'My Lists', icon: 'fas fa-tag', link: '/lists' },
        { title: 'Profile', icon: 'fas fa-user', link: '/profile' }
      ],
      mini: true
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus'
    })
  }
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
  @media (min-width: 1024px) {
    max-width: 50%;
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
