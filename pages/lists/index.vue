<template>
  <div>
    <div class="page-title-main">
      <h1 class="page-title">Manage List</h1>
    </div>
    <v-list flat>
      <v-subheader>My Lists</v-subheader>
      <v-list-item-group color="#14ffec">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <template>
        <v-fab-transition>
          <v-btn
            light
            v-show="hidden"
            color="#FECB80"
            absolute
            top
            right
            fab
            @click="
              () => {
                dialog = true
              }
            "
          >
            <v-icon small>fas fa-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
    </v-list>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">New List</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  transition: 'slide-down',
  data: () => ({
    dialog: false,
    hidden: false,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' }
    ]
  }),
  created() {
    setTimeout(() => {
      this.hidden = true
    }, 1000)
  }
}
</script>
<style lang="scss">
.page-title-main {
  box-sizing: border-box;
  padding: 10px 0 30px 0;
}
</style>
