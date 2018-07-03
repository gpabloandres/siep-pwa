<template>

  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex>
        <v-stepper v-model="wizard" vertical>
          <v-stepper-step :complete="wizard > 1" step="1">
            Iniciar inscripcion
            <small>Datos principales</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <!-- CONTENIDO STEP -->
            <step1></step1>
            <v-btn color="primary" @click="wizard = 2">Continuar</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="wizard > 2" step="2">Paso 2</v-stepper-step>

          <v-stepper-content step="2">
            <!-- CONTENIDO STEP -->
            <v-btn color="primary" @click="wizard = 3">Continuar</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="wizard > 3" step="3">Paso 3</v-stepper-step>

          <v-stepper-content step="3">
            <!-- CONTENIDO STEP -->
            <v-btn color="primary" @click="wizard = 1">Continuar</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import step1 from '../components/wizard_inscripciones/step1'

  export default {
    data () {
      return {
        wizard: 1
      }
    },
    components :{ step1 }
  }
</script>