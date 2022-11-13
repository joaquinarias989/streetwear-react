import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CartContext } from '../../context/cartContext'
import { UserContext } from '../../context/userContext'
import { PurchaseOrder } from '../../services/orders'
import Loading from '../shared/Loading'

const CartForm = () => {
  const { cart, ship, clearCartOnPurchase } = useContext(CartContext)
  const { loadingUser, user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { name, email, postalCode, province, address, department, phone, dni } = e.target.elements

    const buyer = {
      name: name.value,
      email: email.value,
      postalCode: postalCode.value,
      province: province.value,
      address: `${address.value}, ${department.value}`,
      phone: phone.value,
      document: dni.value
    }
    await PurchaseOrder(cart._id, buyer)
      .then((resp) => {
        if (resp.success) {
          Swal.fire({
            title: resp.message.split('!')[0],
            text: resp.message.split('!')[1],
            confirmButtonText: 'Listo',
            icon: 'success'
          })
          clearCartOnPurchase()
        } else {
          Swal.fire({
            title: resp.message.includes('existe') ? 'Ya haz realizado la compra de este Carrito' : resp.message,
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

    e.target.reset()
    setLoading(false)
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
