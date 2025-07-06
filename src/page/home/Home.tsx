import Brands from "../../components/HomePage/Brands"
import Main from "../../components/HomePage/Main"
import Parfume from "../../components/HomePage/Parfume"
import Partners from "../../components/HomePage/Partners"
import ProfCosmetic from "../../components/HomePage/ProfCosmetic"

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