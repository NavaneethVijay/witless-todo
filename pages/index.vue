<template>
  <div class="main-page">
    <div v-if="isLoggedIn">
      <div class="user-info">
        <h1>Hi, {{ username }}</h1>
      </div>
      <!-- <div class="filters">
        <div class="content-main">
          <div class="input-field">
            <input id="active1" type="checkbox" name="active" />
            <label class="label" for="active1">Pending</label>
          </div>
          <div class="input-field">
            <input id="active3" type="checkbox" name="active" />
            <label class="label" for="active3">Progress</label>
          </div>
          <div class="input-field">
            <input id="active2" type="checkbox" name="active" />
            <label class="label" for="active2">Completed</label>
          </div>
        </div>
      </div> -->
      <div class="task-list-main">
        <div
          v-if="pendingTasks && pendingTasks.length > 0"
          class="task-sections"
        >
          <div class="task-list-title">
            <h4>Pending <i class="icofont-check" /></h4>
          </div>
          <div class="task-in-progress-list">
            <TaskCardMini
              v-for="(task, index) in pendingTasks"
              :key="index"
              :task="task"
            />
          </div>
        </div>
        <div
          v-if="progressTasks && progressTasks.length > 0"
          class="task-sections"
        >
          <div class="task-list-title">
            <h4>Completed <i class="icofont-check" /></h4>
          </div>
          <div class="task-in-progress-list">
            <TaskCardMini
              v-for="(task, index) in progressTasks"
              :key="index"
              :task="task"
            />
          </div>
          <!-- <div class="task-slider">
            <div v-for="(set, a) in progressTasks" :key="a" class="task-slide">
              <div
                v-for="(tasks, index) in set"
                :key="index"
                class="task-in-progress-list"
              >
                <TaskCardMini
                  v-for="(task, i) in tasks"
                  :key="i"
                  :task="task"
                />
              </div>
            </div>
          </div> -->
        </div>

        <!-- <nuxtLink to="/tasks/add" class="fab-wrapper">
        <div class="fab-icon">
          <i class="icofont-plus" />
        </div>
      </nuxtLink> -->
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <Auth />
      <div class="witless-more-info">
        <div class="info-item">
          <i class="icofont-tasks-alt icofont-2x"></i>
          <h2>Task</h2>
          <p>
            Turn complex actions simpler by converting them to small tasks.
          </p>
        </div>

        <div class="info-item">
          <i class="icofont-list icofont-2x"></i>
          <h2>Lists</h2>
          <p>
            Group all related tasks in an easiliy accessible list.
          </p>
        </div>

        <div class="info-item">
          <i class="icofont-thunder-light icofont-2x"></i>
          <h2>Install app</h2>
          <p>
            Witless is a <b>Progressive Web App</b>, the next generation of
            mobile applications.
          </p>
        </div>

        <div class="info-item">
          <i class="icofont-chart-histogram icofont-2x"></i>
          <h2>Statistics</h2>
          <p>
            Schedule your reports straight to your mail.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TaskCardMini from '@/components/TaskCardMini'
import Auth from '@/components/Auth'
export default {
  components: {
    TaskCardMini,
    Auth,
  },
  fetch({ store }) {
    if (store.state.user.isAuth) {
      store.dispatch('user/getTasks', { status: 'pending' })
      store.dispatch('user/getTasks', { status: 'completed' })
    }
  },
  data() {
    return {
      clicked: false,
      showPopper: false,
      hidden: false,
      activeTasks: [
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Business trip to newyork',
          due_date: ' March, 29th',
          progress: '89%',
          status: 'pending',
        },
        {
          icon: 'icofont-pine icofont-1x',
          name: 'Identify resources to be monitored',
          due_date: 'June, 29th',
          progress: '10%',
          status: 'pending',
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Install production servers and prerequisite software',
          due_date: ' March, 29th',
          progress: '70%',
          status: 'pending',
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Customize the health monitor',
          due_date: ' March, 29th',
          progress: '29%',
          status: 'pending',
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Business trip to newyork',
          due_date: ' March, 29th',
          progress: '89%',
          status: 'pending',
        },
        {
          icon: 'icofont-pine icofont-1x',
          name: 'Identify resources to be monitored',
          due_date: 'June, 29th',
          progress: '10%',
          status: 'pending',
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Install production servers and prerequisite software',
          due_date: ' March, 29th',
          progress: '70%',
          status: 'pending',
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          name: 'Customize the health monitor',
          due_date: ' March, 29th',
          progress: '29%',
          status: 'pending',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser',
      pendingTasks: 'user/getPendingTasks',
      progressTasks: 'user/getProgressTasks',
    }),
    username() {
      return this.user.displayName
    },
  },
}
</script>
<style lang="scss">
.task-sections {
  overflow: hidden;
}
.task-slider {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  .task-slide {
    flex-basis: 100%;
    width: 100%;
    min-width: 100%;
    margin-right: 10px;
  }
}
.bottom-sheet-main {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 100%;
  left: 0;
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  background: #1b1b1b;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  overflow-y: scroll;
  &.active {
    visibility: visible;
    position: fixed;
    top: 20%;
    left: 10px;
    bottom: 0;
    z-index: 5;
    opacity: 1;
    width: calc(100% - 20px);
    // height: calc(100% - 7%);
    .task-card {
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
.user-info {
  margin: 20px 0 30px 0;
  h1 {
    font-weight: 400;
  }
}
</style>

<style lang="scss" scoped>
.witless-more-info {
  margin: 40px auto auto auto;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 1024px) {
    max-width: 70%;
    margin: 80px auto auto auto;
  }
  .info-item {
    padding: 20px;
    margin-bottom: 20px;
    i {
      color: var(--v-primary-base);
    }
    h2 {
      margin: 20px 0;
    }
    p {
      font-weight: 100;

      font-size: 1.1rem;
    }
    @media (min-width: 1024px) {
      &:nth-child(odd) {
        flex-basis: 60%;
        p {
          max-width: 50%;
        }
      }
      &:nth-child(even) {
        flex-basis: 40%;
        p {
          max-width: 70%;
        }
      }
    }
  }
}
</style>
