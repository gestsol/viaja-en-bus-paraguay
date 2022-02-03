<template>
  <div class="marginTop">
    <carousel></carousel>

    <v-content class="fullHeight relativePos">
      <v-container fluid class="search-panel-container">
        <search-panel></search-panel>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import Carousel from '@v/home/principal/Carousel'
  import PrincipalLogo from '@v/home/principal/PrincipalLogo'
  import SearchPanel from '@v/home/principal/SearchPanel/SearchPanel'
  import BusBrands from '@v/home/principal/BusBrands'

  export default {
    name: 'Index_principal_home',

    components: {
      Carousel,
      PrincipalLogo,
      SearchPanel,
      BusBrands
    }
  }
</script>

<style scoped>
  .fullHeight {
    height: calc(100vh - 64px - 45px);
  }
  .marginTop {
    margin-top: 64px;
  }
  .search-panel-container {
    position: absolute;
    bottom: 50px;
  }
  @media (max-width: 960px) and (orientation: portrait){
    .marginTop {
      margin-top: 56px;
    }
  }
  @media (max-width: 960px) {
    .marginTop {
      margin-top: 56px;
    }
    .fullHeight {
      height: calc(100vh - 56px - 45px);
    }
    .search-panel-container {
      bottom: 40px;
    }
  }
</style>
