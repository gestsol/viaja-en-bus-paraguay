<template>
  <v-carousel hide-delimiters hide-controls class="carousel_fullscreen" id="carousel-view">
    <v-carousel-item
      v-for="(item, i) in windowSize.x < 600 ? itemsMobile : items"
      :src="item.src"
      :key="i"
      transition="fade"
    />
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      items: [
        // {
        //   src: '/static/imgs/banners/Banner-02.png'
        // },
        // {
        //   src: '/static/imgs/banners/Banner-03.png'
        // },
        // {
        //   src: '/static/imgs/banners/Banner-4.png'
        // },
        {
          src: '/static/imgs/banners/img-banner-1.png'
        },
        {
          src: '/static/imgs/banners/img-banner-2.png'
        }
      ],
      itemsMobile: [
        {
          src: '/static/imgs/banners/slide-mobile-1.png'
        }
        // {
        //   src: '/static/imgs/banners/slide-mobile-2.png'
        // }
        // {
        //   src: '/static/imgs/banners/slide-mobile-3.png'
        // }
      ]
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>

<style>
.carousel.carousel_fullscreen {
  height: calc(100vh - 64px - 45px);
  position: absolute;
}
@media (max-width: 960px) {
  .carousel.carousel_fullscreen {
    height: calc(100vh - 56px - 45px);
  }
}
#carousel-view .fade-enter-active,
#carousel-view .fade-leave-active,
#carousel-view .fade-leave-to {
  transition: 3s ease-out;
  position: absolute;
  top: 0;
  right: 0;
}

.carousel__item {
  background-size: 100% 100% !important;
}

#carousel-view .fade-enter,
#carousel-view .fade-leave,
#carousel-view .fade-leave-to {
  opacity: 0;
}

#homeSimpleText {
  font-weight: bold;
}

.styledContentColor {
  text-shadow: 3px 2px 5px rgba(0, 0, 0, 0.5) !important;
}

.styledContentColor + span {
  text-shadow: 3px 2px 5px rgba(0, 0, 0, 0.5) !important;
}

@media (min-width: 960px) {
  .flex.md3 {
    max-width: 50% !important;
  }
}
</style>
