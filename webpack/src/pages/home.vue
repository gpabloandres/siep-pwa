<template>

  <v-jumbotron>
    <v-container fluid>
      <v-layout align-center>
        <blockquote>
          <v-flex>
            <h3 class="display-2 text-xs-center text-sm-center text-md-center text-lg-center font-weight-bold" >Bienvenido</h3>
            <h3 :if="user.nombres !== ''" class="display-1 text-xs-center text-sm-center text-md-center text-lg-center">{{user.nombres }} {{user.apellidos}}</h3>

            <v-divider class="my-3"></v-divider>

            <div v-if="user.porcentaje_perfil < 100" >
              <div class="title mb-3 text-xs-center text-sm-center text-md-center text-lg-center">Perfil completado: <strong>{{user.porcentaje_perfil}}%</strong></div>
              <p class="subheading text-xs-center text-sm-center text-md-center text-lg-center">Te invitamos a que completes tus datos al <strong>100%</strong> para poder continuar.</p>

              <v-divider class="my-3"></v-divider>

              <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-btn class="mx-0" color="success" large @click="goToAdult">
                  <v-icon left>how_to_reg</v-icon>Completar perfil
                </v-btn>
              </v-flex>
            </div>
            <div v-else>
              <p class="subheading text-xs-center text-sm-center text-md-center text-lg-center">Si lo deseás, podés registrar un alumno presionando el botón "Registrar Alumno".</p>
              <v-divider class="my-3"></v-divider>
              <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-btn class="mx-0" color="primary" large @click="goToStudent">
                  <v-icon left>person_add</v-icon>Registrar Alumno
                </v-btn>
              </v-flex>
            </div>

          </v-flex>
        </blockquote>

      </v-layout>
    </v-container>
  </v-jumbotron>


</template>
<script>

  import router from '../router'
  export default{
    created: function(){
      store.commit('updateTitle',"Siep");
      this.chkUserProfilePercentage();
    },
    computed:{
      user(){
        return store.state.user
      }
    },
    methods:{
      goToAdult:function(){
        router.push('/inscripciones/adulto_responsable')
      },
      goToStudent:function(){
        router.push('/inscripciones')
      },
      chkUserProfilePercentage:function(){
        if(this.user.porcentaje_perfil < 100){
          store.commit('userProfilePercentage');
        }else{

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
