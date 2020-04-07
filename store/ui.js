export const state = () => ({
  isLoading: false,
})

export const getters = {
  showLoader: (state) => state.isLoading,
}

export const mutations = {
  setLoader(state, payload) {
    state.isLoading = true
  },
  unsetLoader(state) {
    state.isLoading = false
  },
}
