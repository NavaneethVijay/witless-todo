export const state = () => ({
  isLoading: false
})

export const getters = {
  showLoader: (state) => state.isLoading
}

export const mutations = {
  setLoader(state) {
    state.isLoading = true
  },
  unsetLoader(state) {
    state.isLoading = false
  }
}
