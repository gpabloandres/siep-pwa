<template>
    <v-container fluid text-xs-center>
        <div>
            <v-progress-linear
                    color="orange darken-1"
                    height="10"
                    value="30"
            ></v-progress-linear>
        </div>


        <v-flex xs12>
            <v-textarea
                    name="comentario_centros"
                    label="Comentarios"
                    hint="Algo que nos quiera hacer saber"
                    color="primary"
                    counter="100"
            ></v-textarea>
        </v-flex>
        <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
        <v-btn color="primary" @click="goForward">Continuar <v-icon>navigate_next</v-icon></v-btn>
    </v-container>
</template>

<script>
  import router from '../../router'

  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones - Centros");
      console.log(this.alumno);
    },
    computed:{
      alumno(){
        return store.state.alumno
      }
    },
    name: "centros",
    methods:{
      goForward:function(){
        router.push('/inscripciones/adulto_responsable');
      },
      goBack:function(){
        router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>