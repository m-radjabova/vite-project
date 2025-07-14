import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import useNews from "../../hooks/useNews";

function News() {
    const { news } = useNews();
    const newsList = news.slice(0, 2);
  return (
    <div className="news">
        <div className="container">
            <div className="news-title">
                <h1>Новости</h1>
                <Link className="news-link" to="/articles">
                    Все новости <IoIosArrowForward />
                </Link>
            </div>
            <div className="news-list">
                {newsList.map(item => (
                    <div className="news-item" key={item.id}>
                        <div className="news-text">
                            <div className="news-title">{item.title}</div>
                            <div className="news-date">{item.date}</div>
                        </div>
                        <div className="news-description">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default News