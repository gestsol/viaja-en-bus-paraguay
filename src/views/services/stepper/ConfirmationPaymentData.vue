<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1" v-if="payment_info.email && payment_info.email !== ''">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text><h3 class="capitalize" v-lang.passenger_data></h3></v-card-text>
          </v-flex>
          <v-layout row wrap class="pl-4 pt-3">
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  {{translate('email')}}
                  <h3 class="py-3">{{payment_info.email}}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  Rut
                  <h3 class="py-3">{{payment_info.rut}}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- Card date Ticket -->
      <v-card class="elevation-1 mt-5">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text><h3 class="capitalize" v-lang.one_reservation></h3></v-card-text>
          </v-flex>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :items="getSeatWithId"
          item-key="id"
          class="elevation-0"
          hide-actions
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <!-- <td>
              <v-checkbox
                primary
                hide-details
                v-model="props.selected"
              ></v-checkbox>
            </td> -->
            <td class="text-xs-right"><h3>{{ props.item.terminalOrigen }}</h3></td>
            <td class="text-xs-right"><h3>{{ props.item.terminalDestino }}</h3></td>
            <td class="text-xs-right"><h3>{{ props.item.fechaSubida }}</h3></td>
            <td class="text-xs-right"><h3>{{ props.item.horaSalida }}</h3></td>
            <td class="text-xs-right"><h3>{{ props.item.piso > 0 ? parseInt(props.item.asiento) : props.item.asiento }}</h3></td>
            <td class="text-xs-right"><h3>{{ '0' + (parseInt(props.item.piso) + 1).toString() }}</h3></td>
            <td class="text-xs-right"><h3>${{ props.item.precio }}</h3></td>
            <td class="text-xs-right">
              <v-btn flat color="error" @click="deleteSelected(props.item)" :disabled="deleting">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <!-- <template slot="footer">
            <td colspan="100%" class="text-xs-right">
              <v-btn color="error" :disabled="selected.length <= 0" @click="deleteSelected"
                :class="selected.length > 0 ? 'fadeIn' : 'fadeOut'" v-lang.delete></v-btn>
            </td>
          </template> -->
        </v-data-table>
      </v-card>
      <div class="mt-5">
        <v-btn style="background-color:#a0a0a0;" class="white--text" @click="$router.go(-1);" v-lang.cancel></v-btn>
        <v-btn color="primary" :disabled="selectedSeats.length <= 0" class="white--text" @click="validateSeats" v-lang.continue></v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '@/services/api/seats'
import _ from 'lodash'

export default {
  data () {
    return {
      name: '',
      rut: '',
      email: '',
      deleting: false
      // selected: []
    }
  },
  methods: {
    // async deleteSelected () {
    //   for (let item of this.selected) {
    //     const index = this.findSeatIndex(item.id)
    //     if (index > -1) {
    //       const params = this.selectedSeats[index]
    //       const requestParams = this.createRequestParams(params)
    //       await API.freeSeat(requestParams)
    //       await this.awaitForDeletion(index)
    //     }
    //   }
    //   this.selected = []
    // },
    async deleteSelected (item) {
      this.deleting = true
      const index = this.findSeatIndex(item.id)
      if (index > -1) {
        const params = this.selectedSeats[index]
        const requestParams = this.createRequestParams(params)
        await API.freeSeat(requestParams)
        this.$store.dispatch('DELETE_SEAT', { seat: index })
      }
      this.deleting = false
    },
    awaitForDeletion (index) {
      this.$store.dispatch('DELETE_SEAT', { seat: index })
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    },
    createRequestParams (params) {
      const requestParams = _.pick(params, ['servicio', 'fecha', 'origen', 'destino', 'integrador', 'asiento'])
      requestParams.asiento = params.piso > 0 ? (parseInt(params.asiento)).toString() : params.asiento
      return requestParams
    },
    findSeatIndex (id) {
      const index = this.selectedSeats.findIndex(item => id === item.servicio + item.piso + item.asiento)
      return index
    },
    async validateSeats () {
      this.$router.push({name: 'Payment', params: { type: 'ticket' }})
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching']
    }),
    getSeatWithId () {
      const result = this.selectedSeats.map((seat) => {
        const id = seat.servicio + seat.piso + seat.asiento
        return {...seat, id}
      })
      return result
    },
    headers () {
      return [
        { text: this.translate('from_city2'), value: 'terminalOrigen' },
        { text: this.translate('to_city2'), value: 'terminalDestino' },
        // { text: 'Origen', value: 'fat' },
        // { text: 'Destino', value: 'carbs' },
        { text: this.translate('from_date2'), value: 'fechaSubida' },
        { text: this.translate('departure_hour'), value: 'horaSalida' },
        { text: this.translate('seat'), value: 'asiento' },
        { text: this.translate('floor'), value: 'piso' },
        { text: this.translate('price'), value: 'precio' },
        { text: '', value: '' }
      ]
    }
  }
}
</script>