<template>
  <div>
    <v-card flat hover class="mt-2 transparentCard">
      <v-card-title>
        <h3 class="filter-title" v-lang.price_range></h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <div class="label-price-slider">
            <div class="capitalize">{{translate('from')}}: {{min | currency}}</div>
            <div class="capitalize limit-r">{{translate('hasta')}}: {{max | currency}}</div>
          </div>
          <vue-slider
            ref="slider"
            v-model="value"
            v-bind="options"
          />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'

  const minVal = 500
  const maxVal = 60000
  export default {
    components: {
      vueSlider
    },
    data () {
      return {
        min: minVal,
        max: maxVal,
        value: [
          minVal,
          maxVal
        ],
        options: {
          tooltipDir: [
            'bottom',
            'top'
          ],
          tooltipFormatter: val => '$' + val,
          tooltip: 'hover',
          width: '200px',
          height: 8,
          dotSize: 20,
          min: 500,
          max: 60000,
          interval: 1,
          disabled: false,
          show: true,
          speed: 0.3,
          reverse: false,
          lazy: true
        }
      }
    },
    watch: {
      value (newValue) {
        this.$store.dispatch('SET_USER_FILTER', {
          filter: {
            min: newValue[0],
            max: newValue[1]
          },
          type: 'prices'
        })
      }
    }
  }
</script>

<style lang="stylus">
.vue-slider.vue-slider-ltr
  width auto !important

.capitalize
  width 100%
  &.limit-r
    text-align right

title
  color var(--var-dark-blue)

.process-color
  background-color var(--var-light-blue)

.label-price-slider
  display flex
  flex-direction row
  justify-content space-between
  color var(--var-dark-blue)
</style>
