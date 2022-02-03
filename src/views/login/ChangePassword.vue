<template>
  <v-app>
    <template>
      <v-content>
        <BannerTop />

        <v-container class="bus-font">
          <h1 class="primary-color mb-2 text-xs-center" v-lang.change_password2></h1>
          <p class="text-xs-center" v-lang.change_password_data></p>
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
                            v-model="oldpassword"
                            label="Codigo"
                            :append-icon="seePassword ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (seePassword = !seePassword)"
                            :type="seePassword ? 'password' : 'text'"
                            outline-1
                            color="grey lighten-4"
                            :rules="codeRules"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            v-model="password"
                            :label="translate('password')"
                            :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (seePassword2 = !seePassword2)"
                            :type="seePassword2 ? 'password' : 'text'"
                            outline-1
                            color="grey lighten-4"
                            :rules="passwordRules"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            v-model="confirmpassword"
                            :label="translate('confirm_password')"
                            outline-1
                            :rules="passwordconfirmRules"
                            :append-icon="seePassword3 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (seePassword3 = !seePassword3)"
                            :type="seePassword3 ? 'password' : 'text'"
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex md10 offset-md1 xs12 class='pt-3'>
                          <v-btn :disabled="!validForm || loading" block class='white--text search-font rounded-search' color="error" @click='changePassword'>
                            <template v-if="loading">
                              <v-progress-circular indeterminate color="primarylight"></v-progress-circular>
                            </template>
                            <template v-else>
                              <span v-lang.send></span>
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
  import API from '@/services/api/session'
  import validations from '@/helpers/fieldsValidation'

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
        seePassword3: true,
        email: '',
        oldpassword: '',
        password: '',
        confirmpassword: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          validations.emailValidation
        ],
        codeRules: [
          (v) => !!v || 'Codigo es requerido'
        ],
        passwordRules: [
          (v) => !!v || 'Ingrese contraseña',
          validations.passwordValidation
        ],
        passwordconfirmRules: [
          (v) => (v && this.password === v) || 'Contraseñas no coinciden'
        ]
      }
    },
    methods: {
      async changePassword () {
        this.loading = true
        const params = {
          email: this.email,
          password: this.oldpassword,
          nuevaPassword: this.password
        }
        const response = await API.changePassword(params)
        this.loading = false
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: this.translate('change_password'),
            type: 'error',
            text: this.translate('change_password_error')
          })
          console.error(response.data)
        } else {
          this.$notify({
            group: 'info',
            title: this.translate('change_password_success'),
            type: 'info'
          })
          this.$router.push({path: '/'})
        }
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
