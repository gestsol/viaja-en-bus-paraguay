<template>
  <div>


    <v-layout row wrap align-center justify-center class="mb-2 mt-2">
      <v-flex xs4 sm2 lg1 v-for="(brand,i) in brands" :key="i">
        <img :src="brand.src" alt="" class="width90 pa-0">
      </v-flex>
    </v-layout>


  </div>
</template>


<script>
  export default {
    data () {
      return {
        brands: [
          {src: '/static/imgs/brands/andesmar.png'},
          {src: '/static/imgs/brands/atacama.png'},
          {src: '/static/imgs/brands/cidher.png'},
          {src: '/static/imgs/brands/elquibus.png'},
          {src: '/static/imgs/brands/fichtur.png'},
          {src: '/static/imgs/brands/los_conquistadores.png'},
          {src: '/static/imgs/brands/los_corsarios.png'},
          {src: '/static/imgs/brands/los_libertadores.png'},
          {src: '/static/imgs/brands/mtbus.png'},
          {src: '/static/imgs/brands/pullman bus_blanco.png'},
          {src: '/static/imgs/brands/pullmancosta.png'},
          {src: '/static/imgs/brands/viatur.png'}
        ]
      }
    }
  }
</script>

