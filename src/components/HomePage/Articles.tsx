import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import useArticles from "../../hooks/useArticles";

function Articles() {
    const { articles } = useArticles();
    const articlesList = articles.slice(0, 3);
  return (
    <div className="articles">
        <div className="container">
            <div className="articles-title">
                <h1>Полезные статьи</h1>
                <Link className="articles-link" to="/articles">
                    Все статьи <IoIosArrowForward className="arrow-icon" />
                </Link>
            </div>
            <div className="articles-list">
                {articlesList.map(item => (
                    <Link to={`/articles/${item.id}`} className="article-link-wrapper" key={item.id}>
                        <div className="articles-item">
                            <div className="article-image-container">
                                <img src={item.image} alt={item.title} />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="articles-text">
                                <div className="article-date">{item.date}</div>
                                <h3 className="article-title">{item.title}</h3>
                                <div className="article-description">{item.description}</div>
                                <div className="read-more">
                                    Читать далее <IoIosArrowForward className="arrow-icon" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Articles