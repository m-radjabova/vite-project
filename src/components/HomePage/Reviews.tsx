import { IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useBouquet from "../../hooks/useBouquet";

function Reviews() {
    const { bouquet } = useBouquet();
    const allReviews = bouquet
    .filter(b => b.reviews && b.reviews.length > 0)
    .flatMap(b => b.reviews);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="floramarket-testimonials">
            <div className="container">
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
                    <Slider {...settings}>
                    {allReviews.map(item => (
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
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default Reviews;