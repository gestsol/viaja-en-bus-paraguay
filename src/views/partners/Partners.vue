<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan subHeader="Nuestros partners." :logo="true" img="/static/imgs/background/04.jpg" :blue="true"></parallax-slogan>

        <v-container>
          <v-layout
            row
            wrap
            align-center
          >
            <v-flex xs6 md6 class="mt-5 mb-5">
              <img src="static/imgs/logos/mt-bus.png" class="webpayImage">
            </v-flex>

            <v-flex xs6 md6 class="mt-5 mb-5">
              <img src="static/imgs/logos/pullman.png" class="webpayImage">
            </v-flex>

            <v-flex xs6 md6 class="mt-5 mb-5">
              <img src="static/imgs/logos/mt-bus.png" class="webpayImage">
            </v-flex>

            <v-flex xs6 md6 class="mt-5 mb-5">
              <img src="static/imgs/logos/pullman.png" class="webpayImage">
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
  </v-app>
</template>

<script>
  import ParallaxSlogan from '@c/ParallaxSlogan'

  export default {
    components: {
      ParallaxSlogan
    }
  }
</script>

<style>
  .webpayImage {
    width: 100%;
    max-width: 200px;
  }
</style>
