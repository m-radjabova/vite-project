import { BsCreditCard } from "react-icons/bs"
import { FaRegCommentDots, FaRegMoneyBillAlt } from "react-icons/fa"
import { IoLocationOutline, IoVideocamOutline } from "react-icons/io5"
import { LuFlower } from "react-icons/lu"
import { RiStore2Line } from "react-icons/ri"
import { NavLink } from "react-router-dom"

function AboutNavBar() {
  return (
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
  )
}

export default AboutNavBar