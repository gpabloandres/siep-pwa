// Modelo User
import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    nombres:"",
    apellidos:"",
    nombre_completo: "",
    fecha_nac:"",
    sexo:"",
    tipo_doc:"",
    nro_doc:"",
    provincia:"",
    localidad:"",
    direccion:"",
    telefono:"",
    comentarios:"",
    loggedInStatus: true,
    authToken: '',
    porcentaje_perfil: 0
  },
  mutations: {
    update_nombre_completo(state,payload) {
      state.nombre_completo = payload
    },
    addWebToken: function(state, webToken){
      state.authToken = webToken;
    },
    removeWebToken: function(state){
      state.authToken = '';
    },
    userProfilePercentage (state) {
      state.porcentaje_perfil = 0;

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
    },
    UPDATE_DATA(state,data){
      state.nombres = data.nombres;
      state.apellidos = data.apellidos;
      state.fecha_nac = data.fecha_nac;
      state.sexo = data.sexo;
      state.nro_doc = data.nro_documento;
      state.provincia = data.provincia;
      state.localidad = data.localidad;
      state.direccion = data.direccion;
      state.telefono = data.telefono;
      state.comentarios = data.comentario;
    }
  },
  actions: {
    login: function(context, data){
      context.commit('addWebToken', data.token); // pass the webtoken as payload to the mutation
      router.push({
        path: '/home',
      });
    },
    logout: function(context){
      //your logout functionality
      context.commit('removeWebToken');
      router.push({
        path: '/home',
      });
    }
  }
};

export default module