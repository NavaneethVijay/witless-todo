<template>
  <div class="task-view-page-main">
    <v-card v-if="currentTask" :disabled="updatingTask" :loading="updatingTask">
      <div class="task-view-main">
        <div class="task-content">
          <header class="task-header">
            <!-- <p class="task-date">
              Created on {{ currentTask.created | moment('MMMM Do YYYY') }}
            </p> -->
            <h1
              class="mb-4"
              :contenteditable="canEdit"
              @blur="updateTaskName"
              @dblclick="onEdit"
            >
              {{ currentTask.name }}
            </h1>
          </header>
          <div class="task-details-main">
            <p
              :contenteditable="canEdit"
              class="task-description mb-4"
              @blur="updateTaskDescription"
              @dblclick="onEdit"
            >
              {{ currentTask.description }}
            </p>
            <v-skeleton-loader
              v-if="!listLabelName"
              type="text"
            ></v-skeleton-loader>
            <div v-else class="task-labels">
              <nuxt-link :to="'/lists/' + currentTask.list">
                <span class="task-label">{{ listLabelName.name }}</span>
              </nuxt-link>
            </div>
            <p class="task-status mt-4">
              {{ currentTask.status }}<i class="icofont-children-care" />
            </p>
            <div class="task-actions">
              <v-switch
                v-model="status"
                color="amber lighten-3"
                inset
                label="Mark as done"
                @change="handleStatusChange"
              ></v-switch>
            </div>
          </div>
        </div>
      </div>
      <div class="task-footer">
        <div class="footer-actions-content">
          <p class="task-created">
            Due on {{ currentTask.due_date | moment('MMMM Do YYYY') }}
          </p>
          <span
            class="delete-icon"
            @click="deleteTask({ taskId: currentTask.id })"
            ><i class="icofont-bin"></i
          ></span>
        </div>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar">
      Sucessfully updated !
      <v-btn color="amber lighten-3" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  transition: 'slide-down',
  middleware: 'authenticated',
  data() {
    return {
      canEdit: false,
      listLabelName: '',
      writeSuccessful: false,
      readSuccessful: false,
      text: '',
      status: false,
      updatingTask: false,
      snackbar: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getUser',
      currentTask: 'user/getCurrentTask'
    })
  },
  async fetch({ route, store }) {
    await store.dispatch('user/getCurrentTask', {
      docId: route.params.id
    })
  },
  async mounted() {
    await this.getListLabel()
    this.status =
      this.currentTask.status.toLowerCase() == 'completed' ? true : false
  },
  methods: {
    ...mapActions('user', {
      deleteTask: 'deleteTask'
    }),
    async updateTaskName(evt) {
      if (this.canEdit) {
        this.updatingTask = true
        let src = evt.target.innerText
        await this.$store.dispatch('user/updateTaskDetails', {
          docId: this.currentTask.id,
          task: {
            name: src
          }
        })
        this.updatingTask = false
      }
    },
    async updateTaskDescription(evt) {
      if (this.canEdit) {
        this.updatingTask = true
        let src = evt.target.innerText
        await this.$store.dispatch('user/updateTaskDetails', {
          docId: this.currentTask.id,
          task: {
            description: src
          }
        })
        this.updatingTask = false
      }
    },
    onEdit() {
      this.canEdit = true
    },
    getListLabel() {
      const uid = this.currentUser.uid
      this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .doc(this.currentTask.list)
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
    },
    async handleStatusChange(item) {
      this.updatingTask = true
      await this.$store.dispatch('user/changeTaskStatus', {
        docId: this.currentTask.id,
        status: item
      })
      this.updatingTask = false
      this.snackbar = true
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  display: flex;
  justify-content: flex-end;
  .edit-icon {
    width: 20px;
    height: 20px;
    background: rgb(41, 41, 41);
    padding: 10px;
    box-sizing: content-box;
    border-radius: 50%;
    position: relative;
    transition: all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
    &:hover {
      transform: scale(1.2);
    }
    .icofont-ui-edit {
      position: absolute;
      top: 10px;
      left: 13px;
    }
  }
}
.task-details-main {
  box-sizing: border-box;
  padding: 10px 0;
  margin-top: 0;
}
.task-view-main {
  // border: 1px solid #1b1b1b;
  border-radius: 8px 8px 0 0;
  padding: 10px 20px;
  // background: #1b1b1b;
}
.task-description {
  font-size: 18px;
}
.task-actions {
  margin-top: 20px;
}
#task-status {
  margin-top: 5px;
}
.footer-actions-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 10px;
  background: #181717;
  border-radius: 0 0 8px 8px;

  .task-created {
    font-size: 14px;
    color: #949494;
  }
  .delete-icon {
    color: #f64b3c;
  }
}
</style>
