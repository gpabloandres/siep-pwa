import Vue from 'vue'
import Vuex from 'vuex'

import user from './model/user'
import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'

// Inscripciones
import inscripciones_home from './model/inscripciones/home'
import alumno from './model/inscripciones/alumno'
import centros from './model/inscripciones/centros'
import familiar from './model/inscripciones/familiar'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: user,
    menu: menu,
    menu_toolbar: menu_toolbar,
    home: inscripciones_home,
    alumno: alumno,
    centros: centros,
    familiar: familiar
  }
})

export default store
window.store = store