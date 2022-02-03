<template>
  <div class="mt-5">
    <by-time />
    <by-price />
    <by-company/>
    <by-service/>
  </div>
</template>

<script>
  import byPrice from '@v/services/filters/ByPrice'
  import byTime from '@v/services/filters/ByTime'
  import byCompany from '@v/services/filters/byCompany'
  import byService from '@v/services/filters/ByService'
  export default {
    data () {
      return {}
    },
    components: {
      byPrice,
      byTime,
      byCompany,
      byService
    },
    methods: {},
    computed: {}
  }
</script>
