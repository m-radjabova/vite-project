import { FiCreditCard, FiCheckCircle, FiLock, FiShoppingBag, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { useCheckout } from "../../context/MyContext";
import { OrderData } from "./CheckoutPage";
import useContextPro from "../../hooks/useContextPro";

interface Props {
  submitOrder: (orderData: OrderData) => void;
}

function CheckoutSummaryPaymentPage( { submitOrder }: Props ) {
  const { data } = useCheckout();
  const {state: { user }} = useContextPro();

  if (!data.product || !data.product.length || !data.delivery) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", color: "#fb6f92" }}>
        Please complete previous steps to see your order summary.
      </div>
    );  
  }

  const items = data.product.map((item, idx) => ({
    id: idx,
    name: item.name,
    price: item.price,
    quantity: data.quantity || 1,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5.00;
  const discount = 0;
  const total = subtotal + delivery - discount;

   const handlePayClick = () => {
    submitOrder({
      product: data.product,
      quantity: data.quantity,
      delivery: data.delivery,
      userId: user?.id,
      paymentMethod: "card",
    });
  };

  return (
    <div className="checkout-summary-container">
      <div className="checkout-header">
        <h1>
          <FiCheckCircle /> Order Summary
        </h1>
        <p>Review your order details and complete your payment securely</p>
      </div>

      <div className="checkout-grid">
        <div className="order-summary-card">
          <h2>
            <FiShoppingBag /> Your Order
          </h2>

          <div className="order-items">
            {items.map(item => (
              <div key={item.id} className="order-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="delivery-info">
            <h3>
              <FiMapPin /> Delivery Information
            </h3>
            <div className="delivery-details">
              <p>Name: {data.delivery.fullName}</p>
              <p>Phone: {data.delivery.phone}</p>
              <p>Address: {data.delivery.address}</p>
            </div>
            <p className="delivery-estimate">
              <FiCalendar /> Estimated delivery: {data.delivery.deliveryType}
            </p>
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <div className="total-row discount">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="payment-methods-card">
          <h2>
            <FiCreditCard /> Payment Method
          </h2>

          <div className="payment-options">
            {/* Credit Card Option */}
            <div className="payment-method">
              <input type="radio" name="payment" id="credit-card" defaultChecked />
              <label htmlFor="credit-card">
                <div className="card-icons">
                  <FaCcVisa size={28} />
                  <FaCcMastercard size={28} />
                </div>
                <span>Credit/Debit Card</span>
              </label>
              
              {/* Card Form */}
              <div className="card-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              </div>
            </div>

            <div className="payment-method">
              <input type="radio" name="payment" id="paypal" />
              <label htmlFor="paypal">
                <FaCcPaypal size={28} />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          <button 
            onClick={handlePayClick}
            className="pay-button"
          >
            <FiLock /> Pay ${total.toFixed(2)}
          </button>

          <p className="secure-payment">
            <FiLock size={14} /> Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummaryPaymentPage;