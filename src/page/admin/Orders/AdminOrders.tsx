import { useCartContext } from "../../../context/CartContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBoxOpen,
  FaTruck,
  FaCalendarAlt,
  FaReceipt
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";

function AdminOrders() {
    const { orders } = useCartContext();

    return (
        <div className="admin-orders-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">
                    <FaBoxOpen className="orders-title-icon" />
                    Customer Orders 
                </h1>
            </div>

            <div className="admin-divider"></div>
            
            {orders.length === 0 ? (
                <div className="admin-orders-empty">
                    <p>No orders yet</p>
                </div>
            ) : (
                <div className="admin-orders-grid">
                    {orders.map((order) => (
                        <div className="admin-order-card" key={order.id}>
                            <div className="order-card-header">
                                <h3>Order #{order.id.slice(0, 8)}</h3>
                                <span className="order-date">
                                    <FaCalendarAlt className="order-icon" />
                                    {order.createdAt}
                                </span>
                            </div>
                            
                            <div className="order-card-content">
                                <div className="order-customer-info">
                                    <div className="order-customer-name">
                                        <FaUser className="order-icon" />
                                        {order.name} {order.userName && `(${order.userName})`}
                                    </div>
                                    <div className="order-customer-email">
                                        <FaEnvelope className="order-icon" />
                                        {order.email}
                                    </div>
                                    <div className="order-customer-phone">
                                        <FaPhone className="order-icon" />
                                        {order.phone}
                                    </div>
                                    {order.address && (
                                        <div className="order-customer-address">
                                            <FaMapMarkerAlt className="order-icon" />
                                            {order.address}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="order-meta-info">
                                    <div className="order-delivery-method">
                                        <FaTruck className="order-icon" />
                                        {order.deliveryMethod}
                                    </div>
                                    <div className="order-payment-method">
                                        <MdPayment className="order-icon" />
                                        {order.paymentMethod}
                                    </div>
                                    <div className="order-total-price">
                                        <FaReceipt className="order-icon" />
                                        Total: ${order.totalPrice}
                                    </div>
                                </div>
                                
                                {order.items && (
                                    <div className="order-items-section">
                                        <h4>Order Items:</h4>
                                        <ul className="order-items-list">
                                            {order.items.map((item, i) => (
                                                <li key={i} className="order-item">
                                                    <div className="order-item-image">
                                                        {item.image && <img src={item.image} alt={item.name} />}
                                                    </div>
                                                    <div className="order-item-details">
                                                        <span className="order-item-name">{item.name}</span>
                                                        <span className="order-item-quantity">× {item.count}</span>
                                                        <span className="order-item-price">${Number(item.price) * Number(item.count)}</span>
                                                    </div>
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