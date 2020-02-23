<template>
  <div class="add-new-main">
    <header class="form-header">
      <div class="form-title">
        <h2>Add new task</h2>
        <i class="icofont-list" />
      </div>
      <div class="close-box">
        <i class="icofont-close" />
      </div>
    </header>
    <form action="">
      <div class="input-control">
        <label>Add to list</label>
        <v-select :options="['foo', 'bar', 'baz']" />
      </div>
      <div class="input-control">
        <label for="taskname">Name</label>
        <input
          id="taskname"
          class="input"
          placeholder="Name"
          type="text"
          name="search"
        />
      </div>
      <div class="input-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="input"
          placeholder="Description"
          type="text"
          name="search"
        ></textarea>
      </div>

      <div class="input-control">
        <label for="duedate">Due date</label>
        <VueCtkDateTimePicker
          id="duedate"
          v-model="dueDate"
          format="MM-DD-YYYY"
          formatted="ll"
          :only-date="true"
        />
      </div>
      <div class="input-control">
        <input class="button block" type="submit" value="Add" />
      </div>
      <div class="input-control">
        <button class="button cancel block">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddNewTask',
  data() {
    return {
      dueDate: ''
    }
  }
}
</script>
<style lang="scss"></style>
