import Vue from 'vue'
import Vuex from 'vuex'

import user from './model/user'
import menu from './model/menu'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: user,
    menu: menu
  }
})

export default store
window.store = store