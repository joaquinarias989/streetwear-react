import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { GetUserAuthenticated, LoginUser, LogoutUser, SignUpUser } from '../services/auth'

export const UserContext = createContext({})

// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   showCloseButton: true,
//   timer: 2000,
//   timerProgressBar: true
// })

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loadingUser, setLoadingUser] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoadingUser(true)
    GetUserAuthenticated()
      .then((resp) => {
        if (resp.success) {
          setUser(resp.data)
          if (pathname === '/Ingresar') navigate('/Cuenta')
        } else {
          setUser(null)
          if (pathname === '/Cuenta') navigate('/Ingresar')
        }
      })
      .catch(() => {
        setUser(null)
        if (pathname === '/Cuenta') navigate('/Ingresar')
      })
      .finally(() => setLoadingUser(false))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoadingUser(true)

    const { email, password } = e.target.elements
    LoginUser(email.value, password.value)
      .then((resp) => {
        if (resp.success) {
          setUser(resp.data)

          return Swal.fire({
            title: `Bienvenido de vuelta ${resp.data.name}`,
            text: '¡Has iniciado sesión correctamente! Serás redireccionado en unos segundos',
            icon: 'success',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3500,
            timerProgressBar: true
          }).then(() => {
            setLoadingUser(false)
            navigate('/Cuenta')
          })
        } else {
          return Swal.fire({
            title: 'Usuario y/o contraseña incorrectos',
            text: 'Por favor, verifica las credenciales.',
            confirmButtonText: 'Aceptar',
            icon: 'error'
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salio mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
      .finally(() => setLoadingUser(false))
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    setLoadingUser(true)

    LogoutUser()
      .then((resp) => {
        if (resp.success) {
          Swal.fire({
            title: `Hasta pronto ${user.name}!`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success'
          })
          setUser(null)
        } else {
          Swal.fire({
            title: 'Algo salió mal',
            text: 'Por favor, intenta nuevamente.',
            confirmButtonText: 'Aceptar',
            icon: 'error'
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salio mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
      .finally(() => setLoadingUser(false))
  }

  const handleRecover = async (e) => {
    e.preventDefault()
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoadingUser(true)

    const { name, province, postalCode, address, phone, email, password } = e.target.elements

    SignUpUser({
      name: name.value,
      province: province.value,
      postalCode: parseInt(postalCode.value),
      address: address.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      avatar: 'das2t5421t2151441'
    })
      .then((resp) => {
        if (resp.success) {
          setUser(resp.data)

          return Swal.fire({
            title: `Bienvenido ${resp.data.name}!`,
            text: 'Tu cuenta ha sido creada correctamente!',
            icon: 'success',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3500,
            timerProgressBar: true
          }).then(() => {
            setLoadingUser(false)
            navigate('/Cuenta')
          })
        } else {
          Swal.fire({
            title: 'Algo salio mal',
            text: 'Por favor, intenta nuevamente.',
            confirmButtonText: 'Aceptar',
            icon: 'error'
          })
        }
      })
      .catch(() =>
        Swal.fire({
          title: 'Algo salio mal',
          text: 'Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          icon: 'error'
        })
      )
      .finally(() => setLoadingUser(false))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        handleLogin,
        handleLogout,
        handleSignUp,
        handleRecover
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
