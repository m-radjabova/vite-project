import useOrder from "../../../hooks/useOrder";
import { FiPackage, FiUser, FiPhone, FiMapPin, FiCreditCard, FiTruck } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

function AdminOrder() {
    const { orders } = useOrder();
    
    return (
        <div className="admin-orders-container">
            <div className="admin-orders-inner">
                <h1 className="admin-orders-title">Order Management</h1>
                
                <div className="orders-grid">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-card-header">
                                <div className="order-title">
                                    <FiPackage className="order-icon" />
                                    <h2>Order #{order.id}</h2>
                                </div>
                                <span className={`payment-badge ${order.paymentMethod === 'card' ? 'paid' : 'cod'}`}>
                                    {order.paymentMethod === 'card' ? 'Paid' : 'Cash on Delivery'}
                                </span>
                            </div>
                            
                            <div className="order-content">
                                {/* Products Section */}
                                <div className="order-products">
                                    <div className="section-header">
                                        <FiPackage className="section-icon" />
                                        <h3>Ordered Items</h3>
                                    </div>
                                    <div className="products-list">
                                        {order.product.map(item => (
                                            <div key={item.id} className="product-item">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="product-image"
                                                />
                                                <div className="product-details">
                                                    <h4 className="product-name">{item.name}</h4>
                                                    <p className="product-description">{item.description}</p>
                                                    <div className="product-price">
                                                        <span className="current-price">${item.price}</span>
                                                        {item.oldPrice && (
                                                            <span className="old-price">${item.oldPrice}</span>
                                                        )}
                                                        <span className="product-quantity">Qty: {order.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Customer Info Section */}
                                <div className="order-info-sections">
                                    <div className="customer-info">
                                        <div className="section-header">
                                            <FiUser className="section-icon" />
                                            <h3>Customer Information</h3>
                                        </div>
                                        <ul className="info-list">
                                            <li className="info-item">
                                                <FiUser className="info-icon" />
                                                {order.delivery.fullName}
                                            </li>
                                            <li className="info-item">
                                                <FiPhone className="info-icon" />
                                                {order.delivery.phone}
                                            </li>
                                            <li className="info-item">
                                                <FiMapPin className="info-icon" />
                                                {order.delivery.address}
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="delivery-order-info">
                                        <div className="section-header">
                                            <FiTruck className="section-icon" />
                                            <h3>Delivery Details</h3>
                                        </div>
                                        <div className="delivery-status">
                                            <span className="delivery-type">
                                                <BiTimeFive className="delivery-icon" />
                                                {order.delivery.deliveryType} Delivery
                                            </span>
                                            <span className="status-badge">Processing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Order Footer */}
                            <div className="order-footer">
                                <div className="payment-summary">
                                    <div className="payment-method">
                                        {order.paymentMethod === 'card' ? (
                                            <FiCreditCard className="payment-icon" />
                                        ) : (
                                            <BsCash className="payment-icon" />
                                        )}
                                        {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                                    </div>
                                    <div className="total-amount">
                                        <p className="total-label">Total Amount</p>
                                        <p className="total-value">
                                            ${order.product.reduce((total, item) => total + (item.price * order.quantity), 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="order-actions">
                                    <button className="ship-btn">
                                        Mark as Shipped
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminOrder;