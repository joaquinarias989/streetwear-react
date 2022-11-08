import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'http://localhost:8080/api/'

export async function CreateCart(userEmail) {
  const resp = new ServiceResponse()

  let axiosConfig = {
    method: 'POST',
    url: `${URI_API}/cart`
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
        resp.message = 'Algo salio mal. Por favor, intente nuevamente.'
      }
    })

  console.log(resp)

  return resp
}

export async function GetCartProducts(cartId, user) {
  const resp = new ServiceResponse()

  await axios({ method: 'GET', withCredentials: !!user, url: `${URI_API}/cart/${cartId}/products` })
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
        resp.message = 'Algo salio mal. Por favor, intente nuevamente.'
      }
    })

  return resp
}

export async function DeleteCart(cartId, userEmail) {
  const resp = new ServiceResponse()

  let axiosConfig = {
    method: 'DELETE',
    url: `${URI_API}/cart/${cartId}`
  }

  if (userEmail) axiosConfig = { ...axiosConfig, withCredentials: true }

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
        resp.message = 'Algo salio mal. Por favor, intente nuevamente.'
      }
    })

  console.log(resp)

  return resp
}

export async function DeleteProductFromCart(cartId, prodId) {
  const resp = new ServiceResponse()

  const axiosConfig = {
    method: 'DELETE',
    url: `${URI_API}/cart/${cartId}/products/${prodId}`
  }

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
        resp.message = 'Algo salio mal. Por favor, intente nuevamente.'
      }
    })

  console.log(resp)

  return resp
}

/// ////// VER SI MANEJAMOS EL CARRITO DIRECTAMENTE DESDE EL LOCAL STORAGE, SETEANDO EL EMAIL DEL USUARIO SI ESTÁ LOGUEADO
