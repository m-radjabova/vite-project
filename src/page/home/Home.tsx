import Header from "../../components/Header";
import Main from "../../components/Main";
import MainServices from "../../components/MainServices";
import Oatmea from "../../components/Oatmea";

function Home() {

  return (
    <div>
      <Header />
      <div style={{backgroundColor : "#f0dde3"}}>
        <Main />
      </div>
      <div className="container">
        <MainServices />
      </div>
      <div style={{backgroundColor : "#F8EDF0"}}>
        <Oatmea />
      </div>
    </div>
  );
}

export default Home;