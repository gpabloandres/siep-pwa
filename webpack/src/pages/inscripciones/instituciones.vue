<template>
    <v-container fluid text-xs-center>
        <v-form v-model="valid">
            <v-flex xs12 sm6 md4 lg4>

                <v-combobox
                        v-model="comboboxes.ciudad"
                        :items="resultado.ciudades"
                        label="Seleccione Ciudad"
                        required
                ></v-combobox>


                <v-combobox
                        v-model="comboboxes.nivel"
                        :items="resultado.niveles"
                        label="Seleccione Nivel"
                        required
                ></v-combobox>

                <v-combobox
                        v-model="comboboxes.sector"
                        :items="combo_sector"
                        label="Seleccione Sector"
                        required
                ></v-combobox>

                <v-container>
                    <v-btn
                            class="mx-0"
                            color="primary"
                            @click="findInstitution"
                            :loading="searching"
                            large
                    >
                        <v-icon left>search</v-icon>Buscar

                    </v-btn>
                </v-container>


                    <!-- Resultados de busqueda -->
                    <v-data-iterator
                            :items="resultado.centros"
                            hide-actions
                            no-data-text=""
                            content-tag="v-layout"
                            row
                            wrap
                    >
                        <v-flex
                                slot="item"
                                slot-scope="props"
                                xs12
                                sm6
                                md4
                                lg3
                        >
                            <v-card>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content class="align-content-center">{{ props.item.nombre }}</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-data-iterator>

                    <!-- /Resultado de Busqueda -->


                <v-divider class="my-3"></v-divider>

                <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
            </v-flex>
        </v-form>

    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | Instituciones");
      console.log(this.alumno);
      this.nivelItems();
      this.ciudadesItems();
    },
    data: ()=>({
      error:"",
      valid:false,
      searching:false,
      loading_nivel:false,
      loading_ciudad:false,
      headers:['Nombre'],
      apigw: process.env.SIEP_API_GW_INGRESS,
      combo_sector:["ESTATAL","PRIVADO"],
      comboboxes:[],
      resultado:[],
      items_breadcumbs: [
        {
          text: 'Paso 1',
          disabled: false
        },
        {
          text: 'Paso 2',
          disabled: false
        },
        {
          text: 'Pasoss3',
          disabled: false
        }
      ]
    }),
    computed:{
      centros(){
        return store.state.instituciones
      }
    },
    name: "instituciones",
    methods:{
      goForward:function(){
        router.push('/inscripciones/finalizar');
      },
      goBack:function(){
        router.go(-1);
      },
      findInstitution: function () {
        var vm = this;
        vm.searching = true;
        axios.get(vm.apigw+'/api/forms/centros?ciudad='+vm.comboboxes.ciudad+'&sector='+vm.comboboxes.sector+'&nivel_servicio='+vm.comboboxes.nivel)
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x;
            });

            vm.resultado.centros = render;
          })
          .catch(function (error) {
            vm.error = error.message;
            console.log(vm.error);
          });
        vm.searching = false;
      },
      nivelItems: function () {
        var vm = this;
        vm.loading_nivel = true;
        axios.get(vm.apigw+'/api/forms/niveles')
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x.nivel_servicio;
            });

            vm.resultado.niveles = render;

          })
          .catch(function (error) {
            vm.error = error.message;
            console.log(vm.error);

          });
        vm.loading_nivel = false;

      },
      ciudadesItems: function () {
        var vm = this;
        vm.loading_ciudad = true;
        axios.get(vm.apigw+'/api/forms/ciudades')
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x.nombre;
            });

            vm.resultado.ciudades = render;
          })
          .catch(function (error) {
            vm.error = error.message;
            console.log(vm.error);
          });
        vm.loading_ciudad = false;
      }
    }
  }
</script>

<style scoped>

</style>