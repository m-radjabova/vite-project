import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import useArticles from "../../../hooks/useArticles";
import { useState } from "react";
import DeleteArticleModal from "./DeleteArticleModal";
import { ArticleType } from "../../types/Types";
import AddArticleModal from "./AddArticleModal";

function AdminArticles() {
    const { articles, deleteArticle, addArticle, updateArticle } = useArticles();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteArtId, setDeleteArtId] = useState<string | null>(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editArticle, setEditArticle] = useState<ArticleType | null>(null);

    return (
        <div className="admin-articles-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">Articles</h1>
                <button 
                onClick={() => {
                    setOpenAddModal(true);
                    setEditArticle(null);
                }}
                className="add-bouquet-btn">
                    <FaPlus className="admin-btn-icon" />
                    Add New Article
                </button>
            </div>
            
            <div className="admin-divider"></div>

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
                                <button 
                                onClick={() => {setOpenAddModal(true); setEditArticle(article)}}
                                className="admin-action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button 
                                onClick={() => {setOpenDeleteModal(true); setDeleteArtId(article.id)}}
                                className="admin-action-btn delete-btn">
                                    <FaTrash  />
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
            <div>
                <DeleteArticleModal
                    deleteOpenModal={openDeleteModal}
                    setDeleteOpenModal={setOpenDeleteModal}
                    deleteArtId={deleteArtId}
                    setDeleteArtId={setDeleteArtId}
                    deleteArticle={deleteArticle}
                />
                <AddArticleModal
                    open={openAddModal}
                    onClose={() => setOpenAddModal(false)}
                    editArticle={editArticle}
                    addArticle={addArticle}
                    updateArticle={updateArticle}
                />
            </div>
        </div>
    );
}

export default AdminArticles;