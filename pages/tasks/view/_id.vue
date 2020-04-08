<template>
  <div v-if="currentTask">
    <div class="task-view-main">
      <div class="task-content">
        <header class="task-header">
          <p class="task-date">Due on {{ currentTask.due_date }}</p>
          <h1>{{ currentTask.name }}</h1>
          <p class="task-status">
            {{ currentTask.status }}<i class="icofont-children-care" />
          </p>
        </header>
        <div class="task-labels">
          <span class="task-label">{{ currentTask.list }}</span>
        </div>
        <div class="task-details-main">
          <p class="task-description">
            {{ currentTask.description }}
          </p>
          <div class="task-actions">
            <label for="task-status" class="task-date">Status</label>
            <v-select
              id="task-status"
              :searchable="false"
              placeholder="Progress"
              :options="['Progress', 'Completed']"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="task-footer">
      <footer>
        <div class="footer-actions-content">
          <p class="task-created">Created on {{ currentTask.created }}</p>
          <span
            @click="deleteTask({ taskId: currentTask.id })"
            class="delete-icon"
            ><i class="icofont-bin"></i
          ></span>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  transition: 'slide-down',
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      text: '',
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getUser',
      currentTask: 'user/getCurrentTask',
    }),
  },
  async fetch({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    await store.dispatch('user/getCurrentTask', {
      docId: route.params.id,
    })
  },
  methods: {
    ...mapActions('user', {
      deleteTask: 'deleteTask',
    }),
  },
}
</script>
<style lang="scss" scoped>
.task-details-main {
  box-sizing: border-box;
  padding: 10px 0;
  margin-top: 20px;
}
.task-view-main {
  border: 1px solid #1b1b1b;
  border-radius: 8px 8px 0 0;
  padding: 30px 20px;
  background: #1b1b1b;
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
