// Write your code here
import './index.css'

const CartSummary = ({cartList}) => {
  const totalCartAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="summary-container">
      <div className="summary">
        <h1 className="summary-total">
          Order Total:{' '}
          <span className="summary-total-text">Rs {totalCartAmount}/-</span>
        </h1>
        <p className="summary-items-count">{cartList.length} items in cart</p>
        <button type="button" className="logout-desktop-btn summary-btn">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartSummary
