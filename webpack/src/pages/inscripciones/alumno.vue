<template>
    <v-container fluid text-xs-center>
        <!--<div>-->
            <!--<v-breadcrumbs>-->
                <!--<v-icon slot="divider">forward</v-icon>-->

                <!--<v-breadcrumbs-item-->
                        <!--v-for="item in items"-->
                        <!--:disabled="item.disabled"-->
                        <!--:key="item.text"-->
                <!--&gt;-->
                    <!--{{ item.text }}-->
                <!--</v-breadcrumbs-item>-->
            <!--</v-breadcrumbs>-->
        <!--</div>-->

        <v-form v-model="valid">

            <v-flex xs12 lg6>
                <v-menu
                        :close-on-content-click="false"
                        v-model="menu_date_picker"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px">
                    <v-text-field
                            slot="activator"
                            v-model="computedDateFormatted"
                            label="Fecha de Nacimiento"
                            hint="MM/DD/YYYY"
                            persistent-hint
                            prepend-icon="event"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title @input="menu_date_picker = false" :rules="dateRules" required></v-date-picker>
                </v-menu>
            </v-flex>

            <v-text-field
                    v-model="nombres"
                    :rules="imputRules"
                    label="Nombres"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="apellidos"
                    :rules="imputRules"
                    label="Apellidos"
                    required
            ></v-text-field>
            <v-combobox
                    v-model="select_sexo"
                    :items="sexos"
                    :rules="imputRules"
                    label="Seleccione Sexo"
                    required
            ></v-combobox>
            <v-combobox
                    v-model="select_tipo_doc"
                    :items="tipo_doc"
                    :rules="imputRules"
                    label="Tipo de Documento"
                    required
            ></v-combobox>
            <v-text-field
                    v-model="nro_documento"
                    :rules="imputRules"
                    label="Número de Documento"
                    required
            ></v-text-field>
            <v-combobox
                    v-model="select_provincia"
                    :items="provincias"
                    :rules="imputRules"
                    label="Provincia"
                    required
            ></v-combobox>
            <v-combobox
                    v-model="select_localidad"
                    :items="localidades"
                    :rules="imputRules"
                    label="Localidad"
                    required
            ></v-combobox>
            <v-text-field
                    v-model="direccion"
                    :rules="imputRules"
                    label="Dirección"
                    required
            ></v-text-field>

            <v-flex xs12>
                <v-textarea
                        v-model="comentarios"
                        name="comentario_alumno"
                        label="Comentarios (opcional)"
                        hint="Algo que nos quiera hacer saber"
                        color="primary"
                        counter="100"
                ></v-textarea>
            </v-flex>
        </v-form>
        <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
        <v-btn color="primary" @click="goForward">Continuar <v-icon>navigate_next</v-icon></v-btn>
    </v-container>
</template>

<script>
  import router from '../../router'

  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones - Nuevo Alumno");
    },
    name: "alumno",
    data: () => ({
      date: null,
      dateRules:[
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      dateFormatted: null,
      menu_date_picker: false,
      valid: false,
      nombres: '',
      imputRules: [
        v => !!v || 'Campo Requerido',
        v => (!v || v.length >= 3) || 'El campo debe tener más de 3 caracteres'
      ],
      apellidos: '',
      emailRules: [
        v => !!v || 'Campo Requerido',
        v => /.+@.+/.test(v) || 'El E-mail debe ser valido'
      ],
      select_sexo:"",
      sexos:["Femenino","Masculino"],
      select_tipo_doc:"",
      tipo_doc:["Documento Nacional de Identidad"],
      nro_documento:"",
      select_provincia:"",
      provincias:["Tierra del Fuego"],
      select_localidad:"",
      localidades:["Rio Grande","Tolhuin","Ushuaia"],
      direccion:"",
      comentarios:""
      // items: [
      //   {
      //     text: 'Paso 1',
      //     disabled: false
      //   },
      //   {
      //     text: 'Paso 2',
      //     disabled: false
      //   },
      //   {
      //     text: 'Paso3',
      //     disabled: true
      //   }
      // ]
    }),

    computed: {
      alumno(){
        return store.state.alumno
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date (val) {
        // this.alumno.fecha_nac = this.formatDate(this.date);
      },
      comentarios(val){
        // this.alumno.comentarios = this.comentarios
      }
    },
    methods:{
      goForward:function(){
        this.alumno.nombres = this.nombres;
        this.alumno.apellidos = this.apellidos;
        this.alumno.fecha_nac = this.formatDate(this.date);
        this.alumno.sexo = this.select_sexo;
        this.alumno.tipo_doc = this.select_tipo_doc;
        this.alumno.nro_doc = this.nro_documento;
        this.alumno.provincia = this.select_provincia;
        this.alumno.localidad = this.select_localidad;
        this.alumno.direccion = this.direccion;
        this.alumno.comentarios = this.comentarios;

        router.push('/inscripciones/centros');
      },
      goBack:function(){
        router.go(-1);
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style scoped>

</style>