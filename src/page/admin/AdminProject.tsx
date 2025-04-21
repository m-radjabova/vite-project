import { useEffect, useState } from "react"
import { Category, Project } from "../home/Home"
import apiClient from "../../apiClient/ApiClient"
import AdminProjectForm from "./AdminProjectForm"

function AdminProject() {
  const [project, setProject] = useState<Project[]>([])
  const [category, setCategory] = useState<Category[]>([])
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    getProject()
    getCategory()
  }, [])

  const handleClose = () => {
    setSelectedProject(null);
    setOpen(false);
  };

  const getProject = async () => {
    apiClient.get(`/projects`).then(res => {
      setProject(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const getCategory = async () => {
    apiClient.get(`/category`).then(res => {
      setCategory(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const deleteProject = async (id: number | undefined) => {
    apiClient.delete(`/projects/${id}`).then(res => {
      console.log(res.data)
      getProject()
    }).catch(err => {
      console.log(err)
    })
  }

  const addProject = async (data: Omit<Project, "id">) => {
    apiClient.post(`/projects`, data).then(res => {
      console.log(res.data)
      getProject()
    }).catch(err => {
      console.log(err)
    })
  }

  const updateProject = async (data: Project) => {
    apiClient.put(`/projects/${data.id}`, data).then(res => {
      console.log(res.data)
      getProject()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="adminProject">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="text-center text-primary fw-bold">Project Management</h1>
          <button 
            className="btn btn-primary mb-4 px-4 py-2 fw-bold" 
            onClick={() => {
              setSelectedProject(null);
              setOpen(true);
            }}
            style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)'
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>Add Project
          </button>
        </div>

        <div className="row g-4">
          {project.map((item) => (
            <div className="col-md-4 col-lg-3" key={item.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden hover-shadow-lg transition-all">
                <div className="card-img-top overflow-hidden" style={{height: '180px'}}>
                  <img 
                    src={item.imgUrl} 
                    alt="#" 
                    className="w-100 h-100 object-fit-cover transition-transform"
                    style={{transform: 'scale(1)'}}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-1">Category:</p>
                  <h5 className="card-title text-dark">
                    {category.find(cat => cat.id === item.categoryId)?.name || "Unknown"}
                  </h5>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <button 
                    className="btn btn-outline-danger px-3 py-1"
                    onClick={() => deleteProject(item.id)}
                  >
                    <i className="bi bi-trash me-1"></i>Delete
                  </button>
                  <button 
                    className="btn btn-outline-warning px-3 py-1"
                    onClick={() => {
                      setSelectedProject(item);
                      setOpen(true);
                    }}
                  >
                    <i className="bi bi-pencil-square me-1"></i>Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdminProjectForm 
        open={open} 
        onClose={handleClose} 
        selectedProject={selectedProject}
        category={category}
        addProject={addProject}
        updateProject={updateProject}
      />
    </div>
  )
} 

export default AdminProject