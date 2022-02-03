<template>
  <v-app>
    <v-content>
      <LoadAlert />
      <LoadServiceAlert />
      <ErrorAlert />
      <InfoAlert />
      <Resume />

      <header-app />
      <router-view></router-view>
      <footer-app />

    </v-content>
  </v-app>
</template>

<script>
import InfoAlert from '@c/InfoAlert'
import ErrorAlert from '@c/ErrorAlert'
import LoadServiceAlert from '@c/LoadServiceAlert'
import LoadAlert from '@c/LoadAlert'
import Resume from '@c/ServiceResume'
import HeaderApp from '@c/Header'
import FooterApp from '@c/Footer'

const moment = require('moment')

export default {
  name: 'app',
  components: {
    InfoAlert,
    ErrorAlert,
    LoadAlert,
    LoadServiceAlert,
    Resume,
    HeaderApp,
    FooterApp
  },
  mounted () {
    this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {date: moment().format().split(':')[0].split('T')[0], direction: 'from'})
    this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {date: null})
  }
}
</script>
