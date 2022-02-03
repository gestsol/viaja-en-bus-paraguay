<template>
  <div style="position: relative; text-align: center;color: white;">
    <img
      width="38"
      height="40"
      :src="
        require(`../../../../../static/imgs/logos/seats/Iconos-${imageToShow}.png`)
      "
    />
    <span class="white--text text-centered">{{ seatNumberToShow }}</span>
  </div>
</template>

<script>
/* eslint-disable*/ 
  export default {
    props: ['seatNumber', 'selectedNumber', 'floor', 'type'],
    computed: {
      seatNumberToShow() {
        let number = this.seatNumber.toString()
        if (this.floor > 0) {
          number = (parseInt(number)).toString()
        }
        return number
      },
      imageToShow() {
        if (this.type === 'occupied') {
          return 26
        } else if (this.type === 'taken') {
          return 27
        } else {
          return 28
        }
      }
    }
  }
</script>

<style lang="stylus">
.text-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>