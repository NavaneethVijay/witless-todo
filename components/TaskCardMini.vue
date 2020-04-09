<template>
  <nuxt-link
    :to="'/tasks/view/' + task.id"
    class="task-card"
    :data-progress="task.progress"
    @click="isActive = !isActive"
  >
    <div class="task-card-content">
      <div class="task-icon">
        <i :class="task.icon ? task.icon : 'icofont-paper-plane icofont-1x'" />
      </div>
      <div class="task-info">
        <div>
          <h3 class="task-title">
            {{ task.name }}
          </h3>
          <p class="task-date">
            {{ task.due_date | moment('MMMM Do YYYY') }}
          </p>
        </div>
        <p class="task-status">
          {{ task.status }}<i class="icofont-children-care" />
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
