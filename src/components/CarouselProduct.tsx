import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import {FaStar } from "react-icons/fa";
import { IoIosIceCream } from "react-icons/io";
import { LuIceCreamBowl } from "react-icons/lu";
import { GiIceCreamCone } from "react-icons/gi";
import useImageCarousel from "../hooks/useImageCarousel";

function CarouselProduct() {
    const {carouselImg} = useImageCarousel();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const SlideImage = styled("img")(({ theme }) => ({
        width: "200px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "50%",
        padding: "12px",
        filter: "drop-shadow(0 4px 8px rgba(255, 105, 180, 0.3))",
        opacity: 0.95,
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        margin: "0 auto",
        border: `4px solid white`,
        boxShadow: "0 8px 32px rgba(255, 182, 193, 0.4)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        "&:hover": {
            filter: "drop-shadow(0 8px 16px rgba(255, 105, 180, 0.5)) brightness(1.05)",
            opacity: 1,
            transform: "scale(1.15) rotate(5deg)",
            boxShadow: "0 12px 40px rgba(252, 173, 212, 0.6)",
            borderColor: "#FFD1DC",
            zIndex: 10,
        },
        [theme.breakpoints.down("lg")]: {
            width: "160px",
            height: "160px",
        },
        [theme.breakpoints.down("md")]: {
            width: "140px",
            height: "140px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "120px",
            height: "120px",
        },
    }));

    const FloatingStars = () => (
        <>
            {[...Array(10)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        color: "#FFD700",
                        fontSize: `${Math.random() * 10 + 10}px`,
                        opacity: 0,
                        animation: `floatStar ${Math.random() * 3 + 2}s infinite ease-in-out`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        '@keyframes floatStar': {
                            '0%, 100%': { 
                                opacity: 0,
                                transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(0deg)`
                            },
                            '50%': { 
                                opacity: 0.8,
                                transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(180deg)`
                            }
                        }
                    }}
                >
                    <FaStar />
                </Box>
            ))}
        </>
    );

    return (
        <Box
            id="premium"
            py={10}
            sx={{
                background: "linear-gradient(135deg, #FFF0F5 0%, #FFDEE8 50%, #FFF0F5 100%)",
                position: "relative",
                overflow: "hidden",
                width: "100%",
                marginLeft: "calc(-50% + 50%)",
                '&:before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "30px",
                    background: "linear-gradient(90deg, #FFB6C1, #FF69B4, #FFB6C1)",
                    opacity: 0.4,
                    zIndex: 1
                },
                '&:after': {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "30px",
                    background: "linear-gradient(90deg, #FFB6C1, #FF69B4, #FFB6C1)",
                    opacity: 0.4,
                    zIndex: 1
                }
            }}
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
                <FloatingStars />
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            background: "rgba(255, 182, 193, 0.15)",
                            borderRadius: "50%",
                            filter: "blur(20px)",
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.3,
                            animation: `floatBubble ${Math.random() * 10 + 10}s infinite ease-in-out`,
                            '@keyframes floatBubble': {
                                '0%, 100%': { 
                                    opacity: 0.3,
                                    transform: `translate(0, 0)`
                                },
                                '50%': { 
                                    opacity: 0.5,
                                    transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
                                }
                            }
                        }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    opacity: 0,
                    animation: "fadeIn 0.8s ease-out forwards",
                    '@keyframes fadeIn': {
                        'to': { opacity: 1, transform: 'translateY(0)' }
                    },
                    transform: 'translateY(-20px)'
                }}
            >
                <Typography 
                    variant="h2"
                    textAlign="center" 
                    mb={6}
                    sx={{
                        fontWeight: 800,
                        background: "linear-gradient(45deg, #FF69B4, #FF1493)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        position: "relative",
                        px: 2,
                        fontSize: "3.5rem",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                        zIndex: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-block',
                            animation: "swing 2s infinite ease-in-out",
                            '@keyframes swing': {
                                '0%, 100%': { transform: 'rotate(0deg)' },
                                '25%': { transform: 'rotate(15deg)' },
                                '75%': { transform: 'rotate(-15deg)' }
                            }
                        }}
                    >
                        <IoIosIceCream style={{ color: "#FF69B4", fontSize: "3rem" }} />
                    </Box>
                    Premium Ice Cream
                    <Box
                        sx={{
                            display: 'inline-block',
                            animation: "swingReverse 2s infinite ease-in-out",
                            animationDelay: "0.5s",
                            '@keyframes swingReverse': {
                                '0%, 100%': { transform: 'rotate(0deg)' },
                                '25%': { transform: 'rotate(-15deg)' },
                                '75%': { transform: 'rotate(15deg)' }
                            }
                        }}
                    >
                        <IoIosIceCream style={{ color: "#FF69B4", fontSize: "3rem" }} />
                    </Box>
                </Typography>
            </Box>

            <Box sx={{ 
                width: "100%", 
                marginTop: "40px",
                position: "relative",
                zIndex: 2
            }}>
                <Slider {...settings}>
                    {carouselImg.map((photo) => (
                        <Box 
                            key={photo.id}
                            sx={{ 
                                textAlign: "center", 
                                padding: "0 10px",
                                transition: "transform 0.3s ease",
                                '&:hover': {
                                    transform: "scale(1.05)"
                                }
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <SlideImage src={photo.image} alt={photo.title} />
                                <Box sx={{
                                    position: "absolute",
                                    bottom: 10,
                                    right: 10,
                                    background: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                }}>
                                    <GiIceCreamCone style={{ color: "#FF69B4", fontSize: "1.6rem" }} />
                                </Box>
                            </Box>
                            <Typography 
                                variant="h6" 
                                sx={{
                                    mt: 2,
                                    color: "#C71585",
                                    fontWeight: 700,
                                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                    background: "linear-gradient(45deg,rgb(255, 169, 182),rgb(251, 215, 215))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    px: 1,
                                    position: "relative",
                                    display: "inline-block",
                                    '&:after': {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -5,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "60%",
                                        height: "2px",
                                        background: "linear-gradient(90deg, transparent,rgb(238, 71, 154), transparent)",
                                        borderRadius: "50%"
                                    }
                                }}
                            >
                                {photo.title} <LuIceCreamBowl style={{ color: "#FF69B4" }} size={20} />
                            </Typography>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
}

export default CarouselProduct;