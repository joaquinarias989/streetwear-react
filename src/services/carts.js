import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'https://street-wear-ecommerce-api.herokuapp.com/api'

export async function CreateCart() {
  const resp = new ServiceResponse()

  const axiosConfig = {
    method: 'POST',
    withCredentials: true,
    url: `${URI_API}/cart`
  }

  await axios(axiosConfig)
    .then((res) => {
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
        resp.message = 'Algo salió mal. Por favor, intente nuevamente.'
      }
    })

  return resp
}

export async function AddProductToCart(cartId, prodId, size, quantity) {
  const resp = new ServiceResponse()

  const axiosConfig = {
    method: 'POST',
    withCredentials: true,
    data: {
      idProduct: prodId.toString(),
      size: size.toUpperCase().trim(),
      quantity
    },
    url: `${URI_API}/cart/${cartId}/products`
  }

  await axios(axiosConfig)
    .then((res) => {
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
        resp.message = 'Algo salió mal. Por favor, intente nuevamente.'
      }
    })

  return resp
}

export async function GetCartProducts(cartId, user) {
  const resp = new ServiceResponse()

  await axios({ method: 'GET', withCredentials: !!user, url: `${URI_API}/cart/${cartId}/products` })
    .then((res) => {
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

export async function DeleteProductSizeFromCart(cartId, prodId, size) {
  const resp = new ServiceResponse()

  const axiosConfig = {
    method: 'PUT',
    data: {
      idProduct: prodId.toString(),
      size: size.toUpperCase().trim()
    },
    url: `${URI_API}/cart/${cartId}/products`
  }

  await axios(axiosConfig)
    .then((res) => {
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
        resp.message = 'Algo salió mal. Por favor, intente nuevamente.'
      }
    })

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
        resp.message = 'Algo salió mal. Por favor, intente nuevamente.'
      }
    })

  return resp
}

export async function ClearCart(cartId) {
  const resp = new ServiceResponse()

  const axiosConfig = {
    method: 'DELETE',
    url: `${URI_API}/cart/${cartId}/products/`
  }

  await axios(axiosConfig)
    .then((res) => {
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
        resp.message = 'Algo salió mal. Por favor, intente nuevamente.'
      }
    })

  return resp
}
