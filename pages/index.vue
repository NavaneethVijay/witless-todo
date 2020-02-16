<template>
  <div class="main-page">
    <Header class="header" :class="{ active: showPopper }" />
    <div class="filters">
      <div class="content-main" :class="{ active: showPopper }">
        <div class="input-field">
          <input id="active1" type="checkbox" name="active" />
          <label class="label" for="active1">Progress</label>
        </div>
        <div class="input-field">
          <input id="active3" type="checkbox" name="active" />
          <label class="label" for="active3">Completed</label>
        </div>
        <div class="input-field">
          <input id="active2" type="checkbox" name="active" />
          <label class="label" for="active2">My list</label>
        </div>
      </div>
    </div>
    <div class="task-list-main" :class="{ active: showPopper }">
      <div class="task-sections">
        <div class="task-list-title">
          <h4>In Progress <i class="icofont-children-care" /></h4>
        </div>
        <div class="task-in-progress-list">
          <TaskCardMini
            v-for="(task, index) in activeTasks"
            :key="index"
            :task="task"
          />
        </div>
      </div>
      <div class="task-sections">
        <div class="task-list-title">
          <h4>Completed <i class="icofont-check" /></h4>
        </div>
        <div class="task-in-progress-list">
          <TaskCardMini
            v-for="(task, index) in activeTasks"
            :key="index"
            :task="task"
          />
        </div>
      </div>
    </div>
    <div
      class="fab-wrapper"
      :class="{ active: showPopper }"
      @click="showPopper = !showPopper"
    >
      <div class="fab-icon">
        <i class="icofont-plus" />
      </div>
    </div>
    <div class="bottom-sheet-main" :class="{ active: showPopper }">
      <AddNewTask />
    </div>
  </div>
</template>
<script>
import TaskCardMini from '@/components/TaskCardMini'
import AddNewTask from '@/components/AddNewTask'
import Header from '@/components/Header'
export default {
  components: {
    TaskCardMini,
    Header,
    AddNewTask
  },
  data() {
    return {
      clicked: false,
      showPopper: false,
      activeTasks: [
        {
          icon: 'icofont-paper-plane icofont-1x',
          title: 'Business trip to newyork',
          date: ' March, 29th',
          progress: '89%'
        },
        {
          icon: 'icofont-pine icofont-1x',
          title: 'Identify resources to be monitored',
          date: 'June, 29th',
          progress: '10%'
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          title: 'Install production servers and prerequisite software',
          date: ' March, 29th',
          progress: '70%'
        },
        {
          icon: 'icofont-paper-plane icofont-1x',
          title: 'Customize the health monitor',
          date: ' March, 29th',
          progress: '29%'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
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
