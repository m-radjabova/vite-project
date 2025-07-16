import { useNavigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";
import { IoIosArrowForward } from "react-icons/io";
import AboutNavBar from "./AboutPage/AboutNavBar";
import map from "../assets/Frame 212.svg"
import usePoints from "../hooks/usePoints";

function ContactPage() {
    const navigate = useNavigate()
    const { loading } = useLoading();
    const {points} = usePoints()
    
    if (loading) {
        return <IsLoading />;
    }
  return (
    <div className="contact-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> Контакты</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1 className="about-title">Контакты</h1>
                    <img className="map" src={map} alt="#" />
                    <p>Адреса и телефоны цветочных центров:</p>
                    <div className="points">
                        {points.map((point) => (
                            <div key={point.id} className="point">
                                <p>{point.address}</p>
                                <p>{point.phone}</p>
                            </div>
                        ))}
                    </div>
                    <p>Время работы: с 8:00 до 22:00</p>
                    <p>E-mail: <a href="floramarkt@mail.ru">floramarkt@mail.ru</a>, <a href="zakaz@floramarkt.su">zakaz@floramarkt.su</a></p>
                </div>
                <AboutNavBar />
            </div>
        </div>
    </div>
  )
}

export default ContactPage