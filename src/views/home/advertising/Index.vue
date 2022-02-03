<template>
  <div class="displayNone">
    <!-- Advertising Image -->
    <v-content>
      <v-container fluid class="pa-0">
        <div class="firstBanner hidden-sm-and-down">
          <img class="imageFirstBanner" src=/static/imgs/banners/04.png>
        </div>
      </v-container>
    </v-content>

    <!-- Slogan component -->
    <!-- <v-content>
      <v-container fluid class="pa-0">
        <slogan-panel :content="langDestinations"></slogan-panel>
      </v-container>
    </v-content> -->
    
    <!-- Advertising View -->
    <!-- <v-content>
      <v-container fluid class="pa-0">
        <totem></totem>
      </v-container>
    </v-content> -->

    <!-- Slogan component -->
    <!-- <v-content>
      <v-container fluid class="pa-0">
        <slogan-panel :content="langRoutes"></slogan-panel>
      </v-container>
    </v-content> -->

    <!-- Promotions View -->
    <!-- <v-content>
      <v-container fluid class="pa-0">
        <main-routes></main-routes>
      </v-container>
    </v-content> -->

    <!-- Slogan component -->
      <v-container fluid class="pa-0 mt-5">
        <slogan-panel :content="langCompanies"></slogan-panel>
        <companies></companies>
      </v-container>

    <!-- Testimonials View -->
    <v-content>
      <v-container fluid class="pa-0">
        <!-- <testimonials></testimonials> -->
      </v-container>
    </v-content>
  </div>
</template>

<script>
  // Advertising
  import Totem from '@v/home/advertising/Totem'
  import Companies from '@v/home/advertising/Companies'
  import MainRoutes from '@v/home/advertising/MainRoutes'
  import Promotions from '@v/home/advertising/Promotions'
  import Testimonials from '@v/home/advertising/Testimonials'
  import SloganPanel from '@v/home/advertising/SloganPanel'

  export default {
    name: 'Advertising_home',
    components: {
      SloganPanel,
      Totem,
      Companies,
      MainRoutes,
      Promotions,
      Testimonials
    },
    data () {
      return {}
    },
    computed: {
      langDestinations () {
        return this.translate('destinations')
      },
      langRoutes () {
        return this.translate('main_routes')
      },
      langCompanies () {
        return this.translate('bus_companies')
      }
    }
  }
</script>

<style>
  .firstBanner {
    width: 100%; 
    height: 45vh;
  }
  .imageFirstBanner {
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
