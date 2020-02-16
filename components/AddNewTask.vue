<template>
  <div class="add-new-main">
    <header class="form-header">
      <div class="form-title">
        <h2>Add new task</h2>
        <i class="icofont-list"></i>
      </div>
      <div class="close-box">
        <i class="icofont-close"></i>
      </div>
    </header>
    <form action="">
      <div class="input-control">
        <label>Add to list</label>
        <v-select :options="['foo', 'bar', 'baz']"></v-select>
      </div>
      <div class="input-control">
        <label for="taskname">Name</label>
        <input
          class="input"
          placeholder="Name"
          type="text"
          name="search"
          id="taskname"
        />
      </div>
      <div class="input-control">
        <label for="description">Description</label>
        <input
          class="input"
          placeholder="Description"
          type="text"
          name="search"
          id="description"
        />
      </div>

      <div class="input-control">
        <label for="duedate">Due date</label>
        <VueCtkDateTimePicker
          v-model="dueDate"
          format="MM-DD-YYYY"
          formatted="ll"
          id="duedate"
          :only-date="true"
        />
      </div>
      <div class="input-control">
        <input class="button block" type="submit" value="Add" />
      </div>
      <div class="input-control">
        <button class="button cancel block">Cancel</button>
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
