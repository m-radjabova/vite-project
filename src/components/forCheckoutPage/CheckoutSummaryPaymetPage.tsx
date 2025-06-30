import { FiCreditCard, FiCheckCircle, FiLock, FiShoppingBag, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { useCheckout } from "../../context/MyContext";
import { OrderData } from "./CheckoutPage";

interface Props {
  submitOrder: (orderData: OrderData) => void;
}

function CheckoutSummaryPaymentPage( { submitOrder }: Props ) {
  const { data } = useCheckout();

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

  return (
    <div className="checkout-summary-container" style={{
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#fff9fb"
    }}>
      <div className="checkout-header" style={{
        textAlign: "center",
        marginBottom: "3rem"
      }}>
        <h1 style={{
          color: "#d14d82",
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }}>
          <FiCheckCircle style={{ color: "#d14d82" }} /> Order Summary
        </h1>
        <p style={{ color: "#9e6a7e", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
          Review your order details and complete your payment securely
        </p>
      </div>

      <div className="checkout-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "start"
      }}>
        {/* Left Column - Order Summary */}
        <div className="order-summary-card" style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 5px 15px rgba(209,77,130,0.05)",
          border: "1px solid #ffebf1"
        }}>
          <h2 style={{
            color: "#d14d82",
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <FiShoppingBag /> Your Order
          </h2>

          <div className="order-items" style={{ marginBottom: "2rem" }}>
            {items.map(item => (
              <div key={item.id} className="order-item" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 0",
                borderBottom: "1px solid #ffebf1"
              }}>
                <div>
                  <h3 style={{ margin: "0", color: "#7a3a5c", fontWeight: "600", fontSize: "1rem" }}>{item.name}</h3>
                  <p style={{ margin: "0", color: "#b58ba3", fontSize: "0.9rem" }}>
                    Qty: {item.quantity}
                  </p>
                </div>
                <span style={{ fontWeight: "600", color: "#7a3a5c" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="delivery-info" style={{ marginBottom: "2rem" }}>
            <h3 style={{
              color: "#d14d82",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}>
              <FiMapPin /> Delivery Information
            </h3>
            <div style={{ 
              backgroundColor: "#fff5f8", 
              padding: "1rem", 
              borderRadius: "8px",
              marginBottom: "1rem"
            }}>
              <p style={{ margin: "0.5rem 0", color: "#7a3a5c", fontSize: "0.95rem", fontWeight: "500" }}>
                Name: {data.delivery.fullName}
              </p>
              <p style={{ margin: "0.5rem 0", color: "#7a3a5c", fontSize: "0.95rem" }}>
                Phone: {data.delivery.phone}
              </p>
              <p style={{ margin: "0.5rem 0", color: "#7a3a5c", fontSize: "0.95rem" }}>
                Address: {data.delivery.address}
              </p>
            </div>
            <p style={{
              margin: "0.5rem 0",
              color: "#7a3a5c",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.95rem"
            }}>
              <FiCalendar /> Estimated delivery: {data.delivery.deliveryType}
            </p>
          </div>

          <div className="order-totals" style={{
            backgroundColor: "#fff5f8",
            borderRadius: "12px",
            padding: "1.5rem",
            marginTop: "1.5rem",
            border: "1px solid #ffebf1"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              color: "#7a3a5c"
            }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              color: "#7a3a5c"
            }}>
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              color: "#d14d82",
              fontSize: "0.95rem"
            }}>
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #ffebf1",
              fontWeight: "700",
              fontSize: "1.1rem",
              color: "#d14d82"
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Methods */}
        <div className="payment-methods-card" style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 5px 15px rgba(209,77,130,0.05)",
          border: "1px solid #ffebf1"
        }}>
          <h2 style={{
            color: "#d14d82",
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <FiCreditCard /> Payment Method
          </h2>

          <div className="payment-options" style={{ marginBottom: "2rem" }}>
            {/* Credit Card Option */}
            <div className="payment-method" style={{
              padding: "1.25rem",
              border: "2px solid #ffebf1",
              borderRadius: "12px",
              marginBottom: "1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: "#fff5f8"
            }}>
              <input type="radio" name="payment" id="credit-card" style={{
                marginRight: "1rem",
                accentColor: "#d14d82"
              }} defaultChecked />
              <label htmlFor="credit-card" style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                cursor: "pointer"
              }}>
                <div style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center"
                }}>
                  <FaCcVisa size={28} color="#1a1f71" />
                  <FaCcMastercard size={28} color="#eb001b" />
                </div>
                <span style={{ flexGrow: "1", fontWeight: "500", color: "#7a3a5c" }}>Credit/Debit Card</span>
              </label>
              
              {/* Card Form */}
              <div className="card-form" style={{ marginTop: "1.5rem", paddingLeft: "2rem" }}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#7a3a5c",
                    fontWeight: "500",
                    fontSize: "0.9rem"
                  }}>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid #ffebf1",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "#fff"
                  }} />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.25rem"
                }}>
                  <div>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#7a3a5c",
                      fontWeight: "500",
                      fontSize: "0.9rem"
                    }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid #ffebf1",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      backgroundColor: "#fff"
                    }} />
                  </div>
                  <div>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#7a3a5c",
                      fontWeight: "500",
                      fontSize: "0.9rem"
                    }}>CVV</label>
                    <input type="text" placeholder="123" style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid #ffebf1",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      backgroundColor: "#fff"
                    }} />
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#7a3a5c",
                    fontWeight: "500",
                    fontSize: "0.9rem"
                  }}>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid #ffebf1",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "#fff"
                  }} />
                </div>
              </div>
            </div>

            {/* PayPal Option */}
            <div className="payment-method" style={{
              padding: "1.25rem",
              border: "2px solid #ffebf1",
              borderRadius: "12px",
              marginBottom: "1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: "#fff5f8"
            }}>
              <input type="radio" name="payment" id="paypal" style={{
                marginRight: "1rem",
                accentColor: "#d14d82"
              }} />
              <label htmlFor="paypal" style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                cursor: "pointer"
              }}>
                <FaCcPaypal size={28} color="#003087" />
                <span style={{ flexGrow: "1", fontWeight: "500", color: "#7a3a5c" }}>PayPal</span>
              </label>
            </div>
          </div>

          <button 
          onClick={() =>
            submitOrder({
              product: data.product,
              quantity: data.quantity,
              delivery: data.delivery,
              paymentMethod: "card",
            })}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#d14d82",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "all 0.2s ease",
            marginTop: "1rem",
            boxShadow: "0 2px 10px rgba(209,77,130,0.3)"
          }}>
            <FiLock /> Pay ${total.toFixed(2)}
          </button>

          <p style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#b58ba3",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}>
            <FiLock size={14} /> Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummaryPaymentPage;