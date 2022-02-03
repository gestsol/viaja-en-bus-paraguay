<template>
  <v-container>
    <v-layout row>
      <v-flex xs4 md4 class="ml-2 mr-2">
        <v-list two-line subheader>
          <v-subheader v-text="header" class="headline"></v-subheader>
          <template v-for="(item, index) in items">
            <v-list-tile avatar :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{item}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs4 md4 class="ml-2 mr-2">
        <v-list two-line subheader>
          <v-subheader v-text="header" class="headline"></v-subheader>
          <template v-for="(item, index) in items">
            <v-list-tile avatar :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{item}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs4 md4 class="ml-2 mr-2">
        <v-list two-line subheader>
          <v-subheader v-text="header" class="headline"></v-subheader>
          <template v-for="(item, index) in items">
            <v-list-tile avatar :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{item}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
 </v-container>
</template>
<script>
  export default {
    data () {
      return {
        header: 'Saliendo de Santiago',
        items: [
          'Santiago, CL > Mendoza, AR',
          'Santiago, CL > Mendoza, AR',
          'Santiago, CL > Mendoza, AR',
          'Santiago, CL > Mendoza, AR'
        ]
      }
    }
  }
</script>
<style>
  .list__tile--avatar {
    border-style: solid;
    border-color: grey;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    line-height: 1em;
  }
  .subheader {
    color: var(--var-light-blue) !important;
  }
</style>