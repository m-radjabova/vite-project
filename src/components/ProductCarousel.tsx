import Slider from "react-slick";
import { Box, Typography, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { TiStarFullOutline } from "react-icons/ti"; 

interface CarouselImg {
  id: number;
  imgUrl: string;
}

function ProductCarousel() {
    const [carouselImg, setCarouselImg] = useState<CarouselImg[]>([]);
    const theme = useTheme();

    useEffect(() => {
        getCarouselImg();
    }, []);

    const getCarouselImg = () => {
        apiClient.get<CarouselImg[]>("/productcarousel").then((res) => {
            setCarouselImg(res.data);
        });
    }

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
        padding: theme.spacing(1),
        filter: "grayscale(20%)",
        opacity: 0.9,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        margin: "0 auto",
        border: `3px solid ${theme.palette.background.paper}`,
        boxShadow: theme.shadows[4],
        "&:hover": {
            filter: "grayscale(0%)",
            opacity: 1,
            transform: "scale(1.1)",
            boxShadow: theme.shadows[10],
            borderColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down("lg")]: {
            width: "150px",
            height: "150px",
        },
        [theme.breakpoints.down("md")]: {
            width: "120px",
            height: "120px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100px",
            height: "100px",
        },
    }));

    return (
        <Box
            py={8}
            sx={{
                // backgroundColor: theme.palette.background.default,
                position: "relative",
                overflow: "hidden",
                width: "100%",
                marginLeft: "calc(-50% + 50%)",
            }}
        >
            <Typography 
                variant="h3" 
                textAlign="center" 
                mb={6}
                sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    position: "relative",
                    px: 2,
                    "&:after": {
                        content: '""',
                        display: "block",
                        width: "80px",
                        height: "4px",
                        background: theme.palette.primary.main,
                        margin: `${theme.spacing(2)} auto 0`,
                        borderRadius: "2px",
                    },
                }}
            >
                Наши счастливые клиенты <TiStarFullOutline  size={30} style={{color: theme.palette.warning.main}}/>
            </Typography>

            <Box sx={{ width: "100%", marginTop: "20px" }}>
                <Slider {...settings}>
                    {carouselImg.map((photo) => (
                        <Box key={photo.id}>
                            <SlideImage src={photo.imgUrl} alt="Наши счастливые клиенты" />
                        </Box>
                    ))}
                    {carouselImg.length < 16 &&
                        carouselImg.map((photo) => (
                            <Box key={`duplicate-${photo.id}`}>
                                <SlideImage src={photo.imgUrl} alt="Наши счастливые клиенты" />
                            </Box>
                        ))}
                </Slider>
            </Box>
        </Box>
    );
}

export default ProductCarousel;