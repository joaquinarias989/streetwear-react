import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
// import Swal from 'sweetalert2'

function useProducts(id, category) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMoreProds, setLoadingMoreProds] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getProducts({ id, category })
      .then((resp) => {
        if (resp.success) {
          setProducts(resp.data)
        } else {
          if (id) navigate('/404')
          else {
            setMessage(resp.message)
          }
        }
      })
      .catch(() => setMessage('Algo salió mal. Por favor, intenta nuevamente'))
      .finally(() => setLoading(false))
  }, [id, category])

  const handleLoadMoreProds = () => {
    setLoadingMoreProds(true)
    // getMoreProds(lastDoc, category)
    //   .then((data) => {
    //     if (data.size > 0) {
    //       setProducts([
    //         ...products,
    //         ...data.docs.map((item) => ({
    //           id: item.id,
    //           quantity: [0],
    //           ...item.data()
    //         }))
    //       ])
    //       setLastDoc(data.docs[data.docs.length - 1])
    //     } else {
    //       Toast.fire({
    //         icon: 'warning',
    //         title: `No quedan ${category || 'productos'} por cargar`
    //       })
    //     }
    //   })
    //   .catch(() => {
    //     setLoadingMore(false)

    //     return Swal.fire({
    //       title: 'Algo salió mal',
    //       text: 'Por favor, intenta nuevamente',
    //       icon: 'error'
    //     })
    //   })
    //   .finally(() => setLoadingMore(false))
  }

  return {
    products,
    id,
    loading,
    loadingMoreProds,
    message,
    handleLoadMoreProds
  }
}

export default useProducts
