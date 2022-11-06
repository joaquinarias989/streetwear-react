import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Register () {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // register whit firebase
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
  }

  return (
    <section id="register" className="register container">
      <h1 className="title-primary">Crear Cuenta</h1>
      <p className="text-leftline">
        Comprá más rápido y llevá el control de tus pedidos, ¡en un solo lugar!
      </p>
      <div className="row justify-content-between w-100">
        <div className="col-md-9 col-xl-8">
          <form
            className="form__paper"
            id="formRegister"
            onSubmit={handleRegister}
          >
            <fieldset disabled={loading && true}>
              <div className="input__box">
                <label htmlFor="name" className="form__label">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form__input"
                  required />
              </div>
              <div className="input__box flex-column flex-md-row w-100">
                <div className="codpostal w-100 w-md-50">
                  <label htmlFor="postalcode" className="form__label">
                    Cód. Postal
                  </label>
                  <input
                    type="number"
                    id="postalcode"
                    name="postalcode"
                    className="form__input"
                    required />
                </div>
                <div className="prov w-100 w-md-50">
                  <label htmlFor="province" className="form__label">
                    Provincia
                  </label>
                  <select
                    name="province"
                    className="form__input"
                    defaultValue={'Provincia'}
                    required
                  >
                    <option value={'Provincia'} disabled>

                    </option>
                    <option value="cba">Córdoba</option>
                    <option value="bsas">Buenos Aires</option>
                    <option value="stafe">Santa Fe</option>
                  </select>
                </div>
              </div>
              <div className="input__box">
                <label htmlFor="address" className="form__label">
                  Domicilio
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form__input"
                  required />
              </div>
              <div className="input__box">
                <label htmlFor="email" className="form__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form__input"
                  required />
              </div>
              <div className="input__box">
                <label htmlFor="password" className="form__label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form__input"
                  required />
              </div>
              <button type="submit" className="btn-principal">
                <i className="fa fa-user-plus"></i> Crear cuenta
              </button>
              <p className="text-end pt-1">
                ¿Ya tenes cuenta?{' '}
                <Link to={'/Ingresar'} className="text-accent">
                  ¡Iniciá sesión!
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
        <div className="icons col-md-3 d-flex flex-md-column justify-content-center align-items-center">
          <i className="fa fa-user-plus"></i>
          <i className="fa fa-file"></i>
        </div>
      </div>
    </section>
  )
}

export default Register
