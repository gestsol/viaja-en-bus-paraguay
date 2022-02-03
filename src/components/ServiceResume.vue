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
                        <h3 v-if="selectedSeats.length > 0" class="headline" v-lang.purchase_detail></h3>
                        <span v-else class="headline" v-lang.seats_list></span>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn flat icon color="white"
                          @click="close(props)">
                          <v-icon dark> clear </v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <div v-if="selectedSeats.length > 0" class="seat-list">
                    <v-flex xs12 v-for="(item, index) of byCompany" :key="index">
                      <h3 class="subheading info-block">{{company(item.id)}}</h3>
                      <v-layout row>
                        <v-flex xs2>
                          <v-icon color="primarylight">event_seat</v-icon>
                          <v-icon color="primarylight">room_service</v-icon>
                        </v-flex>
                        <v-flex xs10>
                          <span class="subheading info-block">
                            Nº {{translate('seats')}}:{{seatList(item.data)}}
                          </span>
                          <span class="subheading info-block capitalize" v-for="(item, index) in totalByClass(item.data)" :key="index">
                            {{item.name}}: {{item.count}}
                          </span>
                        </v-flex>
                      </v-layout>
                      <v-divider dark v-if="index < byCompany.length - 1" class="my-3"></v-divider>
                    </v-flex>
                  </div>
                </v-layout>
              </v-card-title>
              <div class="mt-2 pl-3" v-if="selectedSeats.length > 0">
                <span class="title">Total: {{totalAmount | currency}}</span>
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
import companyList from '@data/companies.json'

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
    },
    byCompany () {
      const seats = []
      this.selectedSeats.forEach(item => {
        if (seats.length < 1) {
          seats.push({id: item.empresa, data: []})
        } else {
          const elements = seats.filter(service => service.id === item.empresa)
          if (elements.length < 1) {
            seats.push({id: item.empresa, data: []})
          }
        }
      })
      // Obteniendo data
      seats.map(item => {
        for (let seat of this.selectedSeats) {
          if (seat.empresa === item.id) {
            item.data.push(seat)
          }
        }
        return item
      })
      return seats
    }
  },
  methods: {
    close (props) {
      this.$store.dispatch('SHOW_RESUME', {showResume: false})
      setTimeout(() => {
        props.close()
      }, 100)
    },
    totalByClass (seats) {
      const serviceClasses = []
      seats.forEach(seat => {
        const count = serviceClasses.filter(service => service.name === seat.servicioNombre)
        if (count <= 0) {
          serviceClasses.push({name: seat.servicioNombre})
        }
      })
      const result = serviceClasses.map(service => {
        const count = seats.filter(seat => service.name === seat.servicioNombre).length
        return {name: service.name.toLowerCase(), count}
      })
      return result
    },
    company (id) {
      const company = companyList.filter(item => id === item.id)[0]
      return company.name
    },
    seatList (seats) {
      const list = seats.map(seat => {
        const result = seat.piso > 0 ? ` ${seat.asiento}P2` : ` ${seat.asiento}`
        return result
      })
      return list.join()
    }
  }
}
</script>
<style scoped>
  .vue-notification-group {
    margin-right: 120px;
    margin-bottom: 50px;
  }
  .info-block {
    display: block;
    margin-bottom: 0.5rem;
  }
  .seat-list {
    max-height: 400px;
    overflow-y: auto;
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