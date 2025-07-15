import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import AboutNavBar from "./AboutPage/AboutNavBar"

function VideoPage() {
    const navigate = useNavigate()
  return (
    <div className="video-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> Видео</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1 className="about-title">Видео</h1>
                    <h1 className="big-title">Что тут будет?</h1>
                    <p>Служба доставки компании «ФлораМаркт» осуществляет доставку цветов и букетов в
                        любое удобное для Вас время 365 дней в году, мы работаем без выходных и праздников. Мы 
                        готовы нести красоту и радость каждому, кто обратится к нам.
                    </p>
                </div>
                <AboutNavBar />
            </div>
        </div>
    </div>
  )
}

export default VideoPage