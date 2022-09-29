<template>
  <div>
    <!-- item para el seleccionado -->
    <v-select @select="agencySelected()" class="body-1" dark label="Agencias" :items="agencies"
      color="grey lighten-4" item-text="nombreAgencia" bottom return-object persistent-hint clearable
      autocomplete v-model="agency">
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>

        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="`${data.item.nombreAgencia}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      agency: null,
    }
  },
  methods: {
    agencySelected() {
      console.log(this.agency)
      this.$store.dispatch('SET_AGENCY', this.agency.codAgencia);
    },
  },

  computed: {
    ...mapState({
      agencies: ['agencies']
    }),
  },
}
</script>
