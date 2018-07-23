<template>
    <v-container fluid text-xs-center>
        <div>
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
        </div>

      Puede registrar a un nuevo alumno
      <v-btn color="primary" @click="goNewStudent"><v-icon left>person_add</v-icon>Nuevo Alumno</v-btn>

      <v-divider />

      En caso de que el alumno ya pertenezca a una institucion, puede buscarlo en el sistema con su numero de documento
      <v-text-field
                    v-model="documento_nro"
                    label="Numero de documento del alumno"
            ></v-text-field>
            <v-btn color="primary" @click="startFindPersona" :loading="findPersonaRunning"><v-icon left>search</v-icon>Buscar</v-btn>


          <v-container grid-list-md>
                <v-data-iterator
                        :items="resultado"
                        content-tag="v-layout"
                        hide-actions
                        row
                        wrap
                        no-data-text=""
                >

                    <v-flex xs12
                            slot="item"
                            slot-scope="props"
                    >
                        <v-card>
                            <v-card-title @click="goWithSelected(props.item.id)" class="subheading font-weight-bold">{{ props.item.nombres }} {{ props.item.apellidos}}</v-card-title>

                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-tile>
                                    <v-list-tile-content>DNI:</v-list-tile-content>
                                    <v-list-tile-content class="align-left"><strong>{{ props.item.documento_nro }}</strong></v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>

                </v-data-iterator>
            </v-container>


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
          disabled: true
        },
        {
          text: 'Paso 2',
          disabled: false
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
            vm.resultado = response.data.persona;
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
      goWithSelected:function(id){
        store.state.alumno.id = id;
        router.push('/inscripciones/centros');
      }
    }
  }
</script>

<style scoped>
</style>