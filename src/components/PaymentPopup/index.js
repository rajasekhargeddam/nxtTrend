import React, { useState } from 'react';

const PaymentPopup = () => {
    const [selectedMethod, setSelectedMethod] = useState('Cash on Delivery');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const paymentMethods = ['Card', 'Net Banking', 'UPI', 'Wallet', 'Cash on Delivery'];

    const handleConfirm = () => {
        setIsConfirmed(true);
        alert('Your order has been placed successfully');
    };

    return (
        <div className="payment-popup">
            <h2>Select Payment Method</h2>
            <div className="payment-methods">
                {paymentMethods.map((method) => (
                    <label key={method}>
                        <input 
                            type="radio" 
                            value={method} 
                            checked={selectedMethod === method} 
                            onChange={() => setSelectedMethod(method)}
                            disabled={method !== 'Cash on Delivery'}
                        />
                        {method}
                    </label>
                ))}
            </div>
            <h3>Order Summary</h3>
            <div className="order-summary">
                <p>Your order will be confirmed upon payment selection.</p>
            </div>
            <button 
                onClick={handleConfirm} 
                disabled={selectedMethod !== 'Cash on Delivery' || isConfirmed}
            >
                Confirm Order
            </button>
        </div>
    );
};

export default PaymentPopup;
