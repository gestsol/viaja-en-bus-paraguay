<template>
  <v-app>
    <template>
      <v-parallax :src="src1" :height="windowSize.y / 1.2">
        <v-layout row wrap align-center justify-center>


          <v-flex xs12 sm6 class="pa-5 mt-5">

            <v-layout row wrap align-center>

              <v-flex xs12 class="mb-5 mt-5">
                <img src="/static/imgs/logos/pchTotem.png" alt="">
              </v-flex>

              <v-flex xs12 class="mt-5">

                <span class="hidden-md-and-down">
                  <p class="display-3">
                    <b>
                      Disfruta los beneficios de comprar en los tótems
                    </b>
                  </p>
                </span>

                <span class="hidden-lg-and-up">
                  <p class="display-1">
                    <b>
                      Disfruta los beneficios de comprar en los tótems
                    </b>
                  </p>
                </span>

                <h2 class="mt-5">
                  <p>Ubicados en el terminal sur</p>

                  <p>Santiago Chile</p>
                </h2>
              </v-flex>


            </v-layout>

          </v-flex>

          <v-flex sm6 justify-center class="mt-5 text-xs-center hidden-xs-only">
            <img src="/static/imgs/others/totemFull.png" alt="" class="totemFullHeight">
          </v-flex>


        </v-layout>
      </v-parallax>
      <v-parallax :src="src2" :height="windowSize.y / 1.2">
        <v-layout row wrap align-center justify-center>


          <v-flex xs12 sm6 class="pa-5 mt-5">

            <v-layout row wrap align-center>


              <v-flex xs12 class="mt-5">

                <span class="hidden-md-and-down">
                  <p class="display-3">
                    <b>
                      Descubre como funcionan
                      los tótem y compra sin problemas
                    </b>
                  </p>
                </span>

                <span class="hidden-lg-and-up">
                  <p class="display-1">
                     <b>
                      Descubre como funcionan
                      los tótem y compra sin problemas
                    </b>
                  </p>
                </span>

              </v-flex>
            </v-layout>

          </v-flex>

          <v-flex sm6 justify-center class="mt-5 text-xs-center hidden-sm-and-down">
            <img src="/static/imgs/others/totemHalf.png" alt="" class="totemHalfHeight">
          </v-flex>


        </v-layout>
      </v-parallax>
    </template>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        src1: '/static/imgs/background/totem3.jpg',
        src2: '/static/imgs/background/totem2.jpg',
        windowSize: {
          x: 0,
          y: 0
        }
      }
    },
    mounted () {
      this.onResize()
    },
    methods: {
      onResize () {
        this.windowSize = {x: window.innerWidth, y: window.innerHeight}
      }
    }
  }
</script>

<style>
  .totemFullHeight {
    width: 20vh;
  }

  .totemHalfHeight {
    width: 50vh;
  }
</style>
