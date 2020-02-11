<template>
  <div class="main-page">
    <header class="app-header">
      <h1 class="app-title"><i class="icofont-deer-head" />Witless</h1>
      <i class="icofont-ui-user "></i>
    </header>
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
    <div class="fab-wrapper" @click="showPopper = !showPopper">
      <div class="fab-icon">
        <i class="icofont-plus" />
      </div>
    </div>
    <div class="bottom-sheet-main" :class="{ active: showPopper }">
      <TaskCardMini :task="activeTasks[0]" />
    </div>
  </div>
</template>
<script>
import TaskCardMini from '@/components/TaskCardMini'
export default {
  components: {
    TaskCardMini
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
  position: absolute;
  top: 100%;
  left: 0;
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  &.active {
    visibility: visible;
    position: absolute;
    top: 80px;
    left: 10px;
    z-index: 2;
    opacity: 1;
    width: calc(100% - 10px);
    height: calc(100% - 7%);
    .task-card {
      height: inherit;
    }
  }
}
</style>
