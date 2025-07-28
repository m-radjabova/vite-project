import { useCartContext } from "../../../context/CartContext";
import { FaHandHoldingHeart, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";
import "./AdminOrders.css";

function AdminOrders() {
    const { orders } = useCartContext();
    
    return (
        <div className="admin-orders-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">
                    <FaBoxOpen className="orders-title-icon" />
                    Customer Orders 
                    <FaHandHoldingHeart className="orders-heart-icon" />
                </h1>
            </div>

            <div className="admin-divider"></div>
            
            {orders.length === 0 ? (
                <div className="admin-orders-empty">
                    <p>No orders yet</p>
                </div>
            ) : (
                <div className="admin-orders-grid">
                    {orders.map((order, index) => (
                        <div className="admin-order-card" key={index}>
                            <div className="order-card-content">
                                <div className="order-customer-name">
                                    <FaUser className="order-icon" />
                                    {order.name}
                                </div>
                                <div className="order-customer-email">
                                    <FaEnvelope className="order-icon" />
                                    {order.email}
                                </div>
                                <div className="order-customer-phone">
                                    <FaPhone className="order-icon" />
                                    {order.phone}
                                </div>
                                <div className="order-customer-address">
                                    <FaMapMarkerAlt className="order-icon" />
                                    {order.address}
                                </div>
                                
                                {order.items && (
                                    <div className="order-items-section">
                                        <h3>Order Items:</h3>
                                        <ul className="order-items-list">
                                            {order.items.map((item, i) => (
                                                <li key={i}>
                                                    {item.name} × {item.count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminOrders;