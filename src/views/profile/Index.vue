<template>
  <v-app>
    <div style="margin-top: 64px"></div>
    <v-toolbar dark color="primarylight displayNoneMd">
      <v-toolbar-title class="white--text">{{translate(title)}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <profile-nav-mobile/>
    </v-toolbar>

    <v-container>
      <h1 class="primary-color displayNoneSm">{{translate(title)}}</h1>
      <v-layout row wrap class="mt-4">
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
        <v-flex xs12 md3 offset-md1 class="displayNoneSm">
          <profile-nav/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ProfileNav from '@v/profile/ProfileNav'
import ProfileNavMobile from '@v/profile/ProfileNavMobile'

export default {
  components: {
    ProfileNav,
    ProfileNavMobile
  },
  data () {
    return {
      title: ''
    }
  }
}
</script>
