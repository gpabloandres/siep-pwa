<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-combobox
                v-model="select"
                :items="items"
                label="Seleccionar centro"
        ></v-combobox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        apigw: process.env.SIEP_API_GW_INGRESS,
        error: '',
        select: '',
        items: []
      }
    },
    created: function () {
      console.log(process.env);
      this.formOption();
    },
    methods: {
      formOption: function () {
        var vm = this;
        axios.get(vm.apigw+'/api/forms/centros')
        .then(function (response) {
          let render = response.data.map(function(x) {
            return x.nombre;
          });

          vm.items = render;
        })
        .catch(function (error) {
          vm.error = error.message;
        });
      }
    }
  }
</script>
