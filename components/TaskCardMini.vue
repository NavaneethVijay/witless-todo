<template>
  <nuxt-link
    to="/tasks/view/10"
    class="task-card"
    :data-progress="task.progress"
    @click="isActive = !isActive"
  >
    <div class="task-card-content">
      <div class="task-icon">
        <i :class="task.icon" />
      </div>
      <div class="task-info">
        <div>
          <h3 class="task-title">
            {{ task.title }}
          </h3>
          <p class="task-date">
            {{ task.date }}
          </p>
        </div>
        <p class="task-status">
          In progress<i class="icofont-children-care" />
        </p>
      </div>
    </div>
    <div class="progress-bar" :style="{ width: task.progress }" />
  </nuxt-link>
</template>
<script>
export default {
  name: 'TaskCardMini',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>
