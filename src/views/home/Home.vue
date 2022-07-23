<template>
  <div>
    <principal-view />
    <advertising-view />
    <why-tickets />
  </div>
</template>

<script>
import PrincipalView from '@v/home/principal/Index'
import AdvertisingView from '@v/home/advertising/Index'
import whyTickets from '@v/home/whyTickets'

export default {
  name: 'Home',
  components: {
    PrincipalView,
    AdvertisingView,
    whyTickets
  }
}
</script>

