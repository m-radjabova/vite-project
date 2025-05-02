import { useState, useEffect } from "react";
import { 
  FiPlusCircle, 
  FiTrash2, 
  FiSearch,  
  FiMail,
  FiHome,
  FiUsers,
  FiChevronRight
} from "react-icons/fi";
// import { FaUser } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import AddTeacherForm from "./AddTeacherForm";
import apiClient from "../../apiClient/ApiClient";
import { User } from "../../App";
import { toast } from "react-toastify";

interface Teacher {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

function AddTeacher() {
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<User[]>("/users?roles=TEACHER");
      const teacherData = response.data.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }));
      setTeachers(teacherData);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/users/${id}`);
      fetchTeachers();
      toast.success("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Failed to delete teacher");
    }
  };

  const addNewTeacher = async (newTeacher: User) => {
    try {
      await apiClient.post("/users", newTeacher);
      fetchTeachers();
      toast.success("Teacher added successfully");
    } catch (error) {
      console.error("Error adding teacher:", error);
      toast.error("Failed to add teacher");
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'ADMIN':
        return (
          <span className="badge bg-danger bg-opacity-10 text-danger d-flex align-items-center gap-1">
            <RiAdminFill size={12} />
            Admin
          </span>
        );
      case 'TEACHER':
        return (
          <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
            <FaChalkboardTeacher size={12} />
            Teacher
          </span>
        );
      default:
        return (
          <span className="badge bg-secondary bg-opacity-10 text-secondary">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <div className="d-flex align-items-center mb-2">
            <div className="p-3 bg-primary bg-opacity-10 rounded me-3">
              <FaChalkboardTeacher className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="h3 fw-bold mb-0">Teacher Management</h1>
              <nav aria-label="breadcrumb" className="d-none d-md-block">
                <ol className="breadcrumb mt-2">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-decoration-none d-flex align-items-center">
                      <FiHome size={14} className="me-1" />
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active d-flex align-items-center">
                    <FiChevronRight size={16} className="me-1" />
                    Teachers
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <button
          onClick={handleOpen}
          className="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-4 py-2"
          style={{ borderRadius: '8px' }}
        >
          <FiPlusCircle size={18} />
          Add Teacher
        </button>
      </div>

      {/* Search Card */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3 p-md-4">
          <div className="input-group" style={{ maxWidth: '500px' }}>
            <span className="input-group-text bg-white border-end-0 pe-1">
              <FiSearch className="text-muted" size={18} />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-1"
              placeholder="Search teachers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ height: '46px' }}
            />
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5" style={{ minHeight: '300px' }}>
              <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted fw-medium">Loading teachers...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 text-uppercase fw-semibold fs-7 text-muted">Teacher</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Contact</th>
                    <th className="py-3 text-uppercase fw-semibold fs-7 text-muted">Roles</th>
                    <th className="pe-4 py-3 text-uppercase fw-semibold fs-7 text-muted text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="border-top">
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="avatar-sm flex-shrink-0">
                              <div className="avatar-title bg-primary bg-opacity-10 text-primary rounded-circle fw-bold fs-5">
                                {teacher.username.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-semibold">{teacher.username}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <FiMail className="text-muted flex-shrink-0" size={16} />
                            <a href={`mailto:${teacher.email}`} className="text-reset text-decoration-none">
                              {teacher.email}
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {teacher.roles?.map(role => (
                              <div key={role}>
                                {getRoleBadge(role)}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="pe-4 text-end">
                          <button 
                            onClick={() => handleDelete(teacher.id)}
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-3"
                          >
                            <FiTrash2 size={16} />
                            <span className="d-none d-md-inline">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-5">
                        <div className="py-4">
                          {searchTerm ? (
                            <>
                              <FiSearch size={48} className="text-muted mb-3" />
                              <h5 className="fw-medium">No teachers found</h5>
                              <p className="text-muted mb-0">Try adjusting your search query</p>
                            </>
                          ) : (
                            <>
                              <FiUsers size={48} className="text-muted mb-3" />
                              <h5 className="fw-medium">No teachers available</h5>
                              <p className="text-muted mb-0">Add your first teacher to get started</p>
                            </>
                          )}
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

      <AddTeacherForm 
        open={open}
        onClose={handleClose}
        addNewTeacher={addNewTeacher}
      />
    </div>
  );
}

export default AddTeacher;