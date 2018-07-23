<template>
    <v-container fluid text-xs-center>
        <div>
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
        </div>

        <v-flex xs12 sm6 md4 lg3>
 <v-combobox
                v-model="responsable.vinculo"
                :items="items_vinculo"
                :rules="inputRules"
                label="Vinculo"
                required
        ></v-combobox>

        <v-text-field
                v-model="responsable.nombres"
                :rules="inputRules"
                label="Nombres"
                required
        ></v-text-field>

        <v-text-field
                v-model="responsable.apellidos"
                :rules="inputRules"
                label="Apellidos"
                required
        ></v-text-field>

  <v-menu
                    :close-on-content-click="false"
                    v-model="menu_date_picker"
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
                <v-date-picker v-model="responsable.fecha_nac" no-title @input="menu_date_picker = false" ></v-date-picker>
            </v-menu>

<v-combobox
                v-model="responsable.sexo"
                :items="items_sexo"
                :rules="inputRules"
                label="Sexo"
                required
        ></v-combobox>

        <v-combobox
                v-model="responsable.documento_tipo"
                :items="items_tipo_doc"
                :rules="inputRules"
                label="Tipo de Documento"
                required
        ></v-combobox>

        <v-text-field
                v-model="responsable.documento_nro"
                :rules="inputRules"
                label="Número de Documento"
                hint="Sin Puntos de separación"
                required
        ></v-text-field>

        <v-text-field
                v-model="responsable.email"
                :rules="emailRules"
                label="E-Mail"
                required
        ></v-text-field>

        <v-text-field
                v-model="responsable.telefono_nro"
                :rules="inputRules"
                label="Teléfono"
                required
        ></v-text-field>

        <v-combobox
                v-model="responsable.provincia"
                :items="items_provincia"
                :rules="inputRules"
                label="Provincia"
                required
        ></v-combobox>

        <v-combobox
                v-model="responsable.ciudad"
                :items="items_localidad"
                :rules="inputRules"
                label="Localidad"
                required
        ></v-combobox>

        <v-text-field
                v-model="responsable.direccion"
                :rules="inputRules"
                label="Dirección"
                required
        ></v-text-field>

<v-textarea
                    v-model="responsable.comentario"
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
    name: "adulto_responsable",
    created: function(){
      store.commit('updateTitle',"Inscripciones - Responsable");
      if(store.getters.persona) {
        this.responsable = store.getters.persona;
      }
    },
    data: ()=>({
      inputRules: [
        v => !!v || 'Campo Requerido',
        v => (!v || v.length >= 3) || 'El campo debe tener más de 3 caracteres'
      ],
      emailRules: [
        v => !!v || 'Campo Requerido',
        v => /.+@.+/.test(v) || 'El E-Mail debe ser valido'
      ],
      menu_date_picker:null,
      items_vinculo:["Madre","Padre","Tutor"],
      items_tipo_doc:["DNI"],
      items_sexo:["Masculino","Femenino"],
      items_provincia:["Tierra del Fuego"],
      items_localidad:["Rio Grande","Ushuaia","Tolhuin"],

      responsable:{},
      breadcrumbs: [
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
        store.dispatch('apiCreatePersona',this.responsable);
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
        return this.formatDate(this.responsable.fecha_nac)
      }
    }
  }
</script>