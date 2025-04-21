import { useState, useEffect } from "react";
import apiClient from "../../apiClient/ApiClient";
import { Blog } from "../home/Home";
import { FiFileText, FiPlusCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
import AdminBlogForm from "./AdminBlogForm";

function AdminBlog() {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    getBlog();
  }, []);


  const handleClose = () => {
    setSelectedBlog(null);
    setOpen(false);
  };

  const getBlog = async () => {
    try {
      const res = await apiClient.get(`/blog`);
      setBlog(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id: number | undefined) => {
    try {
      await apiClient.delete(`/blog/${id}`);
      getBlog();
    } catch (err) {
      console.log(err);
    }
  };

  const addBlog = async (data: Omit<Blog, "id">) => {
    try {
      await apiClient.post(`/blog`, data);
      getBlog();
    } catch (err) {
      console.log(err);
    }
  };

  const updateBlog = async (data: Blog) => {
    try {
      await apiClient.put(`/blog/${data.id}`, data);
      getBlog();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-primary">
            <FiFileText className="me-2" size={24} />
            Blog Management
          </h1>
          <p className="text-muted">Manage your blog posts and content</p>
        </div>
        <button 
          onClick={() => {
              setOpen(true);
              setSelectedBlog(null);
            }}
          className="btn btn-primary d-flex align-items-center"
        >
          <FiPlusCircle className="me-2" size={18} />
          Add New Blog
        </button>
      </div>

      <AdminBlogForm
        open={open}
        onClose={handleClose}
        selectedBlog={selectedBlog}
        addBlog={addBlog}
        updateBlog={updateBlog}
      />

      <div className="card shadow-sm">
        <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Title</th>
                    <th className="pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blog.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4 fw-semibold">{item.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {item.imgUrl && (
                            <img 
                              src={item.imgUrl} 
                              alt={item.title} 
                              className="rounded me-3"
                              style={{width: '60px', height: '40px', objectFit: 'cover'}}
                            />
                          )}
                          <span className="fw-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="pe-4 d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2 d-flex align-items-center"
                          onClick={() => {
                            setSelectedBlog(item);
                            setOpen(true);
                          }}
                        >
                          <FiEdit2 className="me-1" size={14} />
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center"
                          onClick={() => deleteBlog(item.id)}
                        >
                          <FiTrash2 className="me-1" size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlog;