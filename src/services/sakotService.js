import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/sakotetut'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })

}

const deleteOne = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
  })
}

export default { 
  getAll: getAll, 
  create: create, 
  deleteOne: deleteOne 
}