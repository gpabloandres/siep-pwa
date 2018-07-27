<template>
    <v-container fluid text-xs-center id="top">
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

          <v-divider class="my-2"></v-divider>
          <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>

            <!-- Resultados de busqueda -->
            <div v-for="item in resultado">
                <v-card>
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
            </div>

          <v-card-text style="height: 100px; position: relative">
              <v-fab-transition>
                  <v-btn
                          v-show="!hidden"
                          color="primary"
                          dark
                          fixed
                          bottom
                          right
                          fab
                          @click="$vuetify.goTo(target, options)"
                          hint="Subir al Inicio"
                  >
                      <v-icon>vertical_align_top</v-icon>
                  </v-btn>
              </v-fab-transition>
          </v-card-text>

      </v-flex>
    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  import * as easings from 'vuetify/es5/util/easing-patterns'

  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | Instituciones");
    },
    data: ()=>({
      type: 'number',
      number: 9999,
      selector: '#top',
      selected: 'Button',
      elements: ['Button', 'Radio group'],
      duration: 300,
      offset: 0,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings),

      error:"",
      searching:false,
      headers:['Nombre'],
      hidden:false,

      apigw: process.env.SIEP_API_GW_INGRESS,

      filtro:{},
      resultado:[],

      combo_ciudades: ['Ushuaia','Tolhuin','Rio Grande'],
      combo_niveles: ['Común - Inicial','Común - Primario','Común - Secundario'],
      combo_sectores:["ESTATAL","PRIVADO"],
    }),
    computed:{
      target () {
        const value = 0;
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
      }
    },
    methods:{
      findInstitution: function () {
        var vm = this;
        vm.searching = true;

        const curl = axios.create({
          baseURL: vm.apigw
        });

        return curl.get('/api/forms/centros',{
          params: vm.filtro
        })
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
      },
      goTop:function(){
        var element = document.getElementById("top");
        var top = element.offsetTop;
        window.scrollTo(0, top);
      }
    }
  }
</script>

<style scoped>

</style>
