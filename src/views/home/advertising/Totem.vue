<template>
  <v-container style="width: 80vw">
    <carousel :perPage="3" class="mt-5">
      <slide v-for="(cities,i) in cities" :key="i" style="">
        <div class="div-container">
          <v-card style="width: 15vw;  align-self: center;">
            <v-card-media :src="cities.img" height="50vh">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text">{{cities.init}} {{cities.destine}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title primary-title class="action-wrapper">
              <div>
                <h3 class="headline mb-0 white--text">{{langFrom}}: $2.800</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-btn
          class="mt-3 white--text"
          style="background-color: #8dcae2; width: 40%; align-self: center"
          @click='validateSearch'
          :disabled="loadingServices" v-lang.buy>
          </v-btn>
        </div>
      </slide>
    </carousel>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      src: "/static/imgs/background/totem1.jpg",
      // src1: "/static/imgs/background/puerto-montt.jpg",
      windowSize: {
        x: 0,
        y: 0
      },
      cities: [
        {
          init: 'SANTIAGO >',
          destine: 'PUERTO MONTT',
          img: '/static/imgs/background/Puerto.jpg'
        },
        {
          init: 'SANTIAGO >',
          destine: 'CONCEPCIÓN',
          img: '/static/imgs/background/concepcion-3.jpg'
        },
        {
          init: 'SANTIAGO >',
          destine: 'LINARES',
          img: '/static/imgs/background/Linares.jpg'
        },
        {
          init: 'SANTIAGO >',
          destine: 'CURICÓ',
          img: '/static/imgs/background/Puerto.jpg'
        },
        {
          init: 'SANTIAGO >',
          destine: 'VIÑA DEL MAR',
          img: '/static/imgs/background/Puerto.jpg'
        },
      ]
    };
  },
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    validateSearch () {
      this.$store.dispatch('LOAD_SERVICES_LIST')
    }
  },
  computed: {
    ...mapGetters({
      loadingServices: ['getLoadingService']
    }),
    langFrom () {
      return this.translate('from')
    }
  }
};
</script>

<style >

.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.card-wrapper button.btn {
  margin-left: 30%;
  margin-right: 30%;
  background-color: #8dcae2 !important;
}

.action-wrapper {
  background-color: var(--var-dark-blue);
}

.div-container {
  width: 100%; display: flex; flex-direction: column; justify-content: center;
}

.black--text {
  width: 250px !important;
}
.font {
  font-family: Poppins;
}

.margin {
  margin-top: -12%;
}

.lines-effect {
  display: inline-block;
  position: relative;
}
.lines-effect::after,
.lines-effect::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 2px;
  background-color: aliceblue;
  top: 0.7em;
}

.lines-effect::before {
  left: -420px;
}
.lines-effect::after{
  left:380px;
}
</style>

