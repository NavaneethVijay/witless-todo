<template>
  <div>
    <div class="page-title-main">
      <h1 class="page-title">Manage List</h1>
      <p>Organize your task by adding them to list.</p>
    </div>
    <v-subheader>My Lists</v-subheader>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="(list, i) in userLists" :key="i">
        <v-expansion-panel-header class="text-capitalize">
          <div>
            <v-icon small left> {{ icons[i] }} </v-icon> {{ list.name }}
          </div>
          <template v-slot:actions>
            <v-icon x-small color="#FFE082">fas fa-chevron-down</v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :to="'/lists/' + list.id"
              class="text-capitalize"
              small
              text
              flat
              color="amber lighten-3"
            >
              View tasks
            </v-btn>
            <!-- <v-btn icon flat color="red lighten-2">
              delete
            </v-btn> -->
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <template>
      <v-fab-transition>
        <v-btn
          v-show="hidden"
          light
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
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">New List</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="listname" label="Name" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createList()">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  transition: 'slide-down',
  async fetch({ store }) {
    await store.dispatch('user/fetchUserLists')
  },
  data: () => ({
    dialog: false,
    hidden: false,
    listname: '',
    icons: ['fas fa-igloo', 'fas fa-tag', 'fas fa-building', 'fas fa-ribbon']
  }),
  computed: {
    ...mapGetters({
      userLists: 'user/getUserLists'
    })
  },
  // created() {
  //   setTimeout(() => {
  //     this.hidden = true
  //   }, 1000)
  // },
  methods: {
    ...mapActions('user', {
      createNewList: 'createNewList'
    }),
    createList() {
      this.dialog = false
      this.createNewList(this.listname)
    }
  }
}
</script>
<style lang="scss">
.page-title-main {
  box-sizing: border-box;
  padding: 10px 0 30px 0;
}
</style>
