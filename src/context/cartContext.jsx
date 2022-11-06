import { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

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
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const SHIP_VALUE = 475

  useEffect(() => {
    localStorage.getItem('cart') &&
      setCart(JSON.parse(localStorage.getItem('cart')))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // calculate total quantity of products in cart
  const totalQuantity = cart
    .map((item) => item.quantity.reduce((acc, cur) => acc + cur, 0))
    .reduce((acc, cur) => acc + cur, 0)

  // calculate subtotal price of products in cart
  const subtotalPrice = cart
    .map(
      (item) => item.price * item.quantity.reduce((acc, cur) => acc + cur, 0)
    )
    .reduce((acc, cur) => acc + cur, 0)

  // calculate total price
  const totalPrice = subtotalPrice + SHIP_VALUE

  const addToCart = (item, quantity, index) => {
    const size = item.size[index]

    if (quantity > item.stock[index]) {
      return Toast.fire({
        icon: 'error',
        title: `No tenemos suficiente stock del producto en talle ${size}`,
        timer: 3000
      })
    }

    // if prod exist in cart
    const prod = cart.find((p) => p.id === item.id)
    if (prod) {
      if (prod.quantity[index] + quantity > item.stock[index]) {
        return Toast.fire({
          icon: 'error',
          title: `No tenemos suficiente stock del producto en talle ${size}`
        })
      }
      prod.quantity[index] += quantity
      item.quantity[index] = prod.quantity[index]
      setCart([...cart])
    } else {
      // if prod not exist in cart
      // fill item.quantity array whit 0s when item is added to cart for first time
      for (let i = 0; i < item.size.length; i++) {
        item.quantity[i] = 0
      }
      item.quantity[index] = quantity
      setCart([...cart, item])
    }

    return Toast.fire({
      icon: 'success',
      title: `${item.title} (${quantity}) agregado exitosamente!`
    })
  }

  const addOne = (item, index) => {
    if (!cart.some((p) => p.id === item.id)) {
      return Toast.fire({
        icon: 'error',
        title: 'El producto no se encuentra en el carrito'
      })
    }
    if (item.quantity[index] >= item.stock[index]) {
      return Toast.fire({
        icon: 'error',
        title: `No tenemos más stock del producto en talle ${item.size[index]}`
      })
    }

    item.quantity[index]++
    setCart([...cart])
  }

  const reduceOne = (item, index) => {
    if (!cart.includes(item)) {
      return Toast.fire({
        icon: 'error',
        title: 'El producto no se encuentra en el carrito'
      })
    }
    if (item.quantity[index] === 1) return removeProd(item, index)

    item.quantity[index]--
    setCart([...cart])
  }

  const removeProd = (item, index) => {
    if (index !== -1 && index !== undefined) {
      item.quantity[index] = 0
      if (item.quantity.reduce((acc, cur) => acc + cur, 0) > 0) { return setCart([...cart]) }
    }

    return setCart(cart.filter((p) => p.id !== item.id))
  }

  const removeProdsOutStock = (itemsOutStock) => {
    cart.forEach((item) => {
      itemsOutStock.forEach((itemOutStock) => {
        if (item.id === itemOutStock.id) item.quantity[itemOutStock.index] = 0
      })
      if (item.quantity.reduce((acc, cur) => acc + cur, 0) === 0) { cart.splice(cart.indexOf(item), 1) }
    })
    setCart([...cart])
  }

  const clearCart = () => {
    if (cart.length < 0) {
      return Toast.fire({
        icon: 'error',
        title: 'El carrito no posee ningún producto'
      })
    }

    cart.forEach((prod) => delete prod.quantity)
    setCart([])
  }

  const updateProdQuantity = (item) => {
    if (cart.some((p) => p.id === item.id)) {
      const prod = cart.find((p) => p.id === item.id)
      if (prod) {
        return prod.quantity
      }
    }

    return 0
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        addOne,
        reduceOne,
        removeProd,
        removeProdsOutStock,
        clearCart,
        updateProdQuantity,
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
