/* eslint-disable*/
import Dialog from '@v/services/stepper/List/ContinueDialog'
import seat from '@v/services/stepper/List/Seat'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'
import API from '@/services/api/seats'
import _ from 'lodash'

export default {
  props: [
    'item',
    'expanded',
    'isXs',
    'back',
    'fechaSubida',
    'fechaIda',
    'fechaVuelta',
    'ciudadOrigen',
    'ciudadDestino'
  ],
  data () {
    return {
      dialog: false,
      messageType: false,
      floorArray: [0],
      selectedFloor: 0,
      clickedFloor: 0,
      data: {},
      serviceData: {},
      loadingSeats: false,
      map: [],
      bus: {
        grilla: []
      },
      seatsImg: [
        { text: 'available_seats', number: '28' },
        { text: 'selected_seats', number: '27' },
        { text: 'reserved_seats', number: '26' }
      ],
    }
  },
  components: {
    seat,
    Dialog
  },
  mounted () {
    // console.log('fromMounted')
    this.getSeats(this.item, this.expanded)
  },
  watch: {
    item () {
      console.log('watch')
      this.getSeats(this.item, this.expanded)
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      seatsByTravel: ['seatsByTravel'],
      hasVuelta: ['hasVuelta']
    }),
    getSelectedFloor () {
      const pisos = this.data.pisos
      const selected = this.selectedFloor
      const piso = pisos.filter((item) => {
        return item.piso === selected
      })[0]
      console.log('piso', piso)
      return piso
    }
  },
  methods: {
    setFloor(floorNumber) {
      this.clickedFloor = floorNumber
    },
    createDataForRequest () {
      this.serviceData = {
        empresa: this.data.empresa,
        servicio: this.data.idServicio,
        fecha: this.data.fechaSalida,
        fechaLlegada: this.data.fechaLlegada,
        fechaPasada: this.data.fechaSalida,
        fechaServicio: this.data.fechaServicio,
        horaSalida: this.data.horaSalida,
        horaLlegada: this.data.horaLlegada,
        origen: this.data.idTerminalOrigen,
        destino: this.data.idTerminalDestino,
        integrador: this.data.integrador,
        terminalLlegada: this.data.terminaLlegada,
        terminalOrigen: this.data.terminalOrigen,
        terminalDestino: this.data.terminalDestino,
        terminalSalida: this.data.terminalSalida,
        pisos: this.data.pisos
      }
      return this.serviceData
    },
    seatIsInshoppingCart (seat, piso) {
      const index = this.selectedSeats.findIndex(
        item =>
          item.piso === piso &&
          item.servicio === this.serviceData.servicio &&
          item.fecha === this.serviceData.fecha &&
          item.origen === this.serviceData.origen &&
          item.destino === this.serviceData.destino &&
          item.integrador === this.serviceData.integrador &&
          item.empresa === this.serviceData.empresa &&
          seat === item.asiento
      )
      return index
    },
    closeDialog ({ok, type}) {
      this.dialog = false
      if (ok) {
        this.$emit('confirm')
      } else {
        const tab = type ? 'Vuelta' : 'Ida'
        this.$store.dispatch('SET_SERVICE_TAB', {tab})
        scrollAnimation('#serviceToolbar')
      }
    },
    showModal () {
      if (this.hasVuelta) {
        const hasBackServices = this.seatsByTravel(true).length > 0
        const hasGoServices = this.seatsByTravel().length > 0
        if (!hasBackServices && hasGoServices) {
          this.messageType = true
          this.dialog = true
        } else if (hasBackServices && !hasGoServices) {
          this.messageType = false
          this.dialog = true
        } else {
          this.$emit('confirm')
        }
      } else {
        this.$emit('confirm')
      }
    },
    selectSeat (seat, piso, indexes) {
      const index = this.data.pisos.length > 1 ? piso : 0
      const seatIndex = this.seatIsInshoppingCart(seat, piso)
      const floorData = {
        ...this.serviceData,
        servicioNombre: this.serviceData.pisos[index].servicio,
        tarifa: this.serviceData.pisos[index].tarifaInternet,
        monto: this.serviceData.pisos[index].tarifaInternet,
        precio: this.serviceData.pisos[index].tarifaInternet,
        clase: this.serviceData.pisos[index].clase,
        bus: this.serviceData.pisos[index].busPiso,
        fechaSubida: this.fechaSubida,
        ciudadOrigen: this.ciudadOrigen,
        ciudadDestino: this.ciudadDestino,
        fechaIda: this.fechaIda,
        fechaVuelta: this.fechaVuelta,
        descuento: 0
      }
      if (seatIndex > -1) {
        this.leverageSeat({...floorData, asiento: seat, piso}, seatIndex, indexes)
      } else {
        this.takeSeat({...floorData, asiento: seat, piso}, indexes)
      }
    },
    async takeSeat (params, indexes) {
      const seatList = this.seatsByTravel(this.back)
      console.log('seatList', seatList)
      if (seatList.length > 3) {
        this.$notify({
          group: 'error',
          title: this.translate('seats_max'),
          type: 'error'
        })
        return
      }
      this.$notify({
        group: 'load',
        title: this.translate('taking_seat'),
        type: 'info'
      })
      const requestParams = this.createRequestParams(params)
      console.log(requestParams);
      const response = await API.takeSeat(requestParams)
      if (!response.data > 0) {
        this.$notify({
          group: 'error',
          title: this.translate('seats'),
          text: this.translate('seats_error1') + requestParams.asiento + this.translate('seats_error2'),
          type: 'error'
        })
        this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]].estado='ocupado'
        this.$forceUpdate()
      } else {
        const seat = Object.assign({ vuelta: this.back }, params)
        this.$store.dispatch('SET_SEAT', { seat })
      }
    },
    async leverageSeat (params, index, indexes) {
      const requestParams = this.createRequestParams(params)
      await API.freeSeat(requestParams)
      console.log('grilla', this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]])
      this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]].estado='libre'
      this.$store.dispatch('DELETE_SEAT', { seat: index })
    },
    createRequestParams (params) {
      const requestParams = _.pick(params, ['servicio', 'fecha', 'origen', 'destino', 'integrador', 'asiento'])
      requestParams.asiento = params.piso > 0 ? (parseInt(params.asiento)).toString() : params.asiento
      return requestParams
    },
    async getSeats (item, expanded) {
      this.floorArray = item.pisos.length > 1 ? [0, 1]: [0]
      this.selectedFloor = item.pisos[0].piso
      this.data = item
      if (!expanded) {
        return
      }
      if (this.bus.grilla.length > 0) {
        return
      }
      this.loadingSeats = true
      console.log('parent item', item)
      this.createDataForRequest()
      const mapResponse = await API.getMapVertical({
        idServicio: item.idServicio,
        tipoBusPiso1: item.busPiso1,
        tipoBusPiso2: item.busPiso2,
        fechaServicio: item.fechaServicio,
        idOrigen: item.idTerminalOrigen,
        idDestino: item.idTerminalDestino,
        integrador: item.integrador
      })
      console.log('availabilityParams',{
        idServicio: item.idServicio,
        tipoBusPiso1: item.busPiso1,
        tipoBusPiso2: item.busPiso2,
        fechaServicio: item.fechaServicio,
        idOrigen: item.idTerminalOrigen,
        idDestino: item.idTerminalDestino,
        integrador: item.integrador
      })
       this.map = mapResponse.data
      const floors = Object.keys(this.map)
      let grilla = []
      const map = JSON.parse(JSON.stringify(this.map))
      floors.forEach((key) => {
        grilla.push({ floor: key, grid: map[key] })
      })
      console.log('grilla', grilla)
      this.bus = { grilla }
      this.loadingSeats = false
    }
  }
}
