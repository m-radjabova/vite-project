import { FaEdit, FaMapMarkerAlt, FaPhone, FaPlus, FaTrash } from "react-icons/fa"
import usePoints from "../../../hooks/usePoints"

function AdminPoints() {
    const {points} = usePoints()
  return (
    <div className="admin-points-container">
        <div className="admin-bouquets-header">
            <h1 className="admin-bouquets-title">Delivery Points</h1>
                <button className="add-bouquet-btn">
                    <FaPlus className="admin-btn-icon" />
                    Add Delivery Point
                </button>
        </div>
                    
        <div className="admin-divider"></div>

        <div className="admin-delivery-list">
                {points.map(item => (
                    <div className="admin-delivery-card" key={item.id}>
                        <div className="admin-card-icon">
                            <FaMapMarkerAlt className="marker-icon" />
                        </div>
                        <div className="admin-card-content">
                            <h3 className="admin-delivery-title">{item.address}</h3>
                            <div className="admin-delivery-info">
                                <FaPhone className="info-icon" />
                                <span className="info-text">{item.phone}</span>
                            </div>
                            <div className="admin-card-footer">
                                <button className="admin-action-btn admin-edit-btn">
                                    <FaEdit size={24} />
                                </button>
                                <button className="admin-action-btn admin-delete-btn">
                                    <FaTrash size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default AdminPoints