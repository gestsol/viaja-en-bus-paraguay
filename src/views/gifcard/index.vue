<template>
  <div>
    <v-layout>
      <v-flex md12 xs12 class="gifcard">
        <carousel
          :per-page="this.windowSize.x < 600 ? 1 : 3"
          :scroll-per-page="false"
          :pagination-enabled="false"
          :mouse-drag="false"
          :value="slide"
          @page-change="change"
        >
          <slide v-for="(card, i) in cards" :key="i">
            <vb-card
              class="gif"
              :class="{'gif-center': slideCenter === i}"
              :card="card"
              @pay="processPayment()"
            />
          </slide>
        </carousel>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex md12 xs12>
        <v-layout>
          <v-flex md12 class="pagination">
            <v-icon class="arrow" @click="moveGif('LEFT')">keyboard_arrow_left</v-icon>

            <v-icon
              class="circle"
              v-for="(card, i) of listCardRelative"
              :key="i"
              :class="{'active': i === slide}"
            >
              stop_circle
            </v-icon>

            <v-icon class="arrow" @click="moveGif('RIGHT')">keyboard_arrow_right</v-icon>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import VbCard from './Card'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Gifcard',

  components: {
    VbCard,
    Carousel,
    Slide
  },

  data () {
    return {
      slide: 0,
      slideCenter: 1,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      // TODO: eliminar mockup de datos y traer los cards desde el backend
      cards: [
        {
          balance: 7000,
          price: 0
        },
        {
          balance: 6000,
          price: 0
        },
        {
          balance: 5000,
          price: 0
        },
        {
          balance: 4000,
          price: 0
        },
        {
          balance: 3000,
          price: 0
        },
        {
          balance: 2000,
          price: 0
        },
        {
          balance: 1000,
          price: 50000
        }
      ],
      loteCardSelected: 1
    }
  },

  computed: {
    listCardRelative () {
      const nroCard = this.windowSize.x < 600
        ? this.cards.length
        : Math.round(this.cards.length / 2)
      return Array(nroCard)
    }
  },

  created () {
    window.addEventListener('resize', this.onResize)
  },

  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    async processPayment (card) {
      console.log('PAY', card)

      this.$store.commit('SET_GITCARD_AMOUNT', card.price)
      this.$router.push({name: 'Payment', params: { type: 'gifcard' }})
    },

    change (nroSlide) {
      this.slideCenter = nroSlide + 1
    },

    moveGif (move) {
      switch (move) {
        case 'RIGHT':
          if (this.slide < this.listCardRelative.length - 1) this.slide++
          else this.slide = 0
          break

        case 'LEFT':
          if (this.slide > 0) this.slide--
          break
      }
    }
  }
}
</script>

<style lang="stylus">
.gifcard
  margin-top 15vh
  @media screen and (max-width: 600px)
    margin-top 10vh
  align-items center
  text-align center

.gif
  width 100%
  margin: auto;
  @media screen and (min-width: 1920px)
    width 530px
  transform scale(0.85)
  transition all ease 0.5s

.gif-center
  transform scale(1)

.pagination
  padding 20px 0 !important
  @media screen and (min-width: 1920px)
    padding 65px 0 !important
  justify-content center

.material-icons
  padding 8px
  user-select none
  @media screen and (max-width: 600px)
    padding 0
  &.icon.arrow
    font-size 60px
    &:hover
      cursor pointer
      transform translateY(-6px)
      color var(--var-dark-blue)
      transition all 0.1s ease-in
  &.icon.circle
    font-size 30px
    margin 0 20px
    @media screen and (max-width: 600px)
      font-size 20px
      margin 3px
    &.active
      color var(--var-dark-blue)
    &:hover
      cursor default
</style>
