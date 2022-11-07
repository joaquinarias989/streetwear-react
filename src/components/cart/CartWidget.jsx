import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import CartResume from './CartResume'

function CartWidget() {
  const { totalQuantity } = useContext(CartContext)
  const { pathname } = useLocation()

  return (
    <li className='cart-link'>
      <NavLink
        to='/Carrito'
        className={({ isActive }) => (isActive ? 'menu__link menu__link--active me-0' : 'menu__link me-0')}
        aria-label='Carrito de compras'
      >
        <i className='fas fa-shopping-bag text-white'></i>
      </NavLink>
      <span className='cart-quantity'>{totalQuantity > 0 && totalQuantity}</span>
      <div className={pathname === '/Carrito' ? 'd-none' : 'cart__resume__nav'}>
        <CartResume />
      </div>
    </li>
  )
}

export default CartWidget
