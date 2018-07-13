import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import home from '@/pages/home'
import inscripciones from '@/pages/inscripciones'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/inscripciones',
      name: 'inscripciones',
      component: inscripciones
    }
  ]
})
