<template>
  <div>
    <v-card flat hover class="mt-2 transparentCard">
      <v-card-title>
        <h3 class="filter-title" v-lang.closing_hour></h3>
      </v-card-title>

      <v-card-text>
        <v-container>
           <div class="label-price-slider">
            <div class="capitalize">{{translate('from')}}: {{formatter(min)}}</div>
            <div class="capitalize limit-r">{{translate('hasta')}}: {{formatter(max)}}</div>
          </div>
          <vue-slider
            ref="slider"
            v-model="value"
            v-bind="optionsTime"
          />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'

  const minVal = 0
  const maxVal = 1439
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
        optionsTime: {
          tooltipDir: [
            'bottom',
            'top'
          ],
          tooltipFormatter: val => this.formatter(val),
          tooltip: 'hover',
          width: '200px',
          height: 8,
          dotSize: 20,
          min: 0,
          max: 1439,
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
          type: 'hours'
        })
      }
    },
    methods: {
      formatter (value) {
        const hours = Math.trunc(value / 60)
        const minutes = value - hours * 60
        let result = this.addCeros(hours) + ':' + this.addCeros(minutes)
        return result
      },
      addCeros (value) {
        if (value < 1) {
          return '00'
        } else if (value < 10) {
          return '0' + value.toString()
        }
        return value.toString()
      }
    }
  }
</script>
