<template>
  <div class="mb-5">
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm12 md12>
        <div class="text-xs-center pa-3 display-1">
          <h1>
            <span class="contentColor">{{content}}</span>
          </h1>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ['content']
}
</script>

<style>
  .contentColor {
    color: var(--var-dark-blue);
    line-height: 1;
  }

  .slogan_card h2 {
    display: block;
  }
</style>
