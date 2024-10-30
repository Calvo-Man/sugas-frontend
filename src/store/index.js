import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    puede: false,
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    },
    cambiar(state) {
      state.puede = true
    },
    reset(state) {
      state.puede = false
    },
  },
  actions: {
    login({ commit }) {
      commit('login')
      commit('cambiar')
    },
    logout({ commit }) {
      commit('logout')
      commit('reset')
    },
    cambiar({ commit }) {
      commit('cambiar')
    },
    reset({ commit }) {
      commit('reset')
    },
  },
  plugins: [createPersistedState()],
})
