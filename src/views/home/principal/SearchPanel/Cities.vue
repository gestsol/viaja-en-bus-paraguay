<template>
  <div>
    <!-- item para el seleccionado -->
    <v-select @select="citySelect()" class="body-1" dark :label="languageChange" :items="cities" 
    color="grey lighten-4" item-text="nombreCiudad" :item-value="codCiudad" bottom return-object persistent-hint clearable autocomplete
      v-model="userCity">
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>

        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="`${data.item.nombreCiudad}`"></v-list-tile-title>
          </v-list-tile-content>

        </template>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CitiesList',

  props: {
    direction: {
      type: String,
      required: true
    },
    countrySelected: 1
  },
  methods: {
    countrySelect() {
      const dir = this.direction
      const pais = this.userCountry
      console.log(`Pais Seleccionado: ${dir} - [${pais.codPais}] ${pais.nomPais}`);
      if (dir === 'from') {
        this.$store.commit('SET_ORIGIN_COUNTRY_CODE', pais.codPais);
      } else {
        this.$store.commit('SET_DESTINY_COUNTRY_CODE', pais.codPais);
      }
    },
  },

  computed: {
    ...mapGetters({
      citiesOrigin: ['getOriginCities'],
      citiesDestiny: ['getDestinyCities'],
    }),

    userCity: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    languageChange() {
      let result = ''
      result = this.direction === 'from' ? this.translate('from_city') : this.translate('to_city')
      return result
    },
    cities(){
      if(this.direction === 'from'){
        return this.citiesOrigin
      }else{
        return this.citiesDestiny
      }
    }

  }
}
</script>
