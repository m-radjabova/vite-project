import { useNavigate } from "react-router-dom";
import useParfumery from "../../hooks/useParfumery";
import IsLoading from "../IsLoading";


function Parfumery() {
  const { parfumery } = useParfumery();
  const navigate = useNavigate();

  if (!parfumery || parfumery.length === 0) {
    return <IsLoading />;
  }

  return (
    <div className="parfumery">
      <div className="container">
        <div className="parfume-title">
          <h1>Парфюмерия</h1>
        </div>
        <div className="parfume-list">
          {parfumery.map((parfume, idx) => (
            <div className="parfume-logo" key={idx} onClick={() => navigate(`/perfumery/${parfume.id}`)} >
              <img src={parfume.brandLogo} alt={parfume.brandName} />
            </div>
          ))}
        </div>
      </div>
      <div className="parfume-footer" >
        <div className="container">
          <h1>Хотите работать  с нами?</h1>
          <p>Присоединяйтесь к успешной сети продаж оригинальных <br /> брендов</p>
        </div>
      </div>
    </div>
  );
}

export default Parfumery;