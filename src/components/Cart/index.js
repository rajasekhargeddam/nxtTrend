import {useContext, useMemo, useState} from 'react'

import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import PaymentCheckoutModal from '../PaymentCheckoutModal'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const {cartList} = useContext(CartContext)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const showEmptyView = cartList.length === 0

  const {itemCount, totalPrice} = useMemo(() => {
    const total = cartList.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    return {itemCount: cartList.length, totalPrice: total}
  }, [cartList])

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <CartListView />
            <CartSummary
              cartList={cartList}
              onCheckoutClick={() => setIsPaymentModalOpen(true)}
            />
          </div>
        )}
      </div>
      <PaymentCheckoutModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        itemCount={itemCount}
        totalPrice={totalPrice}
      />
    </>
  )
}

export default Cart
