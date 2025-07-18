import { FaQuoteLeft, FaStar } from "react-icons/fa";
import leaf from "../../../assets/seedling.svg";
import award from "../../../assets/award.svg";
import tint from "../../../assets/tint.svg";
import useBouquet from './../../../hooks/useBouquet';

function AdminReviews() {
    const { bouquet } = useBouquet();
    
    const reviewedBouquets = bouquet
    .filter(b => b.reviews && b.reviews.length > 0)
    .map(b => ({
        image: b.image,
        status: b.status,
        reviews: b.reviews || [],
    }));

    const getBadgeClass = (status: string) => {
        if (status === "Акция") return "badge-red";
        if (status === "Новинка") return "badge-green";
        if (status === "С водой") return "badge-blue";
        return "";
    };


  return (
    <div className="admin-reviews-container">
        <div className="admin-bouquets-header">
            <h1 className="admin-bouquets-title">Customer Reviews</h1>
        </div>
         
        <div className="admin-divider"></div>
        <div className="admin-reviews-list">
            <div className="reviews-list-box">
                {reviewedBouquets.map((item, index) => (
                    <div className={`reviews-item${index % 2 === 1 ? " reverse" : ""}`} key={index}>
                        <div className="reviews-item-image">
                            <img src={item.image} alt="" />
                            {item.status && (
                                <div className={`status-badge ${getBadgeClass(item.status)}`}>
                                    <img
                                    src={
                                        item.status === "Акция"
                                        ? award
                                        : item.status === "Новинка"
                                        ? leaf
                                        : tint
                                    }
                                    alt={item.status}
                                    />
                                    <span>{item.status}</span>
                                </div>
                                )}
                        </div>
                        <div className="fm-testimonials-grid">
                            {item.reviews.map((review, reviewIndex) => (
                                <div className="fm-testimonial-card" key={reviewIndex}>
                                    <div className="fm-quote-icon">
                                        <FaQuoteLeft />
                                    </div>
                                    <div className="fm-review-meta">
                                        <div className="fm-reviewer-info">
                                            <span className="fm-reviewer-name">{review.author}</span>
                                            <span className="fm-review-details">
                                                {review.date} • {review.time} • {review.location}
                                                    </span>
                                        </div>
                                        <div className="fm-rating">
                                            {[...Array(5)].map((_, index) => (
                                                 <FaStar
                                                    key={index} 
                                                    className={`fm-star ${index < review.rating ? 'fm-star-filled' : ''}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="fm-review-text">
                                        <p>{review.text}</p>
                                    </div>
                                    <div className="fm-review-footer">
                                        <span className="fm-verified-badge">✓ Проверенный отзыв</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminReviews