import Vue from 'vue'
import Vuex from 'vuex'

import user from './model/user'
import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'

// Inscripciones
import alumno from './model/inscripciones/alumno'
import centros from './model/inscripciones/centros'
import adulto_responsable from './model/inscripciones/adulto_responsable'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: user,
    menu: menu,
    menu_toolbar: menu_toolbar,
    alumno: alumno,
    centros: centros,
    adulto_responsable: adulto_responsable
  }
})

export default store
window.store = store