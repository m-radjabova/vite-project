import { useEffect, useState } from "react"
import Header from "../../component/Header"
import Main from "../../component/Main"
import SectionGreatAgency from "../../component/SectionGreatAgency"
import Servisec from "../../component/Services"
import SectionOurSales from "../../component/SectionOurSales"
import SectionSubscribe from "../../component/SectionSubscribe"
import SectionHappyClients from "../../component/SectionHappyClients"
import SectionBlog from "../../component/SectionBlog"
import apiClient from "../../apiClient/ApiClient"
import Footer from "../../component/Footer"
import SectionProject from "../../component/SectionProject"

export interface Service {
    id: number
    name: string
    description: string
    imgUrl: string
}

export interface Blog {
    id: number
    title: string
    imgUrl: string
}

export interface Category {
    id: number
    name: string
}

export interface Project {
    id: number
    imgUrl: string
    categoryId: number
}

function Home() {

    const [servises, setServises] = useState<Service[]>([])
    const [blog, setBlog] = useState<Blog[]>([])
    const [category, setCategory] = useState<Category[]>([])
    const [project, setProject] = useState<Project[]>([])

    useEffect(() => {
        getServises()
        getBlog()
        getCategory()
        getProject()
    }, [])

    const getServises = async () => {
        apiClient.get(`/services`).then(res => {
            setServises(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getBlog = async () => {
        apiClient.get(`/blog`).then(res => {
            setBlog(res.data)
        }) . catch(err => {
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
    
    const getProject = async () => {
        apiClient.get(`/projects`).then(res => {
            setProject(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    

  return (
    <div>
        <Header/>
        <Main/>
        <div className="container">
            <SectionGreatAgency/>
            <Servisec servisec={servises}/>
            <SectionOurSales/>
            <SectionProject project={project} category={category}/>
        </div>
        <SectionHappyClients/>
        <div className="container">
            <SectionBlog blog={blog}/>
        </div>
        <SectionSubscribe/>
        <Footer/>
    </div>
  )
}

export default Home