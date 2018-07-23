import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import login from '@/pages/login'
import home from '@/pages/home'
import inscripciones_home from '@/pages/inscripciones/home'
import alumno from '@/pages/inscripciones/alumno'
import centros from '@/pages/inscripciones/centros'
import familiar from '@/pages/inscripciones/familiar'
import finalizar from '@/pages/inscripciones/finalizar'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/inscripciones',
      name: 'inscripciones',
      component: inscripciones_home
    },
    {
      path: '/inscripciones/alumno',
      name: 'inscripciones.alumno',
      component: alumno
    },
    {
      path: '/inscripciones/centros',
      name: 'inscripciones.centros',
      component: centros
    },
    {
      path: '/inscripciones/familiar',
      name: 'inscripciones.familiar',
      component: familiar
    },
    {
      path: '/inscripciones/finalizar',
      name: 'inscripciones.finalizar',
      component: finalizar
    }
  ]
})
