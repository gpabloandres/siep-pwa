<template>
    <v-container fluid text-xs-center>
        <div>
            <v-progress-linear
                    color="orange darken-1"
                    height="10"
                    value="60"
                    query:true
            ></v-progress-linear>
        </div>


        <v-flex xs12>
            <v-textarea
                    name="comentario_adulto_responsable"
                    label="Comentarios"
                    hint="Algo que nos quiera hacer saber"
                    color="primary"
                    counter="100"
            ></v-textarea>
        </v-flex>
        <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
        <v-btn color="light-green lighten-1" @click="sendRequest">Enviar Solicitud</v-btn>
    </v-container>
</template>

<script>
  import router from '../../router'

  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones - Responsable");
    },
    name: "adulto_responsable",
    methods:{
      sendRequest:function(){
        alert('enviando solicitud...');
      },
      goBack:function(){
        router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>