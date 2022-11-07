import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Loading from '../components/shared/Loading'

function Login() {
  const { loadingUser, handleLogin, handleRecover } = useContext(UserContext)

  return (
    <section id='login' className='login container'>
      <h1 className='title-primary'>Iniciar Sesión</h1>
      <div className='row justify-content-between mt-5'>
        <div className='col-md-7 col-lg-6'>
          <form className='form__paper' id='formLogin' onSubmit={handleLogin}>
            {loadingUser ? (
              <Loading />
            ) : (
              <>
                <fieldset disabled={loadingUser}>
                  <div className='input__box'>
                    <label htmlFor='email' className='form__label'>
                      Email
                    </label>
                    <input type='text' id='email' name='email' className='form__input' required />
                  </div>
                  <div className='input__box'>
                    <label htmlFor='password' className='form__label'>
                      Contraseña
                    </label>
                    <input type='password' id='password' name='password' className='form__input' required />
                  </div>
                  <button
                    type='button'
                    className='text-accent w-100 text-end'
                    data-bs-toggle='modal'
                    data-bs-target='#modalRecover'
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  {loadingUser ? (
                    <button type='button' className='btn-principal' disabled>
                      <i className='fa-solid fa-spinner'></i> Ingresando...
                    </button>
                  ) : (
                    <button type='submit' className='btn-principal'>
                      <i className='fa fa-sign-in-alt'></i> Iniciar sesión
                    </button>
                  )}
                </fieldset>

                <p>
                  ¿No tenes cuenta?{' '}
                  <Link to={'/Registrarse'} className='text-accent'>
                    ¡Creála!
                  </Link>
                </p>
              </>
            )}
          </form>
        </div>
        <div className='icons col-md-3 d-flex flex-md-column justify-content-center align-items-center mt-5 mt-md-0'>
          <i className='fa fa-user'></i>
          <i className='fas fa-hand-peace'></i>
        </div>
      </div>
      <div
        className='modal fade'
        id='modalRecover'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='title-primary w-100' id='exampleModalLabel'>
                Recuperar contraseña
              </h2>
            </div>
            <form onSubmit={handleRecover}>
              <div className='modal-body'>
                <div className='input__box'>
                  <label htmlFor='email-recover' className='form__label'>
                    Email
                  </label>
                  <input type='email' id='email-recover' name='email' className='form__input' required />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='reset' className='btn-secundario' data-bs-dismiss='modal' aria-label='Cerrar'>
                  <i className='fa fa-times'></i>Cancelar
                </button>
                {loadingUser ? (
                  <button type='submit' className='btn-principal' aria-label='Enviar correo'>
                    <i className='fa-solid fa-spinner'></i> Enviando...
                  </button>
                ) : (
                  <button type='submit' className='btn-principal' aria-label='Enviar correo'>
                    <i className='fa fa-paper-plane'></i> Enviar correo
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
