<template>
  <v-container fluid text-xs-center>

    <!-- Breadcrumbs -->
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

    <!-- Formulario de registro de persona-->
    <form-persona alumno="true" mode="create" title="Alumno"/>
  </v-container>
</template>

<script>
  import router from '../../router'
  import formPersona from './components/form_persona.vue'

  export default {
    components: { formPersona },
    data: ()=>({
    breadcrumbs: [
      {
        text: 'Paso 1',
        disabled: false
      },
      {
        text: 'Paso 2',
        disabled: true
      }
    ]
  }),
  computed:{

  },
  created: function(){

  },
  methods:{

  }
}
</script>