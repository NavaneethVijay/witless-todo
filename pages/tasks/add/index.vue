<template>
  <transition name="fade">
    <div>
      <div class="page-title-main">
        <h1 class="page-title">Create</h1>
        <h1>New Task</h1>
      </div>
      <div class="add-new-main">
        <form method="POST" @submit="createTask">
          <v-text-field
            id="taskname"
            v-model="form.name"
            color="#FFE082"
            required
            label="Task Name"
            type="text"
            outlined
          ></v-text-field>
          <v-dialog
            v-model="menu1"
            :close-on-content-click="true"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                color="#FFE082"
                outlined
                :value="computedDateFormattedMomentjs"
                clearable
                label="Due Date"
                readonly
                v-on="on"
                @click:clear="form.due_date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.due_date"
              @change="menu1 = false"
            ></v-date-picker>
          </v-dialog>
          <v-select
            v-model="form.list"
            color="#FFE082"
            :items="userLists"
            label="Add to list"
            item-text="name"
            outlined
            item-value="id"
          ></v-select>
          <div class="input-control list-select">
            <label>Choose an Icon</label>
            <div class="icon-wrapper">
              <i
                v-for="(icon, index) in icons"
                :key="index"
                class="icon-single"
                :class="icon"
                @click="
                  () => {
                    form.icon = icon
                  }
                "
              />
            </div>
          </div>

          <v-textarea
            id="description"
            v-model="form.description"
            placeholder="Description"
            color="#FFE082"
            outlined
            required
          ></v-textarea>

          <v-btn light color="amber lighten-3" large block type="submit">
            Create task
          </v-btn>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'AddNewTask',
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus',
      user: 'user/getUser',
      userLists: 'user/getUserLists'
    }),
    computedDateFormattedMomentjs() {
      return this.form.due_date
        ? moment(this.form.due_date).format('dddd, MMMM Do YYYY')
        : ''
    }
  },
  data() {
    return {
      dueDate: '',
      menu1: false,
      form: {
        list: 'default',
        name: '',
        description: '',
        due_date: '',
        status: 'pending',
        icon: 'icofont-paper-plane icofont-1x',
        created: '',
        progress: '15%'
      },
      icons: [
        'icofont-paper-plane icofont-1x',
        'icofont-pine icofont-1x',
        'icofont-golf-cart icofont-1x',
        'icofont-bathtub icofont-1x'
      ]
    }
  },
  transition: 'slide-down',
  methods: {
    ...mapActions('user', {
      addNewTask: 'addNewTask'
    }),
    async createTask(e) {
      e.preventDefault()
      this.form.created = moment(new Date()).format('dddd, MMMM Do YYYY')
      await this.addNewTask({ task: this.form, list: 'default' })
      this.form.name = ''
      this.form.description = ''
      this.form.due_date = ''
      this.$router.push('/')
    },
    listHandler(item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
$body-background: #0c0c0c;
$black-accent1: #1b1b1b;
$black-accent2: #272727;
$primary-accent: #ffe082;
.add-new-main {
  // background: $black-accent1;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 20px 0;
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
  .icon-wrapper {
    .icon-single {
      font-size: 2rem;
      margin-right: 10px;
      &.is__active {
        color: $primary-accent;
      }
    }
  }
}
</style>
<style lang="scss">
$primary-accent: #ffe082;
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
