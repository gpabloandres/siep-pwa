// Modelo User
import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    authToken: null,
    authApi: {},
    apiGetUserDataRunning: false,
    porcentaje_perfil: 0
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
    },
    userProfilePercentage (state) {
      state.porcentaje_perfil = 0;
/*
        if(state.nombres !== ""){
          state.porcentaje_perfil += 15;
        }

        if(state.apellidos !==""){
          state.porcentaje_perfil += 15;
        }

        if(state.fecha_nac !==""){
          state.porcentaje_perfil += 10;
        }

        if(state.sexo !== ""){
          state.porcentaje_perfil += 10;
        }

        if(state.nro_doc !== ""){
          state.porcentaje_perfil += 10;
        }

        if(state.provincia !== ""){
          state.porcentaje_perfil += 10;
        }

        if(state.localidad !== ""){
          state.porcentaje_perfil += 10;
        }

        if(state.direccion !== ""){
          state.porcentaje_perfil += 10;
        }

        if(state.telefono !== ""){
          state.porcentaje_perfil += 10;
        }
*/
    },
    UPDATE_DATA(state,data){
     /* state.nombres = data.nombres;
      state.apellidos = data.apellidos;
      state.fecha_nac = data.fecha_nac;
      state.sexo = data.sexo;
      state.nro_doc = data.nro_documento;
      state.provincia = data.provincia;
      state.localidad = data.localidad;
      state.direccion = data.direccion;
      state.telefono = data.telefono;
      state.comentarios = data.comentario;*/
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
      router.push({
        path: '/home'
      });
    },
    // No existe token
    tokenMissing: function(context, data){
      console.log('User not logged in, token missing');
      router.push({
        path: '/'
      });
    },
    // Eliminar token del modelo
    logout: function(context){
      context.commit('removeWebToken');
      router.push({
        path: '/home'
      });
    },
    apiGetUserData: function({commit,dispatch,state}) {
      if(!this.apiGetUserDataRunning) {
        this.apiGetUserDataRunning = true;

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

              this.apiGetUserDataRunning = false;
            })
            .catch(function (error) {
              // handle error
              console.log(error.response.data);
              dispatch('tokenMissing');

              this.apiGetUserDataRunning = false;
            });
      }

      /*return new Promise((resolve, reject) => {
          setTimeout(() => {
          console.log('DONE get UserData');
          resolve()
        }, 9000);
      })*/
    },
    apiPostPersona: function({commit,dispatch,state},payload) {
      console.log('user.apiPostPersona',payload);

      const curl = axios.create({
        baseURL: process.env.SIEP_API_GW_INGRESS
      });
      // Header con token
      curl.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`;

      curl.post('/api/personas',payload)
      .then(function (response) {
        // handle success
        //commit('updateAuthApi',response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
      });
    }
  }
};

export default module