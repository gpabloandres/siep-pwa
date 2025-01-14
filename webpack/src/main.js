// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Material Designs Icons
import "vue-material-design-icons/styles.css"

// Source
import router from './router'
import store from './store'

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
