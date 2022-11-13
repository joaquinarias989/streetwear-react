import { memo } from 'react'
import ProdCard from './ProdCard'

const ProductsList = memo(({ prods }) => {
  return (
    <div className='products__list d-flex justify-content-evenly justify-content-md-start'>
      {prods.map((prod) => (
        <ProdCard key={prod._id} prod={prod} />
      ))}
    </div>
  )
})

export default ProductsList
