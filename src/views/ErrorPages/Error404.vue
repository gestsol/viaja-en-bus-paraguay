<template>
  <v-container class="center">
    <v-card class="elevation-10 pt-5 pb-5">
      <v-container fluid grid-list-lg>
        <v-layout column class="confirmation-title">
          <v-flex xs12>
            <p v-lang.error_404></p>
          </v-flex>

          <v-flex xs12>
            <h1 class="error-title">404</h1>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-btn
      style="background-color:#a0a0a0;"
      class="white--text mt-5"
      @click="$router.push({path: '/'})"
      v-lang.back
    >
    </v-btn>
  </v-container>
</template>

<script>
export default {
}
</script>

<style scoped>
  .error-title {
    font-size: 100px;
    color: #8dcae2;
    text-align: center;
  }

  .center {
    margin-top: 8vh !important;
  }

  .confirmation-title h3{
    text-align: center;
    font-weight: bold !important;
  }

  .confirmation-title p {
    font-size: 20px;
    color: #a0a0a0;
    text-align: center;
  }
</style>
