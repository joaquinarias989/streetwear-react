import logo from '../../assets/logo.svg'

function About() {
  return (
    <section id='about' className='about container'>
      <div className='row align-items-center justify-content-between'>
        <article className='about__content col-md-8 col-lg-7 d-flex flex-column align-items-start'>
          <h2 className='title-primary'>¿Quiénes Somos?</h2>
          <div className='accordion__paper ms-md-5' id='accordionExample'>
            <div>
              <h3 id='headingOne'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                >
                  <span className='text-overline'>Nosotros</span>
                </button>
              </h3>
              <div
                id='collapseOne'
                className='accordion-collapse collapse show'
                aria-labelledby='headingOne'
                data-bs-parent='#accordionExample'
              >
                <p>
                  Diego Percaz y todo el equipo, de Arroyito Córdoba para todo el mundo. En la constante búsqueda de{' '}
                  <strong>prendas únicas</strong> e increíbles.
                </p>
              </div>
            </div>
            <div className='mt-5'>
              <h3 id='headingTwo'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseTwo'
                  aria-expanded='false'
                  aria-controls='collapseTwo'
                >
                  <span className='text-overline'>Inicios</span>
                </button>
              </h3>
              <div
                id='collapseTwo'
                className='accordion-collapse collapse'
                aria-labelledby='headingTwo'
                data-bs-parent='#accordionExample'
              >
                <p>
                  Arrancamos con el objetivo de traer a nuestro pueblo, prendas que no se conseguían accesiblemente, y
                  de estilos que no eran muy populares en la zona. Gracias a esto, conocimos varios lugares del país y
                  nos familiarizamos con el mundo de la <strong>moda urbana</strong>.
                </p>
              </div>
            </div>
            <div className='mt-5'>
              <h3 id='headingThree'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  <span className='text-overline'>Actualidad</span>
                </button>
              </h3>
              <div
                id='collapseThree'
                className='accordion-collapse collapse'
                aria-labelledby='headingThree'
                data-bs-parent='#accordionExample'
              >
                <p>
                  Ahora nuestros clientes objetivos no son sólo de nuestro pueblo, sino que logramos una{' '}
                  <strong>fidelidad</strong> con amigos de todo el país. Como planes a futuro tenemos pensado
                  incursionar en el mundo del diseño y fabricación de prendas propias.
                </p>
              </div>
            </div>
          </div>
        </article>
        <div className='about__icons col-md-3 col-lg-4 d-flex flex-md-column justify-content-center align-items-center flex-wrap'>
          <img
            src={logo}
            alt='Logo de la tienda StreetWear en color blanco y amarillo'
            width='100%'
            height='100%'
            loading='lazy'
          />
          <i className='fas fa-info'></i>
        </div>
      </div>
    </section>
  )
}

export default About
