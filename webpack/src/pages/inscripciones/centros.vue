<template>
    <v-container fluid text-xs-center>
        <!--<div>-->
            <!--<v-breadcrumbs>-->
                <!--<v-icon slot="divider">forward</v-icon>-->

                <!--<v-breadcrumbs-item-->
                        <!--v-for="item in items_breadcumbs"-->
                        <!--:disabled="item.disabled"-->
                        <!--:key="item.text"-->
                <!--&gt;-->
                    <!--{{ item.text }}-->
                <!--</v-breadcrumbs-item>-->
            <!--</v-breadcrumbs>-->
        <!--</div>-->
        <v-form v-model="valid">
            <v-flex xs12 sm6 md4 lg4>
                <v-combobox
                        v-model = "select_tipo"
                        :items = "items_tipo"
                        :rules = "imputRules"
                        label = "Tipo Inscripción"
                        required
                ></v-combobox>

                <v-combobox
                        v-model="select_nivel"
                        :items="items_niveles"
                        :rules = "imputRules"
                        label="Seleccione Nivel"
                        required
                ></v-combobox>

                <v-combobox
                        v-model="select_ciudad"
                        :items="items_ciudades"
                        :rules = "imputRules"
                        label="Seleccione Ciudad"
                        required
                ></v-combobox>

                <v-combobox
                        v-model="select_centros"
                        :items="items_centros"
                        :rules = "imputRules"
                        label="Seleccione Centro"
                        required
                ></v-combobox>

                <v-combobox
                        v-model="select_anio"
                        :items="items_anios"
                        :rules = "imputRules"
                        label="Seleccione Año"
                        required
                ></v-combobox>

                <v-textarea
                        name ="comentario_centros"
                        label="Comentarios"
                        hint ="Algo que nos quiera hacer saber"
                        color ="primary"
                        counter ="100"
                ></v-textarea>
                <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
                <v-btn color="primary" @click="goForward" :disabled="!valid">Continuar <v-icon>navigate_next</v-icon></v-btn>
            </v-flex>
        </v-form>

    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones - Centros");
      console.log(this.alumno);
      this.centrosItems();
      this.nivelItems();
      this.añosItems();
    },
    data: ()=>({
      valid:false,
      apigw: process.env.SIEP_API_GW_INGRESS,
      imputRules: [
        v => !!v || 'Campo Requerido',
        v => (!v || v.length >= 3) || 'El campo debe tener más de 3 caracteres'
      ],
      select_tipo:"",
      items_tipo:["Común","Hermano/a"],
      select_centros:"",
      items_centros:[],
      select_nivel:"",
      items_niveles:[],
      select_ciudad:"",
      items_ciudades:["Ushuaia","Tolhuin","Rio Grande"],
      select_anio:"",
      items_anios:[],
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
        return store.state.centros
      },
      alumno(){
        return store.state.alumno
      }
    },
    name: "centros",
    methods:{
      goForward:function(){
        router.push('/inscripciones/finalizar');
      },
      goBack:function(){
        router.go(-1);
      },
      centrosItems: function () {
        var vm = this;
        axios.get(vm.apigw+'/api/forms/centros')
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x.nombre;
            });

            vm.items_centros = render;
          })
          .catch(function (error) {
            vm.error = error.message;
          });
      },
      nivelItems: function () {
        var vm = this;
        axios.get(vm.apigw+'/api/forms/niveles')
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x.nivel_servicio;
            });

            vm.items_niveles = render;
          })
          .catch(function (error) {
            vm.error = error.message;
          });
      },
      añosItems: function () {
        var vm = this;
        axios.get(vm.apigw+'/api/forms/años')
          .then(function (response) {
            let render = response.data.map(function(x) {
              return x.anio;
            });

            vm.items_anios = render;
          })
          .catch(function (error) {
            vm.error = error.message;
          });
      }
    }
  }
</script>

<style scoped>

</style>