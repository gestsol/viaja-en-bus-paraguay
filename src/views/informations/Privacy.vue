<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan :subHeader="this.translate('privacy')" :logo="true" img="/static/imgs/background/Viaja-en-bus-sitio-web4.png" :blue="true"></parallax-slogan>

        <section>
          <v-layout
            column
            wrap
            align-center
          >
            <v-flex xs11 md8 class="mt-5">
              <div class="justifyText">
                <p class="caption" v-lang.privacy_document1></p>
                <p class="caption" v-lang.privacy_document2></p>
                <p class="caption" v-lang.privacy_document3></p>
                <p class="caption" v-lang.privacy_document4></p>
                <p class="caption" v-lang.privacy_document5></p>
                <p class="caption">
                  {{translate('privacy_document6')}}
                  <ul class="ml-3">
                    <li v-lang.privacy_document6_1></li>
                    <li v-lang.privacy_document6_2></li>
                    <li v-lang.privacy_document6_3></li>
                    <li v-lang.privacy_document6_4></li>
                    <li v-lang.privacy_document6_5></li>
                  </ul>
                </p>
                <p class="caption" v-lang.privacy_document7></p>
                <p class="caption" v-lang.privacy_document8></p>
                <p class="caption" v-lang.privacy_document9></p>
                <p class="caption" v-lang.privacy_document10></p>
                <p class="caption" v-lang.privacy_document11></p>
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

<style scoped>
  .p-block {
    display: block;
  }
</style>
