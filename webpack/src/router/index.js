import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import login from '@/pages/login'
import home from '@/pages/home'
import alumno from '@/pages/inscripciones/alumno'
import centros from '@/pages/inscripciones/centros'
import adulto_responsable from '@/pages/inscripciones/adulto_responsable'

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
      component: alumno
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
      path: '/inscripciones/adulto_responsable',
      name: 'inscripciones.adulto_responsable',
      component: adulto_responsable
    }
  ]
})
