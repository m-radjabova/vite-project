import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import AboutNavBar from "./AboutPage/AboutNavBar"
import karta5 from "../assets/karta5.svg"
import kartavip from "../assets/kartavip.svg"

function DiscountPage() {
    const navigate = useNavigate()
  return (
    <div className="discount-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> Дисконтные карты</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1 className="about-title">Дисконтные карты</h1>
                    <p><span className="about-bold">Информация о дисконтных картах</span></p>
                    <p>Магазин «ФлораМаркт» предлагает своим покупателям дисконтные карты. При покупке на сумму от</p>
                    <p>1500 рублей вы получаете дисконтную карту с 5% скидкой на все товары. При покупке свыше</p>
                    <p>5000 рублей вы получаете дисконтную карту с 10% скидкой на все товары.</p>
                    <div className="discount-cards">
                        <img src={karta5} alt="" />
                        <img src={kartavip} alt="" />
                    </div>
                    <p>На товары участвующие в акции скидки не распространяются.</p>
                    <p>Карта дает право на получении скидки в магазинах Флорамаркт.</p>
                    <p>Внимание! Скидок по карте при заказе в интернет-магазине нет!</p>
                </div>
                <AboutNavBar />
            </div>
        </div>
    </div>
  )
}

export default DiscountPage