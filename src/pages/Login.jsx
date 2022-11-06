import { Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'

function Login () {
  const [loading, setLoading] = useState(false)
  const [userLogued, setUserLogued] = useState(false)

  // login whit firebase
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
  }

  // logout whit firebase
  const handleLogout = async (e) => {
    e.preventDefault()
  }

  // recover password with firebase
  const handleRecover = async (e) => {
    e.preventDefault()
    setLoading(true)
    const email = e.target.elements.email.value
  }

  return (
    <section id="login" className="login container">
      <h1 className="title-primary">
        {userLogued ? 'Mi Cuenta' : 'Iniciar Sesión'}
      </h1>
      <div className="row justify-content-between mt-5">
        <div className="col-md-7 col-lg-6">
          {userLogued
            ? (
              <div className="form__paper">
                <h1 className="text-center">Bienvenido de vuelta!</h1>
                <button
                  type="submit"
                  className="btn-principal mt-5"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-in-alt"></i> Cerrar sesión
                </button>
              </div>
              )
            : (
              <form className="form__paper" id="formLogin" onSubmit={handleLogin}>
                <fieldset disabled={loading && true}>
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
                  <button
                    type="button"
                    className="text-accent w-100 text-end"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRecover"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  {loading
                    ? (
                      <button type='button' className="btn-principal" disabled>
                        <i className="fa-solid fa-spinner"></i> Ingresando...
                      </button>
                      )
                    : (
                      <button type="submit" className="btn-principal">
                        <i className="fa fa-sign-in-alt"></i> Iniciar sesión
                      </button>
                      )}
                </fieldset>

                <p>
                  ¿No tenes cuenta?{' '}
                  <Link to={'/Registrarse'} className="text-accent">
                    ¡Creála!
                  </Link>
                </p>
              </form>
              )}
        </div>
        <div className="icons col-md-3 d-flex flex-md-column justify-content-center align-items-center mt-5 mt-md-0">
          <i className="fa fa-user"></i>
          <i className="fas fa-hand-peace"></i>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalRecover"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="title-primary w-100" id="exampleModalLabel">
                Recuperar contraseña
              </h2>
            </div>
            <form onSubmit={handleRecover}>
              <div className="modal-body">
                <div className="input__box">
                  <label htmlFor="email-recover" className="form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-recover"
                    name="email"
                    className="form__input"
                    required />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn-secundario"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                >
                  <i className="fa fa-times"></i>Cancelar
                </button>
                {loading
                  ? (
                    <button
                      type="submit"
                      className="btn-principal"
                      aria-label="Enviar correo"
                    >
                      <i className="fa-solid fa-spinner"></i> Enviando...
                    </button>
                    )
                  : (
                    <button
                      type="submit"
                      className="btn-principal"
                      aria-label="Enviar correo"
                    >
                      <i className="fa fa-paper-plane"></i> Enviar correo
                    </button>
                    )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
