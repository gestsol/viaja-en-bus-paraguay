import axios from 'axios'
import endPoints from '@/nsaEndpoints'

export default {
  get (params) {
    return axios.get(endPoints.listaViajes, {params}, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
