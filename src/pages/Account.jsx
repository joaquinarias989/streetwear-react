import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Loading from '../components/shared/Loading'

const URI_API_IMAGES = 'https://street-wear-ecommerce-api.herokuapp.com/api/uploads/image'
const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'

function Account() {
  const { loadingUser, user } = useContext(UserContext)

  return (
    <section className='products container'>
      <div className='section__header'>
        <h1 className='title-primary'>Mi cuenta</h1>

        <ol className='breadcrumb'>
          <li>
            <NavLink to={'/'}>Inicio</NavLink>
          </li>
          <li>Cuenta</li>
        </ol>
      </div>
      {loadingUser ? (
        <Loading />
      ) : (
        <>
          <div className='row justify-content-between mb-5'>
            <div className='col-md-6'>
              <h2 className='text-underlined position-relative d-inline pe-5'>Datos Personales:</h2>
              <div className='d-flex align-items-center gap-5'>
                <picture>
                  <img
                    src={user ? `${URI_API_IMAGES}/${user?.avatar}` : DEFAULT_IMAGE}
                    alt={`Imágen del Usuario ${user?.name}`}
                    className='rounded-2 border border-2 border-primary'
                    style={{ maxWidth: '6.5rem' }}
                  />
                </picture>
                <ul className='mt-3'>
                  <li>{user?.name}</li>
                  <li>{user?.email}</li>
                  <li>Teléfono: {user?.phone}</li>
                </ul>
              </div>
            </div>
            <div className='col-md-6'>
              <h2 className='text-underlined position-relative d-inline pe-5'>Direcciones:</h2>
              <ul className='mt-3'>
                <li>
                  {user?.province} {user?.postalCode}
                </li>
                <li>{user?.address}</li>
              </ul>
            </div>
          </div>
          <h2 className='text-underlined position-relative d-inline pe-5'>Últimas compras:</h2>
          <div className='form__paper shadow d-flex align-items-center gap-5 py-4 mt-5'>
            <i className='fas fa-shopping-bag text-secondary' style={{ fontSize: '40px' }}></i>
            <div>
              <ul className='mb-0'>
                <li style={{ fontSize: '15px' }}>17/10/2022</li>
                <li className='fs-1'>
                  Orden <span className='fw-bold'>#14532</span>
                </li>
              </ul>
              <span className='d-block'>
                <Link className='text-secondary fw-bold' to={`/Cuenta/Ordenes/14532}`}>
                  Ver detalle
                </Link>
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Account
