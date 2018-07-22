<template>
    <v-container fluid text-xs-center>
        <div>
            <v-breadcrumbs>
                <v-icon slot="divider">forward</v-icon>

                <v-breadcrumbs-item
                        v-for="item in items"
                        :disabled="item.disabled"
                        :key="item.text"
                >
                    {{ item.text }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </div>

        <v-flex xs12 sm6 md4 lg4>
            <p>Para comenzar, busque un Alumno en el campo de busqueda, o si lo desea, agregue un Nuevo Alumno</p>

            <v-divider></v-divider>
            <v-container  xs12 sm6 md4 lg3>
                <v-btn color="primary" @click="goNewStudent"><v-icon left>person_add</v-icon>Nuevo Alumno</v-btn>
            </v-container>


            <v-divider></v-divider>

            <v-text-field
                    v-model="buscar_alumno"
                    label="Busque por Nombre o DNI"
            ></v-text-field>

            <v-container grid-list-md>
                <v-data-iterator
                        :items="resultado"
                        content-tag="v-layout"
                        hide-actions
                        row
                        wrap>

                    <v-flex
                            slot="item"
                            slot-scope="props"
                    >
                        <v-card>
                            <v-card-title @click="goWithSelected(props.item.id)" class="subheading font-weight-bold">{{ props.item.nombres }} {{ props.item.apellidos}}</v-card-title>

                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-tile>
                                    <v-list-tile-content>DNI:</v-list-tile-content>
                                    <v-list-tile-content class="align-left"><strong>{{ props.item.dni }}</strong></v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>

                </v-data-iterator>
            </v-container>

            <v-divider></v-divider>

            <!--<v-btn color="primary" @click="goForward">Continuar <v-icon>navigate_next</v-icon></v-btn>-->
        </v-flex>

    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones");
    },
    data: ()=>({
      apigw: process.env.SIEP_API_GW_INGRESS,
      buscar_alumno:"",
      resultado:[
        {
          id:1,
          nombres: "Montoto Esteban",
          apellidos: "Pérez Gómez",
          dni: "99.999.999"
        },
        {
          id:2,
          nombres: "Miguel Angel",
          apellidos: "Gonzáles",
          dni:"88.888.888"
        }
      ],
      items: [
        {
          text: 'Paso 1',
          disabled: false
        },
        {
          text: 'Paso 2',
          disabled: false
        },
        {
          text: 'Paso3',
          disabled: true
        }
      ]
    }),
    computed:{
      alumno(){
        return store.state.alumno
      }
    },
    name: "inscripciones_home",
    methods:{
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