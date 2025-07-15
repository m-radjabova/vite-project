import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import AboutNavBar from "./AboutPage/AboutNavBar"
import IsLoading from "./IsLoading";
import useLoading from "../hooks/useLoading";
import usePoints from "../hooks/usePoints";

function DeliveryPage() {
    const navigate = useNavigate()
    const {loading} = useLoading()
    const {points} = usePoints()
    const pointList = points.slice(0, 12)
        
    if (loading) {
        return <IsLoading />;
    }
        
  return (
    <div className="delivery-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link">Доставка</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1 className="about-title">Доставка</h1>
                    <p>
                        Служба доставки компании «ФлораМаркт» осуществляет доставку цветов и 
                        букетов в любое удобное для Вас время 365 дней в году, мы работаем без выходных и
                        праздников. Мы готовы нести красоту и радость каждому, кто обратится к нам.
                    </p>
                    <h3>Как оформить заказ с доставкой</h3>
                    <p>
                        Оформить срочную или обычную заявку на доставку букета можно как по телефону, ежедневно с
                        <span className="about-bold">9-00 до 21-00,</span> так и через сайт — круглосуточно. Если стоимость заказа 
                        <span className="about-bold"> не менее 5000 рублей —</span> доставка цветов бесплатная.
                    </p>
                    <p>Стоимость доставки цветочных букетов в пределах МКАД напрямую зависит от адреса заказчика и объема заказа.</p>
                    <p> <span className="about-bold">Стоимость доставки заказа в пределах МКАД:</span></p>
                    <table className="delivery-table">
                        <thead>
                            <tr>
                                <th>Время доставки</th>
                                <th>Сумма заказа от 5000 ₽</th>
                                <th>Сумма заказа до 5000 ₽</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Более 3 (трех) часов</td>
                                <td className="free-delivery">БЕСПЛАТНО</td>
                                <td>500 ₽</td>
                            </tr>
                            <tr>
                                <td>Срочная от 1-3 часов</td>
                                <td>800 ₽</td>
                                <td>800 ₽</td>
                            </tr>
                            <tr>
                                <td>К определенному времени</td>
                                <td>800 ₽</td>
                                <td>800 ₽</td>
                            </tr>
                            <tr>
                                <td>В метро</td>
                                <td className="free-delivery">БЕСПЛАТНО</td>
                                <td>300 ₽</td>
                            </tr>
                            <tr>
                                <td>Доставка ночью</td>
                                <td className="night-delivery">1000 ₽</td>
                                <td className="night-delivery">1000 ₽</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Доставка в пределах Московской области: 40 руб. за км.</p>
                    <h3>Особые условия</h3>
                    <p style={{fontWeight: 400}}>Скидочные карты действуют только в магазинах, при предъявлении!</p>
                    <p style={{fontWeight: 400}}>При бесплатной доставке, скидочные карты не действуют!</p>
                    <p style={{fontWeight: 400}}>При заказе товаров по акции, бесплатная доставка не действует!</p>
                    <p >
                        В том случае, если во время привоза вас не оказалось на месте, 
                        стоимость повторной доставки будет платной (500 рублей). 
                        В предпраздничные и праздничные (Новый год, Международный женский день, День Святого Валентина) оформление заявки на срочные заказы не принимается.
                    </p>
                    <p>
                        Если шкала пробок поднялась выше 8 баллов, мы не гарантируем, что сможем привезти цветы в пределах того временного промежутка, который был оговорен.
                    </p>
                    <p>
                        В преддверии больших праздников, чтобы получить красивые и свежие цветы вовремя рекомендуется заранее оформлять заказ. Ярких и неожиданных вам моментов!
                    </p>
                    <h3>Пункты самовывоза</h3>
                    <ul className="delivery-list">
                        {
                            pointList.map((point) => (
                                <li key={point.id} className="delivery-item">
                                    <span>{point.address}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <AboutNavBar />
            </div>
        </div>
    </div>
  )
}

export default DeliveryPage