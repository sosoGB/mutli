import Vue from 'vue'
import Vuex from 'vuex'
import state from './store'
import mutations from './mutations'
import actions from './action'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [createPersistedState()]
})