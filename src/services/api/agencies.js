import axios from 'axios'
import endPoints from '@/nsaEndPoints'

const agencies = endPoints.agenciaParadas

export default {
  getByFilters (params) {
    return axios.get(agencies, {params})
  }
}
