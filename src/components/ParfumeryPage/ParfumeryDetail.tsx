import { useParams, Link } from "react-router-dom";
import useParfumery from "../../hooks/useParfumery";
import IsLoading from "../IsLoading";

function ParfumeryDetail() {
  const { id } = useParams();
  const { parfumery } = useParfumery();

  if (!parfumery || parfumery.length === 0) {
    return <IsLoading />;
  }

  const brand = parfumery.find((b) => String(b.id) === String(id));

  if (!brand) {
    return <div style={{ textAlign: "center", marginTop: "3rem" }}>Бренд не найден</div>;
  }

  return (
    <div className="parfume-detail container">
      <div className="parfume-detail-breadcrumbs ">
        <Link to="/perfumery" className="parfume-detail-link">Парфюмерия</Link>
        <span> &rarr; </span>
        <span>{brand.brandName}</span>
      </div>
      <h1 className="parfume-detail-title">{brand.brandName}</h1>
      <div className="parfume-detail-content">
        <div className="parfume-detail-desc">
          <p>{brand.brandDescription}</p>
        </div>
        <div className="parfume-detail-img">
          <img src={brand.brandImage} alt={brand.brandName} />
        </div>
      </div>
    </div>
  );
}

export default ParfumeryDetail;