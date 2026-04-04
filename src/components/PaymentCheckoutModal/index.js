import {useEffect, useState} from 'react'

import './index.css'

const PAYMENT_METHODS = [
  {id: 'card', label: 'Card'},
  {id: 'net-banking', label: 'Net Banking'},
  {id: 'upi', label: 'UPI'},
  {id: 'wallet', label: 'Wallet'},
  {id: 'cod', label: 'Cash on Delivery'},
]

const PaymentCheckoutModal = ({isOpen, onClose, itemCount, totalPrice}) => {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedMethod(null)
      setOrderPlaced(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || orderPlaced) return undefined
    const onKeyDown = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, orderPlaced, onClose])

  if (!isOpen) return null

  const handleConfirmOrder = () => {
    if (selectedMethod !== 'cod') return
    setOrderPlaced(true)
  }

  const isConfirmDisabled = selectedMethod !== 'cod'

  return (
    <div
      className="payment-modal-overlay"
      role="presentation"
      onClick={() => !orderPlaced && onClose()}
    >
      <div
        className="payment-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="payment-modal-close"
          aria-label="Close payment"
          onClick={onClose}
        >
          ×
        </button>

        {!orderPlaced ? (
          <>
            <h2 id="payment-modal-title" className="payment-modal-title">
              Complete payment
            </h2>
            <p className="payment-modal-subtitle">
              Choose how you would like to pay for your order.
            </p>

            <div className="payment-modal-summary">
              <h3 className="payment-modal-summary-heading">Order summary</h3>
              <div className="payment-modal-summary-row">
                <span>Items</span>
                <span className="payment-modal-summary-value">{itemCount}</span>
              </div>
              <div className="payment-modal-summary-row payment-modal-summary-total">
                <span>Total to pay</span>
                <span className="payment-modal-summary-value">
                  Rs {totalPrice}/-
                </span>
              </div>
            </div>

            <fieldset className="payment-modal-methods">
              <legend className="payment-modal-methods-legend">
                Payment method
              </legend>
              <ul className="payment-modal-methods-list">
                {PAYMENT_METHODS.map(({id, label}) => {
                  const disabled = id !== 'cod'
                  return (
                    <li key={id} className="payment-modal-method-item">
                      <label
                        className={`payment-modal-method-label ${
                          disabled ? 'payment-modal-method-label--disabled' : ''
                        } ${
                          !disabled && selectedMethod === id
                            ? 'payment-modal-method-label--selected'
                            : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          value={id}
                          checked={selectedMethod === id}
                          disabled={disabled}
                          onChange={() => setSelectedMethod(id)}
                          className="payment-modal-method-input"
                        />
                        <span className="payment-method-name">{label}</span>
                        {disabled ? (
                          <span className="payment-method-unavailable">
                            Unavailable
                          </span>
                        ) : null}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </fieldset>

            <div className="payment-modal-actions">
              <button
                type="button"
                className="payment-modal-btn payment-modal-btn--secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="payment-modal-btn payment-modal-btn--primary"
                disabled={isConfirmDisabled}
                onClick={handleConfirmOrder}
              >
                Confirm order
              </button>
            </div>
          </>
        ) : (
          <div className="payment-modal-success">
            <div className="payment-modal-success-icon" aria-hidden="true">
              ✓
            </div>
            <h2 className="payment-modal-success-title">Thank you!</h2>
            <p className="payment-modal-success-message">
              Your order has been placed successfully
            </p>
            <button
              type="button"
              className="payment-modal-btn payment-modal-btn--primary payment-modal-btn--full"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentCheckoutModal
