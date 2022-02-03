<template>
  <v-app>
    <template>
      <v-content>
        <BannerTop />

        <v-container class="bus-font">
          <v-layout row wrap class="mt-5">
            <v-flex sm6 offset-sm3 md4 offset-md4 lg4 offset-lg4 xs12>
              <v-card color="primary" dark class="rounded-search-box">
                <v-card-title>
                  <v-container>
                    <v-layout column>
                      <v-form v-model="validForm">
                        <v-flex xs12>
                          <v-text-field
                            v-model="email"
                            :label="translate('email')"
                            outline-1
                            color="grey lighten-4"
                            :rules="emailRules"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <v-text-field
                            v-model="password"
                            :label="translate('password')"
                            :append-icon="see ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (see = !see)"
                            :type="see ? 'password' : 'text'"
                            outline-1
                            color="grey lighten-4"
                            :rules="passwordRules"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <div class="small-text-container">
                            <router-link to="/sign_up">
                              <small class="small-text" v-lang.sign_up></small>
                            </router-link>
                            <router-link to="/send_pass">
                              <small class="small-text" v-lang.forgot></small>
                            </router-link>
                          </div>
                        </v-flex>

                        <v-flex md10 offset-md1 xs12 class='pt-3'>
                          <v-btn :disabled="!validForm || loading" block class='white--text search-font rounded-search' color="error" @click='login'>
                            <template v-if="loading">
                                <v-progress-circular indeterminate color="primarylight"></v-progress-circular>
                            </template>
                            <template v-else>
                              <span v-lang.login></span>
                            </template>
                          </v-btn>
                        </v-flex>
                      </v-form>
                    </v-layout>
                  </v-container>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <div class="spacer"/>
  </v-app>
</template>

<script>
  import moment from 'moment'
  import validations from '@/helpers/fieldsValidation'
  import API from '@/services/api/session'

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
        see: true,
        email: '',
        password: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          validations.emailValidation
        ],
        passwordRules: [
          (v) => !!v || 'Ingrese contraseña',
          validations.passwordValidation
        ]
      }
    },
    methods: {
      login () {
        this.loading = true
        API.auth({usuario: this.email, password: this.password})
        .then(response => {
          const data = JSON.parse(JSON.stringify(response.data))
          if (!data.exito) {
            this.$notify({
              group: 'error',
              title: this.translate('login'),
              type: 'error',
              text: this.translate('login_error')
            })
            return
          }
          let completeName = data.usuario.apellidoPaterno ? data.usuario.apellidoPaterno + ' ' : ''
          completeName = data.usuario.apellidoMaterno ? completeName + data.usuario.apellidoMaterno : completeName
          completeName = data.usuario.nombre + ' ' + completeName.trim()
          const paymentInfo = {
            name: data.usuario.nombre,
            rut: data.usuario.rut,
            email: data.usuario.email.toLowerCase(),
            movil: null,
            completeName
          }
          data.usuario.email = data.usuario.email.toLowerCase()
          data.usuario.fechaCreacion = moment(data.usuario.fechaCreacion).format('DD-MM-YYYY')
          data.usuario.fechaNacimiento = moment(data.usuario.fechaNacimiento).format('DD-MM-YYYY')
          this.$store.dispatch('SET_USER',
            {
              userData: {
                token: data.token,
                usuario: data.usuario,
                payment_info: paymentInfo,
                cambiaClave: data.cambiaClave,
                urlInicial: data.urlInicial,
                active: true
              }
            }
          )
          if (this.$route.query.fromService) {
            this.$store.dispatch('SET_STEP', {step: 2})
            this.$router.push({ path: '/services', query: { fromLogin: true } })
          } else {
            this.$router.push({path: '/'})
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
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
    color: white;
  }

  .spacer {
    height: 20vh;
  }

  .rounded-search-box {
    border-radius: 10px !important;
  }
</style>
