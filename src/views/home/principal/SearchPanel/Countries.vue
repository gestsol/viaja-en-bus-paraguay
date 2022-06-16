<template>
  <div>
    <!-- item para el seleccionado -->
    <v-select @select="paisorigen()" class="body-1" dark :label="languageChange" :items="countries"
      color="grey lighten-4" item-text="nomPais" item-value="codPais" bottom return-object persistent-hint clearable
      autocomplete v-model="userCountry">
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>

        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="` ${data.item.abrevPais} - ${data.item.nomPais}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CountriesList',
  props: {
    direction: {
      type: String,
      required: true
    },
    countrySelected: 1
  },
  data() {
    return {
      userCountry: null,

    }
  },
  methods: {
    paisorigen() {
      console.log('paisorigenseleccionado');
      const dir = this.direction
      const cod = this.userCountry.codPais
      console.log(cod)
      console.log(dir)
      if (dir === 'from') {
        this.$store.commit('SET_ORIGIN_COUNTRY_CODE', cod);
      } else {
        this.$store.commit('SET_DESTINY_COUNTRY_CODE', cod);
      }
    },
  },

  computed: {
    ...mapGetters({
      countries: ['getCountriesList',]


    }),

    userCountry: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },

    languageChange() {
      let result = ''
      result = this.direction === 'from' ? this.translate('from_country') : this.translate('to_country')
      return result
    }
  },
}
</script>
