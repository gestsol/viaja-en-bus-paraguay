<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan :subHeader="translate('terms')" :logo="true" img="/static/imgs/background/Viaja-en-bus-sitio-web4.png" :blue="true"></parallax-slogan>

        <section>
          <v-layout
            column
            wrap
            align-center
          >
            <v-flex xs11 md8 class="mt-5">
              <div class="justifyText">
                <p class="subheading"><b v-lang.term_of_use_title1></b></p>
                <p class="caption" v-lang.term_of_use_document1></p>
                <p class="caption" v-lang.term_of_use_document1_1></p>
                <p class="subheading"><b v-lang.term_of_use_title2></b></p>
                <p class="caption" v-lang.term_of_use_document2></p>
                <p class="caption" v-lang.term_of_use_document2_1></p>
                <p class="caption" v-lang.term_of_use_document2_2></p>
                <p class="caption" v-lang.term_of_use_document2_3></p>
                <p class="subheading"><b v-lang.term_of_use_title3></b></p>
                <p class="caption" v-lang.term_of_use_document3></p>
                <p class="subheading"><b v-lang.term_of_use_title4></b></p>
                <p class="caption">
                  {{translate('term_of_use_document4')}}
                  <ul class="ml-3">
                    <li v-lang.term_of_use_document4_1></li>
                    <li v-lang.term_of_use_document4_2></li>
                    <li v-lang.term_of_use_document4_3></li>
                    <li v-lang.term_of_use_document4_4></li>
                  </ul>
                </p>

                <p class="subheading"><b v-lang.term_of_use_title5></b></p>
                <p class="caption" v-lang.term_of_use_document5></p>

                <p class="subheading"><b v-lang.term_of_use_title6></b></p>
                <p class="caption">
                  {{translate('term_of_use_document6')}}
                  <span class="p-block" v-lang.term_of_use_document6_1></span>
                  <span class="p-block" v-lang.term_of_use_document6_2></span>
                  <span class="p-block" v-lang.term_of_use_document6_3></span>
                  <span class="p-block" v-lang.term_of_use_document6_4></span>
                  <span class="p-block" v-lang.term_of_use_document6_5></span>
                  {{translate('term_of_use_document7')}}
                </p>

                <p class="subheading"><b v-lang.term_of_use_title7></b></p>
                <p class="caption" v-lang.term_of_use_document8></p>
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
