<template>
    <v-container fluid text-xs-center>
      <v-flex xs12 sm6 md4 lg4>

                <v-combobox
                        v-model="filtro.ciudad"
                        :items="combo_ciudades"
                        label="Seleccione Ciudad"
                ></v-combobox>

                <v-combobox
                        v-model="filtro.nivel_servicio"
                        :items="combo_niveles"
                        label="Seleccione Nivel"
                ></v-combobox>

                <v-combobox
                        v-model="filtro.sector"
                        :items="combo_sectores"
                        label="Seleccione Sector"
                ></v-combobox>

                <v-container>
                    <v-btn
                            class="mx-0"
                            color="primary"
                            @click="findInstitution"
                            :loading="searching"
                    >
                        <v-icon left large>search</v-icon>Buscar

                    </v-btn>
                </v-container>


                    <!-- Resultados de busqueda -->
                    <v-card v-for="item in resultado">
                        <v-divider></v-divider>
                        <v-list dense>
                            <h3 class="subheading mb-0 align-start">{{ item.nombre }}</h3>
                            <v-list-tile>
                                <v-list-tile-content class="align-content-center">Dirección: {{ item.direccion }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content class="align-content-center">Teléfono: {{ item.telefono }}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>

                  <v-divider class="my-3"></v-divider>

                <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
            </v-flex>
    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | Instituciones");
    },
    data: ()=>({
      error:"",
      searching:false,
      headers:['Nombre'],

      apigw: process.env.SIEP_API_GW_INGRESS,

      filtro:{},
      resultado:[],

      combo_ciudades: ['Ushuaia','Tolhuin','Rio Grande'],
      combo_niveles: ['Común - Inicial','Común - Primario','Común - Secundario'],
      combo_sectores:["ESTATAL","PRIVADO"],
    }),
    computed:{
    },
    methods:{
      findInstitution: function () {
        var vm = this;
        vm.searching = true;

        const curl = axios.create({
          baseURL: vm.apigw
        });

        return curl.get('/api/forms/centros',{params : vm.filtro})
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x;
            });

            vm.resultado = render;

            vm.searching = false;
          })
          .catch(function (error) {
            vm.error = error.message;
            vm.loading_nivel = false;
            console.log(vm.error);

            vm.searching = false;
          });
      },
      goBack:function(){
        router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>