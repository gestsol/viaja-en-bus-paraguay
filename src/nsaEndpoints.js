const base = 'https://api.nsa.com.py/develop' 

const baseSesion = `${base}/auth/api/`
const baseLists = `${base}/commons/api/`
const baseTickets = `${base}/pasajes/api`

export default {
  countryList: `${baseLists}/api/v2/pais/lista`,
}
