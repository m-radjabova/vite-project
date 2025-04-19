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

function Home() {

    const [servises, setServises] = useState<Service[]>([])
    const [blog, setBlog] = useState<Blog[]>([])

    useEffect(() => {
        getServises()
        getBlog()
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

  return (
    <div>
        <Header/>
        <Main/>
        <div className="container">
            <SectionGreatAgency/>
            <Servisec servisec={servises}/>
            <SectionOurSales/>

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