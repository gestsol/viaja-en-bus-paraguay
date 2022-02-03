<template>
  <v-app>
    <template>
      <v-content>
        <BannerTop />

        <v-container class="bus-font">
          <h1 class="primary-color mb-2 text-xs-center" v-lang.change_password2></h1>
          <p class="text-xs-center" v-lang.send_email></p>
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
                        <v-flex md10 offset-md1 xs12 class='pt-3'>
                          <v-btn block class='white--text search-font rounded-search' color="error"
                          @click='sendEmail'
                          :disabled="!validForm || loading">
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
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          validations.emailValidation
        ]
      }
    },

    methods: {
      async sendEmail () {
        this.loading = true
        const response = await API.forgotPassword({email: this.email})
        this.loading = false
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: this.translate('send_password'),
            type: 'error',
            text: this.translate('send_password_error')
          })
          console.error(response.data)
        } else {
          this.$notify({
            group: 'info',
            title: this.translate('send_password_success'),
            type: 'info'
          })
          this.$router.push({path: '/change_pass'})
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
