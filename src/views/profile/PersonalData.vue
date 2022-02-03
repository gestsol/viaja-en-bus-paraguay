<template>
  <v-app>
    <template>
      <v-card>
        <v-card-title>
          <v-container>
            <v-form v-model="validForm">
              <v-layout row wrap>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="name"
                      :label="translate('name')"
                      outline-1
                      color="primary"
                      :rules="generalRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="m_lastname"
                      :label="translate('m_lastname')"
                      outline-1
                      color="primary"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="f_lastname"
                      :label="translate('f_lastname')"
                      outline-1
                      color="primary"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-layout row>
                      <v-flex xs3 class="ml-3 mr-3">
                        <v-select
                          :items="days"
                          v-model="day"
                          label="d"
                          color="primary"
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex xs3 class="ml-3 mr-3">
                        <v-select
                          :items="months"
                          v-model="month"
                          label="m"
                          color="primary"
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex xs3 class="ml-3 mr-3">
                        <v-select
                          :items="years"
                          v-model="year"
                          :label="translate('short_year')"
                          color="primary"
                          autocomplete
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <label v-lang.doc_type></label>
                    <v-radio-group v-model="doc_type" row>
                      <v-radio label="C.I Chileno" value="f" color="primary"></v-radio>
                      <v-radio :label="translate('other')" value="m" color="primary"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="rut"
                      :label="'Nº ' + translate('document')"
                      outline-1
                      color="primary"
                      :rules="rutRules"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      :label="translate('email')"
                      outline-1
                      color="primary"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      v-model="confirmemail"
                      :rules="emailconfirmRules"
                      :label="translate('confirm_email')"
                      outline-1
                      color="primary"
                    ></v-text-field>
                  </v-flex>
                  <v-flex  xs12 lg5 class="ml-3 mr-3">
                    <v-text-field
                      prefix="+569"
                      :label="translate('mobile')"
                      clearable
                      placeholder=" "
                      :hint="translate('insert_mobile')"
                      v-model="movil"
                      mask="#### ####"/>
                  </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-title>
      </v-card>
      <div class='pt-3'>
        <v-btn class='white--text search-font rounded-search' :disabled="!validForm || loading" color="error" @click="modify">
          <span v-lang.save></span>
        </v-btn>
        <v-btn class='white--text search-font rounded-search' :disabled="loading" color="darkgrey" @click="clear">
          <span v-lang.undo></span>
        </v-btn>
      </div>
    </template>
  </v-app>
</template>

<script>
  // Base components
  import API from '@/services/api/session'
  import HeaderApp from '@c/Header'
  import FooterApp from '@c/Footer'
  import ParallaxSlogan from '@c/ParallaxSlogan'
  import validations from '@/helpers/fieldsValidation'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      HeaderApp,
      FooterApp,
      ParallaxSlogan
    },
    data () {
      return {
        loading: false,
        validForm: false,
        seePassword: true,
        seePassword2: true,
        name: '',
        day: '',
        days: Array.from({length: 31}, (v, k) => k + 1),
        month: '',
        months: Array.from({length: 12}, (v, k) => k + 1),
        year: '',
        years: Array.from({length: 81}, (v, k) => k + 1940),
        m_lastname: '',
        f_lastname: '',
        gender: '',
        doc_type: 'f',
        email: '',
        confirmemail: '',
        password: '',
        confirmpassword: '',
        movil: '',
        rut: '',
        terms: '',
        info: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          validations.emailValidation
        ],
        emailconfirmRules: [
          (v) => (v && this.email === v) || 'E-mails no coinciden'
        ],
        passwordRules: [
          (v) => !!v || 'Contraseña es requerido',
          validations.passwordValidation
        ],
        passwordconfirmRules: [
          (v) => (v && this.password === v) || 'Contraseñas no coinciden'
        ],
        rutRules: [
          (v) => !!v || 'Rut es requerido',
          validations.rutValidation
        ],
        generalRules: [
          (v) => !!v || 'Este campo es requerido'
        ]
      }
    },
    mounted () {
      this.clear()
      this.$parent.$parent.$data.title = 'my_profile'
    },
    computed: {
      ...mapGetters({
        userData: ['userData']
      })
    },
    methods: {
      async modify () {
        this.loading = true
        const {usuario} = Object.assign({}, this.userData)
        const params = {
          rut: this.rut,
          email: this.email,
          nombre: this.name,
          apellidoMaterno: this.m_lastname,
          apellidoPaterno: this.f_lastname,
          fechaCreacion: usuario.fechaCreacion,
          telefono: '+569' + this.movil,
          fechaNacimiento: `${this.day}-${this.month}-${this.year}`
        }
        const response = await API.signup(params)
        this.loading = false
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: 'Actualizar datos',
            type: 'error',
            text: 'Ocurrió un error al actualizar datos, intentelo mas tarde'
          })
          console.error(response.data)
        } else {
          this.$notify({
            group: 'info',
            title: 'Datos actualizados',
            type: 'info'
          })
          const newUsuario = Object.assign({}, usuario, params)
          const userData = {...this.userData, usuario: newUsuario}
          this.$store.dispatch('SET_USER', {userData})
        }
      },
      clear () {
        const {usuario} = this.userData
        const {day, month, year} = this.formatDate(usuario.fechaNacimiento)
        this.name = usuario.nombre
        this.m_lastname = usuario.apellidoMaterno
        this.f_lastname = usuario.apellidoPaterno
        this.email = usuario.email
        this.confirmemail = usuario.email
        this.rut = usuario.rut
        this.movil = usuario.telefono.substr(4, usuario.telefono.length - 4)
        this.day = day
        this.month = month
        this.year = year
      },
      formatDate (date) {
        const [day, month, year] = date.split('-').map((item) => {
          return parseInt(item)
        })
        return {day, month, year}
      }
    }
  }
</script>

<style scoped>
</style>