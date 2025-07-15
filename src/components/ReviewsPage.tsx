import { useNavigate } from "react-router-dom";
import useBouquet from "../hooks/useBouquet";
import { IoIosArrowForward } from "react-icons/io";
import AboutNavBar from "./AboutPage/AboutNavBar";
import { FaQuoteLeft } from "react-icons/fa";

function ReviewsPage() {
    const { bouquet } = useBouquet();
    const navigate = useNavigate();
    
    const reviewedBouquets = bouquet
    .filter(b => b.reviews && b.reviews.length > 0)
    .map(b => ({
        image: b.image,
        reviews: b.reviews || [],
    }));

  return (
    <div className="reviews">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link">Отзывы</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <div className="reviews-title">
                        <h1 className="about-title">Отзывы</h1>
                        <button>Оставить отзыв</button>
                    </div>
                    <div className="reviews-list">
                        {reviewedBouquets.map((item, index) => (
                            <div className="reviews-item" key={index}>
                                <div className="reviews-image-container">
                                    <img src={item.image} alt="bouquet" />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="reviews-text">
                                    <div className="reviews-quote">
                                        <FaQuoteLeft />
                                    </div>
                                    <div className="reviews-description">
                                        {item.reviews.map((review, reviewIndex) => (
                                            <div key={reviewIndex}>{review.text}</div>
                                        ))}
                                    </div>
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