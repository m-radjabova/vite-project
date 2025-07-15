import Articles from "../../components/HomePage/Articles"
import ClientsAndPartners from "../../components/HomePage/ClientsAndPartners"
import DeliveryMoscow from "../../components/HomePage/DeliveryMoscow"
import DiscoundFlower from "../../components/HomePage/DiscoundFlower"
import FlowerCenter from "../../components/HomePage/FlowerCenter"
import HitFlowers from "../../components/HomePage/HitFlowers"
import Main from "../../components/HomePage/Main"
import News from "../../components/HomePage/News"
import Reviews from "../../components/HomePage/Reviews"
import Roses from "../../components/HomePage/Roses"
import SeasonFlower from "../../components/HomePage/SeasonFlower"
import Follow from "../../components/HomePage/Follow"
import FloraMarkBase from "../../components/HomePage/FloraMarkBase"
import { useEffect, useState } from "react"
import IsLoading from "../../components/IsLoading"

function Home() {
  const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          const timer = setTimeout(() => {
              setLoading(false);
          }, 800); 
  
          return () => clearTimeout(timer);
      }, []);
  
      if (loading) {
          return <IsLoading />;
      }

  return (
    <div>
      {/* <Header /> */}
      <Main />
      <DeliveryMoscow />
      <SeasonFlower />
      <HitFlowers />
      <DiscoundFlower />
      <Roses />
      <FlowerCenter />
      <Reviews />
      <ClientsAndPartners />
      <Articles />
      <News />
      <Follow />
      <FloraMarkBase />
      {/* <Footer /> */}
    </div>
  )
}

export default Home