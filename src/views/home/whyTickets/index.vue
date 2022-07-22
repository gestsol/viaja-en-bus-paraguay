<template>
  <section class="why-tickets">
    <h2 class="question">¿Por qué Boletos Paraguay?</h2>
    <answers />
    <devices />
  </section>
</template>
<script>
import Answers from './Answers'
import Devices from './Devices'

export default {
  components: {
    Answers,
    Devices
  }
}
</script>
<style lang="stylus" scoped>
.why-tickets {
  padding-top: 66px;
}
.question {
  color: #fc5e64;
  font-size: 32px;
  text-align: center;
  font-weight: normal;
}
</style>

