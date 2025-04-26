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
    <div className="adminProject" style={{backgroundColor: '#f8f9fa'}}>
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className="mb-3 mb-md-0">
            <h1 className="text-primary fw-bold mb-2">
              Project Management
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">Projects</li>
              </ol>
            </nav>
          </div>
          
          <button 
            className="btn btn-primary px-4 py-2 fw-bold d-flex align-items-center"
            onClick={() => {
              setSelectedProject(null);
              setOpen(true);
            }}
            style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Add New Project
          </button>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {project.map((item) => (
              <div className="col" key={item.id}>
                <div className="card h-100 border-0 shadow-sm overflow-hidden transition-all hover-shadow-lg">
                  <div className="position-relative" style={{height: '180px', overflow: 'hidden'}}>
                    <img 
                      src={item.imgUrl} 
                      className="w-100 h-100 object-fit-cover transition-transform"
                      style={{transform: 'scale(1)'}}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                      Active
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-1">
                          {category.find(cat => cat.id === item.categoryId)?.name || "Uncategorized"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex justify-content-between pt-0">
                    <button 
                      className="btn btn-sm btn-outline-primary flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                      onClick={() => {
                        setSelectedProject(item);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger flex-grow-1 d-flex align-items-center justify-content-center"
                      onClick={() => deleteProject(item.id)}
                    >
                      Delete
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