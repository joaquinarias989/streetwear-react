import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'http://localhost:8080/api'

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

export async function GetUserAuthenticated() {
  const resp = new ServiceResponse()

  await axios({ method: 'GET', withCredentials: true, url: `${URI_API}/auth/user-logued` })
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

export async function LogoutUser(username, password) {
  const resp = new ServiceResponse()

  await axios({
    method: 'DELETE',
    withCredentials: true,
    url: `${URI_API}/auth/logout`
  })
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

export async function SignUpUser(newUser) {
  const resp = new ServiceResponse()

  await axios({
    method: 'POST',
    data: newUser,
    withCredentials: true,
    url: `${URI_API}/auth/signUp`
  })
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
