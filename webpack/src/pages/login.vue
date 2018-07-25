<template v-bind:style="{ backgroundColor: color}">
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <img src="@/assets/escudo_color.jpg" alt="SIEP" class="mb-5">

                <v-subheader>
                    Ingrese con las Redes Sociales
                </v-subheader>
                <v-divider></v-divider>

                <div class="text-xs-center">
                    <v-btn round color="indigo darken-3" dark @click="goTo('facebook')">Ingresar con facebook</v-btn>
                    <v-btn round color="red darken-1" dark @click="goTo('google')">Ingresar con Google</v-btn>
                </div>


            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>

  import FacebookIcon from "vue-material-design-icons/facebook.vue"
  import GoogleIcon from "vue-material-design-icons/google.vue"

  import router from '../router'

  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | LogIn");
    },
    data(){
      return{
        color: '#5C6BC0',
        apigw: process.env.SIEP_API_GW_INGRESS,
      }
    },
    components :{ FacebookIcon,GoogleIcon  },
    name: "login",
    methods:{
      goTo : function(social){
        window.location = this.apigw+'/auth/social/'+social;
      },
      logout: function(){
        store.dispatch('logout');
      }
    }
  }
</script>

<style>
    body {
        background-color: #5C6BC0;
    }

    FacebookIcon {
        font-size: 50px;
    }

</style>