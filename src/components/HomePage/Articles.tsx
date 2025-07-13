import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import useArticles from "../../hooks/useArticles";

function Articles() {
    const { articles } = useArticles();

  return (
    <div className="articles">
        <div className="container">
            <div className="articles-title">
                <h1>Полезные статьи</h1>
                <Link className="articles-link" to="/articles">
                    Все статьи <IoIosArrowForward />
                </Link>
            </div>
            <div className="articles-list">
                {articles.map(item => (
                    <div className="articles-item" key={item.id}>
                        <img src={item.image} alt="" />
                        <div className="articles-text">
                            <div className="article-date">{item.date}</div>
                            <div className="article-title">{item.title}</div>
                            <div className="article-description">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Articles