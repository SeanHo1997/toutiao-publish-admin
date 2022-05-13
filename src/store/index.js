import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user')) || null
  },
  mutations: {
    setUser (state, val) {
      state.user = val
      window.localStorage.setItem('user', JSON.stringify(val))
    },
    clearUser (state) {
      window.localStorage.removeItem('user')
    }
  }
})
