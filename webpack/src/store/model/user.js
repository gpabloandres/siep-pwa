// Modelo User
import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    authToken: null,
    authApi: {},
    apiGetUserDataRunning: false,
    porcentaje_perfil: 0,
    isEdition: false,
    loggedIn: false
  },
  getters: {
    persona: state => {
      return state.authApi.persona;
    }
  },
  mutations: {
    update_nombre_completo(state,payload) {
      state.nombre_completo = payload
    },
    addWebToken: function(state, webToken){
      state.authToken = webToken;
    },
    updateAuthApi: function(state, apiResponse){
      state.authApi = apiResponse;
    },
    removeWebToken: function(state){
      state.authToken = '';
    }
  },
  actions: {
    // Extrae el token de la URL e inicia el login
    extractToken:function(context){
      var parsedUrl = new URL(window.location.href);
      var token = parsedUrl.searchParams.get("token");
      if(token !== null){
        context.dispatch('login', {token : token});
      }else{
        context.dispatch('tokenMissing');
      }
    },
    // Guarda el token en el modelo
    login: function(context, data){
      context.commit('addWebToken', data.token);
      context.dispatch('apiGetUserData');
    },
    // Usuario autenticado con exito, retorna datos de usuario desde api
    loginSuccess: function({state}){
      console.log('user.loginSuccess()',state);
      state.loggedIn = true;
      router.push({
        path: '/home'
      });
    },
    // No existe token
    tokenMissing: function({state}){
      console.log('User not logged in, token missing');
      state.loggedIn = false;
      router.push({
        path: '/'
      });
    },
    // Eliminar token del modelo
    logout: function(context){
      context.commit('removeWebToken');
      state.loggedIn = true;
      router.push({
        path: '/home'
      });
    },
    apiGetUserData: function({commit,dispatch,state}) {
      if(!this.apiGetUserDataRunning) {
        state.apiGetUserDataRunning = true;

        const curl = axios.create({
          baseURL: process.env.SIEP_API_GW_INGRESS
        });
        // En todas las request envia el token por header
        curl.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`;

        curl.get('/auth/social/me')
            .then(function (response) {
              // handle success
              commit('updateAuthApi',response.data);
              dispatch('loginSuccess');

              state.apiGetUserDataRunning = false;
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              dispatch('tokenMissing');

              state.apiGetUserDataRunning = false;
            });
      }

      /*return new Promise((resolve, reject) => {
          setTimeout(() => {
          console.log('DONE get UserData');
          resolve()
        }, 9000);
      })*/
    },
    apiFindPersona: function({state},payload) {
      console.log('user.apiFindPersona',payload);

      const curl = axios.create({
        baseURL: process.env.SIEP_API_GW_INGRESS
      });
      // Header con token
      curl.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`;

      return curl.get('/api/personas',{
        params: payload
      });
    },
    apiCreatePersona: function({commit,dispatch,state},payload) {
      console.log('user.apiCreatePersona',payload);

      const curl = axios.create({
        baseURL: process.env.SIEP_API_GW_INGRESS
      });
      // Header con token
      curl.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`;

      curl.post('/api/personas',payload)
          .then(function (response) {
            // handle success
            if(response.data.persona.id)
            {
              dispatch('apiGetUserData');
            } else {
              console.log(response.data);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error.response.data);
          });
    }
  }
};

export default module