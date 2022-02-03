<template>
  <v-list dark style="background-color: var(--var-dark-blue)">
    <v-list-tile v-for="item in items" :key="item.title" @click="changeRoute(item)">
      <v-list-tile-action>
        <v-icon dark>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title  dark>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  computed: {
    items () {
      return [
        { title: this.translate('my_profile'), icon: 'person', name: 'my_profile' },
        { title: this.translate('my_purchases'), icon: 'account_box', name: 'purchases' },
        { title: this.translate('cancellations'), icon: 'clear', name: 'cancel_purchase' },
        { title: this.translate('change_password'), icon: 'lock', name: 'profile_pass' }
      ]
    }
  },
  methods: {
    changeRoute (item) {
      this.$router.push({name: item.name})
    }
  }
}
</script>