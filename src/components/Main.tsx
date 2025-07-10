import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";

function Main() {
  return (
    <main className="main">
        <div className="container">
            <div className="main-content">
                <h1>Всегда в продаже  более 100 готовых дизайнерских букетов</h1>
                <Link className="main-link" to="/catalog">Перейти в каталог <IoIosArrowForward /> </Link>
            </div>
        </div>
    </main>
  )
}

export default Main