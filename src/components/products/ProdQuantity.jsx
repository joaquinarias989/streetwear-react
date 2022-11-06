import { useState } from 'react'

function ProdQuantity ({ page, stock, initial = 1, sizes, onAdd, onChangeSize }) {
  const [quantity, setQuantity] = useState(initial)

  const increase = () =>
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock)

  const decrease = () =>
    quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0)

  return page === 'detail'
    ? (
    <>
      <div className="product__quantity d-flex jc-between align-items-center mb-4">
        <button
          type='button'
          className="btn-quantity"
          aria-label="Disminuir un producto"
          onClick={decrease}
          disabled={quantity <= 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type='button'
          className="btn-quantity"
          aria-label="Añadir un producto"
          onClick={increase}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>

      <button
        type='button'
        className="btn-principal w-100"
        aria-label="Cargar mas productos"
        onClick={() => onAdd(quantity)}
        disabled={quantity === 0}
      >
        <i className="fa fa-cart-plus"></i> Agregar al Carrito
      </button>
    </>
      )
    : (
    <>
      <div className="product__card__btn">
        <div className="product__quantity">
          <div className="btn-column">
            <button
              type='button'
              className="btn-principal"
              onClick={increase}
              disabled={quantity >= stock}
            >
              <i className="fas fa-plus"></i>
            </button>

            <button
              type='button'
              className="btn-secundario"
              onClick={decrease}
              disabled={quantity <= 0}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
          <span id="quantity" className="text-underlined">
            {quantity}
          </span>
          <select
            name="talle"
            className="size-selector clip-path"
            defaultValue={'Talle'}
            onChange={(e) => onChangeSize(e.target.value)}
          >
            <option value={'Talle'} disabled>
              Talle
            </option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button
          type='button'
          className="btn-cart"
          onClick={() => onAdd(quantity)}
          disabled={quantity === 0}
        >
          Agregar al Carrito <i className="fas fa-cart-plus"></i>
        </button>
      </div>
    </>
      )
}

export default ProdQuantity
