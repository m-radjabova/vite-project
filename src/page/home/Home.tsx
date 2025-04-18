import { useEffect, useState } from "react"
import Header from "../../component/Header"
import Main from "../../component/Main"
import SectionGreatAgency from "../../component/SectionGreatAgency"
import Servisec from "../../component/Services"
import axios from "axios"
import SectionOurSales from "../../component/SectionOurSales"
import SectionSubscribe from "../../component/SectionSubscribe"

export interface Service {
    id?: number
    name: string
    description: string
    imgUrl: string
}

function Home() {

    const [servises, setServises] = useState<Service[]>([])

    useEffect(() => {
        getServises()
    }, [])

    const getServises = async () => {
        axios.get(`http://localhost:3000/services`).then(res => {
            setServises(res.data)
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
        </div>
        <SectionSubscribe/>
    </div>
  )
}

export default Home