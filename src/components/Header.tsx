import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo (1).svg';
import leftImg from '../assets/pic.svg';

function Header() {
  return (
    <main className="main">
        <div className='container'>
            <div className='main-header'>
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink className="text-decoration-none login"  to="/login">Login</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='main-content'>
                <div className='left-side'>
                    <img src={leftImg} alt="left-side" />
                </div>
                <div className='right-side'>
                    <h1>
                        Только самые <br />
                        <span style={{ color: "#FF7020" }}>сочные бургеры!</span>
                    </h1>
                    <p>Бесплатная доставка от 599₽</p>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Header