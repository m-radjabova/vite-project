import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { FiCalendar, FiSearch, FiPlus, FiBook, FiUsers, FiClock, FiMapPin, FiFileText, FiInbox, FiCheckCircle, 
  FiClock as FiPending } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { OpenClassApplication } from "../types/Types";


function OpenClassApplications() {
  const [applications, setApplications] = useState<OpenClassApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { state: { user } } = useContextPro();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/adds?teacherId=" + user?.id);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.groupName.toLowerCase().includes(searchTerm.toLowerCase())
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
              <FiCalendar className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="h4 mb-0 text-primary fw-bold">Open Class Applications</h2>
              <p className="text-muted mb-0 small">Manage your class opening requests</p>
            </div>
          </div>
          
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-transparent border-end-0">
                <FiSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate("/teacher/ochiqdars/new")} 
              className="btn btn-primary d-flex align-items-center gap-2 fw-medium px-4"
              style={{
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 98, 255, 0.2)'
              }}
            >
              <FiPlus size={18} />
              New Application
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
              <p className="mt-3 text-muted fw-medium">Loading applications...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr style={{ 
                    backgroundColor: '#f9fafb',
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <th className="ps-4 py-3 text-uppercase fw-semibold fs-7 text-muted" style={{ width: '50px' }}>#</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Theme</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FiBook className="me-1" size={14} />
                      Subject
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FiUsers className="me-1" size={14} />
                      Group
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FiClock className="me-1" size={14} />
                      Schedule
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">
                      <FiMapPin className="me-1" size={14} />
                      Location
                    </th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Status</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app, index) => (
                      <tr 
                        key={app.id} 
                        className="border-top" 
                        style={{
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/teacher/ochiqdars/${app.id}`)}
                      >
                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-3 p-2 bg-primary bg-opacity-10 rounded">
                              <FiFileText className="text-primary" size={18} />
                            </div>
                            <div>
                              <div className="fw-semibold">{app.theme}</div>
                              <small className="text-muted d-block" style={{ 
                                fontSize: '0.75rem',
                                lineHeight: '1.4'
                              }}>
                                {app.applicationText.substring(0, 40)}...
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="d-flex align-items-center gap-1">
                            {app.subjectName}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1" style={{
                            borderRadius: '6px',
                            padding: '0.35rem 0.75rem',
                            fontWeight: '500'
                          }}>
                            <FiUsers size={14} />
                            {app.groupName} ({app.groupNumber})
                          </span>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-medium d-flex align-items-center gap-1">
                              <FiCalendar size={14} />
                              {app.scheduleDate}
                            </span>
                            <div className="d-flex align-items-center gap-1">
                              <FiClock size={14} className="text-muted" />
                              <small className="text-muted">{app.scheduleTime} • {app.para} period</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="d-flex align-items-center gap-1">
                            <FiMapPin size={14} />
                            {app.address}
                          </span>
                        </td>
                        <td>
                          <span className={`badge d-flex align-items-center gap-1 ${app.completed ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}
                            style={{
                              borderRadius: '6px',
                              padding: '0.35rem 0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {app.completed ? (
                              <>
                                <FiCheckCircle size={14} />
                                Completed
                              </>
                            ) : (
                              <>
                                <FiPending size={14} />
                                Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td>
                        <small className="text-muted">
                          {new Date(app.createdAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-5">
                        <div className="py-4">
                          <FiInbox size={48} className="text-muted mb-3" />
                          <h5 className="fw-medium text-muted">No applications found</h5>
                          <p className="text-muted mb-0">
                            {searchTerm ? 
                              "No matching applications found. Try different search terms." : 
                              "Create your first open class application"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpenClassApplications;