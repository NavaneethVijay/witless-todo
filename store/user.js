export const state = () => ({
  user: null,
  isAuth: false
})

export const getters = () => ({
  getUserStatus: (state) => !!state.user,
  getUser: (state) => JSON.parse(state.user)
})
export const mutations = {
  setUser(state, currentUser) {
    state.user = currentUser
    state.isAuth = true
  },
  unSetUser(state) {
    state.user = null
  }
}

export const actions = {
  updateUser: ({ commit }, payload) => {
    commit('setUser', payload.currentUser)
  }
}
