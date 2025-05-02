import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { 
    FiSearch, 
    FiPlusCircle, 
    FiMessageSquare, 
    FiBook, 
    FiUsers, 
    FiCalendar, 
    FiClock, 
    FiMapPin,  
    FiInbox 
} from 'react-icons/fi';
import { PiMegaphoneLight } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";

interface Announcement {
  id: string;
  theme: string;
  subjectName: string;
  teacherName: string;
  groupNumber: string;
  groupName: string;
  scheduleDate: string;
  scheduleTime: string;
  para: string;
  address: string;
  announcementText: string;
  teacherId: string;
}

function ArizaBildirgi() {
  const [announcement, setAnnouncement] = useState<Announcement[]>([]);
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
      const response = await apiClient.get("/announcement?teacherId=" + user?.id);
      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredApplications = announcement.filter(app =>
    app.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
        <div className="card shadow-lg border-0" style={{ 
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
            <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center p-4" style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
            <div className="d-flex align-items-center">
                <PiMegaphoneLight className="text-primary me-3" size={28} />
                <h2 className="mb-0 text-primary fw-bold" style={{ letterSpacing: '-0.5px' }}>Announcements</h2>
            </div>
            <div className="d-flex flex-column flex-md-row gap-3 mt-3 mt-md-0">
                <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-transparent border-end-0">
                    <FiSearch className="text-muted" />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <button 
                onClick={() => navigate("/teacher/bildirgi/newAnnouns")} 
                className="btn btn-primary d-flex align-items-center gap-2 fw-medium"
                style={{
                    borderRadius: '8px',
                    padding: '0.5rem 1.25rem',
                    boxShadow: '0 2px 8px rgba(0, 98, 255, 0.2)'
                }}
                >
                <FiPlusCircle size={18} />
                New Announcement
                </button>
            </div>
            </div>
            
            <div className="card-body p-0">
            {loading ? (
                <div className="text-center py-5" style={{ minHeight: '300px' }}>
                <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted fw-medium">Loading announcements...</p>
                </div>
            ) : (
                <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                    <tr style={{ 
                        backgroundColor: '#f9fafb',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <th className="ps-4 text-uppercase fw-semibold fs-7 text-muted" style={{ letterSpacing: '0.5px' }}>#</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Theme</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Subject</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Group</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Date & Period</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Time</th>
                        <th className="text-uppercase fw-semibold fs-7 text-muted">Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app, index) => (
                        <tr key={app.id} style={{
                            borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
                            transition: 'background-color 0.2s ease'
                        }} className="hover-shadow">
                            <td className="ps-4 fw-bold" style={{ color: '#4b5563' }}>{index + 1}</td>
                            <td>
                            <div className="d-flex align-items-center">
                                <div className="me-2 p-2 bg-primary bg-opacity-10 rounded">
                                <FiMessageSquare className="text-primary" size={18} />
                                </div>
                                <div>
                                <div className="fw-semibold" style={{ color: '#111827' }}>{app.theme}</div>
                                <small className="text-muted d-block" style={{ 
                                    fontSize: '0.75rem',
                                    lineHeight: '1.4'
                                }}>
                                    {app.announcementText.substring(0, 40)}...
                                </small>
                                </div>
                            </div>
                            </td>
                            <td>
                            <span className="d-flex align-items-center gap-1">
                                <FiBook className="text-muted" size={14} />
                                {app.subjectName}
                            </span>
                            </td>
                            <td>
                            <span className="badge bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center gap-1" style={{
                                borderRadius: '6px',
                                padding: '0.35rem 0.65rem',
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
                                {formatDate(app.scheduleDate)}
                                </span>
                                <small className="text-muted">{app.para} period</small>
                            </div>
                            </td>
                            <td>
                            <span className="d-flex align-items-center gap-1">
                                <FiClock size={14} />
                                {app.scheduleTime}
                            </span>
                            </td>
                            <td>
                            <span className="d-flex align-items-center gap-1">
                                <FiMapPin size={14} />
                                {app.address}
                            </span>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={8} className="text-center py-5">
                            <div className="py-4">
                            <FiInbox size={48} className="text-muted mb-3" />
                            <h5 className="fw-medium text-muted">No announcements found</h5>
                            <p className="text-muted mb-0">Create your first announcement</p>
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

export default ArizaBildirgi;