<template>
  <div>
    <swiper :options="swiperOption" class="swipperBannerContainer">
      <!-- slides -->
      <swiper-slide v-for="(banner,i) in banners" :key="i">
        <img :src="banner.src" alt="" class="swipperBanner">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'Promotions_advertising',
    data () {
      return {
        banners: [
          {src: '/static/imgs/banners/1.jpg'},
          {src: '/static/imgs/banners/2.jpg'},
          {src: '/static/imgs/banners/3.jpg'}
        ],
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 100 * 1000,
            disableOnInteraction: false
          }
        }
      }
    }
  }
</script>

<style>
  div.swiper-slide.swiper-slide-active{
    width: 100%;
  }
  .swipperBannerContainer{
    width: 100%;
  }
  .swipperBanner {
    width: 100%;
    height: 30vw;
    min-height: 150px;
    max-height: 400px;
    min-width: 400px;
    margin-bottom: -6px;
  }
</style>
