/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import APIService from '@/services/api/services'
import APIAgencies from '@/services/api/agencies'
// import APICities from '@/services/api/cities'
import router from '../router'
import moment from 'moment'
import companiesList from '@data/companies.json'
// import citiesList from '@data/cities.json'
import nsaEndPoints from '@data/nsaEndpoints'

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['language', 'searching', 'countries', 'cities', 'seats', 'step', 'payment_info', 'userData']
    })
  ],

  state: {
    language: 'es',
    countries: [],
    cities: [],
    travels: [],
    originCountryCode: 0,
    destinyCountryCode: 0,
    originDivPolCityCode: 0,
    destinyDivPolCityCode: 0,
    originCityCode: 0,
    destinyCityCode: 0,
    searching: {
      // from_country: null,
      from_country: null,
      // to_country: null,
      to_country: null,
      from_city: null,
      to_city: null,
      from_div_city: null,
      to_div_city: null,
      from_date: null,
      to_date: null,
      subdivision: null,
      agency: null,
      servicio: 2,
      ruta: 478,
    },
    services: {
      data: [],
      loading: false,
      selected: false,
      showResume: false,
      tab: 'Ida'
    },
    serviceFilters: {
      class: [],
      selectedClass: 'Todos',
      prices: {
        min: 500,
        max: 60000
      },
      hours: {
        min: 0,
        max: 1439
      },
      companies: [],
      selectedCompany: 'Todos'
    },
    selected: false,
    grid: [],
    seats: [],
    step: 1,
    payment_info: {
      name: '',
      rut: '',
      email: '',
      movil: '',
      completeName: ''
    },
    userData: {
      cambiaClave: false,
      payment_info: {},
      token: '',
      urlInicial: null,
      usuario: {},
      active: false
    },
    subdivisions: [],
    agencies: [],
    history: {
      to: '',
      from: ''
    },
    gifcardAmount: 0
  },

  actions: {
    async LOAD_SUBDIVISIONS({ commit }) {
      try {
        const res = await (await fetch(`${nsaEndPoints.listaEmpresas}`)).json()
        // console.log(nsaEndPoints.listaPaises)
        commit('SET_SUBDIVISIONS', { list: res })
      } catch (error) {
        console.log(error)
      }
    },
    SET_SUBDIVISION({ commit }, payload) {
      commit('SET_SUBDIVISION', {selected: payload})
    },
    async LOAD_AGENCIES({ commit }, payload) {
      try {
        const params = _.pick(payload, ['subdivision', 'servicio', 'ruta', 'salida', 'pais', 'divpol', 'ciudad'])
        const hora = moment().format('HH:mm')
        const salida = params.salida.split('-').reverse().join('/') + ' ' + hora
        const res = await APIAgencies.getByFilters({
          ...params,
          salida,
          hora,
          dia: 'MA',
        })
        commit('SET_AGENCIES', { list: res.data })
      } catch (error) {
        console.log(error)
      }
    },
    SET_AGENCY({ commit }, payload) {
      commit('SET_AGENCY', {selected: payload})
    },
    async LOAD_COUNTRIES_LIST({ commit }) {
      try {
        const res = await (await fetch(`${nsaEndPoints.listaPaises}`)).json()
        // console.log(nsaEndPoints.listaPaises)
        commit('SET_COUNTRIES_LIST', { list: res })
      } catch (error) {
        console.log(error)
      }

      /* APICities.getCities().then((response) => {
         if (response) {
           commit('SET_CITIES_LIST', {list: getCities})
         }
       }).catch(err => {
         console.log(err)
        })
      */
    },
    async LOAD_CITIES_LIST({ commit }) {
      try {
        const res = await (await fetch(`${nsaEndPoints.ciudadParadas}`)).json()
        commit('SET_CITIES_LIST', { list: res })
      } catch (error) {
        console.log(error)
      }
    },
    async LOAD_TRAVELS_LIST({ commit }) {
      try {
        const res = await (await fetch(`${nsaEndPoints.listaProximos}`)).json()
        commit('SET_TRAVELS_LIST', { list: res })
      } catch (error) {
        console.log(error)
      }
    },


















    LOAD_SERVICES_LIST({ commit, dispatch, state }, payload) {
      // added country to the payload
      // const { fromDate, toDate, fromCity, toCity, fromCountry, toCountry } = payload
      const {
        agency,
        from_div_city,
        to_div_city,
        from_date, to_date,
        from_country,
        to_country,
        from_city,
        to_city
      } = state.searching;

      if (!from_date) {
        Vue.notify({
          group: 'error',
          title: this.$translate('services'),
          type: 'error',
          text: this.$translate('no_going_date')
        })
        Vue.notify({ group: 'stuck-load', clean: true })
        dispatch('SET_LOADING_SERVICE', { loading: false })
        return
      }
      moment.locale(this.language)
      //console.log(this.language)
      //const format = 'DD/MM/YYYY'
      //let dateFormatted = moment(from_date).format(format)
      //console.log("data" + dateFormatted)
      const requestGoing = APIService.get({
        agencia: agency,
        fecha: "20/09/2022",
        paisOrigen: from_country,
        divpolOrigen: from_div_city,
        paisDestino: to_country,
        divpolDestino: to_div_city,
        ciudadOrigen: from_city,
        ciudadDestino: to_city
      })

      let requestReturn
      // if (toDate != null) {
      //   requestReturn = APIService.get({
      //     paisOrigen: to_country.codPais,
      //     ciudadOrigen: to_city.codPais,
      //     PaisDestino: from_country.codPais,
      //     ciudadDestino: from_city.codPais,
      //     fecha: to_date.replace(/-/g, ''),
      //     hora: '0000',
      //     idSistema: 1
      //   })
      // }
      dispatch('SET_LOADING_SERVICE', { loading: true })
      Promise.all([requestGoing, requestReturn])
        .then(responses => {
          console.log('responses', responses)
          const data = responses[0].data.map(item => {
            item.vuelta = false
            return item
          })
          let dataReturn = []
          console.log('first', data)
          if (responses[1]) {
            dataReturn = responses[1].data.map(item => {
              item.vuelta = true
              return item
            })
            console.log('second', dataReturn)
          }
          const resultData = data.concat(dataReturn)
          if (resultData.length <= 0) {
            Vue.notify({
              group: 'error',
              title: this.$translate('services'),
              type: 'error',
              text: this.$translate('no_av_services')
            })
            commit('SET_SERVICES_LIST', { list: [] })
            dispatch('SET_USER_FILTER', { filter: [], type: 'companies' })
            dispatch('SET_USER_FILTER', { filter: [], type: 'class' })
            return
          }
          if (payload.goTo) {
            router.push('/services')
          }
          if (resultData) {
            commit('SET_SERVICES_LIST', { list: resultData })
            const companies = []
            const classes = []
            resultData.forEach(item => {
              if (companies.length < 1) {
                companies.push(item.empresa)
              } else if (companies.filter(company => company === item.empresa).length < 1) {
                companies.push(item.empresa)
              }
              const firstService = item.servicioPrimerPiso
              const secondService = item.servicioSegundoPiso
              if (classes.length < 1) {
                classes.push(firstService)
                if (firstService !== secondService && secondService !== null) {
                  classes.push(secondService)
                }
              } else {
                if (classes.filter(clas => clas === firstService).length < 1) {
                  classes.push(firstService)
                }
                if (secondService !== null && classes.filter(clas => clas === secondService).length < 1) {
                  classes.push(secondService)
                }
              }
            })
            classes.push('Todos')
            companies.push('Todos')
            dispatch('SET_USER_FILTER', { filter: companies, type: 'companies' })
            dispatch('SET_USER_FILTER', { filter: classes, type: 'class' })
            dispatch('SET_USER_FILTER', { filter: 'Todos', type: 'selectedCompany' })
            dispatch('SET_USER_FILTER', { filter: 'Todos', type: 'selectedClass' })
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          Vue.notify({ group: 'stuck-load', clean: true })
          dispatch('SET_LOADING_SERVICE', { loading: false })
        })
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    SET_LOADING_SERVICE({ commit }, payload) {
      commit('SET_LOADING_SERVICE', { loading: payload.loading })
    },
    SELECTED_SERVICE({ commit }, payload) {
      commit('SELECT_SERVICE', { selected: payload.selected })
    },
    SET_SERVICE_TAB({ commit }, payload) {
      commit('SET_SERVICE_TAB', { tab: payload.tab })
    },
    //
    SET_NEW_USER_SEARCHING_COUNTRY({ commit }, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_COUNTRY', { country: payload.country })
      } else {
        commit('SET_USER_SEARCHING_TO_COUNTRY', { country: payload.country })
      }
    },
    //
    SET_NEW_USER_SEARCHING_CITY({ commit }, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_CITY', { city: payload.city })
      } else {
        commit('SET_USER_SEARCHING_TO_CITY', { city: payload.city })
      }
    },

    SET_NEW_USER_SEARCHING_DATE({ commit }, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_DATE', { date: payload.date })
      } else {
        commit('SET_USER_SEARCHING_TO_DATE', { date: payload.date })
      }
    },

    SET_USER_FILTER({ commit }, payload) {
      if (payload.type === 'class') commit('SET_CLASS_FILTER', { filter: payload.filter })
      if (payload.type === 'selectedClass') commit('SET_SELECTED_CLASS_FILTER', { filter: payload.filter })
      if (payload.type === 'companies') commit('SET_COMPANIE_FILTER', { filter: payload.filter })
      if (payload.type === 'selectedCompany') commit('SET_SELECTED_COMPANY_FILTER', { filter: payload.filter })
      if (payload.type === 'prices') commit('SET_PRICE_FILTER', { filter: payload.filter })
      if (payload.type === 'hours') commit('SET_HOUR_FILTER', { filter: payload.filter })
    },

    SET_USER_LANGUAGE({ commit }, payload) {
      commit('SET_LANGUAGE', { language: payload.language })
    },
    SET_STEP({ commit }, payload) {
      commit('SET_STEP', { step: payload.step })
    },

    SELECT({ commit }, payload) {
      commit('SELECT_SERVICE', { selected: payload.selected })
    },
    SHOW_RESUME: ({ commit }, payload) => {
      commit('SHOW_RESUME', { showResume: payload.showResume })
    },
    SET_GRID({ commit }, payload) {
      commit('SET_GRID', { grid: payload.grid })
    },

    SET_SEAT({ commit, getters }, payload) {
      if (getters.seatsByTravel(payload.seat.vuelta).length < 4) {
        commit('SET_SEAT', { seat: payload.seat })
      }
    },

    DELETE_SEAT({ commit }, payload) {
      commit('DELETE_SEAT', { seat: payload.seat })
    },

    DELETE_ALL_SEAT: ({ commit }) => {
      commit('DELETE_ALL_SEAT', {})
    },

    SET_PAYMENT_INFO({ commit }, payload) {
      commit('SET_PAYMENT_INFO', { payment_info: payload.payment_info })
    },

    SET_USER({ commit }, payload) {
      commit('SET_USER', { userData: payload.userData })
    },

    DELETE_USER({ commit }) {
      commit('DELETE_USER')
    },

    SET_HISTORY({ commit }, payload) {
      commit('SET_HISTORY', { from: payload.from, to: payload.to })
    }
  },

  mutations: {
    //
    SET_ORIGIN_COUNTRY_CODE(state, payload) {
      state.originCountryCode = payload
      state.searching.from_country = payload
    },
    SET_DESTINY_COUNTRY_CODE(state, payload) {
      state.destinyCountryCode = payload
      state.searching.to_country = payload
    },
    SET_ORIGIN_DIVPOL_CITY_CODE(state, payload) {
      state.originDivPolCityCode = payload
      state.searching.from_div_city = payload
    },
    SET_DESTINY_DIVPOL_CITY_CODE(state, payload) {
      state.destinyDivPolCityCode = payload
      state.searching.to_div_city = payload
    },
    SET_ORIGIN_CITY_CODE(state, payload) {
      state.originCityCode = payload
      state.searching.from_city = payload
    },
    SET_DESTINY_CITY_CODE(state, payload) {
      state.destinyCityCode = payload
      state.searching.to_city = payload
    },
    SET_ORIGIN_DATE(state, payload) {
      state.searching.from_date = payload
    },
    SET_DESTINY_DATE(state, payload) {
      state.searching.to_date = payload
    },

    //
    SET_AGENCIES: (state, { list }) => {
      state.agencies = list
    },
    SET_AGENCY: (state, { selected }) => {
      state.searching.agency = selected
    },
    SET_SUBDIVISIONS: (state, { list }) => {
      state.subdivisions = list
    },
    SET_SUBDIVISION: (state, { selected }) => {
      state.searching.subdivision = selected
    },
    SET_COUNTRIES_LIST: (state, { list }) => {
      state.countries = list
    },
    SET_CITIES_LIST: (state, { list }) => {
      state.cities = list
    },
    SET_TRAVELS_LIST: (state, { list }) => {
      state.travels = list
    },


    //
    SET_SERVICES_LIST: (state, { list }) => {
      state.services.data = list
    },
    SET_LOADING_SERVICE: (state, { loading }) => {
      state.services.loading = loading
    },
    //
    SET_USER_SEARCHING_FROM_COUNTRY: (state, { country }) => {
      state.searching.from_country = country
    },
    SET_USER_SEARCHING_TO_COUNTRY: (state, { country }) => {
      state.searching.to_country = country
    },
    //
    SET_USER_SEARCHING_FROM_CITY: (state, { city }) => {
      state.searching.from_city = city
    },
    SET_USER_SEARCHING_TO_CITY: (state, { city }) => {
      state.searching.to_city = city
    },
    SET_USER_SEARCHING_FROM_DATE: (state, { date }) => {
      const diff = moment(state.searching.to_date).diff(state.searching.from_date)
      if (diff > -1) {
        state.searching.to_date = null
      }
      state.searching.from_date = date
    },
    SET_USER_SEARCHING_TO_DATE: (state, { date }) => {
      state.searching.to_date = date
    },
    SET_CLASS_FILTER: (state, { filter }) => {
      state.serviceFilters.class = filter
    },
    SET_SELECTED_CLASS_FILTER: (state, { filter }) => {
      state.serviceFilters.selectedClass = filter
    },
    SET_COMPANIE_FILTER: (state, { filter }) => {
      state.serviceFilters.companies = filter
    },
    SET_SELECTED_COMPANY_FILTER: (state, { filter }) => {
      state.serviceFilters.selectedCompany = filter
    },
    SET_PRICE_FILTER: (state, { filter }) => {
      state.serviceFilters.prices = filter
    },
    SET_HOUR_FILTER: (state, { filter }) => {
      state.serviceFilters.hours = filter
    },
    SET_LANGUAGE: (state, { language }) => {
      state.language = language
    },
    SET_STEP: (state, { step }) => {
      state.step = step
    },
    SELECT_SERVICE: (state, { selected }) => {
      state.services.selected = selected
    },
    SET_SERVICE_TAB: (state, { tab }) => {
      state.services.tab = tab
    },
    SHOW_RESUME: (state, { showResume }) => {
      state.services.showResume = showResume
    },
    SET_GRID: (state, { grid }) => {
      state.grid = grid
    },
    SET_SEAT: (state, { seat }) => {
      state.seats.push(seat)
    },
    DELETE_SEAT: (state, { seat }) => {
      state.seats.splice(seat, 1)
    },
    DELETE_ALL_SEAT: state => {
      state.seats = []
    },
    SET_PAYMENT_INFO(state, { payment_info }) {
      state.payment_info = payment_info
    },
    SET_USER(state, { userData }) {
      state.userData = userData
    },
    DELETE_USER(state) {
      const userData = {
        cambiaClave: false,
        payment_info: {},
        token: '',
        urlInicial: null,
        usuario: {},
        active: false
      }
      state.userData = userData
    },
    SET_HISTORY(state, history) {
      state.history = history
    },
    SET_GITCARD_AMOUNT(state, amount) {
      state.gifcardAmount = amount
    }
  },

  getters: {


//
    getOriginCities: state =>  state.cities.filter(item => item.codPais === state.originCountryCode),
    getDestinyCities: state =>  state.cities.filter(item => item.codPais === state.destinyCountryCode),
//
    getGifcardAmount: state => state.gifcardAmount,

    getLanguage: state => {
      return state.language
    },
    //
    getCountriesList: state => {
      return state.countries.filter(countries => !countries.completed)
    },
    getCitiesList: state => {
      return state.cities.filter(cities => !cities.completed)
    },
    getTravelsList: state => {
      return state.travels.filter(travels => !travels.completed)
    },
    //
    getServiceFiltered: state => {
      const serviceFilters = state.serviceFilters
      const servicesByCompany = state.services.data.filter(service => {
        let filter = true
        if (serviceFilters.selectedCompany !== 'Todos') {
          filter = service.empresa === serviceFilters.selectedCompany
        }
        const timeSplited = service.horaSalida.split(':')
        const hours = parseInt(timeSplited[0] * 60)
        const minutes = parseInt(timeSplited[1])
        const timeToCompare = hours + minutes
        filter = timeToCompare >= serviceFilters.hours.min && timeToCompare <= serviceFilters.hours.max && filter
        const { searching } = state
        // if (searching.to_date != null) {
        //   const date = moment(service.fechaLlegada, 'DD-MM-YYYY').format().split(':')[0].split('T')[0]
        //   filter = (searching.to_date === date) && filter
        // }
        return filter
      })
      const servicesByPrice = servicesByCompany.map(service => {
        const tarifa1 = parseInt(service.tarifaPrimerPisoInternet.split('.').join(''))
        let filter1 = tarifa1 >= serviceFilters.prices.min && tarifa1 <= serviceFilters.prices.max
        if (serviceFilters.selectedClass !== 'Todos') {
          filter1 = service.servicioPrimerPiso === serviceFilters.selectedClass && filter1
        }
        let newItem = { ...service, filter1 }
        if (service.busPiso2 != null) {
          const tarifa2 = parseInt(service.tarifaSegundoPisoInternet.split('.').join(''))
          let filter2 = tarifa2 >= serviceFilters.prices.min && tarifa2 <= serviceFilters.prices.max
          if (serviceFilters.selectedClass !== 'Todos') {
            filter2 = service.servicioSegundoPiso === serviceFilters.selectedClass && filter2
          }
          newItem = { ...newItem, filter2 }
        }
        return newItem
      })
      return servicesByPrice
    },
    getServiceList: (state, getters) => vuelta => {
      let servicesTemp = []
      let services = []
      getters.getServiceFiltered.forEach(item => {
        // Detecta si el pasaje es ida o vuelta
        if (vuelta) {
          if (!item.vuelta) {
            return
          }
        } else {
          if (item.vuelta) {
            return
          }
        }
        const pisos = []
        if (services.length >= 1) {
          return
        }
        const pisoUno = {}
        const pisoDos = {}
        if (item.filter1) {
          pisoUno.piso = 0
          pisoUno.pisoText = '01'
          pisoUno.servicio = item.servicioPrimerPiso
          pisoUno.tarifa = item.tarifaPrimerPiso
          pisoUno.tarifaInternet = item.tarifaPrimerPisoInternet
          pisoUno.clase = item.idClaseBusPisoUno
          pisoUno.busPiso = item.busPiso1
          pisoUno.busOtroPiso = item.busPiso2
          pisoUno.fechaSalida = item.fechaSalida
          pisoUno.horaSalida = item.horaSalida
          pisoUno.terminalSalida = item.terminalSalida
          pisoUno.horaLlegada = item.horaLlegada
          pisoUno.fechaLlegada = item.fechaLlegada
          pisoUno.terminaLlegada = item.terminaLlegada
          pisos.push(pisoUno)
        }
        if (item.filter2) {
          pisoDos.piso = 1
          pisoDos.pisoText = '02'
          pisoDos.servicio = item.servicioSegundoPiso
          pisoDos.tarifa = item.tarifaSegundoPiso
          pisoDos.tarifaInternet = item.tarifaSegundoPisoInternet
          pisoDos.clase = item.idClaseBusPisoDos
          pisoDos.busPiso = item.busPiso2
          pisoDos.busOtroPiso = pisoUno.busPiso
          pisoDos.fechaSalida = item.fechaSalida
          pisoDos.horaSalida = item.horaSalida
          pisoDos.terminalSalida = item.terminalSalida
          pisoDos.horaLlegada = item.horaLlegada
          pisoDos.fechaLlegada = item.fechaLlegada
          pisoDos.terminaLlegada = item.terminaLlegada
          pisos.push(pisoDos)
        }
        if (pisos.length > 0) {
          servicesTemp.push({ ...Object.assign({}, item), pisos })
        }
      })
      // Obteniendo keys
      servicesTemp.forEach(item => {
        if (services.length < 1) {
          services.push({ id: item.empresa, data: [] })
        } else {
          const elements = services.filter(service => service.id === item.empresa)
          if (elements.length < 1) {
            services.push({ id: item.empresa, data: [] })
          }
        }
      })
      // Obteniendo data
      services.map(item => {
        for (let service of servicesTemp) {
          if (service.empresa === item.id) {
            item.data.push({ id: service.idServicio + service.idTerminalOrigen, ...service })
          }
        }
        return item
      })
      return services
    },
    getSelectedService: state => {
      return state.services.selected
    },
    getSearching: state => {
      return state.searching
    },
    getLoadingService: state => {
      return state.services.loading
    },
    getServiceClassFilters: state => {
      return [...new Set(state.services.data.map(item => item.level_class))]
    },
    getUserClassFilter: state => {
      if (state.serviceFilters.class) {
        return state.serviceFilters.class
      }
      return []
    },
    getUserCompanyFilter: state => {
      if (state.serviceFilters.companies) {
        const ids = state.serviceFilters.companies
        return companiesList.filter(company => {
          for (let id of ids) {
            if (company.id === id) {
              return true
            }
          }
          return false
        })
      }
      return []
    },
    set_step: state => {
      return state.step
    },

    selected: state => {
      return state.selected
    },

    show_resume: state => {
      return state.services.showResume
    },

    grid: state => {
      return state.grid
    },

    seats: state => {
      return state.seats
    },

    hasVuelta(state, getters) {
      const services = getters.getServiceList(true)
      return services.length > 0
    },
    getServicesTab(state) {
      return state.services.tab
    },
    seatsByTravel: state => vuelta => {
      return state.seats.filter(item => {
        return item.vuelta === vuelta
      })
    },

    payment_info: state => {
      if (state.userData.active) {
        return state.userData.payment_info
      }
      return state.payment_info
    },

    userData: state => {
      return state.userData
    },

    getHistory: state => {
      return state.history
    }
  }
})

export function addStoreProperty(name, property) {
  store[name] = property
}

export default store
