<template>
  <div>
    <BannerTop />

    <div class="title-container">
      <h1>¡Felicidades!</h1>
      <h2>¡Ahora te encuentras concursando por miles de premios y sorpresas.</h2>
    </div>
  </div>
</template>

<script>
import BannerTop from '@c/BannerTop'

export default {
  name: 'Success',

  components: {
    BannerTop
  }
}
</script>

<style>
.title-container {
  margin-top: 100px;
  padding: 0 400px;
  text-align: center;
}

.title-container h1{
  margin-top: 80px;
  color: #194e8e;
}
</style>
