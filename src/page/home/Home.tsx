import DeliveryMoscow from "../../components/DeliveryMoscow"
import DiscoundFlower from "../../components/DiscoundFlower"
import Header from "../../components/Header"
import HitFlowers from "../../components/HitFlowers"
import Main from "../../components/Main"
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
    </div>
  )
}

export default Home