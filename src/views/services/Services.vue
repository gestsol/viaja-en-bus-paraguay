<template>
  <div class="ServicesBackground">
    <v-content class="displayNoneSm">
      <BannerTop />
    </v-content>

    <transition name="fade">
      <v-layout row wrap class="pt-2 pb-3">
        <v-flex xs12 sm12 md3 lg2 class="pl-2">
          <search-panel class="displayNoneSm"></search-panel>
          <filters class="displayNoneSm"/>
        </v-flex>
        <v-flex xs12 sm12 md9 lg10>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </transition>

    <v-btn fab dark :large="windowSize.x > 960" color="primarylight" @click="showResume" class="floating-resume-btn">
      <v-icon dark>shopping_cart</v-icon>
    </v-btn>

    <v-btn
      color="primary"
      class="white--text floating-filters-btn displayNoneMd"
      @click="$router.push({path: '/filters'})"
    >
      <v-icon dark>filter_list</v-icon>
      Filtros
    </v-btn>

    <v-btn fab dark color="primarylight"
      @click="$router.push({path: '/mobile_search'})"
      :large="windowSize.x > 960"
      class="floating-search-btn displayNoneMd">
      <v-icon dark>directions_bus</v-icon>
    </v-btn>

    <div style="margin-top: 100px" class="displayNoneMd"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPanel from '@v/services/SearchPanel/searchPanel'
import Filters from '@v/services/filters/Index'

import BannerTop from '@c/BannerTop'

export default {
  name: 'Services',
  components: {
    SearchPanel,
    Filters,
    BannerTop
  },
  data () {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    }
  },
  computed: mapGetters({
    resume: ['show_resume'],
    userData: ['userData'],
    getHistory: ['getHistory']

  }),
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    showResume () {
      if (!this.resume) {
        this.$notify({
          group: 'resume',
          title: this.translate('purchase_detail'),
          type: 'info'
        })
        this.$store.dispatch('SHOW_RESUME', {showResume: true})
      } else {
        this.$notify({ group: 'resume', clean: true })
        this.$store.dispatch('SHOW_RESUME', {showResume: false})
      }
    },
    setServices () {
      const {
        from_date,
        to_date,
        from_city,
        to_city
      } = this.$store.state.searching
      this.$store.dispatch('LOAD_SERVICES_LIST', {
        fromDate: from_date,
        toDate: to_date,
        fromCity: from_city,
        toCity: to_city
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    const {fromFail} = localStorage
    const fromRouteName = this.getHistory.from.name
    if (fromFail || this.$route.query.fromLogin || fromRouteName === 'Payment') {
      if (fromFail) {
        localStorage.removeItem('fromFail')
      }
    } else if (this.$store.state.services.data.length < 1) {
      this.setServices()
    } else {
      this.$store.dispatch('SET_PAYMENT_INFO', {
        payment_info: {
          name: '',
          rut: '',
          email: '',
          movil: '',
          completeName: ''
        }
      })
      this.$store.dispatch('DELETE_ALL_SEAT')
      this.$store.dispatch('SET_STEP', {step: 1})
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style>
.font {
  font-family: Poppins;
}
</style>
