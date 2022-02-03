<template>
  <v-app>
    <template>
      <v-content>
        <!-- <parallax-slogan subHeader="¿Quiénes somos?" :logo="true" img="/static/imgs/background/03.jpg"></parallax-slogan> -->
        <section class="about">
          <div class="background-blue"/>
          <img src="/static/imgs/background/03.jpg" class="image-about">
          <v-layout
            column
            align-center
            justify-center
            class="white--text image-description"
          >
            <h1 class="white--text mb-2 display-3 text-xs-center text-title-about">
              <b v-lang.us></b>
            </h1>
          </v-layout>
        </section>
        <section>
          <v-layout
            column
            wrap
            align-center
          >
            <v-flex xs11 md8 class="mt-5 mb-5">
              <div class="justifyText">
                <p class="subheading"><b v-lang.about_title1></b></p>
                <p class="body-1" v-lang.about_document1></p>
                <p class="subheading"><b v-lang.about_title2></b></p>
                <p class="body-1" v-lang.about_document2></p>
                <p class="body-1" v-lang.about_document3></p>
                <p class="subheading"><b v-lang.about_title3></b></p>
                <p class="body-1" v-lang.about_document4></p>
                <p class="body-1" v-lang.about_document5></p>
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

  .text-title-about {
    z-index: 2
  }

  .background-blue {
    position: absolute;
    background-color: var(--var-dark-blue);
    opacity: 0.2;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .about {
    position: relative;
    height: 50vh;
    overflow: hidden;
  }

  .image-about {
    position: absolute;
    object-fit: fill;
    width: 100vw;
    height: 60vw;
    background-color: #6DB3F2
  }

  .image-description {
    position: absolute;
    top: 45%;
    left: 0;
    right: 0;
  }

  @media (max-width: 650px) {
    .image-about {
      top: 0;
      height: 100%;
    }
  }
</style>
