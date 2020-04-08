export const state = () => ({
  user: null,
  isAuth: false,
  lists: null,
  tasks: {
    pending: [],
    progress: [],
  },
  currentTask: null,
})

export const getters = {
  getUserStatus: (state) => !!state.user,
  getUser: (state) => state.user,
  getAllTasks: (state) => state.tasks,
  getPendingTasks: (state) => state.tasks.pending,
  getProgressTasks: (state) => state.tasks.progress,
  getCurrentTask: (state) => state.currentTask,
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
    state.lists = payload
  },
  setTasks(state, { status, tasks }) {
    state.tasks[status].push(tasks)
  },
  setCurrentTask(state, { task }) {
    state.currentTask = task
  },
}

export const actions = {
  updateUser({ commit }, payload) {
    commit('setUser', payload)
  },
  async createNewList(context, payload) {
    const uid = context.state.user.uid
    try {
      await this.$fireStore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .doc()
        .set({ name: payload })
      context.commit('ui/unsetLoader', {}, { root: true })
    } catch (e) {
      context.commit('ui/unsetLoader', {}, { root: true })
    }
  },
  async addNewTask(context, { task, list }) {
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
              tasks: { ...{ id: doc.id }, ...doc.data() },
            })
          }
        })
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },

  async getCurrentTask(context, { docId }) {
    context.commit('ui/setLoader', {}, { root: true })

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
            task: { ...{ id: doc.id }, ...doc.data() },
          })
          context.commit('ui/unsetLoader', {}, { root: true })
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
        context.commit('ui/unsetLoader', {}, { root: true })
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },

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
        this.$router.push('/')
      })
      .catch((error) => {
        context.commit('ui/unsetLoader', {}, { root: true })
        console.error('Error removing document: ', error)
      })
    context.commit('ui/unsetLoader', {}, { root: true })
  },
}
