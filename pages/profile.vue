<template>
  <div>
    <div class="page-title-main">
      <h1 class="page-title">Manage Profile</h1>
    </div>
    <v-card dark>
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-light">Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn light color="#14ffec" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing" small>mdi-close</v-icon>
          <v-icon v-else small>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Name"
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
  </div>
</template>

<script>
export default {
  transition: 'slide-down',
  data() {
    return {
      hasSaved: false,
      isEditing: null
    }
  },

  methods: {
    save() {
      this.isEditing = !this.isEditing
      this.hasSaved = true
    }
  }
}
</script>
