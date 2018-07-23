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

          <!-- Vinculo -->
          <v-combobox
                  v-model="responsable.vinculo"
                  :items="items_vinculo"
                  :rules="inputRules"
                  label="Vinculo"
                  required
          ></v-combobox>

          <!-- Nombres -->
          <v-text-field
                  v-model="responsable.nombres"
                  :rules="inputRules"
                  label="Nombres"
                  required
          ></v-text-field>

          <!-- Apellidos -->
          <v-text-field
                  v-model="responsable.apellidos"
                  :rules="inputRules"
                  label="Apellidos"
                  required
          ></v-text-field>

          <!-- Fecha de nacimiento -->
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

          <!-- Sexo -->
          <v-combobox
                v-model="responsable.sexo"
                :items="items_sexo"
                :rules="inputRules"
                label="Sexo"
                required
          ></v-combobox>

          <!-- Tipo de documento -->
          <v-combobox
                  v-model="responsable.documento_tipo"
                  :items="items_tipo_doc"
                  :rules="inputRules"
                  label="Tipo de Documento"
                  required
          ></v-combobox>

          <!-- Numero de documento -->
          <v-text-field
                  v-model="responsable.documento_nro"
                  :rules="inputRules"
                  label="Número de Documento"
                  hint="Sin Puntos de separación"
                  required
          ></v-text-field>

          <!-- Email -->
          <v-text-field
                  v-model="responsable.email"
                  :rules="emailRules"
                  label="E-Mail"
                  required
          ></v-text-field>

          <!-- Telefonon nro -->
          <v-text-field
                  v-model="responsable.telefono_nro"
                  :rules="inputRules"
                  label="Teléfono"
                  required
          ></v-text-field>

          <!-- Ciudad -->
          <v-combobox
                  v-model="responsable.ciudad"
                  :items="items_localidad"
                  :rules="inputRules"
                  label="Localidad"
                  required
          ></v-combobox>

          <!-- Calle nombre -->
          <v-text-field
                  v-model="responsable.calle_nombre"
                  :rules="inputRules"
                  label="Calle nombre"
                  required
          ></v-text-field>

          <!-- Calle numero -->
          <v-text-field
                  v-model="responsable.calle_nro"
                  :rules="inputRules"
                  label="Calle número"
                  required
          ></v-text-field>

          <!-- Depto casa -->
          <v-text-field
                  v-model="responsable.depto_casa"
                  label="Depto / Casa (letra o número)"
                  required
          ></v-text-field>

          <!-- Tira edificio -->
          <v-text-field
                  v-model="responsable.tira_edificio"
                  label="Tira / Edificio (letra o número)"
                  required
          ></v-text-field>

          <!-- Comentario -->
          <v-textarea
                  v-model="responsable.observaciones"
                  label="Indique instituciones de preferencia"
                  hint="Puede redactar otra observación de interés"
                  color="primary"
                  counter="100"
          ></v-textarea>

          <v-btn color="primary" @click="goBack"><v-icon>navigate_before</v-icon> Volver</v-btn>
          <v-btn color="light-green lighten-1" @click="createPersona">Guardar</v-btn>
        </v-flex>


    </v-container>
</template>

<script>
  import router from '../../router'

  export default {
    name: "adulto_responsable",
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
      items_tipo_doc:["DNI","CI","LC","LE","Cédula Mercosur","Pasaporte extranjero","Cédula de identidad extranjera","Otro documento extranjero","No posee","En trámite"],
      items_sexo:["Masculino","Femenino"],
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
        }
      ]
    }),
    computed:{
      user(){
        return store.state.user;
      },
      computedDateFormatted () {
        return this.formatDate(this.responsable.fecha_nac)
      }
    },
    created: function(){
      store.commit('updateTitle',"Familiar (Padre, Madre o Tutor)");

      // Se debe setear el tipo de persona a dar de alta
      this.responsable.email = store.state.user.authApi.email;

      this.responsable.familiar = 1;
      //this.responsable.alumno= 1;


      // Permite la edicion de los datos del familiar
      if(store.getters.persona) {
        this.responsable = store.getters.persona;
      }
    },
    methods:{
      createPersona:function(){
        store.dispatch('apiCreatePersona',this.responsable);
      },
      updateProfile:function(){

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
    }
  }
</script>