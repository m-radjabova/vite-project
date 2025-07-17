import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import useArticles from "../../../hooks/useArticles";

function AdminArticles() {
    const { articles } = useArticles();

    return (
        <div className="admin-articles-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">Articles</h1>
                <button className="add-bouquet-btn">
                    <FaPlus className="admin-btn-icon" />
                    Add New Article
                </button>
            </div>
            
            <div className="admin-divider"></div>

            {/* Articles Grid */}
            <div className="admin-articles-grid">
                {articles.map((article) => (
                    <div key={article.id} className="admin-article-card">
                        <div className="admin-card-image-container">
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                className="admin-card-image"
                            />
                            <div className="admin-card-overlay"></div>
                            <div className="admin-action-buttons">
                                <button className="admin-action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="admin-action-btn delete-btn">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="admin-card-content">
                            <div className="admin-meta-info">
                                <span className="admin-date-badge">
                                    {article.createdAt}
                                </span>
                                <span className="read-time">5 min read</span>
                            </div>
                            <h3 className="admin-article-title">{article.title}</h3>
                            <p className="admin-article-excerpt">
                                {article.description.length > 100 
                                    ? `${article.description.substring(0, 100)}...` 
                                    : article.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminArticles;