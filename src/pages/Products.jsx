import { Link, NavLink, useParams } from 'react-router-dom'
import Loading from '../components/shared/Loading'
// import Swal from 'sweetalert2'
import useProducts from '../hooks/useProducts'
import ProductsList from '../components/products/ProductsList'

const Products = () => {
  const { category } = useParams()
  const { products, loading, loadingMoreProds, handleLoadMoreProds } = useProducts(undefined, category)

  return (
    <section id='products' className='products container'>
      <div className='section__header row'>
        <div className='col-md-10'>
          <h1 className='title-primary'>Productos</h1>
          <ol className='breadcrumb'>
            <li>
              <NavLink to={'/'}>Inicio</NavLink>
            </li>
            {category ? (
              <>
                <li>
                  <NavLink to='/Productos'>Productos</NavLink>
                </li>
                <li>
                  <NavLink to='/Productos/Categorias'> Categorías</NavLink>
                </li>
                <li>{category}</li>
              </>
            ) : (
              <li>Productos</li>
            )}
          </ol>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className='spinner-container'>
          <h2>No tenemos {category || 'Productos'} en stock por el momento.</h2>
          {category && (
            <Link to='/Productos' className='position-relative text-overline px-3 mt-2 fw-bold'>
              Ver todos los Productos
            </Link>
          )}
        </div>
      ) : (
        <>
          <ProductsList prods={products} />
          <div className='flex-row jc-center algn-items-center'>
            {loadingMoreProds ? (
              <button type='button' className='btn-principal' aria-label='Cargando' disabled>
                <i className='fa-solid fa-spinner'></i> Cargando
              </button>
            ) : (
              <button
                type='submit'
                className='btn-principal'
                onClick={handleLoadMoreProds}
                aria-label='Cargar más productos'
              >
                <i className='fas fa-plus'></i> Cargar más
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default Products
