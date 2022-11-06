import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import CartForm from '../components/cart/CartForm'
import CartResume from '../components/cart/CartResume'

function Cart () {
  const { cart } = useContext(CartContext)

  return (
    <section id="cart" className="cart container">
      <div className="section__header row">
        <div className="col-md-10">
          <h1 className="title-primary">Iniciar Compra</h1>

          <ol className="breadcrumb">
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>Carrito</li>
          </ol>
        </div>
      </div>
      <div className="row justify-content-between w-100">
        {cart.length < 1
          ? (
          <div className="spinner-container">
            <h2>El carrito está vacío!</h2>
            <Link
              to={'/Productos'}
              className="position-relative px-3 text-underlined mt-2"
            >
              Ver productos disponibles
            </Link>
          </div>
            )
          : (
          <>
            <article className="cart__data col-md-6 flex-column">
              <CartForm />
            </article>
            <article className="cart__resume ps-md-5 ps-xl-0 col-md-6 col-xl-4 flex-column">
              <CartResume type={'page'} />
            </article>
          </>
            )}
      </div>
    </section>
  )
};

export default Cart
