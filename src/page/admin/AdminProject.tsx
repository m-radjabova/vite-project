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
      <div className="container">
        <h1 className="text-center">Admin Project</h1>
        <button className="btn btn-primary mb-4" onClick={() => {
          setSelectedProject(null);
          setOpen(true);
        }}>Add Project</button>

          <div className="row">
            {project.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="card mb-4 shadow-sm">
                  <img src={item.imgUrl} alt="#" className="card-img-top" />
                  <div className="card-body">
                    <p className="card-text">Category: {category.find(cat => cat.id === item.categoryId)?.name || "Unknown"}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-danger" onClick={() => deleteProject(item.id)}>Delete</button>
                    <button className="btn btn-warning ms-2" onClick={() => {
                      setSelectedProject(item);
                      setOpen(true);
                    }}>Edit</button>
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