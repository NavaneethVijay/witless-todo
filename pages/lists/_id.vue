<template>
  <div>
    <p class="task-list amber--text text--lighten-3">Task List</p>
    <v-skeleton-loader
      class="pt-2"
      height="48px"
      v-if="!listLabelName"
      type="chip"
    ></v-skeleton-loader>
    <h1 v-else class="text-capitalize list-label-name ">
      {{ listLabelName.name }}
    </h1>
    <div class="task-list-main mt-4">
      <div
        v-if="getCurrentListTasks && getCurrentListTasks.length > 0"
        class="task-sections"
      >
        <div class="task-in-progress-list">
          <TaskCardMini
            v-for="(task, index) in getCurrentListTasks"
            :key="index"
            :task="task"
          />
        </div>
      </div>
      <div v-else class="">
        <p>Looks like you haven't created any tasks</p>
        <v-btn to="/tasks/add" light color="amber lighten-3" class="mt-4">
          <v-icon left small>
            fas fa-plus
          </v-icon>
          Add new task
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TaskCardMini from '@/components/TaskCardMini'

export default {
  transition: 'slide-down',
  async fetch({ store, route }) {
    await store.dispatch('user/fetchListTasks', { listId: route.params.id })
  },
  data: () => ({
    dialog: false,
    hidden: false,
    listname: '',
    listLabelName: ''
  }),
  components: {
    TaskCardMini
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getUser',
      getCurrentListTasks: 'user/getCurrentListTasks'
    })
  },
  async mounted() {
    await this.getListLabel()
  },
  methods: {
    getListLabel() {
      const uid = this.currentUser.uid
      this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.listLabelName = doc.data()
          } else {
            this.listLabelName = 'default'
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    }
  }
}
</script>
