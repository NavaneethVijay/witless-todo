<template>
  <transition name="fade">
    <div class="add-new-main">
      <header class="form-header">
        <div class="form-title">
          <h2>Add new task</h2>
          <i class="icofont-list" />
        </div>
      </header>
      <form action="">
        <div class="input-control list-select">
          <label>Add to list</label>
          <v-select
            :searchable="false"
            placeholder="Default"
            :options="['foo', 'bar', 'baz']"
          />
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
        <div class="form-actions">
          <div class="input-control">
            <button class="button" type="submit">
              Create new task
            </button>
          </div>
          <div class="input-control">
            <nuxt-link to="/" class="button cancel block">
              Cancel
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'AddNewTask',
  data() {
    return {
      dueDate: ''
    }
  },
  transition: 'slide-down'
}
</script>
<style lang="scss" scoped>
$body-background: #0c0c0c;
$black-accent1: #1b1b1b;
$black-accent2: #272727;
$primary-accent: #14ffec;
.add-new-main {
  background: $black-accent1;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px;
  .form-actions {
    display: flex;
    align-items: center;
  }
  .form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: static;
    top: 0;
    background: $black-accent1;
    z-index: 1;
    .form-title {
      display: flex;
      align-items: center;
    }
    .close-box {
      background: #272727;
      padding: 5px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icofont-list {
      margin-left: 20px;
    }
  }
  .input-control {
    margin: 10px 0;
    box-sizing: border-box;
    padding: 10px 0px;
    label {
      display: block;
      margin-bottom: 10px;
    }
  }
  .input {
    border: none;
    border-radius: 8px;
    background: $black-accent2;
    border: 1px solid $black-accent2;
    color: white;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 50px;
    &:focus {
      border: 1px solid $primary-accent;
      outline: none;
    }
    &::placeholder {
      font-weight: bold;
    }
  }
  textarea {
    &#description {
      height: 100px;
    }
    &::placeholder {
      font-weight: bold;
    }
  }
  #duedate-wrapper {
    .field-input {
      border: none;
      border-radius: 8px;
      background: $black-accent2;
      border: 1px solid $black-accent2;
      color: white;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 50px;
      &:focus {
        border: 1px solid $primary-accent;
        outline: none;
      }
    }
  }
}
</style>
