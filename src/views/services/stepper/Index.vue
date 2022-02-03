<template>
  <v-stepper :value="step" class="noShadowStepper font" id="paymentStepper">
    <v-stepper-header class="noShadowStepper">
      <v-stepper-step step="1" :complete="step > 1">
        <span v-lang.services></span>
        <small v-lang.select_services></small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2" :complete="step > 2">
        <span v-lang.seats></span>
        <small v-lang.select_seat></small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" :complete="step > 3">
        <span v-lang.buy></span>
        <small v-lang.buy_process></small>
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- List of Services -->
        <list :step="step" ref="serviceList"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <!-- View of Pay -->
        <buy/>
      </v-stepper-content>
      <v-stepper-content step="3">
        <services-payments/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
import buy from '@v/services/stepper/ConfirmationPaymentData'
import List from '@v/services/stepper/List/Index'
import ServicesPayments from '@v/services/stepper/Payment/Index'

export default {
  components: {
    ServicesPayments,
    List,
    buy
  },
  computed: mapGetters({
    step:'set_step'
  }),
  methods: {
    toPayment () {
      this.$router.push({ path: `/service_payments` })
    }
  }
};
</script>

<style>
div.stepper__step {
  padding: 10px 25px 10px 25px;
}
.stepper__header hr.divider {
  margin: 0 5px;
}

div.stepper.noShadowStepper {
  background: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
div.stepper div.noShadowStepper.stepper__header {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.font {
  font-family: Poppins;
}
</style>
