<template>
  <div>
    <principal-view></principal-view>
    <advertising-view></advertising-view>
  </div>
</template>

<script>
  import PrincipalView from '@v/home/principal/Index'
  import AdvertisingView from '@v/home/advertising/Index'

  export default {
    name: 'Home',
    components: {
      PrincipalView,
      AdvertisingView
    }
  }
</script>
