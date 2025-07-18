import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import useNews from "../../../hooks/useNews";
import { NewsType } from "../../types/Types";
import { useState } from "react";
import DeleteNewsModal from "./DeleteNewsModal";
import AddNewsModal from "./AddNewsModal";

function AdminNews() {
    const { news, deleteNews, addNews, updateNews } = useNews();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteNewsId, setDeleteNewsId] = useState<string | null>(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editNews, setEditNews] = useState<NewsType | null>(null);

    return (
        <div className="admin-news-container">
            <div className="admin-bouquets-header">
                <h1 className="admin-bouquets-title">News</h1>
                <button 
                    onClick={() => {setOpenAddModal(true); setEditNews(null)}}
                    className="add-bouquet-btn"
                >
                    <FaPlus className="admin-btn-icon" />
                    Add New News
                </button>
            </div>
            
            <div className="admin-divider"></div>

            <div className="admin-news-list">
                {news.map(item => (
                    <div className="admin-news-card" key={item.id}>
                        <div className="admin-card-header">
                            <div className="admin-news-meta">
                                <span className="admin-news-date">
                                    <FaCalendarAlt />
                                    {item.date}
                                </span>
                            </div>
                            <h3 className="admin-news-title">{item.title}</h3>
                        </div>
                        <div className="admin-card-body">
                            <p className="admin-news-text">{item.text}</p>
                        </div>
                        <div className="admin-card-footer">
                            <button 
                                onClick={() => {setOpenAddModal(true); setEditNews(item)}}
                                className="admin-action-btn admin-edit-btn"
                            >
                                <FaEdit size={24} />
                            </button>
                            <button 
                                onClick={() => {setOpenDeleteModal(true); setDeleteNewsId(item.id)}}
                                className="admin-action-btn admin-delete-btn"
                            >
                                <FaTrash size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <AddNewsModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                editNews={editNews}
                addNews={addNews}
                updateNews={updateNews}
            />
            <DeleteNewsModal
                deleteOpenModal={openDeleteModal}
                setDeleteOpenModal={setOpenDeleteModal}
                deleteNewsId={deleteNewsId}
                setDeleteNewsId={setDeleteNewsId}
                deleteNews={deleteNews}
            />
        </div>
    );
}

export default AdminNews;