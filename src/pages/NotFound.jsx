import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='container-center not-found'>
      <div className='form__paper clip-path mt-4 position-relative'>
        <div className='d-flex gap-2'>
          <i className='fas fa-3x'>🥴</i>
          <i className='fas fa-3x'>🤔</i>
          <i className='fas fa-3x'>🤨</i>
        </div>
        <h2 className='mb-2'>A dónde te metiste che!</h2>
        <h2>La página a la que intentás acceder no existe, volvé para estar seguro...</h2>
        <Link to={'/'} className='position-relative text-underlined mt-3'>
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound
