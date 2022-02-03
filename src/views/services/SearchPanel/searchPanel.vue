<template>
  <v-layout>
    <v-card class="pt-3 pr-2 pl-2 card-color">
      <v-card-text class="white--text">
        <v-flex xs12 class="pt-3">
          <v-card-text><h2 v-lang.travel_details></h2></v-card-text>
        </v-flex>

        <v-container grid-list-md>
          <v-form>
            <v-layout wrap>
              <v-flex xs12>
                <cities-list direction="from"/>
              </v-flex>

              <v-flex xs12>
                <cities-list direction="to"/>
              </v-flex>

              <v-flex xs12>
                <calendar direction="from" v-model="fromDate"/>
              </v-flex>

              <v-flex xs12>
                <calendar direction="to"  v-model="toDate" :fromDate="fromDate"/>
              </v-flex>

              <v-flex xs12>
                <v-btn @click="validateSearch()"
                block color="error"
                class="font white--text rounded-search"
                :disabled="loadingServices" v-lang.search></v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import CitiesList from './Cities'
  import Calendar from './Calendar'
  import { mapGetters } from 'vuex'

  const moment = require('moment')
  export default {
    data () {
      return {
        fromDate: null,
        toDate: null,
        fromCity: '',
        toCity: ''
      }
    },

    components: {
      CitiesList,
      Calendar
    },

    mounted () {
      if (!this.searching.from_city || !this.searching.to_city) {
        this.$router.push('/')
      } else this.updateSearchFields()
    },

    computed: {
      searching: {
        get () {
          moment.locale(this.$store.state.language)
          return this.$store.state.searching
        }
      },
      ...mapGetters({
        loadingServices: ['getLoadingService']
      })
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
      updateSearchFields () {
        this.fromDate = this.$store.state.searching.from_date
        this.toDate = this.$store.state.searching.to_date
        this.fromCity = this.$store.state.searching.from_city
        this.toCity = this.$store.state.searching.to_city
      },

      validateSearch () {
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
        this.updateSearchFields()

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
    }
  }
</script>

<style>
  .card-color {
    background-color: #3e82cc !important;
  }

  .blue-light {
    background-color: var(--var-light-blue) !important;
  }

  .blue-dark {
    background-color: var(--var-dark-blue) !important;
  }
</style>
