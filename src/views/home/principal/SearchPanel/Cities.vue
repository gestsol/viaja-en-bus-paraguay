<template>
  <div>
    <!-- item para el seleccionado -->
    <v-select class="body-1" dark :label="languageChange" :items="cities" color="grey lighten-4" item-text="nomPais"
      item-value="codPais" bottom return-object persistent-hint clearable autocomplete v-model="userCity">
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
  name: 'CitiesList',

  props: {
    direction: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      cities: ['getCitiesList']
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
    }
  }
}
</script>
