import usePartners from "../../hooks/usePartners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ClientsAndPartners() {
    const { partners } = usePartners();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="partners-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Наши клиенты и партнеры</h2>
                    <p className="section-subtitle">Компании, которые доверяют нам</p>
                </div>
                
                <div className="partners-slider-container">
                    <Slider {...settings}>
                        {partners.map((item) => (
                            <div className="partner-slide" key={item.id}>
                                <div className="partner-logo-container">
                                    <img 
                                        src={item.imageLogo} 
                                        alt={item.id || "Partner logo"} 
                                        className="partner-logo"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default ClientsAndPartners;