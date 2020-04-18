export const state = () => ({
  user: null,
  isAuth: false,
  lists: [],
  tasks: {
    pending: [],
    completed: []
  },
  currentTask: null,
  currentListTasks: []
})

export const getters = {
  getUserStatus: (state) => !!state.isAuth,
  getUser: (state) => state.user,
  getAllTasks: (state) => state.tasks,
  getUserLists: (state) => state.lists,
  getPendingTasks: (state) => state.tasks.pending,
  getProgressTasks: (state) => {
    let temptask = [...state.tasks.completed]
    let chunked = {}
    let initialChunk = 0
    let chunk = 4
    temptask.forEach((item, i) => {
      chunked[i] = []
      chunked[i].push(temptask.splice(initialChunk, chunk))
    })
    return state.tasks.completed
    // return Object.values(chunked)
  },
  getCurrentTask: (state) => state.currentTask,
  getCurrentListTasks: (state) => state.currentListTasks
}

export const mutations = {
  setUser(state, currentUser) {
    state.isAuth = true
    const { uid, email, displayName, photoURL } = currentUser
    state.user = { uid, email, displayName, photoURL }
  },
  unSetUser(state) {
    state.user = null
  },
  logoutUser(state) {
    state.user = null
    state.isAuth = false
    state.lists = []
    state.tasks.pending = []
    state.tasks.completed = []
    state.currentTask = null
    state.currentListTasks = []
  },
  unsetTaskList(state, { status }) {
    state.tasks[status] = []
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
    if (authUser) {
      state.isAuth = true
      const { uid, email, displayName, photoURL } = authUser
      state.user = { uid, email, displayName, photoURL }
    } else {
      state.user = null
    }
  },
  setUserLists(state, payload) {
    state.lists.push(payload)
  },
  unsetUserLists(state) {
    state.lists = []
  },
  setTasks(state, { status, tasks }) {
    state.tasks[status].push(tasks)
  },
  setCurrentTask(state, { task }) {
    state.currentTask = task
  },
  setCurrentListTasks(state, { task }) {
    state.currentListTasks.push(task)
  },
  unsetCurrentListTasks(state) {
    state.currentListTasks = []
  }
}

export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} payload
   */
  updateUser({ commit }, payload) {
    commit('setUser', payload)
  },

  async fetchCurrentUserDetails(context) {
    let user = this.$fireAuth.currentUser
    await this.$fireStore
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          context.dispatch('updateUser', { ...{ uid: doc.id }, ...doc.data() })
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },
  /**
   *
   * @param {*} context
   * @param {*} payload
   */
  async createNewList(context, payload) {
    const uid = context.state.user.uid
    try {
      await this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .doc()
        .set({ name: payload })
        .then(() => {
          context.dispatch('fetchUserLists')
        })
      context.commit('ui/unsetLoader', {}, { root: true })
    } catch (e) {
      context.commit('ui/unsetLoader', {}, { root: true })
    }
  },
  async fetchUserLists(context) {
    context.commit('unsetUserLists')
    const uid = context.state.user.uid
    try {
      await this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            let listLasks = 0
            await this.$fireStore
              .collection('users')
              .doc(uid)
              .collection('tasks')
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((listDoc) => {
                  if (listDoc.data().list == doc.id) {
                    listLasks++
                  }
                })
                context.commit('setUserLists', {
                  ...{ id: doc.id },
                  ...{ count: listLasks },
                  ...doc.data()
                })
              })
              .catch(function(error) {
                console.log('Error getting document:', error)
              })
          })
        })
      context.commit('ui/unsetLoader', {}, { root: true })
    } catch (e) {
      context.commit('ui/unsetLoader', {}, { root: true })
    }
  },
  async addNewTask(context, { task }) {
    context.commit('ui/setLoader', {}, { root: true })
    const uid = context.state.user.uid
    try {
      await this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('tasks')
        .doc()
        .set(task)
      context.dispatch('getTasks', { status: 'pending' })
      context.commit('ui/unsetLoader', {}, { root: true })
    } catch (error) {
      context.commit('ui/unsetLoader', {}, { root: true })
    }
  },
  async getTasks(context, { status }) {
    const uid = context.state.user.uid
    context.commit('unsetTaskList', { status })
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().status == status) {
            context.commit('setTasks', {
              status,
              tasks: { ...{ id: doc.id }, ...doc.data() }
            })
          }
        })
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },

  /**
   *
   * @param {*} context
   * @param {*} param1
   */
  async getCurrentTask(context, { docId }) {
    const uid = context.state.user.uid
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          context.commit('setCurrentTask', {
            task: { ...{ id: doc.id }, ...doc.data() }
          })
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },

  /**
   *
   * @param {*} context
   * @param {*} param1
   */
  async deleteTask(context, { taskId }) {
    context.commit('ui/setLoader', {}, { root: true })
    const uid = context.state.user.uid
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => {
        alert('Document successfully deleted!')
        context.dispatch('getTasks', { status: 'pending' })
        this.$router.push('/')
      })
      .catch((error) => {
        context.commit('ui/unsetLoader', {}, { root: true })
        console.error('Error removing document: ', error)
      })
    context.commit('ui/unsetLoader', {}, { root: true })
  },

  async fetchListTasks(context, { listId }) {
    const uid = context.state.user.uid
    context.commit('unsetCurrentListTasks')
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().list == listId) {
            context.commit('setCurrentListTasks', {
              task: { ...{ id: doc.id }, ...doc.data() }
            })
          }
        })
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },

  async changeTaskStatus(context, { docId, status }) {
    const uid = context.state.user.uid
    let updata = {}
    if (status) {
      updata = {
        status: status ? 'completed' : 'pending',
        progress: '100%'
      }
    } else {
      updata = {
        status: status ? 'completed' : 'pending',
        progress: '10%'
      }
    }
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(docId)
      .update(updata)
      .then(function() {
        context.dispatch('user/getTasks', { status: 'pending' })
        context.dispatch('user/getTasks', { status: 'completed' })
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
  },
  async updateUserDetails(context, user) {
    const uid = context.state.user.uid
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .update(user)
      .then(async () => {
        await context.dispatch('fetchCurrentUserDetails')
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
  },
  async updateTaskDetails(context, { docId, task }) {
    const uid = context.state.user.uid
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(docId)
      .update(task)
      .then(async () => {
        // await context.dispatch('fetchCurrentUserDetails')
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
  }
}
