import {FaEdit, FaTrash } from "react-icons/fa";
import { useBouquetContext } from "../../../../context/BouquetProvider";

function AdminFlowers() {
    const { bouquet } = useBouquetContext();
    const rosesBouquets = bouquet.filter(item =>
        item.category?.includes("flowers")
    );

    if (rosesBouquets.length === 0) {
        return (
            <div className="admin-bouquets-container">
                <div className="admin-bouquets-header">
                    <h1 className="admin-bouquets-title">Flowers</h1>
                </div>
                <div className="admin-divider"></div>
                <h1 className="about-title text-center">Товары не найдены</h1>
            </div>
        );
    }

    return (
        <div className="admin-bouquets-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">Flowers</h1>
            </div>
            
            <div className="admin-divider"></div>
            
            <div className="admin-bouquets-grid">
                {rosesBouquets.map((bouquet) => (
                    <div key={bouquet.id} className="admin-bouquet-card">
                        <div className="admin-bouquet-image-container">
                            <img 
                                src={bouquet.image} 
                                alt={bouquet.name} 
                                className="admin-bouquet-image"
                            />
                            <div className="admin-bouquet-actions">
                                <button className="admin-action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="admin-action-btn delete-btn">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        
                        <div className="admin-bouquet-details">
                            <h2 className="admin-bouquet-name">{bouquet.name}</h2>
                            <p className="admin-bouquet-compound">{bouquet.compound}</p>
                            
                            <div className="admin-price-container">
                                <span className="admin-current-price">${bouquet.price}</span>
                                {bouquet.oldPrice && (
                                    <span className="admin-old-price">${bouquet.oldPrice}</span>
                                )}
                            </div>
                            
                            <div className="admin-bouquet-meta">
                                <span className="admin-meta-item">
                                    <span className="admin-meta-label">Size:</span> {bouquet.size}
                                </span>
                                <span className="admin-meta-item">
                                    <span className="admin-meta-label">Status:</span> 
                                    <span className={`admin-status-badge ${bouquet.status.toLowerCase()}`}>
                                        {bouquet.status}
                                    </span>
                                </span>
                                <span className="admin-meta-item">
                                    <span className="admin-meta-label">Category:</span> 
                                    {bouquet.category.map((category, index) => (
                                        <span key={index} className="admin-category-badge">
                                            {category}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminFlowers;