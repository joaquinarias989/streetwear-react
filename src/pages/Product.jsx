import { NavLink, useParams } from 'react-router-dom'
import ProdDetail from '../components/products/ProdDetail'
import Loading from '../components/shared/Loading'
import useProducts from '../hooks/useProducts'

const Product = () => {
  const { id } = useParams()
  const { products, loading } = useProducts(id, undefined)
  const prod = products[0]

  return (
    <section className='product container' id='product'>
      <div className='section__header'>
        <h1 className='title-underlined position-relative'>{loading ? 'Cargando producto...' : prod.title}</h1>

        <ol className='breadcrumb'>
          <li>
            <NavLink to={'/'}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to={'/Productos'}>Productos</NavLink>
          </li>
          <li>
            <NavLink to={'/Productos/Categorias'}>Categorias</NavLink>
          </li>
          <li>{loading || <NavLink to={`/Productos/Categorias/${prod.category}`}>{prod.category}</NavLink>}</li>
          {loading || <li>{prod.title}</li>}
        </ol>
      </div>
      {loading ? <Loading /> : <ProdDetail key={prod.id} prod={prod} />}
    </section>
  )
}

export default Product
