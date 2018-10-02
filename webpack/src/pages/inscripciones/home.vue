<template>
  <v-container>
      <v-flex xs12 class="text-xs-center">
          <v-breadcrumbs>
              <v-icon slot="divider">forward</v-icon>

              <v-breadcrumbs-item
                      v-for="item in breadcrumbs"
                      :disabled="item.disabled"
                      :key="item.text"
              >
                  {{ item.text }}
              </v-breadcrumbs-item>
          </v-breadcrumbs>

      <v-divider />

      <v-text-field
              v-model="documento_nro"
              label="Ingresar documento del alumno"
      ></v-text-field>
      <v-btn color="primary" @click="startFindPersona" :loading="findPersonaRunning"><v-icon left>search</v-icon>Buscar</v-btn>

      <!-- Resultados de busqueda -->
      <v-data-iterator
          :items="resultado"
          content-tag="v-layout"
          hide-actions
          no-data-text=""
      >
        <v-card
          slot="item"
          slot-scope="props"
        >
          <v-card-title primary-title>
            <div>
              <h3 class="subheading mb-0">{{ props.item.nombres }} {{ props.item.apellidos}}</h3>
              <div>DNI: {{ props.item.documento_nro}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="goWithSelected(props.item)"><v-icon left>person</v-icon>Seleccionar alumno</v-btn>
          </v-card-actions>
        </v-card>

      </v-data-iterator>


        <v-container>
          <v-divider />

          <br>
          <p>
            En caso de no obtener resultados de busqueda, puede registrar un alumno nuevo
          </p>

          <v-btn color="primary" @click="goNewStudent"><v-icon left>person_add</v-icon>Registrar Nuevo Alumno</v-btn>
        </v-container>


      </v-flex>
    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'

  export default {
    data: ()=>({
      apigw: process.env.SIEP_API_GW_INGRESS,
      documento_nro:"",
      findPersonaRunning: false,
      resultado:[],

      breadcrumbs: [
        {
          text: 'Paso 1',
          disabled: false
        },
        {
          text: 'Paso 2',
          disabled: false
        },
        {
          text: 'Finalizado',
          disabled: true
        }
      ]
    }),
    created: function(){
      store.commit('updateTitle',"Inscripciones");
    },
    computed:{
      alumno(){
        return store.state.alumno
      }
    },
    methods:{
      startFindPersona:function(){
        let vm = this;
        vm.findPersonaRunning = true;
        vm.resultado = [];
        
        store.dispatch('apiFindPersona',{
          documento_nro:this.documento_nro,
          alumno:1
        })
          .then(function (response) {
            // handle success
            vm.resultado = response.data.data;
            console.log(response.data.data);
            vm.findPersonaRunning = false;
        })
          .catch(function (error) {
            // handle error
            vm.resultado = [];
            console.log(error.response.data);
            vm.findPersonaRunning = false;
          });
      },
      goNewStudent:function(){
        router.push('/inscripciones/alumno');
      },
      goBack:function(){
        router.go(-1);
      },
      goWithSelected:function(persona){
        router.push('/inscripciones/finalizar');
      }
    }
  }
</script>

<style scoped>
</style>
