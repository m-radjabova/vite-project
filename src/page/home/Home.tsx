import { useEffect } from "react";
import Header from "../../components/Header";
import Main from "../../components/Main";
import MainServices from "../../components/MainServices";
import Oatmea from "../../components/Oatmea";
import OurProducts from "../../components/OurProducts";
import Order from './../../components/Order';
import Question from "../../components/Question";
import Footer from "../../components/Footer";
import CarouselProduct from "../../components/CarouselProduct";
import useProducts from "../../hooks/useProduct";
import AOS from "aos";
import "aos/dist/aos.css";
import useCategories from "../../hooks/useCategories";


function Home() { 
  const {categories} = useCategories();
  const {products} = useProducts();

  useEffect(() => {
        AOS.init({ duration: 2000 });
   }, []);


  return (
    <div>
      <Header />
      <div style={{backgroundColor : "#f0dde3"}}>
        <Main />
      </div>
      <CarouselProduct />
      <div className="container">
        <MainServices />
      </div>
      <div style={{backgroundColor : "#F8EDF0"}}>
        <Oatmea />
      </div>
      <div className="container">
        <OurProducts categories={categories} products={products} />
      </div>
      <div style={{backgroundColor : "#F8EDF0"}}>
        <Order/>
      </div>
      <div className="container">
        <Question />
      </div>
      <div style={{backgroundColor : "#0A0808"}}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;