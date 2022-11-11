import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'http://localhost:8080/api/'

export async function PurchaseOrder(idCart, userEmail) {
  const resp = new ServiceResponse()

  let axiosConfig = {
    method: 'POST',
    url: `${URI_API}/'orders`
  }

  if (userEmail) axiosConfig = { ...axiosConfig, data: userEmail, withCredentials: true }

  await axios(axiosConfig)
    .then((res) => {
      console.log(res)
      if (res.status !== 200) {
        resp.success = false
      } else {
        resp.data = res.data.data
      }
      resp.message = res.data.message
    })
    .catch((err) => {
      resp.success = false
      if (!err.response.data.success) {
        resp.message = err.response.data.message
      } else {
        resp.message = 'Algo salió mal. Por favor, intentá nuevamente.'
      }
    })

  console.log(resp)

  return resp
}
