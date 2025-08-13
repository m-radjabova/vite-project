import { useState } from "react";
import { useCartContext } from "../../../context/CartContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBoxOpen,FaTruck,FaCalendarAlt,FaReceipt,FaCheckCircle,FaTimesCircle,
} from "react-icons/fa";
import { MdPayment} from "react-icons/md";
import apiClient from "../../../apiClient/ApiClient";
import DeleteOrderModal from "./DeleteOrderModal";


function AdminOrders() {
    const { orders, updateOrderStatus } = useCartContext();
    const [filter, setFilter] = useState('all');
    const [isCompleting, setIsCompleting] = useState(false);
   const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
    const [cancelOpenModal, setCancelOpenModal] = useState(false);

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'pending') return !order.status || order.status === 'pending';
        return order.status === filter;
    });

     const handleComplete = (orderId: string) => {
        setIsCompleting(true);
        updateOrderStatus(orderId, 'completed');
        apiClient.patch(`/orders/${orderId}`, { status: 'completed' });
     }

    const handleCancel = (orderId: string) => {
        setIsCompleting(true);
        updateOrderStatus(orderId, 'cancelled');
        apiClient.patch(`/orders/${orderId}`, { status: 'cancelled' });
    };

    return (
        <div className="admin-orders-container">
            <div className="admin-orders-header">
                <h1 className="admin-orders-title">
                    <FaBoxOpen className="order-title-icon" />
                    Customer Orders 
                    <span className="orders-count-badge">{orders.length} orders</span>
                </h1>
                <div className="orders-header-actions">
                    <div className="orders-filter">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="admin-divider"></div>
            
            {filteredOrders.length === 0 ? (
                <div className="admin-orders-empty">
                    <div className="empty-orders-illustration">
                        <FaBoxOpen />
                    </div>
                    <h3>No orders yet</h3>
                    <p>When customers place orders, they'll appear here</p>
                    <button className="explore-orders-btn">
                        Explore Demo Orders
                    </button>
                </div>
            ) : (
                <div className="admin-orders-grid">
                    {filteredOrders.map((order) => (
                        <div className="admin-order-card" key={order.id}>
                            <div className="order-status-badge" data-status={order.status || 'pending'}>
                                {order.status === 'completed' ? 'Completed' : 
                                 order.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                            </div>
                            
                            <div className="order-card-header">
                                <div>
                                    <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                    <span className="order-date">
                                        <FaCalendarAlt className="order-icon" />
                                        {order.createdAt}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="order-card-content">
                                <div className="order-customer-info">
                                    <div className="info-section">
                                        <h4>Customer Details</h4>
                                        <div className="order-customer-name">
                                            <FaUser className="order-icon" />
                                            {order.name} {order.userName && <span className="username">(@{order.userName})</span>}
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
                                    
                                    <div className="info-section">
                                        <h4>Order Summary</h4>
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
                                            Total: ${order.totalPrice.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                
                                {order.items && (
                                    <div className="order-items-section">
                                        <div className="items-section-header">
                                            <h4>Order Items ({order.items.length})</h4>
                                        </div>
                                        <ul className="order-items-list">
                                            {order.items.map((item, i) => (
                                                <li key={i} className="order-item">
                                                    <div className="order-item-image">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} />
                                                        ) : (
                                                            <div className="image-placeholder"></div>
                                                        )}
                                                    </div>
                                                    <div className="order-item-details">
                                                        <span className="order-item-name">{item.name}</span>
                                                        <div className="order-item-meta">
                                                            <span className="order-item-price">${Number(item.price).toFixed(2)}</span>
                                                            <span className="order-item-quantity">× {item.count}</span>
                                                            <span className="order-item-subtotal">${(Number(item.price) * Number(item.count)).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            <div className="order-card-footer">
                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                    <>
                                    <button 
                                        className={`order-action-btn complete-action ${isCompleting ? 'loading' : ''}`}
                                        onClick={() => handleComplete(order.id)}
                                        disabled={isCompleting}
                                        >
                                        {isCompleting ? (
                                            <span className="loading-spinner"></span>
                                        ) : (
                                            <>
                                            <span className="action-icon">
                                                <FaCheckCircle />
                                            </span>
                                            <span className="action-text">Complete Order</span>
                                            </>
                                        )}
                                    </button>
                                    
                                    <button 
                                        className="order-action-btn cancel-action"
                                        onClick={
                                            () => {
                                                setCancelOpenModal(true);
                                                setCancelOrderId(order.id);
                                            }
                                        }
                                    >
                                        <span className="action-icon">
                                        <FaTimesCircle />
                                        </span>
                                        <span className="action-text">Cancel Order</span>
                                        <span className="action-hover-effect"></span>
                                    </button>
                                    </>
                                )}
                                
                                {(order.status === 'completed' || order.status === 'cancelled') && (
                                    <div className={`status-indicator ${order.status}`}>
                                    <span className="status-icon">
                                        {order.status === 'completed' ? <FaCheckCircle /> : <FaTimesCircle />}
                                    </span>
                                    <span className="status-text">
                                        {order.status === 'completed' ? 'Completed' : 'Cancelled'}
                                    </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <DeleteOrderModal 
                cancelOpenModal={cancelOpenModal}
                setCancelOpenModal={setCancelOpenModal}
                cancelOrderId={cancelOrderId}
                setCancelOrderId={setCancelOrderId}
                handleCancel={handleCancel}
            />
        </div>
    )
}

export default AdminOrders;