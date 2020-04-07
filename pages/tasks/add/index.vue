<template>
  <transition name="fade">
    <div class="add-new-main">
      <header class="form-header">
        <div class="form-title">
          <h2>Add new task</h2>
          <i class="icofont-list" />
        </div>
      </header>
      <form method="POST" @submit="createTask">
        <div class="input-control due-date-wrapper">
          <label for="duedate">Due date</label>
          <VueCtkDateTimePicker
            id="duedate"
            v-model="form.due_date"
            format="MM-DD-YYYY"
            formatted="ll"
            :inline="true"
            :only-date="true"
            :dark="true"
            color="#272727"
          />
        </div>
        <div class="input-control list-select">
          <label>Add to list</label>
          <v-select
            required
            v-model="form.list"
            :searchable="false"
            placeholder="Default"
            :options="['default']"
          />
        </div>
        <div class="input-control">
          <label for="taskname">Name</label>
          <input
            required
            v-model="form.name"
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
            required
            v-model="form.description"
            id="description"
            class="input"
            placeholder="Description"
            type="text"
            name="search"
          ></textarea>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddNewTask',
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser',
    }),
  },
  data() {
    return {
      dueDate: '',
      form: {
        list: 'default',
        name: '',
        description: '',
        due_date: '',
        status: 'pending',
      },
    }
  },
  transition: 'slide-down',
  methods: {
    ...mapActions('user', {
      addNewTask: 'addNewTask',
    }),
    async createTask(e) {
      e.preventDefault()
      await this.addNewTask({ task: this.form, list: 'default' })
      this.form.name = ''
      this.form.description = ''
      this.form.due_date = ''
    },
  },
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
  padding: 10px 20px;
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
    padding: 20px 0;
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
      // font-weight: bold;
      font-family: 'Nunito', sans-serif;
    }
  }
  textarea {
    &#description {
      height: 100px;
    }
    &::placeholder {
      font-family: 'Nunito', sans-serif;
      // font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
$primary-accent: #14ffec;
$black-accent2: #272727;
#duedate-wrapper {
  .field-input {
    border: none;
    border-radius: 8px;
    background-color: $black-accent2;
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
</style>
