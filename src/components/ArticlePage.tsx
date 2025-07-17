import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";
import useArticles from "../hooks/useArticles";

function ArticlePage() {
    const navigate = useNavigate()
    const { articles } = useArticles();
    const {loading} = useLoading();

    if (loading) {
        return <IsLoading />;
    }
  return (
    <div className="article-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> Статьи</span>
            </div>
            <div className="articles-container" style={{margin: "2rem 0"}}>
                <h1 className="about-title">Статьи</h1>
                <div className="articles-list">
                                {articles.map(item => (
                                    <div className="article-link-wrapper" key={item.id}>
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
                                    </div>
                                ))}
                            </div>
            </div>
        </div>
    </div>
  )
}

export default ArticlePage