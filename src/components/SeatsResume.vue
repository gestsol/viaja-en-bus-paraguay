<template>
  <notifications group="resume"
    ignoreDuplicates
    :duration="-1"
    :width="600"
    animation-name="v-fade-left"
    position="bottom right">
    <template slot="body" slot-scope="props">
      <div class="custom-template font">
        <v-layout row wrap style="">
          <v-flex xs12>
            <v-card color="primary" class="white--text pb-3">
              <v-card-title primary-title>
                <v-layout column>
                  <v-flex xs12>
                    <v-layout row wrap >
                      <v-flex xs10  class="pt-1">
                        <h3 v-if="selectedSeats.length > 0" class="headline">{{props.item.title}}</h3>
                        <span v-else class="headline">Sin asientos en lista</span>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn flat icon color="white"
                          @click="props.close">
                          <v-icon dark> clear </v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-list class="seat-list" v-if="selectedSeats.length > 0">
                      <template v-for="(item, index) in selectedSeats">
                        <div
                          :key="index"
                        >
                          <v-list-tile class="first_title">
                            <v-list-tile-action>
                              <v-icon>event_seat</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Asiento {{item.asiento}}, Piso {{item.piso + 1}}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon>directions_bus</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Sal. {{item.horaSalida}}, {{item.terminalLlegada}}</v-list-tile-title>
                              <v-list-tile-title>Lle. {{item.horaLlegada}}, {{item.terminalSalida}}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title class="grey--text text--darken-4">
                                <span class="title">Subtotal:</span><span class="total-price title"> ${{item.precio}}</span>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </div>
                        <v-divider v-if="index + 1 < selectedSeats.length" :key="index"></v-divider>
                      </template>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <div class="mt-2 pl-3" v-if="selectedSeats.length > 0">
                <span class="title">Total: ${{totalAmount}}</span>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </template>
  </notifications>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      selectedSeats: ['seats']
    }),
    totalAmount () {
      let totalAmount = 0
      this.selectedSeats.forEach(item => {
        totalAmount += parseInt(item.tarifa.split('.').join(''))
      })
      return totalAmount
    }
  }
}
</script>
<style scoped>
  .seat-list { 
    max-height: 400px;
    overflow-y: scroll;
  }
  .first_title {
    height: 36px;
  }
  .total-price {
    float: right;
  }
  .list__tile i {
    color: var(--var-light-blue) !important;
  }
  .vue-notification-group {
    width: auto !important;
  }
  .custom-template {
    margin-top: 0;
  	font-size: 18px;
    height: auto;
    color: #ffffff;
  	background: var(--var-dark-blue);
    border: 1px solid var(--var-grey);
    border-radius: 5px;
    overflow: hidden;
    margin-right: 50px;
    margin-bottom: 50px;
    max-width: 400px;
  }
  .v-fade-left-enter-active, .v-fade-left-leave-active, .v-fade-left-move {
  	transition: all 0.5s;
  }
  .v-fade-left-enter, .v-fade-left-leave-to {
  	opacity: 0;
  	transform: translateX(-500px) scale(0.2);
  }
</style>