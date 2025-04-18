import Logo from "../assets/Agency.svg"

function Header() {
  return (
    <header id="header">
        <img src={Logo} alt="#" />
        <ul>
            <li>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#servisec">Services</a>
                <a href="#project">Project</a>
                <a href="#feedback">Feedback</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
            </li>
        </ul>
    </header>
  )
}

export default Header