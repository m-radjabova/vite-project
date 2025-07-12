import ClientsAndPartners from "../../components/ClientsAndPartners"
import DeliveryMoscow from "../../components/DeliveryMoscow"
import DiscoundFlower from "../../components/DiscoundFlower"
import FlowerCenter from "../../components/FlowerCenter"
import Header from "../../components/Header"
import HitFlowers from "../../components/HitFlowers"
import Main from "../../components/Main"
import Reviews from "../../components/Reviews"
import Roses from "../../components/Roses"
import SeasonFlower from "../../components/SeasonFlower"

function Home() {
  return (
    <div>
      <Header />
      <Main />
      <DeliveryMoscow />
      <SeasonFlower />
      <HitFlowers />
      <DiscoundFlower />
      <Roses />
      <FlowerCenter />
      <Reviews />
      <ClientsAndPartners />
    </div>
  )
}

export default Home