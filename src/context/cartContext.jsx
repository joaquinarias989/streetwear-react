import { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {
  AddProductToCart,
  ClearCart,
  CreateCart,
  DeleteProductFromCart,
  DeleteProductSizeFromCart
} from '../services/carts'

export const CartContext = createContext([])

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 2000,
  timerProgressBar: true
})

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const SHIP_VALUE = 475

  useEffect(() => {
    localStorage.getItem('cart') && setCart(JSON.parse(localStorage.getItem('cart')))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // calculate total quantity of products in cart
  const totalQuantity = cart?.products
    .map((item) => item.quantities.reduce((acc, cur) => acc + cur, 0))
    .reduce((acc, cur) => acc + cur, 0)

  // calculate subtotal price of products in cart
  const subtotalPrice = cart?.products
    .map((item) => item.price * item.quantities.reduce((acc, cur) => acc + cur, 0))
    .reduce((acc, cur) => acc + cur, 0)

  // calculate total price
  const totalPrice = subtotalPrice + SHIP_VALUE

  const createCart = async () => {
    let cartId = ''

    await CreateCart()
      .then((resp) => {
        if (resp.success) {
          setCart(resp.data)
          cartId = resp.data._id
        } else {
          Swal.fire({
            text: resp.message,
            confirmButtonText: 'Aceptar',
            icon: 'error'
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )

    return cartId
  }

  const addToCart = async (prodId, size, quantity) => {
    Toast.fire({
      didOpen: () => Swal.showLoading()
    })

    let cartId = ''
    if (cart === null) {
      cartId = await createCart()
    }

    await AddProductToCart(cartId !== '' ? cartId : cart._id, prodId, size, quantity)
      .then((resp) => {
        if (resp.success) {
          setCart(resp.data)
          Toast.fire({
            icon: 'success',
            title: resp.message
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: resp.message
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
  }

  const reduceOne = () => {}

  const removeProd = async (prodId) => {
    Toast.fire({
      didOpen: () => Swal.showLoading()
    })

    await DeleteProductFromCart(cart._id, prodId)
      .then((resp) => {
        if (resp.success) {
          setCart(resp.data)
          Toast.fire({
            icon: 'success',
            title: resp.message
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: resp.message
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
  }

  const removeProdSize = async (prodId, size) => {
    Toast.fire({
      didOpen: () => Swal.showLoading()
    })

    await DeleteProductSizeFromCart(cart._id, prodId, size)
      .then((resp) => {
        if (resp.success) {
          setCart(resp.data)
          Toast.fire({
            icon: 'success',
            title: resp.message
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: resp.message
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
  }

  const clearCart = async () => {
    Toast.fire({
      didOpen: () => Swal.showLoading()
    })

    await ClearCart(cart._id)
      .then((resp) => {
        if (resp.success) {
          setCart(resp.data)
          Toast.fire({
            icon: 'success',
            title: resp.message
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: resp.message
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
  }

  const clearCartOnPurchase = () => setCart(null)

  return (
    <CartContext.Provider
      value={{
        addToCart,
        reduceOne,
        removeProd,
        removeProdSize,
        clearCart,
        clearCartOnPurchase,
        cart,
        ship: SHIP_VALUE,
        subtotalPrice,
        totalPrice,
        totalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
