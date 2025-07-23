import { useNavigate } from "react-router-dom";
import useBouquet from "../../hooks/useBouquet";
import { IoIosArrowForward } from "react-icons/io";
import AboutNavBar from "../AboutPage/AboutNavBar";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import leaf from "../../assets/seedling.svg";
import award from "../../assets/award.svg";
import tint from "../../assets/tint.svg";
import useLoading from '../../hooks/useLoading';
import IsLoading from '../IsLoading';

function ReviewsPage() {
    const { bouquet } = useBouquet();
    const { loading } = useLoading();
    const navigate = useNavigate();
    
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

    if (loading) {
        return <IsLoading />;
    }

  return (
    <div className="reviews">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link">Отзывы</span>
            </div>
            <div className="reviews-container">
                <div className="reviews-left">
                    <div className="reviews-title">
                        <h1 className="about-title">Отзывы</h1>
                        <button onClick={() => navigate("/reviews/add-review")}>Оставить отзыв</button>
                    </div>
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
                <AboutNavBar />
            </div>
        </div>
    </div>
  )
}

export default ReviewsPage