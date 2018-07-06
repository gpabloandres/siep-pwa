<template>

  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex>
        <v-stepper v-model="wizard" vertical>
          <v-stepper-step :complete="wizard > 1" step="1">
            Nivel de Inscripción
            <small>(Paso 1)</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <!-- CONTENIDO STEP -->
            <step1></step1>

            <v-btn color="primary" @click="wizard = 2">Continuar ></v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="wizard > 2" step="2">
            Datos del Alumno
            <small>(Paso 2)</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <!-- CONTENIDO STEP 2-->
            <v-btn color="primary" @click="wizard = 1"> < Volver </v-btn>
            <v-btn color="primary" @click="wizard = 3">Continuar > </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="wizard > 3" step="3">
            Domicilio del Alumno
            <small>(Paso 3)</small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <!-- CONTENIDO STEP -->
            <v-btn color="primary" @click="wizard = 2"> < Volver </v-btn>
            <v-btn color="primary" @click="wizard = 4">Continuar</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="wizard > 3" step="4">
            Datos del Adulto Responsable
            <small>(Paso 4)</small>
          </v-stepper-step>

          <v-stepper-content step="4">
            <!-- CONTENIDO STEP 4 -->
            <v-btn color="primary" @click="wizard = 3"> < Volver </v-btn>
            <v-btn color="primary">Finalizar Carga</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import step1 from '../../components/wizard_inscripciones/step1'
  import step2 from '../../components/wizard_inscripciones/step2'
  import step3 from '../../components/wizard_inscripciones/step3'
  import step4 from '../../components/wizard_inscripciones/step4'


  export default {
    data () {
      return {
        wizard: 1
      }
    },
    components :{ step1,step2,step3,step4 }
  }
</script>