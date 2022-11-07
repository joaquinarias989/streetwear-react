import { memo, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CartContext } from '../../context/cartContext'
import ProdQuantity from './ProdQuantity'

const ProdCard = memo(({ prod }) => {
  const [sizeSelected, setSizeSelected] = useState(Array.prototype.indexOf())
  const { addToCart } = useContext(CartContext)
  const index = prod.size.indexOf(sizeSelected)

  const onAdd = (quantity) => {
    if (index === -1) {
      return Swal.fire({
        icon: 'error',
        title: 'No seleccionaste el talle che!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true
      })
    }
    addToCart(prod, quantity, index)
  }

  return (
    <article className='product__card'>
      {prod.price < 5000 && <span className='offer'>GANGA!</span>}
      <Link to={`/Productos/${prod.id}`}>
        <div className='product__card__img'>
          <img src={prod.img} alt='Imagen del producto' loading='lazy' />
        </div>
        <div className='product__card__info'>
          <h4 className='product__card__title'>{prod.title}</h4>
          <h4 className='product__card__price'>$ {prod.price}</h4>
        </div>
      </Link>

      <ProdQuantity
        stock={index > -1 ? prod.stock[index] : 1}
        onAdd={onAdd}
        sizes={prod.size}
        onChangeSize={setSizeSelected}
      />
    </article>
  )
})

export default ProdCard
