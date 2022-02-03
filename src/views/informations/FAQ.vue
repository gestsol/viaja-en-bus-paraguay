<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan :subHeader="translate('faq') + ' (FAQ).'" :logo="true" img="/static/imgs/background/01.jpg" :blue="true"></parallax-slogan>

        <section>
          <v-layout
            column
            wrap
            align-center
          >
            <v-flex xs11 md8 class="mt-5">
              <div class=" justifyText">

                <p class="subheading"><b v-lang.faq_title1></b></p>
                <p class="body-1" v-lang.faq_document1></p>
                <p class="subheading"><b v-lang.faq_title2></b></p>
                <p class="body-1" v-lang.faq_document2></p>
                <br>
                <br>
                <h1 class="text-xs-center" v-lang.faq_title3></h1>
                <br>
                <br>
                <p class="subheading"><b v-lang.faq_title4></b></p>
                <p class="body-1">
                  <ol class="ml-3">
                    <li v-lang.faq_document3_1></li>
                    <li v-lang.faq_document3_2></li>
                    <li v-lang.faq_document3_3></li>
                    <li v-lang.faq_document3_4></li>
                    <!-- <li v-lang.faq_document3_5></li> -->
                    <li v-lang.faq_document3_6></li>
                    <li v-lang.faq_document3_7></li>
                  </ol>
                </p>

                <p class="subheading"><b v-lang.faq_title5></b></p>
                <p class="body-1" v-lang.faq_document4></p>

                <p class="subheading"><b v-lang.faq_title6></b></p>
                <p class="body-1" v-lang.faq_document5></p>

                <p class="subheading"><b v-lang.faq_title7></b></p>
                <p class="body-1" v-lang.faq_document6></p>
                <p class="subheading"><b v-lang.faq_title8></b></p>
                <p class="body-1" v-lang.faq_document7></p>
                <p class="subheading"><b v-lang.faq_title9></b></p>
                <p class="body-1" v-lang.faq_document8></p>
                <p class="p-block" v-lang.faq_document8_1></p>
                <p class="p-block" v-lang.faq_document8_2></p>
                <p class="p-block" v-lang.faq_document8_3></p>
                <p class="subheading"><b v-lang.faq_title10></b></p>
                <p class="body-1" v-lang.faq_document9></p>
                <p class="subheading"><b v-lang.faq_title11></b></p>
                <p class="body-1" v-lang.faq_document10></p>
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

  .informationLogo {
    height: 100%;
    width: 100%;
    max-height: 200px;
    max-width: 500px;
  }
</style>
