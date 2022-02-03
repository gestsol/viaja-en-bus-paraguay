<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan :subHeader="translate('payment_methods') + '.'" :logo="true"  img="/static/imgs/background/05.jpg" :blue="true"></parallax-slogan>

        <section>
          <v-layout
            column
            wrap
            align-center
          >
            <v-flex xs11 md8 class="mt-5 mb-5">
              <div class="justifyText">


                <p class="subheading" v-lang.payment_document></p>
                <div class="text-xs-center mt-5">
                  <img src="/static/imgs/brands/web-pay-plus.png" alt="webpay" class="webpayImage">
                </div>
              </div>
            </v-flex>

          </v-layout>
        </section>

        <section>
          <parallax-slogan></parallax-slogan>
        </section>
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
    max-width: 400px;
  }
</style>
