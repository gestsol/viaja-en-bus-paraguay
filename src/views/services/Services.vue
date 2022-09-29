<template>
  <div class="ServicesBackground">
    <v-content class="displayNoneSm">
      <BannerTop />
    </v-content>

    <transition name="fade">
      <v-layout row wrap class="pt-2 pb-3">
        <v-flex xs12 sm12 md3 lg2 class="pl-2">
          <search-panel class="displayNoneSm"></search-panel>
          <filters class="displayNoneSm" />
        </v-flex>
        <v-flex xs12 sm12 md9 lg10>
          <router-view></router-view>

          <!-- //////////////////////////////////////////////////// -->
          <div>
            <!-- nuevo -->
            <!-- <div class="pt-5" style="text-align: center">
              <v-progress-circular indeterminate :size="100" color="primary"></v-progress-circular>
            </div> -->
            <v-card-title class="px-0">
              <v-container class="service-item px-0">
                <v-expansion-panel class="arrow">
                  <v-expansion-panel-content>
                    <div slot="header">
                      <v-container fluid>
                        <v-layout row>
                          <v-flex xs4 md6>
                            <v-layout row wrap>
                              <v-flex>
                                <img
                                src="/static/imgs/logos/NSA.png"
                                class="service-company-image">
                              </v-flex>
                              <v-flex>
                                <br>{{servicios.length}} {{translate('departures')}}
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs4 md3 pa-1>
                            <v-card class="elevation-0">
                              <v-card-text class="service-text-mobile">
                                Primera salida:
                                <br>{{servicios[0].horaProgramada}}
                                <br>Ultima salida:
                                <br>{{servicios[servicios.length - 1].horaProgramada}}
                              </v-card-text>
                            </v-card>
                          </v-flex>
                          <v-flex xs4 md3 pa-1>
                            <v-layout row wrap>
                              <v-flex>
                                <v-card class="elevation-0">
                                  <span class="service-text-mobile">
                                    Salon Cama<br>
                                  </span>
                                </v-card>
                                <v-card class="elevation-0">
                                  <span class="service-text-mobile">
                                    <span v-if="windowSize.x > 960" class="capitalize">{{ translate('from') }}:</span>
                                    ${{servicios[0].monto}}<br>
                                  </span>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </div>
                    <v-expansion-panel class="arrow" :expand="false">
                      <div @click="expandClick(item.id)" v-for="(item) in servicios" :key="item"
                        style="width: 100%">
                        <v-expansion-panel-content>
                          <div slot="header">
                            <v-layout>
                              <v-flex sm2 xs3>
                                <span class="service-title d-block"></span>
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                  {{item.fechaHoraSalida}}
                                </span>
                                <span class="service-title d-block"><b>Salida</b></span>
                                <span class="service-title d-block">
                                  {{item.horaProgramada}}
                                </span>
                              </v-flex>
                              <v-flex xs2 class="pr-5 text-xs-center" v-if="windowSize.x > 576">
                                <div style="position: relative">
                                  <!-- <hr class="hr-bus-style" /> -->
                                  <v-icon class="display-2" color="error">
                                    departure_board
                                  </v-icon>
                                </div>
                                <small class="text-xs-center">
                                  <!-- {{item.horaProgramada}} -->
                                  Por definir
                                  </small>
                              </v-flex>
                              <v-flex sm2 xs3>
                                <span class="service-title d-block">

                                </span>
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                 <!-- {{item.horaProgramada}} --> Sin definir fecha
                                </span>
                                <span class="service-title d-block"><b>Ruta:</b></span>
                                <span class="service-title d-block">
                                  {{item.descRuta}}
                                </span>
                              </v-flex>
                              <v-flex sm2 xs3 >
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                  $ {{item.monto}}
                                </span>
                                <!-- <span class="service-title d-block" style="text-decoration: line-through"><b>$
                                    piso tarifa </b></span> -->
                                <span class="caption d-block"><b>Promoción internet</b></span>
                                <span class="caption d-block" v-if="windowSize.x > 576"><b>Piso +1
                                  </b></span>
                                <span class="caption d-block" v-if="windowSize.x > 576"> piso servicio </span>
                              </v-flex>
                            </v-layout>
                          </div>
                          <!-- <div v-if="item.id === selectedPanel && windowSize.x > 756">
                            <floor :back="back" :item="item" :expanded="item.id === selectedPanel"
                              :isXs="windowSize.x <= 600" :fechaSubida="fechaSubida" :fechaIda="fechaSubidaIda"
                              :fechaVuelta="fechaSubidaVuelta" :ciudadOrigen="ciudadOrigen"
                              :ciudadDestino="ciudadDestino" @confirm="goToPayment" />
                          </div>
                          <div v-else-if="item.id === selectedPanel && windowSize.x <= 756">
                            <floor-mobile :back="back" :item="item" :expanded="item.id === selectedPanel"
                              :isXs="windowSize.x <= 600" :fechaSubida="fechaSubida" :fechaIda="fechaSubidaIda"
                              :fechaVuelta="fechaSubidaVuelta" :ciudadOrigen="ciudadOrigen"
                              :ciudadDestino="ciudadDestino" @confirm="goToPayment" />
                          </div> -->
                        </v-expansion-panel-content>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-container>

            </v-card-title>

          </div>




          <!-- <div>
            <div class="pt-5" style="text-align: center">
              <v-progress-circular indeterminate :size="100" color="primary"></v-progress-circular>
            </div>
            <v-card-title class="px-0">
              <v-container :key="index" v-for="(company, index) in getPricesByCompany" class="service-item px-0">

                <v-expansion-panel class="arrow">
                  <v-expansion-panel-content>
                    <div slot="header">
                      <v-container fluid>
                        <v-layout row>
                          <v-flex xs4 md6>
                            <v-layout row wrap>
                              <v-flex>
                                <img src="/static/imgs/logos/NSA.png" class="service-company-image">
                              </v-flex>
                              <v-flex>
                                <br>{{ company.data.length }} {{ translate('departures') }}
                                <br>{{ company.data.length }} {{ translate('departures') }}
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs4 md3 pa-1>
                            <v-card class="elevation-0">
                              <v-card-text class="service-text-mobile">
                                {{ getDepartureString('first_departure') }}:
                                <br>{{ company.data[0].horaSalida }}
                                <br>{{ getDepartureString('last_departure') }}:
                                <br>{{ company.data[company.data.length - 1].horaSalida }}
                              </v-card-text>
                            </v-card>
                          </v-flex>
                          <v-flex xs4 md3 pa-1>
                            <v-layout row wrap>
                              <v-flex v-for="(lowPrices, index) in company.lowPrices" :key="index">
                                <v-card class="elevation-0">
                                  <span class="service-text-mobile">
                                    {{ lowPrices.servicio }}<br>
                                  </span>
                                </v-card>
                                <v-card class="elevation-0">
                                  <span class="service-text-mobile">
                                    <span v-if="windowSize.x > 960" class="capitalize">{{ translate('from') }}:</span>
                                    ${{ lowPrices.tarifa }}<br>
                                  </span>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </div>
                    <v-expansion-panel class="arrow" :expand="false">
                      <div @click="expandClick(item.id)" v-for="(item) in company.data" :key="item.id"
                        style="width: 100%">
                        <v-expansion-panel-content>
                          <div slot="header">
                            <v-layout>
                              <v-flex sm2 xs3>
                                <span class="service-title d-block">{{ fechaSubida }}</span>
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                  {{ item.horaSalida }}
                                </span>
                                <span class="service-title d-block"><b>Salida:</b></span>
                                <span class="service-title d-block">
                                  {{ item.terminalOrigen }}
                                </span>
                              </v-flex>
                              <v-flex xs2 class="pr-5 text-xs-center" v-if="windowSize.x > 576">
                                <div style="position: relative">

                                  <v-icon class="display-2" color="error">
                                    departure_board
                                  </v-icon>
                                </div>
                                <small class="text-xs-center"> {{ hoursDifference(item) }} </small>
                              </v-flex>
                              <v-flex sm2 xs3>
                                <span class="service-title d-block">
                                  {{ item.fechaLlegada }}
                                </span>
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                  {{ item.horaLlegada }}
                                </span>
                                <span class="service-title d-block"><b>Llegada:</b></span>
                                <span class="service-title d-block">
                                  {{ item.terminalDestino }}
                                </span>
                              </v-flex>
                              <v-flex sm2 xs3 v-for="(piso, index) in item.pisos" :key="index">
                                <span class="headline d-block" style="font-size: 1rem !important;">
                                  $ {{ piso.tarifaInternet }}
                                </span>
                                <span class="service-title d-block" style="text-decoration: line-through"><b>$
                                    {{ piso.tarifa }} </b></span>
                                <span class="caption d-block"><b>Promoción internet</b></span>
                                <span class="caption d-block" v-if="windowSize.x > 576"><b>Piso {{ piso.piso + 1 }}
                                  </b></span>
                                <span class="caption d-block" v-if="windowSize.x > 576"> {{ piso.servicio }} </span>
                              </v-flex>
                            </v-layout>
                          </div>
                          <div v-if="item.id === selectedPanel && windowSize.x > 756">
                            <floor :back="back" :item="item" :expanded="item.id === selectedPanel"
                              :isXs="windowSize.x <= 600" :fechaSubida="fechaSubida" :fechaIda="fechaSubidaIda"
                              :fechaVuelta="fechaSubidaVuelta" :ciudadOrigen="ciudadOrigen"
                              :ciudadDestino="ciudadDestino" @confirm="goToPayment" />
                          </div>
                          <div v-else-if="item.id === selectedPanel && windowSize.x <= 756">
                            <floor-mobile :back="back" :item="item" :expanded="item.id === selectedPanel"
                              :isXs="windowSize.x <= 600" :fechaSubida="fechaSubida" :fechaIda="fechaSubidaIda"
                              :fechaVuelta="fechaSubidaVuelta" :ciudadOrigen="ciudadOrigen"
                              :ciudadDestino="ciudadDestino" @confirm="goToPayment" />
                          </div>
                        </v-expansion-panel-content>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-container>
            </v-card-title>
            <v-card-title>
              <span v-lang.no_elements></span>
            </v-card-title>
            <Dialog :dialog="dialog" @finish="dialog = false" @confirm="goToPaymentFromModal" />
          </div> -->

          <!-- //////////////////////////////////////////////////// -->

        </v-flex>
      </v-layout>
    </transition>

    <v-btn fab dark :large="windowSize.x > 960" color="primarylight" @click="showResume" class="floating-resume-btn">
      <v-icon dark>shopping_cart</v-icon>
    </v-btn>

    <v-btn color="primary" class="white--text floating-filters-btn displayNoneMd"
      @click="$router.push({ path: '/filters' })">
      <v-icon dark>filter_list</v-icon>
      Filtros
    </v-btn>

    <v-btn fab dark color="primarylight" @click="$router.push({ path: '/mobile_search' })" :large="windowSize.x > 960"
      class="floating-search-btn displayNoneMd">
      <v-icon dark>directions_bus</v-icon>
    </v-btn>



    <div style="margin-top: 100px" class="displayNoneMd"></div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import SearchPanel from '@v/services/SearchPanel/searchPanel'
