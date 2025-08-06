import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGift, FaHeart } from "react-icons/fa";
import useCarouselImg from "../hooks/useCarouselImg";

function FlowerCarousel() {
    const { image } = useCarouselImg();

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const FloatingHearts = () => (
        <>
            {[...Array(15)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        color: "rgba(255, 105, 180, 0.6)",
                        fontSize: `${Math.random() * 12 + 8}px`,
                        opacity: 0,
                        animation: `floatHeart ${Math.random() * 4 + 3}s infinite ease-in-out`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        '@keyframes floatHeart': {
                            '0%, 100%': { 
                                opacity: 0,
                                transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(0deg)`
                            },
                            '50%': { 
                                opacity: 0.7,
                                transform: `translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(20deg)`
                            }
                        }
                    }}
                >
                    <FaHeart />
                </Box>
            ))}
        </>
    );

    return (
        <Box
            id="flowers"
            py={8}
            className="flower-carousel-container"
        >
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
                zIndex: 0
            }}>
                <FloatingHearts />
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            background: "rgba(147, 112, 219, 0.1)",
                            borderRadius: "50%",
                            filter: "blur(30px)",
                            width: `${Math.random() * 400 + 100}px`,
                            height: `${Math.random() * 400 + 100}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.4,
                            animation: `floatBubble ${Math.random() * 15 + 10}s infinite ease-in-out`,
                            '@keyframes floatBubble': {
                                '0%, 100%': { 
                                    opacity: 0.3,
                                    transform: `translate(0, 0)`
                                },
                                '50%': { 
                                    opacity: 0.6,
                                    transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
                                }
                            }
                        }}
                    />
                ))}
            </Box>


            {/* Carousel */}
            <Box sx={{ 
                width: "100%", 
                position: "relative",
                zIndex: 2,
                px: 2
            }}>
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
                                
                                <div className="flower-details-carousel">
                                    <h3 className="flower-title">Only for you <FaGift className="gift-icon" /></h3>
                                    <p className="flower-description">Beautiful flowers for your loved one <FaHeart className="inline-heart" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
}

export default FlowerCarousel;