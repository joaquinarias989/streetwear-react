import { useEffect, useState, useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { getCategories } from '../../services/categories'
import logo from '../../assets/logo.svg'
import Loading from './Loading'
import CartWidget from '../cart/CartWidget'
import { UserContext } from '../../context/userContext'

function NavBar() {
  const { loadingUser, user, handleLogout } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setCategories(getCategories())
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <header className='bg-bricks'>
      <nav className='navbar container d-flex navbar-expand-lg navbar-light'>
        <NavLink to='/'>
          <picture className='logo d-flex'>
            <img src={logo} alt='Logo de la tienda StreetWear, en color blanco y amarillo' width='130' loading='lazy' />
          </picture>
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          id='btnMenu'
        >
          <i className='fas fa-bars text-white'></i>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-lg-auto'>
            <li className='dropdown-link'>
              <NavLink
                to='/Productos'
                className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                role='button'
                aria-label='Cuenta de Usuario'
              >
                Productos
              </NavLink>

              <ul className='sub-menu sub-menu__categories bg-bricks'>
                {loading ? (
                  <div className='grid py-3'>
                    <Loading box={false} size={'sm'} />
                  </div>
                ) : (
                  <>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <NavLink
                          to={`/Productos/Categorias/${category.name}`}
                          className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                        >
                          {category.name}
                        </NavLink>
                      </li>
                    ))}
                    <li key={'all'}>
                      <NavLink
                        to={'/Productos/Categorias'}
                        className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                      >
                        Ver todas
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li>
              <HashLink to='/#help' smooth className='menu__link'>
                Ayuda
              </HashLink>
            </li>
            <li>
              <HashLink to='/#about' smooth className='menu__link'>
                Nosotros
              </HashLink>
            </li>
            <li>
              <HashLink to='/#contact' smooth className='menu__link'>
                Contacto
              </HashLink>
            </li>
          </ul>
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='dropdown-link'>
              <NavLink
                className='menu__link'
                to={user ? '/Cuenta' : '/Ingresar'}
                role='button'
                aria-label='Cuenta de Usuario'
              >
                <i className='fas fa-user text-white'></i>
              </NavLink>
              <ul className='sub-menu bg-bricks'>
                {loadingUser ? (
                  <div className='px-5 py-2'>
                    <Loading box={false} size={'sm'} />
                  </div>
                ) : user ? (
                  <>
                    <li>
                      <NavLink
                        to='/Cuenta'
                        className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                      >
                        Cuenta
                      </NavLink>
                      <NavLink type='button' className='menu__link' onClick={handleLogout}>
                        Salir
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to='/Ingresar'
                        className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                      >
                        Ingresar
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/Registrarse'
                        className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                      >
                        Registrarse
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <CartWidget />
          </ul>
        </div>
      </nav>
      <Outlet />
    </header>
  )
}

export default NavBar
