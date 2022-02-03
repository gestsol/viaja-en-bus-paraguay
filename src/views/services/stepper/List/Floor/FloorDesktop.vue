<template>
<div>
  <Dialog :open="dialog" :type="messageType" @close="closeDialog"/>
  <v-card flat class="ml-4 mr-4">
    <v-card class="hideAsientos">
      <v-card flat class="mt-3">
        <!-- Grilla de asientos -->
        <v-card-text>
          <div v-if="loadingSeats" style="text-align: center">
            <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
          </div>
          <v-container v-else-if="bus.grilla.length > 0" :class="{'pa-0': isXs}">
          <v-layout row wrap :justify-center="floorArray.length === 1">
            <v-flex xs4 md4 v-for="(selectedFloor, index) in floorArray" :key="index">
              <div>
                <h2 class="text-xs-center mb-1">{{translate('floor')}} {{selectedFloor + 1}}</h2>
                <h4 class="text-xs-center mb-3 subheading">{{data.pisos[selectedFloor].servicio}}</h4>
                <v-layout row wrap justify-center>
                  <v-flex xs12 sm12 md12 lg10 class="text-xs-center mb-4 border-bus" :class="{'left-border': selectedFloor > 0}">
                      <div
                        v-for="(col, i) in bus.grilla[selectedFloor].grid" :key="i"
                        class="blank-seat-rem"
                      >
                        <div
                          class="d-inline-block"
                          v-for="(seat, j) in col" :key="j"
                        >
                        <template v-if="seat !== null">
                          <template v-if="seat.asiento.includes('B')">
                            <div class="my-1">
                              <img src="static/imgs/grid/wc.svg" alt="" class="wcSize">
                            </div>
                          </template>
                          <div v-else-if="seat.asiento === '' || seat.asiento === '%'" style="height: 33px; width: 33px;"/>
                          <v-btn
                            v-else-if="seatIsInshoppingCart(seat.asiento, selectedFloor) > -1"
                            class="mx-0 my-0 seatBtn elevation-0"
                            @click="selectSeat(seat.asiento, selectedFloor, [i, j])">
                            <seat
                              :seatNumber="seat.asiento"
                              :selectedNumber="seat.asiento"
                              :floor="selectedFloor"
                              type="taken"
                            />
                          </v-btn>
                          <v-btn
                            v-else-if="seat.estado !== 'libre'"
                            class="mx-0 my-0 seatBtn"
                            style="background-color: rgba(0,0,0,0)!important;"
                            disabled>
                            <seat
                              :seatNumber="seat.asiento"
                              :floor="selectedFloor"
                              type="occupied"
                            />
                          </v-btn>
                          <v-btn
                            v-else
                            flat
                            class="mx-0 my-0 seatBtn"
                            @click="selectSeat(seat.asiento, selectedFloor, [i, j])">
                            <seat :seatNumber="seat.asiento" type="free" :floor="selectedFloor"/>
                          </v-btn>
                        </template>
                        </div>
                      </div>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-flex xs4 md4 class="left-border">
              <div style="position: relative; height: 100%">
                <h2 class="text-xs-center mb-5" v-lang.seat_title></h2>
                <v-layout row text-xs-left justify-center>
                  <v-flex md9 class="displayNoneSm">
                    <div v-for="(item, index) in seatsImg" :key="index">
                      <h3 class="d-block ma-4">
                      <img
                        height="22"
                        width="22"
                        :src="
                          require(`../../../../../../static/imgs/logos/seats/Iconos-${item.number}.png`)
                        "
                      />
                      {{translate(item.text)}}</h3>
                    </div>
                  </v-flex>
                </v-layout>
                <v-btn
                  @click="showModal"
                  class="seatContinueButton font white--text mr-3"
                  color="error"
                  :disabled="!selectedSeats.length > 0"
                  v-lang.continue
                ></v-btn>
              </div>
            </v-flex>
          </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-card>
  </v-card>
</div>
</template>
<script>
import floorMixin from './Floor.js'
export default {
  mixins: [floorMixin]
}
</script>
<style scoped src="./Floor.css"></style>
