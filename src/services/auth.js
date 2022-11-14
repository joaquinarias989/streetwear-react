import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'https://street-wear-ecommerce-api.herokuapp.com/api'

export async function LoginUser(email, password) {
  const resp = new ServiceResponse()

  await axios({
    method: 'POST',
    data: {
      email,
      password
    },
    withCredentials: true,
    url: `${URI_API}/auth/login`
  })
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

  console.log(resp)

  return resp
}

export async function GetUserAuthenticated() {
  const resp = new ServiceResponse()

  await axios({ method: 'GET', withCredentials: true, url: `${URI_API}/auth/user-logued` })
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

export async function LogoutUser() {
  const resp = new ServiceResponse()

  await axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${URI_API}/auth/logout`
  })
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

  console.log(resp)

  return resp
}

export async function SignUpUser(newUser) {
  const resp = new ServiceResponse()

  const formData = new FormData()
  formData.append('name', newUser.name)
  formData.append('province', newUser.province)
  formData.append('postalCode', newUser.postalCode)
  formData.append('address', newUser.address)
  formData.append('phone', newUser.phone)
  formData.append('email', newUser.email)
  formData.append('password', newUser.password)
  formData.append('avatar', newUser.avatar)
  await axios({
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
    withCredentials: true,
    url: `${URI_API}/auth/signUp`
  })
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

  console.log(resp)

  return resp
}
