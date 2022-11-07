import axios from 'axios'
import ServiceResponse from '../models/ServiceResponse'

const URI_API = 'http://localhost:8080/api'

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
        id: data._id,
        img: data.urlImg,
        category: 'Remeras',
        quantity: [0]
      }
    ]
  }

  return data.map((item) => ({
    ...item,
    id: item._id,
    price: item.price,
    img: item.urlImg,
    category: 'REM',
    quantity: [0]
  }))
}
