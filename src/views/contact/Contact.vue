<template>
  <v-app>
    <template>
      <v-content>
        <BannerTop />

        <v-container class="bus-font">
          <v-layout row wrap class="mt-5">
            <v-flex sm8 offset-sm2 md8 offset-md2 lg8 offset-lg2 xs12>
              <h1 class="register-title primary-color mb-2 ml-5" v-lang.contact></h1>
              <v-card color="primary" dark class="rounded-search-box">
                <v-card-title>
                  <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="name"
                            :label="translate('name')"
                            outline-1
                            color="red"
                            :rules="generalRules"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="lastname"
                            :label="translate('lastname')"
                            outline-1
                            color="grey lighten-4"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            prefix="+569"
                            placeholder=" "
                            v-model="movil"
                            :label="translate('mobile')"
                            outline-1
                            mask="#### ####"
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg5 class="ml-3 mr-3">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            :label="translate('email')"
                            outline-1
                            color="grey lighten-4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="ml-3 mr-3">
                          <v-text-field
                            name="input-7-1"
                            label="Nota"
                            color="grey lighten-4"
                            multi-line
                          ></v-text-field>
                        </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
              </v-card>

              <v-layout row wrap class="pl-5 pr-5">
                <v-flex md3 xs12 class='pt-3'>
                  <v-btn block class='white--text search-font rounded-search' color="error">
                    <span v-lang.send></span>
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
  import BannerTop from '@c/BannerTop'
  import ParallaxSlogan from '@c/ParallaxSlogan'

export default {
    components: {
      BannerTop,
      ParallaxSlogan
    },

    data () {
      return {
        validForm: false,
        name: '',
        lastname: '',
        email: '',
        movil: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          (v) => /^.+@.+\..+$/.test(v) || 'E-mail debe ser valido'
        ],
        generalRules: [
          (v) => !!v || 'Este campo es requerido'
        ]
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
