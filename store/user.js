export const state = () => ({
  user: null,
  isAuth: false,
  lists: null,
  pendingTasks: [],
})

export const getters = {
  getUserStatus: (state) => !!state.user,
  getUser: (state) => state.user,
  getPendingTasks: (state) => state.pendingTasks,
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
  setPendingTasks(state, payload) {
    state.pendingTasks.push(payload)
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
      context.commit('ui/unsetLoader', {}, { root: true })
    } catch (error) {
      context.commit('ui/unsetLoader', {}, { root: true })
    }
  },
  async getPendingTasks(context) {
    const uid = context.state.user.uid
    await this.$fireStore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().status == 'pending') {
            context.commit('setPendingTasks', doc.data())
          }
        })
      })
  },
}
