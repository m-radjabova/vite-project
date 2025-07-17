import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";
import useNews from "../hooks/useNews";

function NewsPage() {
    const navigate = useNavigate()
    const { news } = useNews();
    const {loading} = useLoading()
    ;

    if (loading) {
        return <IsLoading />;
    }
  return (
    <div className="article-page">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link"> Новости</span>
            </div>
            <div className="articles-container" style={{margin: "2rem 0"}}>
                <h1 className="about-title">Новости</h1>
                <div className="news-list">
                    {news.map(item => (
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
    </div>
  )
}

export default NewsPage