import Filters from '@v/services/filters/Index'


import BannerTop from '@c/BannerTop'

export default {
  name: 'Services',
  components: {
    SearchPanel,
    Filters,
    BannerTop
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    }
  },
  computed: {
    ...mapGetters({
      servicios: ['getTravelsList',]
    }),
  },
  mounted() {
    this.$store.dispatch('LOAD_SERVICES_LIST')
  }



  /*
computed: mapGetters({
  resume: ['show_resume'],
  userData: ['userData'],
  getHistory: ['getHistory']

}),
methods: {
  onResize () {
    this.windowSize = { x: window.innerWidth, y: window.innerHeight }
  },
  showResume () {
    if (!this.resume) {
      this.$notify({
        group: 'resume',
        title: this.translate('purchase_detail'),
        type: 'info'
      })
      this.$store.dispatch('SHOW_RESUME', {showResume: true})
    } else {
      this.$notify({ group: 'resume', clean: true })
      this.$store.dispatch('SHOW_RESUME', {showResume: false})
    }
  },
  setServices () {
    const {
      from_date,
      to_date,
      from_city,
      to_city
    } = this.$store.state.searching
    this.$store.dispatch('LOAD_SERVICES_LIST', {
      fromDate: from_date,
      toDate: to_date,
      fromCity: from_city,
      toCity: to_city
    })
  }
},
mounted () {
  this.$nextTick(() => {
    window.addEventListener('resize', this.onResize)
  })
  const {fromFail} = localStorage
  const fromRouteName = this.getHistory.from.name
  if (fromFail || this.$route.query.fromLogin || fromRouteName === 'Payment') {
    if (fromFail) {
      localStorage.removeItem('fromFail')
    }
  } else if (this.$store.state.services.data.length < 1) {
    this.setServices()
  } else {
    this.$store.dispatch('SET_PAYMENT_INFO', {
      payment_info: {
        name: '',
        rut: '',
        email: '',
        movil: '',
        completeName: ''
      }
    })
    this.$store.dispatch('DELETE_ALL_SEAT')
    this.$store.dispatch('SET_STEP', {step: 1})
  }
},
beforeDestroy () {
  window.removeEventListener('resize', this.onResize)
}
*/
}

</script>

<style>
.font {
  font-family: Poppins;
}
</style>
