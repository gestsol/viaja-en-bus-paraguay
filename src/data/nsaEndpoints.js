const base = 'https://api.nsa.com.py/develop'

const baseSesion = `${base}/auth/api`
const baseLists = `${base}/commons/api`
const baseTickets = `${base}/pasajes/api`
const endPoints = {
  login: `${baseSesion}/v1/login`,
  listaPaises: `${baseLists}/v2/pais/lista`,
  listaProximos: `${baseTickets}/v1/viaje-buses/proximos`,
  listaTipoDocumento: `${baseLists}/v2/tipo-documento/lista`,
  listaServicioBuses: `${baseTickets}/v1/viaje-buses/servicios`,
  ciudadParadas: `${baseTickets}/v1/viaje-buses/ciudad-paradas`,
  agenciaParadas: `${baseTickets}/v1/viaje-buses/agencia-paradas?subdivision=3&servicio=2&ruta=478&dia=MA&hora=16:00&salida=08/10/2019 16:00:00&pais=1&divpol=10&ciudad=1`,
  listaEmpresas: `${baseLists}/v2/empresa/subdivision`,
  listaViajes: `${baseTickets}/v1/viaje-buses/lista-viaje`,
  listaAsientos: `${baseTickets}/v1/viaje-buses/lista-asiento?agencia=2&subdivision=3&servicio=2&ruta=481&salida=01/12/2018 00:00:00&paisOrigen=1&divpolOrigen=10&ciudadOrigen=1&paisDestino=1&divpolDestino=11&ciudadDestino=1&piso=0`,
  datosCliente: `${baseLists}/v2/cliente/datos?nroDocumento=4476360&codCliente&tipoDocumento=1`,
  procesoVenta: `${baseTickets}/v1/venta/guardar`,
  venta: `${baseTickets}/v1/venta/pasaje`,
  consultaPasajes: `${baseTickets}/v1/pasaje/consulta?nroComprobante=82460000003&codCliViajero=37593479&codCliPagante=37593479&fechaVenta=28/11/2018 09:52:51&fechaViaje=01/12/2018 00:00:00&agencia=448&idExtVenta=1`,
  devuelvePasaje: `${baseTickets}/v1/pasaje/devolucion`,
  registraPasajero: `${baseTickets}/v1/pasaje/registerpassenger`,
  recorridoViaje: `${baseTickets}/v1/viaje-buses/recorrido?subdiv=3&servicio=2&ruta=481&dia=SA&hora=00:00&salida=01/12/2018 00:00:00`,
  cancelar: `${baseTickets}/v1/venta/cancelar`
}
export default endPoints
