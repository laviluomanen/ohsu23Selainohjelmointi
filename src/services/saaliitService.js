import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/saaliit'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}


export default { 
  getAll: getAll
}