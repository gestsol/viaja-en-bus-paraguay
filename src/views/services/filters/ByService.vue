<template>
  <div>
    <v-card flat hover class="transparentCard">
      <v-container fluid>
        <h3 class="filter-title" v-lang.service></h3>
        <v-radio-group v-model="service" :mandatory="false" @change="setFilter">
          <v-radio color="primarylight" v-for="(item, index) in classFilters" :key="index" :label="item" :value="item"></v-radio>
        </v-radio-group>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      service: 'Todos'
    }
  },
  methods: {
    setFilter () {
      this.$store.dispatch('SET_USER_FILTER', {filter: this.service, type: 'selectedClass'})
    }
  },
  computed: mapGetters({
    classFilters: ['getUserClassFilter']
  })
}
</script>