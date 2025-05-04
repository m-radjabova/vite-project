import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import useContextPro from "../../hooks/useContextPro";
import { toast } from "react-toastify";
import ArticleViewModal from "./ArticleViewModal";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaEye, FaFileAlt, FaInbox, FaLink, FaPlus, FaSearch } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { Article } from "../types/Types";

function ArticleList() {
  const { state: { user } } = useContextPro();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/articles?teacherId=${user?.id}`);
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleFileView = (fileUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(fileUrl, '_blank');
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 overflow-hidden" style={{ 
        borderRadius: '16px',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>

        {/* Card Header */}
        <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center p-4" style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
              <FaFileAlt className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="h4 mb-0 text-primary fw-bold">Articles</h2>
              <p className="text-muted mb-0 small">Manage your educational articles</p>
            </div>
          </div>
          
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-transparent border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate('/teacher/article/newArticle')} 
              className="btn btn-primary d-flex align-items-center gap-2 fw-medium px-4"
              style={{
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 98, 255, 0.2)'
              }}
            >
              <FaPlus size={18} />
              Add Article
            </button>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5" style={{ minHeight: '300px' }}>
              <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted fw-medium">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-5">
              <div className="py-4">
                <FaInbox size={48} className="text-muted mb-3" />
                <h5 className="fw-medium text-muted">
                  {searchTerm ? "No matching articles found" : "No articles found"}
                </h5>
                <p className="text-muted mb-0">
                  {searchTerm ? 
                    "Try different search terms" : 
                    "Click the 'Add Article' button to create your first article"}
                </p>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr style={{ 
                    backgroundColor: '#f9fafb',
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <th className="ps-4 py-3 text-uppercase fw-semibold fs-7 text-muted">#</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Title</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FaCalendar className="me-1" size={14} />
                      Date
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FaLink className="me-1" size={14} />
                      Link
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FaFileAlt className="me-1" size={14} />
                      File
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article, index) => (
                    <tr 
                      key={article.id} 
                      className="border-top" 
                      style={{
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleView(article)}
                    >
                      <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-3 p-2 bg-primary bg-opacity-10 rounded">
                            <FiFileText className="text-primary" size={18} />
                          </div>
                          <div>
                            <div className="fw-semibold">{article.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(article.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </small>
                      </td>
                      <td>
                        {article.link ? (
                          <a 
                            href={article.link}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1"
                            style={{
                              borderRadius: '6px',
                              padding: '0.35rem 0.75rem',
                              fontWeight: '500',
                              textDecoration: 'none'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaLink size={14} />
                            {article.link}
                          </a>
                        ) : (
                          <span className="badge bg-light text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {article.file ? (
                          <button 
                            className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1 border-0"
                            style={{
                              borderRadius: '6px',
                              padding: '0.35rem 0.75rem',
                              fontWeight: '500'
                            }}
                            onClick={(e) => handleFileView(article.file, e)}
                          >
                            <FaFileAlt size={14} />
                            View file
                          </button>
                        ) : (
                          <span className="badge bg-light text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(article);
                          }}
                        >
                          <FaEye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ArticleViewModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        selectedArticle={selectedArticle} 
      />
    </div>
  );
}

export default ArticleList;