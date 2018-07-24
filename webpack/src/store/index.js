import Vue from 'vue'
import Vuex from 'vuex'

import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'

import user from './model/user'

// Inscripciones
import inscripciones_home from './model/inscripciones/home'
import centros from './model/inscripciones/centros'
import familiar from './model/inscripciones/familiar'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    menu: menu,
    menu_toolbar: menu_toolbar,

    user: user,
    home: inscripciones_home,
    centros: centros,
    familiar: familiar
  }
})

export default store
window.store = store