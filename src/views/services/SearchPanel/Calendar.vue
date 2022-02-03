<template>
  <v-layout row wrap class="font">
    <v-flex xs12 style="position: relative">
      <v-menu
        lazy :close-on-content-click="true" transition="scale-transition"
        offset-y full-width color="blue darken-4" max-width="290px"
        min-width="290px">

        <v-text-field
          class="font"
          dark color="grey lighten-1" slot="activator"
          :label="languageChange"
          v-model="formattedDate"
          readonly
        >
        </v-text-field>

        <v-date-picker
          min="2017-01-24"
          v-model="userCalendar"
          :allowed-dates="enableToDate"
          color="primary"
          :locale="localeChange"
          :first-day-of-week="firstDayOfweek"
          clearable
        >
        </v-date-picker>
      </v-menu>

      <v-btn icon dark @click="clearDate" class="mt-3 pl-1 btn-picker" v-if="direction === 'from' ? false : userCalendar">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
const moment = require('moment')

export default {
  name: 'Calendar',

  props: {
    direction: {
      type: String,
      require: true
    },
    fromDate: {
      type: String,
      require: false
    },
    value: {
      type: String,
      require: false
    }
  },

  data () {
    return {
      firstDayOfweek: 1,
      formattedDate: null,
      allowedFromDates: []
    }
  },
  mounted () {
    let i = -1
    this.allowedFromDates = [...Array(90)].map(() => { return moment().add(i++, 'd').format('YYYY-MM-DD') })
  },
  methods: {
    clearDate () {
      this.formattedDate = null
      this.userCalendar = null
    }
  },
  computed: {
    ...mapGetters({
      searching: ['getSearching']
    }),
    enableToDate () {
      const fromDate = this.direction === 'from' ? moment().subtract(1, 'days') : this.fromDate
      return (date) => {
        const diff = moment(date).diff(fromDate)
        return diff > -1
      }
    },
    userCalendar: {
      get () {
        if (this.value == null) {
          this.formattedDate = null
          return null
        }
        const format = 'LL'
        this.formattedDate = moment(this.value).format(format)
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    localeChange () {
      this.firstDayOfweek = this.language === 'en' ? 0 : 1
      moment.locale(this.language)
      const format = 'LL'
      if (this.userCalendar) this.formattedDate = moment(this.userCalendar).format(format)
      return this.translate('locale')
    },
    languageChange () {
      let result = ''
      result = this.direction === 'from' ? this.translate('from_date2') : this.translate('to_date2')
      return result
    }
  }
}
</script>

<style>
.btn-picker {
  position: absolute !important;
  top: 0;
  right: 0;
  margin-right: 2px !important;
}
</style>
