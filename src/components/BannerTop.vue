<template>
  <v-container fluid class="pa-0 pt-3">
    <img style="width: 100vw" src="/static/imgs/banners/viaja-en-bus/paraguay_banner.png" alt="paraguay-banner">
    <!-- <div class="services-banner">
      <v-carousel
        hide-delimiters
        hide-controls
        class="carousel_fullscreen"
        id="carousel-view"
      >
        <v-carousel-item
          v-for="(item, i) of items"
          :key="i"
          :src="item.src"
          transition="fade"
        />
      </v-carousel>
    </div> -->
  </v-container>
</template>

<script>
export default {
  name: 'BannerTop',

  data () {
    return {
      items: [
        // {
        //   src: '/static/imgs/banners/viaja-en-bus/cybermonday.png'
        // },
        {
          src: '/static/imgs/banners/viaja-en-bus/paraguay_banner.png'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.services-banner .carousel.carousel_fullscreen
  position relative
  height 180px
  @media screen and (min-width: 1920px)
    height 283px
</style>
