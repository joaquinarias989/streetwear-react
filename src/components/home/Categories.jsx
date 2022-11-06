import { Link } from 'react-router-dom'
import hanger from '../../assets/hanger.svg'

const Categories = () => {
  return (
    <section id="categories" className="categories container">
        <div className="flex-row">
          <article className="flex-column">
            <img
              src={hanger}
              alt="Percha de madera clara"
              width="100%"
              height="100%"
            />
            <Link
              className="btn-secundario"
              type="button"
              to={'/Productos/Categorias/Abrigos'}
            >
              Abrigos
            </Link>
          </article>
          <article className="flex-column">
            <img
              src={hanger}
              alt="Percha de madera clara"
              width="100%"
              height="100%"
            />
            <Link
              className="btn-secundario"
              type="button"
              to={'/Productos/Categorias/Remeras'}
            >
              Remeras
            </Link>
          </article>
          <article className="flex-column">
            <img
              src={hanger}
              alt="Percha de madera clara"
              width="100%"
              height="100%"
            />
            <Link
              className="btn-secundario"
              type="button"
              to={'/Productos/Categorias/Pantalones'}
            >
              Pantalones
            </Link>
          </article>
        </div>
        <div className="d-flex justify-content-center gap-5 pt-5 mt-5">
          <Link to={'/Productos'} type="button" className="btn-principal">
            Ver todos los productos
          </Link>
          <Link
            to={'/Productos/Categorias'}
            type="button"
            className="btn-secundario"
          >
            Ver todas las categorias
          </Link>
        </div>
      </section>
  )
}

export default Categories
