import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import CartItem from './CartItem'

const CartResume = ({ type }) => {
  const { cart, ship, clearCart, subtotalPrice, totalPrice } = useContext(CartContext)

  if (cart === null || cart.products?.length < 1)
    return (
      <div className='text-center'>
        <h2>El carrito está vacío!</h2>
        <Link to={'/Productos'} className='position-relative px-3 text-underlined mt-2'>
          Ver productos disponibles
        </Link>
      </div>
    )

  return type === 'page' ? (
    <>
      <div className='cart__resume__products flex-column'>
        {cart?.products?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button type='button' className='btn-remove fw-light' onClick={() => clearCart()}>
        <i className='fa fa-trash me-2'></i> Limpiar carrito
      </button>
      <div className='cart__subtotal flex-column'>
        <h4 className='flex-row jc-between algn-items-center'>
          Subtotal <span>$ {subtotalPrice}</span>
        </h4>
        <h4 className='flex-row jc-between algn-items-center'>
          Costo de Envío <span>$ {ship}</span>
        </h4>
      </div>
      <div className='cart__total flex-row flex-wrap jc-between algn-items-center'>
        <h2 className='text-overline'>TOTAL</h2>
        <h2 className='text-overline'>$ {totalPrice}</h2>
      </div>
    </>
  ) : (
    <>
      <div className='cart__resume__products flex-column'>
        {cart?.products?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button type='button' className='btn-remove w-100 fw-light mt-3 py-2' onClick={() => clearCart()}>
        <i className='fa fa-trash me-2'></i> Limpiar carrito
      </button>
      <div className='cart__subtotal d-flex jc-between'>
        <h4 className='flex-row jc-between algn-items-center text-overline'>Subtotal</h4>
        <span id='subtotal' className='text-overline'>
          $ {subtotalPrice}
        </span>
      </div>
      <div className='text-center mt-3'>
        <NavLink to={'/Carrito'} className='position-relative text-underlined px-3'>
          Ir al Carrito
        </NavLink>
      </div>
    </>
  )
}

export default CartResume
