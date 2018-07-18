<template v-bind:style="{ backgroundColor: color}">
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <img src="@/assets/escudo.png" alt="SIEP" class="mb-5">

                <v-subheader>
                    Ingrese con las Redes Sociales
                </v-subheader>
                <v-divider></v-divider>

                <div class="text-xs-center">
                    <v-btn round color="indigo darken-3" dark small @click="go"><FacebookIcon style="font-size:15px"/></v-btn>
                    <v-btn round color="red darken-1" dark small @click="go"><GoogleIcon style="font-size:15px"/></v-btn>
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
    data(){
      return{
        color: '#5C6BC0'
      }
    },
    components :{ FacebookIcon,GoogleIcon,  },
    name: "login",
    methods:{
      go : function(){
        router.push('/inscripciones');
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