import { IoIosArrowForward } from "react-icons/io";
import useReviews from "../../hooks/useReviews";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";

function Reviews() {
    const { reviews } = useReviews();
    const displayedReviews = reviews.slice(0, 2);

    return (
        <section className="floramarket-testimonials">
            <div className="fm-container">
                <div className="fm-testimonials-header">
                    <div className="fm-title-group">
                        <h2 className="fm-section-title">Отзывы о «Флорамаркт»</h2>
                        <div className="fm-title-underline"></div>
                    </div>
                    <Link className="fm-view-all-link" to="/reviews">
                        Все отзывы <IoIosArrowForward className="fm-link-arrow" />
                    </Link>
                </div>
                
                <div className="fm-testimonials-grid">
                    {displayedReviews.map(item => (
                        <div className="fm-testimonial-card" key={item.id}>
                            <div className="fm-quote-icon">
                                <FaQuoteLeft />
                            </div>
                            <div className="fm-review-meta">
                                <div className="fm-reviewer-info">
                                    <span className="fm-reviewer-name">{item.author}</span>
                                    <span className="fm-review-details">
                                        {item.date} • {item.time} • {item.location}
                                    </span>
                                </div>
                                <div className="fm-rating">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar 
                                            key={index} 
                                            className={`fm-star ${index < item.rating ? 'fm-star-filled' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="fm-review-text">
                                <p>{item.text}</p>
                            </div>
                            <div className="fm-review-footer">
                                <span className="fm-verified-badge">✓ Проверенный отзыв</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;