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
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoadingUser(true)
    GetUserAuthenticated()
      .then((resp) => {
        if (resp.success) {
          setUser(resp.data)
          pathname === '/Ingresar' && navigate('/Cuenta')
        } else {
          setUser(null)
          pathname === '/Cuenta' && navigate('/Ingresar')
        }
      })
      .catch(() => setUser(null))
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

          Swal.fire({
            title: `Bienvenido de vuelta ${resp.data.name}!`,
            toast: true,
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: false,
            timer: 3500,
            timerProgressBar: true
          })
          navigate('/Cuenta')
        } else {
          Swal.fire({
            title: resp.message,
            text: 'Por favor, verifica los datos ingresados.',
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
      .finally(() => setLoadingUser(false))
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    setLoadingUser(true)

    LogoutUser()
      .then((resp) => {
        setUser(null)
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: resp.message,
          showConfirmButton: false,
          showCloseButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: resp.message.includes('vencido') ? 'error' : 'success'
        })
      })
      .catch(() => setUser(null))
      .finally(() => {
        setLoadingUser(false)
        if (pathname === '/Cuenta') navigate('/Ingresar')
      })
  }

  const handleRecover = async (e) => {
    e.preventDefault()
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoadingUser(true)

    const { name, province, postalCode, address, phone, email, password, avatar } = e.target.elements

    const newUser = {
      name: name.value,
      province: province.value,
      postalCode: parseInt(postalCode.value),
      address: address.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      avatar: avatar.files[0]
    }

    SignUpUser(newUser)
      .then((resp) => {
        if (resp.success) {
          setUser(resp.data)

          Swal.fire({
            title: `Bienvenido ${resp.data.name}!`,
            text: 'Tu cuenta ha sido creada correctamente!',
            icon: 'success',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true
          })
          navigate('/Cuenta')
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
