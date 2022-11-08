import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import { UserContext } from '../../context/userContext'
import Loading from '../shared/Loading'

const CartForm = () => {
  const { cart, ship, totalPrice, clearCart, removeProdsOutStock } = useContext(CartContext)
  const { loadingUser, user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const prodsOutOfStock = await verifyStock(cart)
    // if (prodsOutOfStock.length > 0) {
    //   removeProdsOutStock(prodsOutOfStock)
    //   setLoading(false)

    //   return MySwal.fire({
    //     title: <h2>No pudimos avanzar con tu compra</h2>,
    //     html: (
    //       <>
    //         <p>No tenemos suficiente stock de los siguientes productos:</p>
    //         {prodsOutOfStock.map((p) => (
    //           <i key={p.id} className="d-block">
    //             <span className="fw-bold">{p.title}</span>, Talle:{' '}
    //             <span className="fw-bold">{p.size}</span>
    //           </i>
    //         ))}
    //         <p>
    //           Los hemos eliminado del carrito para facilitarle las cosas, probá
    //           agregarlos nuevamente y verificá!
    //         </p>
    //       </>
    //     ),
    //     icon: 'error'
    //   })
    // }

    // const order = {
    //   buyer: {
    //     name: e.target.elements.name.value,
    //     email: e.target.elements.email.value,
    //     postalCode: e.target.elements.postalcode.value,
    //     province: e.target.elements.province.value,
    //     address: e.target.elements.address.value,
    //     department: e.target.elements.department.value,
    //     phone: e.target.elements.phone.value,
    //     dni: e.target.elements.dni.value
    //   },
    //   items: cart.map((item) => ({
    //     id: item.id,
    //     title: item.title,
    //     price: item.price,
    //     quantity: item.quantity,
    //     img: item.img,
    //     size: item.size,
    //     color: item.color
    //   })),
    //   total: totalPrice,
    //   date: new Date()
    // }
    // const resp = await createOrder(order, cart)
    // if (resp === 'Algo salió mal') {
    //   setLoading(false)

    //   return MySwal.fire({
    //     title: <h2>{resp}</h2>,
    //     text: 'Por favor, intenta nuevamente',
    //     icon: 'error'
    //   })
    // }

    clearCart()
    e.target.reset()
    setLoading(false)

    // return MySwal.fire({
    //   title: <h2>Compra realizada exitosamente!</h2>,
    //   html: (
    //     <>
    //       <strong>Cód. de Transaccion: </strong>
    //       <i>#{resp}</i>
    //       <p className="text-muted">
    //         (Te recomendamos guardar éste codigo ya que puede servirte ante
    //         cualquier inconveniente)
    //       </p>
    //     </>
    //   ),
    //   confirmButtonText: 'Listo',
    //   icon: 'success'
    // })
  }

  return (
    <>
      <div id='accordionData'>
        <div className='cart__ship'>
          <h2 className='text-leftline' id='panelsStayOpen-headingOne'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#panelsStayOpen-collapseOne'
              aria-expanded='true'
              aria-controls='panelsStayOpen-collapseOne'
            >
              <span>Entrega</span>
            </button>
          </h2>

          <div
            id='panelsStayOpen-collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='panelsStayOpen-headingOne'
          >
            <div className='flex-row jc-between algn-items-center mt-4'>
              <p>Correo Argentino - Envío a Domicilio</p>
              <span className='text-overline px-3'>$ {ship}</span>
            </div>
          </div>
        </div>
        <form id='formPurchase' onSubmit={handlePurchase}>
          {loadingUser ? (
            <Loading />
          ) : (
            <>
              <div className='cart__personal mt-5'>
                <h2 className='text-leftline mb-1' id='panelsStayOpen-headingTwo'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseTwo'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseTwo'
                  >
                    <span>Datos del Destinatario</span>
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseTwo'
                  className='accordion-collapse collapse show'
                  aria-labelledby='panelsStayOpen-headingTwo'
                >
                  {!user && (
                    <p className='text-end'>
                      ¿Ya tenes cuenta?
                      <NavLink to='/Ingresar' className='text-accent ms-2'>
                        ¡Iniciá sesión!
                      </NavLink>
                    </p>
                  )}
                  <input
                    type='text'
                    name='name'
                    className='form__input'
                    placeholder='Nombre y Apellido'
                    defaultValue={user?.name || ''}
                    required
                  />
                  <input
                    type='email'
                    name='email'
                    className='form__input'
                    placeholder='Email'
                    defaultValue={user?.email || ''}
                    required
                  />
                  <div className='flex-row jc-between'>
                    <input
                      type='number'
                      name='postalCode'
                      className='form__input'
                      placeholder='Cód. Postal'
                      defaultValue={user?.postalCode || ''}
                      required
                    />
                    <select
                      name='province'
                      className='form__input'
                      defaultValue={user?.province || 'Provincia'}
                      required
                    >
                      <option value='Provincia' disabled>
                        Provincia
                      </option>
                      <option value='CBA'>Córdoba</option>
                      <option value='BASAS'>Buenos Aires</option>
                      <option value='STAFE'>Santa Fe</option>
                    </select>
                  </div>
                  <input
                    type='text'
                    name='address'
                    className='form__input'
                    placeholder='Domicilio'
                    defaultValue={user?.address || ''}
                    required
                  />
                  <input type='text' name='department' className='form__input' placeholder='Departamento (opcional)' />
                  <input
                    type='tel'
                    name='phone'
                    className='form__input'
                    placeholder='Télefono'
                    defaultValue={user?.phone || ''}
                    required
                  />
                </div>
              </div>
              <div className='cart__fact mt-5'>
                <h2 className='text-leftline mb-4' id='panelsStayOpen-headingThree'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseThree'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseThree'
                  >
                    <span>Datos de Facturación</span>
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseThree'
                  className='accordion-collapse collapse show'
                  aria-labelledby='panelsStayOpen-headingThree'
                >
                  <input type='number' name='dni' className='form__input' placeholder='DNI ó CUIL' required />
                  <div className='checkbox__box d-flex gap-2'>
                    <input type='checkbox' name='check' className='form-check-input' id='check' />
                    <label htmlFor='check'>Mis datos de facturación y entrega son los mismos</label>
                  </div>
                </div>
              </div>
              {loading ? (
                <button type='button' className='btn-principal mt-5 w-100' aria-label='Procesando compra' disabled>
                  <i className='fa-solid fa-spinner'></i>
                  Procesando compra...
                </button>
              ) : (
                <button type='submit' className='btn-principal mt-5 w-100' aria-label='Pagar'>
                  <i className='fa fa-money-bill-alt'></i>
                  Continuar al pago
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default CartForm
