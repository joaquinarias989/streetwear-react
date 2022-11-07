function Help() {
  return (
    <section id='help' className='help container'>
      <div className='row align-items-center justify-content-between flex-wrap-reverse'>
        <div className='help__icons col-xl-3 d-flex flex-xl-column justify-content-center align-items-center flex-wrap'>
          <i className='fas fa-shopping-cart'></i>
          <i className='fas fa-question'></i>
        </div>
        <article className='help__content col-xl-9 d-flex flex-column justify-content-end align-items-end'>
          <h2 className='title-primary'>¿Cómo compro?</h2>
          <div className='help__list'>
            <div className='d-flex flex-column flex-sm-row'>
              <span className='w-25'>1</span>
              <p>Elegí el producto, el talle, y hacé click en Agregar al carrito.</p>
            </div>
            <div className='d-flex flex-column flex-sm-row'>
              <span className='w-25'>2</span>
              <p>
                Si querés, podes seguir agregando otros productos al carrito, sino, hacé clic en Iniciar Compra. En este
                paso vas a poder calcular el costo de envío.
              </p>
            </div>
            <div className='d-flex flex-column flex-sm-row'>
              <span className='w-25'>3</span>
              <p>
                Completá tus datos de contacto (y de facturación en caso de que lo requieras) y hacé clic en Continuar.
              </p>
            </div>
            <div className='d-flex flex-column flex-sm-row'>
              <span className='w-25'>4</span>
              <p>
                Seleccioná el método de envío que desees (envíos a todo el país por Correo o A Coordinar), completá los
                datos del mismo y hacé clic en Continuar.
              </p>
            </div>
            <div className='d-flex flex-column flex-sm-row'>
              <span className='w-25'>5</span>
              <p>
                Elegí el método de pago que prefieras (para Efectivo seleccioná Pago Fácil o Rapipago), rellená los
                datos solicitados para realizar la compra y hacé clic en Finalizar.
              </p>
            </div>
            <div className='d-flex flex-column flex-sm-row my-3 my-sm-0'>
              <span className='w-25'>6</span>
              <p>
                ¡Listo! Revisá tu correo, en unos minutos va a llegar toda la información correspondiente a tu compra y
                el envío de la misma.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Help
