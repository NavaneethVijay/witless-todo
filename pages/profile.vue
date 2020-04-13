<template>
  <div>
    <div class="page-title-main">
      <h1 class="page-title">Account</h1>
    </div>
    <v-card dark class="mt-4">
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-light">Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          light
          color="amber lighten-3"
          fab
          small
          @click="isEditing = !isEditing"
        >
          <v-icon v-if="isEditing" small>fas fa-compress-alt</v-icon>
          <v-icon v-else small>fas fa-pen-fancy</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          outlined
          v-model="profile.displayName"
          :disabled="!isEditing"
          color="amber lighten-3"
          label="Name"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="profile.email"
          disabled
          readonly
          color="amber lighten-3"
          label="Email"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        Your profile has been updated
      </v-snackbar>
    </v-card>
    <v-btn outlined color="red" class="mt-4" @click="logout">
      Logout
    </v-btn>
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
        email: ''
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
    logout() {
      this.$fireAuth
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
          console.error(error)
        })
    }
  }
}
</script>
