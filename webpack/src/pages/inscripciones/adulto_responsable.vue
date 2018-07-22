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

        <v-flex xs12 sm6 md4 lg3>
            <v-combobox
                    v-model="datos.select_vinculo"
                    :items="items_vinculo"
                    :rules="imputRules"
                    label="Vinculo"
                    required
            ></v-combobox>

            <v-text-field
                    v-model="datos.nombres"
                    :rules="imputRules"
                    label="Nombres"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="datos.apellidos"
                    :rules="imputRules"
                    label="Apellidos"
                    required
            ></v-text-field>

            <v-menu
                    :close-on-content-click="false"
                    v-model="datos.menu_date_picker"
                    :nudge-right="40"
                    lazy
                    transition="sczale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                <v-text-field
                        slot="activator"
                        v-model="computedDateFormatted"
                        label="Fecha de Nacimiento"
                        hint="DD/MM/YYYY"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker v-model="datos.fecha_nac" no-title @input="datos.menu_date_picker = false" ></v-date-picker>
            </v-menu>

            <v-combobox
                    v-model="datos.sexo"
                    :items="items_sexo"
                    :rules="imputRules"
                    label="Sexo"
                    required
            ></v-combobox>

            <v-combobox
                    v-model="datos.select_tipo_doc"
                    :items="items_tipo_doc"
                    :rules="imputRules"
                    label="Tipo de Documento"
                    required
            ></v-combobox>

            <v-text-field
                    v-model="datos.nro_documento"
                    :rules="imputRules"
                    label="Número de Documento"
                    hint="Sin Puntos de separación"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="datos.email"
                    :rules="emailRules"
                    label="E-Mail"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="datos.telefono"
                    :rules="imputRules"
                    label="Teléfono"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="datos.telefono_alternativo"
                    :rules="imputRules"
                    label="Teléfono Alternativo"
                    required
            ></v-text-field>

            <v-combobox
                    v-model="datos.provincia"
                    :items="items_provincia"
                    :rules="imputRules"
                    label="Provincia"
                    required
            ></v-combobox>

            <v-combobox
                    v-model="datos.localidad"
                    :items="items_localidad"
                    :rules="imputRules"
                    label="Localidad"
                    required
            ></v-combobox>

            <v-text-field
                    v-model="datos.direccion"
                    :rules="imputRules"
                    label="Dirección"
                    required
            ></v-text-field>

            <v-textarea
                    v-model="datos.comentario"
                    label="Comentarios"
                    hint="Algo que nos quiera hacer saber"
                    color="primary"
                    counter="100"
            ></v-textarea>
            <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
            <v-btn color="light-green lighten-1" @click="sendRequest">Guardar</v-btn>
        </v-flex>


    </v-container>
</template>

<script>
  import router from '../../router'

  export default {
    created: function(){
      store.commit('updateTitle',"Inscripciones - Responsable");
      this.datos = this.user;
    },
    name: "adulto_responsable",
    data: ()=>({
      menu_date_picker: false,
      imputRules: [
        v => !!v || 'Campo Requerido',
        v => (!v || v.length >= 3) || 'El campo debe tener más de 3 caracteres'
      ],
      emailRules: [
        v => !!v || 'Campo Requerido',
        v => /.+@.+/.test(v) || 'El E-Mail debe ser valido'
      ],
      select_vinculo:"",
      items_vinculo:["Madre","Padre","Tutor"],
      select_tipo_doc:"",
      items_tipo_doc:["DNI"],
      items_sexo:["Masculino","Femenino"],
      items_provincia:["Tierra del Fuego"],
      items_localidad:["Rio Grande","Ushuaia","Tolhuin"],
      datos:[],
      items: [
        {
          text: 'Paso 1',
          disabled: false
        },
        {
          text: 'Paso 2',
          disabled: true
        },
        {
          text: 'Paso3',
          disabled: true
        }
      ]


    }),
    methods:{
      sendRequest:function(){
        store.commit('UPDATE_DATA',this.datos);
        router.go(-1);

      },
      goBack:function(){
        router.go(-1);
      },
      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null;

        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    },
    computed:{
      user(){
        return store.state.user;
      },
      computedDateFormatted () {
        return this.formatDate(this.datos.fecha_nac)
      }
    }
  }
</script>

<style scoped>

</style>