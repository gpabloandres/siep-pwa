<template>

  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>

          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="orange"
                    indeterminate
                    v-if="user.apiGetUserDataRunning"
            ></v-progress-circular>

            <div v-if="!user.loggedIn && !user.apiGetUserDataRunning">
              <p class="subheading">Por favor, inicie sesion.</p>

              <div class="text-xs-center">
                <v-btn round color="primary" small @click="goToLogin">Quiero iniciar sesion</v-btn>
              </div>

            </div>

            <div v-if="user.loggedIn">
              <h3 class="display-2 font-weight-bold" >Bienvenido</h3>

              <h3 v-if="persona" class="display-1">
                {{persona.nombres }} {{persona.apellidos }}
              </h3>

              <v-divider class="my-3"></v-divider>

              <div v-if="!persona" >
                <p class="subheading">Por favor, complete sus datos personales para poder continuar.</p>

                <v-divider class="my-3"></v-divider>

                <v-flex>
                  <v-btn class="mx-0" color="success" large @click="goToAdult">
                    <v-icon left>how_to_reg</v-icon>Completar perfil
                  </v-btn>
                </v-flex>
              </div>
              <!-- EN CASO DE QUE LA PERSONA ESTE DEFINIDA -->
              <div v-else>
                <v-flex>
                  <v-btn class="mx-0" color="primary" large @click="goToStudent">
                    <v-icon left>how_to_reg</v-icon>Registrar Alumno
                  </v-btn>
                </v-flex>
              </div>

            </div>

          </v-flex>

      </v-layout>
    </v-container>
  </v-jumbotron>

</template>
<script>
  import router from '../router'

  export default{
    created: function(){
      store.commit('updateTitle',"Siep");
    },
    computed:{
      user(){
        return store.state.user
      },
      persona(){
        return store.getters.persona;
      },
    },
    methods:{
      goToLogin:function(){
        router.push('/')
      },
      goToAdult:function(){
        this.user.isEdition = true;
        router.push('/inscripciones/adulto_responsable')
      },
      goToStudent:function(){
        router.push('/inscripciones/alumno')
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
