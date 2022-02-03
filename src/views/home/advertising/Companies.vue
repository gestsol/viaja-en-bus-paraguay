<template>
  <div class="my-5">
    <v-container v-if="windowSize.x < 960">
      <carousel :perPage="(windowSize.x >= 600) ? 2 : 1" class="company-carousel-container">
        <slide v-for="(company, i) in companies" :key="i">
          <v-card dark color="primary">
            <v-card-text class="text-xs-center"><img :src="company" class="company-img"/></v-card-text>
          </v-card>
        </slide>
      </carousel>
    </v-container>
    <v-container grid-list-md text-xs-center v-else>
      <v-layout row>
        <v-flex md4 v-for="(company, i) in companies" :key="i">
          <v-card dark color="primary">
            <v-card-text> <img :src="company" class="company-img"/></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      companies: [
        '/static/imgs/brands/atacama.png',
        '/static/imgs/brands/cidher.png',
        '/static/imgs/brands/elquibus.png',
        '/static/imgs/brands/fichtur.png',
        '/static/imgs/brands/los_conquistadores.png'
      ]
    };
  },
  watch: {
    windowSize(newHeight, oldHeight) {
     console.log(`it changed to ${JSON.stringify(newHeight)} from ${JSON.stringify(oldHeight)}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy () { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  }
}
</script>

<style>

.company-carousel-container {
  height: 50vh;
  min-height: 200px;
}

.company-img {
    width: 200px;
    max-height: 200px;
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