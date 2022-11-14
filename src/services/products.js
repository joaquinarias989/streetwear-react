import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'https://street-wear-ecommerce-api.herokuapp.com//api'

export async function getProducts({ id = undefined, category = undefined }) {
  const resp = new ServiceResponse()
  resp.data = []
  const endpoint = `${URI_API}/products${id ? `/${id}` : category ? `/categories/${category}` : '/'}`

  await axios
    .get(endpoint)
    .then((res) => {
      if (res.status !== 200) {
        resp.success = false
        resp.message = res.data.message
      } else {
        resp.data = formatProdsFromAPI(res.data.data)
      }
    })
    .catch(() => {
      resp.success = false
      resp.message = 'Algo salio mal. Por favor, intente nuevamente.'
    })

  return resp
}

function formatProdsFromAPI(data) {
  if (!data.length) {
    return [
      {
        ...data,
        category: 'Remeras'
      }
    ]
  }

  return data.map((item) => ({
    ...item,
    category: 'Remeras'
  }))
}
