import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

function Footer() {
  const scrollTop = () => window.scrollTo(0, 0)

  const handleShare = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(window.location.href)

    return Swal.fire({
      title: 'Link copiado al portapapeles, gracias por compartir!',
      toast: true,
      position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true
    })
  }

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__info flex-column flex-md-row'>
          <NavLink to='/' className='nav-icons' aria-label='Navegar a la página de Inicio'>
            <i className='fas fa-home' />
          </NavLink>

          <div className='footer__payment flex-column'>
            <strong>Todos los métodos de pago</strong>
            <div className='icons flex-row'>
              <i className='fa fa-credit-card' />
              <i className='fab fa-bitcoin' />
              <i className='fa fa-money-bill-alt' />
            </div>
          </div>
          <div className='footer__logo flex-column'>
            <span>STREET</span>
            <span>WEAR</span>
          </div>
          <p>&copy; 2022 Derechos Reservados</p>

          <button type='button' onClick={scrollTop} aria-label='Ir al comienzo de la página' className='nav-icons'>
            <i className='fas fa-arrow-up' />
          </button>
        </div>

        <div className='footer__social flex-row'>
          <a href='https://www.facebook.com' target='_blank' aria-label='Facebook' rel='noreferrer'>
            <i className='fab fa-facebook'></i>
          </a>
          <a href='https://www.instagram.com/streetwear1__/' target='_blank' aria-label='Instagram' rel='noreferrer'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='https://www.twitter.com' target='_blank' aria-label='Twitter' rel='noreferrer'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='#!' target='_blank' aria-label='Compartir' onClick={(e) => handleShare(e)}>
            <i className='fa fa-share'></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
