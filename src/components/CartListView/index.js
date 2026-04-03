import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAllItem = () => {
        removeAllCartItems()
      }

      return (
        <div>
          <div className="remove-all-btn-container">
            <button
              type="button"
              onClick={onClickRemoveAllItem}
              className="remove-all-btn"
            >
              Remove All
            </button>
          </div>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
