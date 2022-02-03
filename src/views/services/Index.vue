<template>
  <div class="ServicesBackground font">
    <div style="margin-top: 64px"></div>

    <transition>
      <router-view></router-view>
    </transition>

    <div style="margin-top: 100px" class="displayNoneMd"></div>
  </div>
</template>

<script>
export default {
  name: 'Services'
}
</script>

<style>
.floating-resume-btn {
  position: fixed !important;
  bottom: 0;
  right: 0;
  margin: 3rem !important;
  z-index: 5;
}

.floating-search-btn {
  position: fixed !important;
  bottom: 0;
  left: 0;
  margin: 3rem !important;
  z-index: 5;
}

.floating-filters-btn {
  position: fixed !important;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 3rem auto !important;
  z-index: 5;
}

.firstBanner {
  width: 100%;
}

.ServicesBackground {
  background: var(--var-light);
  min-height: 95vh;
}

.font {
  font-family: Poppins;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
