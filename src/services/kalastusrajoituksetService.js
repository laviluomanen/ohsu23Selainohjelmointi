import axios from 'axios'
const baseUrl = '/api/rajoitukset'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }


export default { 
  getAll: getAll
}