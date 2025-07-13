import { NavLink } from 'react-router-dom';
import logoFooter from '../assets/Frame 86.svg';
import phone from "../assets/Frame 91.svg";
function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="footer-left">
                <div className="logo">
                    <img src={logoFooter} alt="" />
                </div>
                <div className="phone">
                    <img src={phone} alt="" />
                    <a href="tel:+74952222222">+7 (495) 222-22-22</a>
                    <a href="tel:+74952222222">+7 (495) 222-22-22</a>
                </div>
            </div>
            <div className="footer-middle1">
                <nav className="footer-nav">
                    <NavLink to="/catalog" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Каталог</NavLink>
                    <NavLink to="/about" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>О компании</NavLink>
                    <NavLink to="/payment" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Способы оплаты</NavLink>
                    <NavLink to="/delivery" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Доставка</NavLink>
                    <NavLink to="/reviews" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Отзывы</NavLink>
                    <NavLink to="/discount" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Дисконтные карты</NavLink>
                    <NavLink to="/video" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Видео</NavLink>
                    <NavLink to="/contacts" className={({ isActive }) => "footer-link" + (isActive ? " active" : "")}>Контакты</NavLink>
                </nav>
            </div>
            <div className="footer-middle2">
                <nav className='footer-nav'>
                    <NavLink to="/bouquets" className="footer-link">Букеты</NavLink>
                    <NavLink to="/roses" className="footer-link">Розы</NavLink>
                    <NavLink to="/flowers" className="footer-link">Цветы</NavLink>
                    <NavLink to="/plants" className="footer-link">Горшечные растения</NavLink>
                    <NavLink to="/wedding" className="footer-link">Букет невесты</NavLink>
                    <NavLink to="/composition" className="footer-link">Композиции на стол</NavLink>
                </nav>
            </div>
            <div className="footer-right">
                <nav className='footer-nav'>
                    <NavLink to="/" className="footer-link">Украшение залов</NavLink>
                    <NavLink to="/" className="footer-link">Игрушки</NavLink>
                    <NavLink to="/" className="footer-link">Торты</NavLink>
                    <NavLink to="/" className="footer-link">Открытки</NavLink>
                    <NavLink to="/" className="footer-link">Авторские работы</NavLink>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Footer