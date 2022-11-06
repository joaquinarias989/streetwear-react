import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'

const CartItem = ({ item }) => {
  const { addOne, reduceOne, removeProd } = useContext(CartContext)

  return (
    <div className="cart__product" key={item.id}>
      <div className="cart__product__img">
        <img src={item.img} alt={`Imagen del producto ${item.title}`} loading="lazy"/>
        <button type='button' onClick={() => removeProd(item, undefined)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>

      <div className="cart__product__info">
        <div>
          <h3 className="cart__product__title text-underlined mb-3">
            <Link to={`/Productos/${item.id}`}>{item.title}</Link>
          </h3>
          <div className="flex-column gap-2">
            {item.size.map((size) => {
              const indexSize = item.size.indexOf(size)

              return item.quantity[indexSize] === 0
                ? null
                : (
                <div
                  className="d-flex algn-items-center jc-between gap-1"
                  key={size}
                >
                  <p>
                    Talle <strong>{size}</strong>,{' '}
                    <span className="cart__product__quantity px-2">
                      <strong>{item.quantity[indexSize]}</strong>
                    </span>
                    Unidades
                  </p>
                  <div className="d-flex algn-items-center btn-group">
                    <button
                      type='button'
                      id="addOne"
                      className="btn-principal"
                      onClick={() => addOne(item, indexSize)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                    <button
                      type='button'
                      id="reduceOne"
                      className="btn-secundario"
                      onClick={() => reduceOne(item, indexSize)}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <button
                      type='button'
                      id="removeProd"
                      className="btn-remove"
                      onClick={() => removeProd(item, indexSize)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
                  )
            })}
          </div>
        </div>
        <h3 className="cart__product__price">$ {item.price}</h3>
      </div>
    </div>
  )
}

export default CartItem
