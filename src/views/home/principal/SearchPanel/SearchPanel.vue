<template>
  <v-layout row wrap align-center justify-center class="search-font">
    <v-flex xs12 sm12 md8 lg8>
      <v-card class='search_card elevation-24 rounded-search-box mt-5'>
        <v-card-title primary-title>
          <v-flex xs12 class='pl-3 py-3 mb-4'>
            <h2 class="search-panel-title">Compra tus pasajes</h2>
            <!-- <img src="/static/imgs/logos/badge-cybermonday.png" alt="Insignia de cybermonday" /> -->
          </v-flex>

          <v-flex xs12 md6 class='pl-3 pr-3'>
            <cities-list v-model="fromCity" ref='from_search' direction="from"/>
          </v-flex>

          <v-flex xs12 md6 class='pl-3 pr-3'>
            <cities-list v-model="toCity" direction="to"/>
          </v-flex>

          <v-flex xs12 md6 class='pl-3 pr-3'>
            <calendar v-model="fromDate" ref='to_search' direction='from'/>
          </v-flex>

          <v-flex xs12 md6 class='pl-3 pr-3'>
            <calendar v-model="toDate" :fromDate="fromDate" direction='to'/>
          </v-flex>

          <v-flex md4 offset-md4 xs12 class='pl-3 pr-3'>
            <v-btn block class='white--text search-font rounded-search' color="error" @click='validateSearch' :disabled="loadingServices">
              <span v-lang.search></span>
            </v-btn>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CitiesList from './Cities'
import Calendar from './Calendar'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    CitiesList,
    Calendar
  },
  data () {
    return {
      fromDate: '',
      toDate: '',
      fromCity: null,
      toCity: null
    }
  },
  watch: {
    fromDate (value) {
      const diff = moment(this.toDate).diff(value, 'days')

      if (diff <= -1 || value == null) {
        this.toDate = null
      }
    }
  },
  methods: {
    validateSearch () {
      this.$notify({
        group: 'stuck-load',
        title: this.translate('search_services'),
        type: 'info'
      })
      const {fromFail} = localStorage
      if (fromFail) {
        localStorage.removeItem('fromFail')
      }
      this.setUserSearchingData()
      this.$store.dispatch('LOAD_SERVICES_LIST', {
        goTo: true,
        fromDate: this.fromDate,
        toDate: this.toDate,
        fromCity: this.fromCity,
        toCity: this.toCity
      })
    },
    setUserSearchingData () {
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: this.fromDate,
        direction: 'from'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: this.toDate,
        direction: 'to'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
        city: this.fromCity,
        direction: 'from'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
        city: this.toCity,
        direction: 'to'
      })
    }
  },

  computed: mapGetters({
    loadingServices: ['getLoadingService']
  }),

  mounted () {
    this.$store.dispatch('LOAD_CITIES_LIST')
    this.fromDate = this.$store.state.searching.from_date
    this.toDate = this.$store.state.searching.to_date
    this.fromCity = this.$store.state.searching.from_city
    this.toCity = this.$store.state.searching.to_city
  }
}
</script>

<style>
@media (max-width: 576px) {
  .search-panel-title {
    font-size: 1.5rem;
  }
}

.margin-search {
  margin-top: 58vh;
}

@media (max-width: 960px) {
  .margin-search {
    margin-top: 40vh;
  }
}

@media (max-width: 960px) and (orientation: landscape) {
  .margin-search {
    margin-top: 100vh;
  }
}
.center_layout {
  z-index: 2;
}

div.card.search_card {
  background-color: #194E8Edd !important;
  color: #fff;
}

.search_card img {
  position: absolute;
  right: 0;
  top: 0;
  width: 140px;
}
@media (max-width: 759px){
  .search_card img {
    width: 20vw;
  }
}

.rounded-search-box {
  border-radius: 10px !important;
}
</style>
