import { useEffect, useState } from "react";
import Header from "../../component/Header";
import Main from "../../component/Main";
import SectionGreatAgency from "../../component/SectionGreatAgency";
import Services from "../../component/Services";
import SectionOurSales from "../../component/SectionOurSales";
import SectionSubscribe from "../../component/SectionSubscribe";
import SectionHappyClients from "../../component/SectionHappyClients";
import SectionBlog from "../../component/SectionBlog";
import apiClient from "../../apiClient/ApiClient";
import Footer from "../../component/Footer";
import SectionProject from "../../component/SectionProject";
import AgencyPhotos from "../../component/AgencyPhotos";
import AOS from "aos";
import "aos/dist/aos.css";


export interface Service {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
}

export interface Blog {
  id: number;
  title: string;
  imgUrl: string;
  date?: string;
  author?: string;
  excerpt?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  imgUrl: string;
  categoryId: number;
}

export interface AgencyPhotosImg {
  id: string;
  imgUrl: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [project, setProject] = useState<Project[]>([]);
  const [agencyPhotos, setAgencyPhotos] = useState<AgencyPhotosImg[]>([]);
  const [translations, setTranslations] = useState<Translations>({});
  const [currentLanguage, setCurrentLanguage] = useState('en');
  useEffect(() => {
    getServises()
    getBlog()
    getCategory()
    getProject()
    getAgencyPhotos()
    getTranslations()
  }, [])

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const getServises = async () => {
        apiClient.get(`/services`).then(res => {
            setServices(res.data)
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

    const getAgencyPhotos = async () => {
        apiClient.get(`/agency`).then(res => {
            setAgencyPhotos(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getTranslations = async () =>{
        apiClient.get(`/translations`).then(res =>{
            setTranslations(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }

  return (
    <div>
      <Header translations={translations} currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <Main translations={translations} currentLanguage={currentLanguage} />
      <AgencyPhotos agencyPhotos={agencyPhotos} translations={translations} currentLanguage={currentLanguage} />
      <div className="container">
        <SectionGreatAgency translations={translations} currentLanguage={currentLanguage} />
        <Services services={services} translations={translations} currentLanguage={currentLanguage} />
        <SectionOurSales translations={translations} currentLanguage={currentLanguage} />
        <SectionProject project={project} category={category} translations={translations} currentLanguage={currentLanguage} />
      </div>
      <SectionHappyClients translations={translations} currentLanguage={currentLanguage} />
      <div className="container">
        <SectionBlog blog={blog} translations={translations} currentLanguage={currentLanguage} />
      </div>
      <SectionSubscribe translations={translations} currentLanguage={currentLanguage} />
      <Footer translations={translations} currentLanguage={currentLanguage} />
    </div>
  );
}

export default Home;