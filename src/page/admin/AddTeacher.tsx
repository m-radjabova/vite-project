import { useState, useEffect } from "react";
import { FiPlusCircle, FiTrash2, FiSearch } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import AddTeacherForm from "./AddTeacherForm";
import apiClient from "../../apiClient/ApiClient";
import { User } from "../../App";
import { toast } from "react-toastify";

interface Teacher {
  id: string;
  username: string;
  email: string;
}

function AddTeacher() {
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        email: user.email
      }));
      setTeachers(teacherData);
    } catch (error) {
      console.error("Error fetching teachers:", error);
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
    }
  };

  const addNewTeacher = async (newTeacher: User) => {
    try {
      await apiClient.post("/users", newTeacher);
      fetchTeachers();
      toast.success("Teacher added successfully");
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-primary mb-2">
            <FaChalkboardTeacher className="me-2" size={28} />
            Teacher Management
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
              <li className="breadcrumb-item active" aria-current="page">Teachers</li>
            </ol>
          </nav>
        </div>
        <button
          onClick={handleOpen}
          className="btn btn-primary d-flex align-items-center shadow-sm"
        >
          <FiPlusCircle className="me-2" size={18} />
          Add Teacher
        </button>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-transparent">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search teachers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Name</th>
                    <th>Email</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="ps-4 fw-medium align-middle">
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm me-3">
                              <td>
                                <div className="avatar-title bg-primary bg-opacity-10 text-primary rounded-circle">
                                    {teacher.username.charAt(0).toUpperCase()}
                                </div>
                              </td>
                            </div>
                            <div>
                              <h6 className="mb-0">{teacher.username}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <a href={`mailto:${teacher.email}`} className="text-reset">
                            {teacher.email}
                          </a>
                        </td>
                        <td className="text-end pe-4 align-middle">
                          <button 
                            onClick={() => handleDelete(teacher.id)}
                          className="btn btn-sm btn-outline-danger">
                            <FiTrash2 className="me-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        {searchTerm ? (
                          <div>
                            <FiSearch size={48} className="text-muted mb-3" />
                            <h5>No teachers found</h5>
                            <p className="text-muted">
                              No teachers match your search criteria
                            </p>
                          </div>
                        ) : (
                          <div>
                            <FaChalkboardTeacher size={48} className="text-muted mb-3" />
                            <h5>No teachers available</h5>
                            <p className="text-muted">
                              Click "Add Teacher" to create your first teacher profile
                            </p>
                          </div>
                        )}
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