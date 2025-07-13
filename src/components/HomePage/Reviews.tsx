import { IoIosArrowForward } from "react-icons/io";
import useReviews from "../../hooks/useReviews";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";

function Reviews() {
    const { reviews} = useReviews();
    const displayedReviews = reviews.slice(0, 2)

    return (
        <div className="reviews">
            <div className="container">
                <div className="reviews-title">
                    <h1>Отзывы о «Флорамаркт»</h1>
                    <Link className="reviews-link" to="/reviews">
                        Все отзывы <IoIosArrowForward />
                    </Link>
                </div>
                
                <div className="reviews-list">
                    {displayedReviews.map(item => (
                        <div className="reviews-item" key={item.id}>
                            <FaQuoteLeft className="quote-icon" />
                            <div className="review-header">
                                <span className="review-author">{item.author}</span>
                                <span className="review-date"> — {item.date} - {item.time}  {item.location}</span>
                            </div>
                            <div className="review-rating">
                                {[...Array(item.rating)].map((_, index) => (
                                    <FaStar key={index} className="star-icon" />
                                ))}
                            </div>
                            <div className="review-content">
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;