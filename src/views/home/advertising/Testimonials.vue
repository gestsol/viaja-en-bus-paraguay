<template>
  <div>
    <img src="/static/imgs/background/testimonials.jpg" class="swipperBackgroundImageTestimonial swipperTestimonialContainer"/>
    <swiper :options="swiperOption" class="swipperTestimonialContainer">
      <!-- slides -->
      <swiper-slide v-for="(testimonial,i) in testimonials" :key="i" class="swipperTestimonial">

        <v-layout row wrap align-center justify-center class="pt-2">
          <v-flex xs12 sm6 md6 lg3 v-for="(person,j) in testimonial.persons" :key="j" class="">


              <v-container fluid grid-list-lg>
                <v-layout row  align-center justify-center>
                  <v-flex xs3>
                    <v-avatar
                      :tile="false"
                      size="100px"
                    >
                      <img :src="person.img" alt="avatar">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs9 class="pl-4 pr-5">
                    <div class="white--text">
                      <div class="headline">
                        {{person.name}}
                      </div>
                      <blockquote class="justifyText">
                        {{person.msg}}
                      </blockquote>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>


          </v-flex>
        </v-layout>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'Testimonials_advertising',
    data () {
      return {
        testimonials: [
          {
            persons: [
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              }
            ]
          },
          {
            persons: [
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              },
              {
                name: 'Persona',
                msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aspernatur assumenda at autem dignissimos, ducimus eligendi error.',
                img: 'https://pbs.twimg.com/media/BsnZUq8IYAA0Ggs.png'
              }
            ]
          }
        ],
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true
        }
      }
    }
  }
</script>

<style>
  .swipperTestimonialContainer {
    width: 100%;
    height: 20vh;
  }

  .swipperTestimonial {
    width: 100%;
    height: 20vh;
  }
  .swipperBackgroundImageTestimonial {
    position: absolute;
    min-width: 99vw;
  }
  div.swipperTestimonialContainer.swiper-container{
    overflow-y: scroll;
  }
</style>
