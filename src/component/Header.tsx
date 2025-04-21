import { NavLink } from "react-router-dom"
import Logo from "../assets/Agency.svg"

function Header() {
  const token = localStorage.getItem("token")

  return (
    <header id="header">
        <img src={Logo} alt="#" />
        <ul>
            {!token && (
                <NavLink to="/login" className="login">
                    <li> <a href="#">Login</a> </li>
                </NavLink>
            )}
            <li> <a href="#home">Home</a> </li>
            <li> <a href="#about">About</a> </li>
            <li> <a href="#servisec">Services</a> </li>
            <li> <a href="#project">Project</a> </li>
            <li> <a href="#feedback">Feedback</a> </li>
            <li> <a href="#blog">Blog</a> </li>
            <li> <a href="#contact">Contact</a> </li>
        </ul>
    </header>
  )
}

export default Header