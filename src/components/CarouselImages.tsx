import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import useCarouselImg from "../hooks/useCarouselImg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGift, FaHeart } from 'react-icons/fa';

function CarouselImages() {
    const { image } = useCarouselImg();
    const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number; delay: number; }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Date.now(),
                left: Math.random() * 100,
                size: Math.random() * 10 + 5,
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 5
            };
            setHearts(prev => [...prev.slice(-20), newHeart]);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div className="flower-carousel-container">

            <div className="hearts-background">
                {hearts.map(heart => (
                    <div 
                        key={heart.id}
                        className="falling-heart"
                        style={{
                            left: `${heart.left}%`,
                            width: `${heart.size}px`,
                            height: `${heart.size}px`,
                            animationDuration: `${heart.duration}s`,
                            animationDelay: `${heart.delay}s`
                        }}
                    >
                        ❤
                    </div>
                ))}
            </div>

            <Slider {...settings} className="flower-carousel">
                {image.map((imgs, index) => (
                    <div key={imgs.id} className="carousel-item">
                        <div className="flower-card">
                            <div className="card-image-container">
                                <img 
                                    src={imgs.image} 
                                    alt={imgs.id || `Flower ${index + 1}`}
                                    className="flower-image"
                                />
                                <div className="image-overlay"></div>
                            </div>
                            
                            <div className="flower-heart">
                                <FaHeart className="heart-icon" />
                            </div>
                            
                            <div className="flower-details">
                                <h3 className="flower-title">Only for you <FaGift className="gift-icon" /></h3>
                                <p className="flower-description">Beautiful flowers for your loved one <FaHeart className="inline-heart" /></p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselImages;