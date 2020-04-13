<template>
  <div>
    <div class="page-title-main">
      <h1 class="page-title">Account</h1>
    </div>
    <v-card flat>
      <v-avatar class="ma-3 mb-0" size="125" tile>
        <v-img :src="profile.photoURL"></v-img>
      </v-avatar>
      <v-card-title class="headline">
        {{ profile.displayName }}
      </v-card-title>
      <v-card-subtitle>
        {{ profile.email }}
      </v-card-subtitle>
    </v-card>
    <v-list class="mt-4">
      <v-subheader>Settings</v-subheader>
      <v-list-item>
        <v-list-item-content class="pl-2">
          <v-switch
            color="amber lighten-3"
            v-model="$vuetify.theme.dark"
            hide-details
            inset
            label="Use Dark theme"
          ></v-switch>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  transition: 'slide-down',
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      profile: {
        displayName: '',
        email: '',
        photoURL: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  created() {
    this.profile = { ...this.user }
  },

  methods: {
    async save() {
      this.isEditing = !this.isEditing
      delete this.profile.uid
      await this.$store.dispatch('user/updateUserDetails', this.profile)
      this.hasSaved = true
    },
    async logout() {
      await this.$fireAuth
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$store.commit('user/logoutUser')
        })
        .catch(function(error) {
          // An error happened.
          console.error(error)
          this.$store.commit('user/logoutUser')
        })
      this.$store.commit('user/logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
