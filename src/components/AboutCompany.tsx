import { IoIosArrowForward } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { RiStore2Line } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { BsCreditCard } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

function AboutCompany() {
    const navigate = useNavigate()
  return (
    <div className="about-company">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> О комании</span>
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1>О компании</h1>
                    <span>Уважаемые Дамы и Господа, Компания ФлораМаркт рада приветствовать Вас на своем сайте!</span>
                    <h3>Цветочная оптово розничная компания «ФлораМаркт»</h3>
                    <p>Одна из ведущих компаний, успешно работающих в цветочной индустрии России более 15 лет.</p>
                    <p>
                        Основное направление — это оптовая торговля срезанными цветами, горшечными растениями, посадочным материалом, луковицами, 
                        семенами газонных трав, искусственными растениями, сухоцветами и сопутствующими товарами.
                    </p>
                    <p>
                        Многолетнее сотрудничество с производителями и лучшими брокерами из Голландии, Италии, Дании, 
                        Израиля, Латинской Америки, Африки и России позволяет постоянно поддерживать широкий ассортимент, 
                        продаваемой нами продукции, включающий в себя несколько тысяч наименований.
                    </p>
                    <p>
                        Являясь лидером в области создания и доставки букетов и композиций из цветов, ФлораМаркт по праву 
                        гордится такими своими конкурентными преимуществами, как богатый ассортимент и высокое качество цветов, 
                        профессионализм операторов и флористов, оперативность доставки, конкурентные цены и широкая линейка скидок, удобство оформления и
                        оплаты заказа цветов.
                    </p>
                    <h3>Богатый ассортимент и высокое качество цветов</h3>
                    <p>
                        Работая напрямую с цветочными плантациями и обладая собственными прекрасными 
                        условиями для содержания цветов, ФлораМаркт имеет возможность всегда предлагать своим 
                        клиентам лучшее — высокое качество и отличный ассортимент. В каталоге компании Вы всегда найдете, 
                        как классические розы, лилии и гвоздики, так и экзотические и полевые цветы. Также компания 
                        предлагает композиции из сухоцветов и комнатные цветочные растения в горшках и кашпо.
                    </p>
                    <h3>Профессионализм операторов и флористов</h3>
                    <p>
                        Компания ФлораМаркт во главу угла ставит не только высокое качество самих цветов, но и качество предоставляемых 
                        услуг. Именно поэтому в компании работают только профессионалы.
                    </p>
                    <p>
                        Опытные операторы на телефоне всегда помогут подобрать подходящий букет по случаю, а
                        профессиональные флористы, победители многочисленных флористических конкурсов, создадут для 
                        Вас оригинальные и неповторимые букеты и цветочные композиции на заказ.
                    </p>
                    <h3>Удобство оформления и оплаты заказа цветов</h3>
                    <p>
                        При организации работы компании в целом и сайте www.флорамаркт.рф в частности одним из важнейших моментов было и
                        остается по сей день удобство заказа и оплаты услуг компании.
                    </p>
                    <p>
                        Сделать заказ цветов в ФлораМаркт можно по телефонам +7 965 151-18-39, 8 977 499 18 18 или через сайт компании. Опытные операторы обязательно помогут Вам определить и
                        +правильно подобрать букет для предстоящего торжества. Вы также можете заказать выезд менеджера к Вам домой или в офис.
                    </p>
                    <p>
                        Оплата заказа осуществляется в ФлораМаркт любым удобным для Вас способом: наличными при доставке, курьеру, безналичным способом, при помощи кредитной карты, электронным платежом.
                    </p>
                </div>
                <div className="about-right">
                    <nav className="about-nav">
                        <NavLink to="/about" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <RiStore2Line className="about-icon" /> О компании</NavLink>
                        <NavLink to="/payment" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <FaRegMoneyBillAlt className="about-icons"/>Способы оплаты</NavLink>
                        <NavLink to="/delivery" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <LuFlower className="about-icon" /> Доставка</NavLink>
                        <NavLink to="/reviews" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <FaRegCommentDots className="about-icon" /> Отзывы</NavLink>
                        <NavLink to="/discount" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <BsCreditCard className="about-icon" /> Дисконтные карты</NavLink>
                        <NavLink to="/video" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <IoVideocamOutline  className="about-icon"/>Видео</NavLink>
                        <NavLink to="/contacts" className={({ isActive }) => "about-link" + (isActive ? " active" : "")}> <IoLocationOutline className="about-icon" /> Контакты</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutCompany