<template>
  <div>
    <div v-if="loadingServices" class="pt-5" style="text-align: center">
      <v-progress-circular indeterminate :size="100" color="primary"></v-progress-circular>
    </div>
    <v-card-title v-else-if="services.length > 0" class="px-0">
      <v-container :key="index" v-for="(company, index) in getPricesByCompany" class="service-item px-0">
        <!-- First expasión Panel-->
        <v-expansion-panel class="arrow">
          <v-expansion-panel-content>
            <div slot="header">
              <v-container fluid>
                <v-layout row>
                  <v-flex xs4 md6>
                    <v-layout row wrap>
                      <v-flex>
                        <img :src="'data:image;base64,' + company.data[0].logo" class="service-company-image">
                      </v-flex>
                      <v-flex>
                        <br>{{company.data.length}} {{translate('departures')}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex  xs4 md3 pa-1>
                    <v-card class="elevation-0">
                      <v-card-text class="service-text-mobile">
                        {{getDepartureString('first_departure')}}:
                        <br>{{company.data[0].horaSalida}}
                        <br>{{getDepartureString('last_departure')}}:
                        <br>{{company.data[company.data.length - 1].horaSalida}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4 md3 pa-1>
                    <v-layout row wrap>
                      <v-flex v-for="(lowPrices, index) in company.lowPrices" :key="index">
                        <v-card class="elevation-0">
                            <span class="service-text-mobile">
                              {{lowPrices.servicio}}<br>
                            </span>
                        </v-card>
                        <v-card class="elevation-0">
                            <span class="service-text-mobile">
                              <span v-if="windowSize.x > 960" class="capitalize">{{translate('from')}}:</span> ${{lowPrices.tarifa}}<br>
                            </span>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
              <v-expansion-panel class="arrow" :expand="false">
                <div @click="expandClick(item.id)" v-for="(item) in company.data" :key="item.id" style="width: 100%">
                  <v-expansion-panel-content>
                    <div slot="header">
                        <v-layout>
                          <v-flex sm2 xs3>
                            <span class="service-title d-block">{{ fechaSubida }}</span>
                            <span
                              class="headline d-block"
                              style="font-size: 1rem !important;"
                            >
                              {{ item.horaSalida }}
                            </span>
                            <span class="service-title d-block"><b>Salida:</b></span>
                            <span class="service-title d-block">
                              {{ item.terminalOrigen }}
                            </span>
                          </v-flex>
                          <v-flex xs2 class="pr-5 text-xs-center" v-if="windowSize.x > 576">
                            <div style="position: relative">
                              <!-- <hr class="hr-bus-style" /> -->
                              <v-icon
                                class="display-2"
                                color="error"
                              >
                                departure_board
                              </v-icon>
                            </div>
                            <small class="text-xs-center"> {{hoursDifference(item)}} </small>
                          </v-flex>
                          <v-flex sm2 xs3>
                            <span class="service-title d-block">
                              {{ item.fechaLlegada }}
                            </span>
                            <span
                              class="headline d-block"
                              style="font-size: 1rem !important;"
                            >
                               {{ item.horaLlegada }}
                            </span>
                            <span class="service-title d-block"><b>Llegada:</b></span>
                            <span class="service-title d-block">
                              {{ item.terminalDestino }}
                            </span>
                          </v-flex>
                          <v-flex
                            sm2
                            xs3
                            v-for="(piso, index) in item.pisos"
                            :key="index"
                          >
                            <span
                              class="headline d-block"
                              style="font-size: 1rem !important;"
                            >
                              $ {{piso.tarifaInternet}}
                            </span>
                            <span
                              class="service-title d-block"
                              style="text-decoration: line-through"
                              ><b>$ {{piso.tarifa}} </b></span
                            >
                            <span class="caption d-block"
                              ><b>Promoción internet</b></span
                            >
                            <span class="caption d-block"
                            v-if="windowSize.x > 576"
                              ><b>Piso {{piso.piso + 1}} </b></span
                            >
                            <span class="caption d-block" v-if="windowSize.x > 576"> {{piso.servicio}} </span>
                          </v-flex>
                        </v-layout>
                    </div>
                    <div v-if="item.id === selectedPanel && windowSize.x > 756">
                      <floor
                        :back="back"
                        :item="item"
                        :expanded="item.id === selectedPanel"
                        :isXs="windowSize.x <= 600"
                        :fechaSubida="fechaSubida"
                        :fechaIda="fechaSubidaIda"
                        :fechaVuelta="fechaSubidaVuelta"
                        :ciudadOrigen="ciudadOrigen"
                        :ciudadDestino="ciudadDestino"
                        @confirm="goToPayment"/>
                    </div>
                    <div v-else-if="item.id === selectedPanel && windowSize.x <= 756">
                      <floor-mobile
                        :back="back"
                        :item="item"
                        :expanded="item.id === selectedPanel"
                        :isXs="windowSize.x <= 600"
                        :fechaSubida="fechaSubida"
                        :fechaIda="fechaSubidaIda"
                        :fechaVuelta="fechaSubidaVuelta"
                        :ciudadOrigen="ciudadOrigen"
                        :ciudadDestino="ciudadDestino"
                        @confirm="goToPayment"/>
                    </div>
                  </v-expansion-panel-content>
                </div>
              </v-expansion-panel>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
    </v-card-title>
    <v-card-title v-else>
      <span v-lang.no_elements></span>
    </v-card-title>
    <Dialog :dialog="dialog" @finish="dialog = false" @confirm="goToPaymentFromModal"/>
  </div>
</template>
<script>
/* eslint-disable*/
import Floor from '@v/services/stepper/List/Floor/FloorDesktop'
import FloorMobile from '@v/services/stepper/List/Floor/FloorMobile'
import Dialog from '@v/services/stepper/List/UserInfo'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default {
  props: ['search', 'back'],
  data () {
    return {
      fechaSubidaIda: this.$store.state.searching.from_date,
      fechaSubidaVuelta: this.$store.state.searching.to_date,
      ciudadOrigen: this.$store.state.searching.from_city.codigo,
      ciudadDestino: this.$store.state.searching.to_city.codigo,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      dialog: false,
      expand: false,
      selectedPanel: null,
      rowsPerPage: [10, 20, 30, { text: 'Todos', value: -1 }]
    }
  },
  components: {
    Floor,
    FloorMobile,
    Dialog
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters({
      servicesList: ['getServiceList'],
      selectedService: ['getSelectedService'],
      searching: ['getSearching'],
      loadingServices: ['getLoadingService'],
      companiesFilter: ['getUserCompanyFilter'],
      payment_info: ['payment_info'],
      hasVuelta: ['hasVuelta'],
      selectedTab: ['getServicesTab']
    }),
    fechaSubida() {
      const dateFromStore =
        this.selectedTab === 'Vuelta' && this.hasVuelta
          ? this.fechaSubidaVuelta
          : this.fechaSubidaIda
      const dateItems = dateFromStore.split('-')
      const fechaSubida = `${dateItems[2]}/${dateItems[1]}/${dateItems[0]}`
      return fechaSubida
    },
    headers () {
      return [
        {
          text: this.translate('departure_hour'),
          value: 'departure_time',
          align: 'left',
          class: this.windowSize.x <= 600 ? 'pl-1 pr-1' : ''
        },
        {
          text: this.translate('arrival_hour'),
          value: 'departure_time',
          align: 'left',
          class: this.windowSize.x <= 600 ? 'pl-1 pr-1' : ''
        },
        {
          text: this.translate('floors'),
          value: 'pisosNumber',
          align: 'left',
          class: this.windowSize.x <= 600 ? 'px-0' : ''
        },
        {
          text: this.translate('prices'),
          value: 'tarifaPrimerPiso',
          align: 'left',
          class: 'hidden-sm-and-down'
        },
        {
          text: this.translate('classes'),
          value: 'servicioPrimerPiso',
          align: 'left',
          class: 'hidden-sm-and-down'
        }
      ]
    },
    langSearch () {
      return this.translate('search')
    },
    langPerPage () {
      const text = this.translate('results_page')
      return this.windowSize.x <= 600 ? text.split(' ')[0] : text
    },
    getIdCompanyBySearch () {
      const filter = this.search.trim().toLowerCase()
      const filtered = this.companiesFilter.filter(item => {
        if (item.name === 'Todos') {
          return false
        }
        const companyName = item.name.toLowerCase()
        const regex = new RegExp(filter)
        return regex.test(companyName)
      })
      console.log('filtered', filtered)
      return filtered.map(item => item.id)
    },
    services () {
      const services = this.servicesList(this.back)
      return services
    },
    getPricesByCompany () {
      const classFilter = this.$store.state.serviceFilters.class
      const result = this.services
      .filter((company, index) => {
        // Filter with search
        if (this.getIdCompanyBySearch.length < this.services.length) {
          for (let empresa of this.getIdCompanyBySearch) {
            if (empresa === company.id) {
              return true
            }
          }
          return false
        } else {
          return true
        }
      })
      .map((company, index) => {
        let list = []
        company.data.map(service => {
          const result = service.pisos.map(piso => {
            return _.pick(piso, ['servicio', 'tarifaInternet'])
          })
          list = list.concat(result)
          if (service.pisos.length > 1) {
            service.pisosNumber = '02'
          } else {
            service.pisosNumber = '01'
          }
          return service
        })
        const sorted = list.sort((a, b) => {
          return a.tarifaInternet - b.tarifaInternet
        })
        let lowPrices = []
        classFilter.forEach(service => {
          if (service != 'Todos') {
            const sortedItem = list.filter(item => item.servicio === service)[0]
            lowPrices.push({servicio: service, tarifa: sortedItem ? sortedItem.tarifaInternet : 0})
          }
        })
        return {...company, lowPrices}
      })
      console.log('low', result)
      return result
    }
  },
  watch: {
    loadingServices(value) {
      if (value) {
        this.fechaSubidaIda = this.$store.state.searching.from_date
        this.fechaSubidaVuelta = this.$store.state.searching.to_date
      }
    }
  },
  methods: {
    expandClick(id) {
      console.log("expandClick")
      this.selectedPanel = id
    },
    hoursDifference(service) {
      const from = this.fechaSubida + 'T' + service.horaSalida
      const to = service.fechaLlegada + 'T' + service.horaLlegada
      const format = 'DD/MM/YYYYTHH:mm'
      const fromDate = moment(from, format)
      const toDate = moment(to, format)
      const hours = toDate.diff(fromDate, 'hours')
      const minutes = toDate.diff(fromDate, 'minutes') - hours * 60
      const result = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
      return result
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      console.log(this.windowSize)
    },
    getDepartureString (idText) {
      const text = this.translate(idText)
      if (this.windowSize.x <= 960) {
        return text.split(' ')[0]
      }
      return text
    },
    goToPaymentFromModal (paymentInfo) {
      this.$store.dispatch('SET_PAYMENT_INFO', {payment_info: paymentInfo})
      this.goToPayment()
    },
    showModal () {
      if (this.payment_info && this.payment_info.email != null && this.payment_info.email !== '') {
        this.goToPayment()
        return
      }
      this.dialog = true
    },
    goToPayment () {
      // scrollAnimation('#serviceBanner')
      this.$router.push({name: 'ServicesPaymentData'})
    }
  }
}
</script>

<style >
.service-title {
  font-size: 14px;
  font-weight: 500;
}
@media (max-width: 576px) {
  .service-title {
    font-size: 0.8rem !important;
  }
}
.icon-service-expanded {
  transform: rotate(90deg);
}

.icon-service {
  color: var(--var-red);
  font-size: 30px;
}

.service-company-image {
  margin-top: 20px;
  width: 200px;
  height: 50px;
  max-width: 150px;
  max-height: 100px;
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 100px;
    height: 25px;
  }
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 60px;
    height: 15px;
  }
  .expansion-panel__header {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

.service-item {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.service-container-background {
  background-color: var(--var-light) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue);
}

.noServices {
  min-height: 25vh;
}
.arrow .expansion-panel__header .icon {
  color: rgba(63, 12, 182, 0.54);
  font-size: 60px;
}

@media (max-width: 576px) {
  .arrow .expansion-panel__header .icon {
    font-size: 30px;
  }
}

.arrow .expansion-panel__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  height: 110px;
}

.card__text {
  padding: 2px !important;
  width: 100%;
}


.result h1, h2, h3 {
  font-weight: 300 !important;
}

.datatable-container {
  background-color: white;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.datatable thead th.column.sortable {
  cursor: pointer;
}

/* estilo Bus */
.border-bus {
  border-bottom: 0px solid gray;
  border-top: 0px solid gray;

}

.min-h-30 {
  min-height: 30px;
}

.maxHeightLayout {
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: scroll;
}
/* tamañp de grilla */
.flex.xs1 {
    -ms-flex-preferred-size: 4.333333333333332% !important;
    flex-basis: 4.333333333333332% !important;
    max-width: 4.333333333333332% !important;
    }

/* . estilo Bus */
</style>
