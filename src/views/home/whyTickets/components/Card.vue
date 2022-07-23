<template>
  <section>
    <div class="home-card">
      <slot />
    </div>
  </section>
</template>
<style lang="stylus" scoped>
section {
  margin: 118px 20px;
}
.home-card {
  border: 1px solid #70707052;
  border-radius: 30px;
  padding: 54px 25px;
}

@media (min-width: 1400px) {
  section {
    margin: 118px 156px;
  }
  .home-card {
    padding: 54px 75px;
  }
}
</style>

