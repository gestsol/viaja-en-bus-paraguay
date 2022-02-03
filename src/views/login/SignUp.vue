<template>
  <v-app>
    <template>
      <v-content>
        <BannerTop />

        <v-container class="bus-font">
          <v-layout row wrap class="mt-5">
            <v-flex sm8 offset-sm2 md8 offset-md2 lg8 offset-lg2 xs12>
              <h1 class="register-title primary-color mb-2 ml-5" v-lang.sign_up></h1>
              <v-card color="primary" dark class="rounded-search-box">
                <v-card-title>
                  <v-container>
                    <v-form v-model="validForm">
                    <v-layout row wrap>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="name"
                            :label="translate('name')"
                            outline-1
                            color="grey lighten-4"
                            :rules="generalRules"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="m_lastname"
                            :label="translate('m_lastname')"
                            outline-1
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="f_lastname"
                            :label="translate('f_lastname')"
                            outline-1
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-layout row>
                            <v-flex xs3 class="ml-3 mr-3">
                              <v-select
                                :items="days"
                                v-model="day"
                                label="d"
                                color="grey lighten-4"
                                autocomplete
                                :rules="dateRules"
                                required
                              ></v-select>
                            </v-flex>
                            <v-flex xs3 class="ml-3 mr-3">
                              <v-select
                                :items="months"
                                v-model="month"
                                label="m"
                                color="grey lighten-4"
                                autocomplete
                                :rules="dateRules"
                                required
                              ></v-select>
                            </v-flex>
                            <v-flex xs3 class="ml-3 mr-3">
                              <v-select
                                :items="years"
                                v-model="year"
                                :label="translate('short_year')"
                                color="grey lighten-4"
                                autocomplete
                                :rules="dateRules"
                                required
                              ></v-select>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <label v-lang.doc_type></label>
                          <v-radio-group v-model="doc_type" row>
                            <v-radio label="C.I Chileno" value="f" ></v-radio>
                            <v-radio :label="translate('other')" value="m"></v-radio>
                          </v-radio-group>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="rut"
                            :label="'Nº ' + translate('document')"
                            outline-1
                            color="grey lighten-4"
                            :rules="rutRules"
                          ></v-text-field>
                        </v-flex>
                        <v-flex  xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            prefix="+569"
                            color="grey lighten-4"
                            :label="translate('mobile')"
                            clearable
                            placeholder=" "
                            :hint="translate('insert_mobile')"
                            v-model="movil"
                            mask="#### ####"/>
                        </v-flex>
                        <!-- <v-flex xs12 lg5 class="ml-3 mr-3">
                          <label v-lang.gender></label>
                          <v-radio-group v-model="gender" row>
                            <v-radio :label="translate('female')" value="f" ></v-radio>
                            <v-radio :label="translate('masculine')" value="m"></v-radio>
                          </v-radio-group>
                        </v-flex> -->
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            :label="translate('email')"
                            outline-1
                            color="grey lighten-4"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="confirmemail"
                            :rules="emailconfirmRules"
                            :label="translate('confirm_email')"
                            outline-1
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="password"
                            :label="translate('password')"
                            :append-icon="seePassword ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (seePassword = !seePassword)"
                            :type="seePassword ? 'password' : 'text'"
                            outline-1
                            color="grey lighten-4"
                            :rules="passwordRules"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="confirmpassword"
                            :label="translate('confirm_password')"
                            outline-1
                            :rules="passwordconfirmRules"
                            :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (seePassword2 = !seePassword2)"
                            :type="seePassword2 ? 'password' : 'text'"
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-form>
                  </v-container>
                </v-card-title>
              </v-card>

              <v-layout row wrap class="pl-5 pr-5">
                <!-- <v-flex lg6 xs12>
                  <v-radio-group v-model="info" row>
                    <v-radio value="info">
                    </v-radio>
                    <label class="signup-label">Deseo recibir informacion de Viajoenbus</label>
                  </v-radio-group>
                </v-flex>
                <v-flex lg6 xs12>
                  <v-radio-group v-model="terms" row>
                    <v-radio value="terms" ></v-radio>
                    <label class="signup-label">Acepto terminos y condiciones</label>
                  </v-radio-group>
                </v-flex> -->
                <v-flex md3 xs12 class='pt-3'>
                  <v-btn block class='white--text search-font rounded-search' color="error" :disabled="!validForm || loading" @click="signup">
                    <span v-lang.sign_up></span>
                  </v-btn>
                </v-flex>
                <v-flex md3 offset-md6 xs12 class='pt-3'>
                  <v-btn block class='search-font rounded-search' flat color="darkgrey" @click="$router.back()">
                    <span v-lang.cancel></span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <div class="spacer"/>
  </v-app>
</template>

<script>
  import API from '@/services/api/session'
  import validations from '@/helpers/fieldsValidation'
  import moment from 'moment'

  import BannerTop from '@c/BannerTop'
  import ParallaxSlogan from '@c/ParallaxSlogan'

  export default {
    components: {
      BannerTop,
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
        doc_type: '',
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
        ],
        dateRules: [
          (v) => !!v || ''
        ]
      }
    },
    methods: {
      async signup () {
        this.loading = true
        const params = {
          rut: this.rut,
          email: this.email,
          nombre: this.name,
          apellidoMaterno: this.m_lastname,
          apellidoPaterno: this.f_lastname,
          estado: 'ACT',
          fechaCreacion: moment(moment(), 'DD-MM-YYYY').format('L').split('/').join('-'),
          fechaNacimiento: `${this.day}-${this.month}-${this.year}`,
          password: this.password,
          telefono: '+569' + this.movil
        }
        console.log('params', params)
        const response = await API.signup(params)
        this.loading = false
        if (response.data.exito) {
          this.$router.push({path: '/login'})
        } else {
          this.$notify({
            group: 'error',
            title: this.translate('sign_up'),
            type: 'error',
            text: this.translate('sign_up_error')
          })
          console.error(response.data)
        }
      }
    }
  }
</script>

<style scoped>
  .signup-label {
    font-size: 14px;
  }

  .register-title {
    font-size: 2.5rem;
  }

  .small-text-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .small-text {
    font-size: 16px;
    text-decoration: underline;
    opacity: 0.7;
    text-align: center;
  }

  .spacer {
    height: 20vh;
  }

  .rounded-search-box {
    border-radius: 10px !important;
  }
</style>
