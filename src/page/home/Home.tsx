import Brands from "../../components/Brands"
import Main from "../../components/Main"
import Parfume from "../../components/Parfume"
import Partners from "../../components/Partners"
import ProfCosmetic from "../../components/ProfCosmetic"

function Home() {
  return (
    <div className="home">
      <Main />
      <div className="container">
         <ProfCosmetic />
         <Parfume />
      </div>
      <Partners />
      <Brands />
    </div>
  )
}

export default Home