import { Link, useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaHeart, FaGlassCheers, FaGraduationCap, FaBaby, FaHome, FaGift, FaHeartbeat, FaPray, FaCalendarAlt } from 'react-icons/fa';
import { useBouquetContext } from '../../context/BouquetProvider';
import teddy from "../../assets/teddy-bear.jpg"
import chocolate from "../../assets/chocolate-cake.jpg"
import champange from "../../assets/shampanskiy.jpg"
import { RiBearSmileLine} from 'react-icons/ri';
import { GiChocolateBar } from 'react-icons/gi';
import { FaChampagneGlasses } from 'react-icons/fa6';
import useLoading from '../../hooks/useLoading';
import IsLoading from '../IsLoading';

const PovodPage = () => {
    const { bouquet} = useBouquetContext();
    const navigate = useNavigate();
    const { loading } = useLoading(); 
    if(loading) return <IsLoading />
    const occasions = [
        { id: 1, icon: <FaBirthdayCake />, title: "Дни рождения", link: "/catalog/birthday" },
        { id: 2, icon: <FaHeart />, title: "День влюбленных", link: "/catalog/valentine" },
        { id: 3, icon: <FaGlassCheers />, title: "Свадьбы", link: "/catalog/wedding" },
        { id: 4, icon: <FaGraduationCap />, title: "Выпускные", link: "/catalog/graduation" },
        { id: 5, icon: <FaBaby />, title: "Рождение ребенка", link: "/catalog/baby" },
        { id: 6, icon: <FaHome />, title: "Новоселье", link: "/catalog/housewarming" },
        { id: 7, icon: <FaGift />, title: "Просто так", link: "/catalog/just-because" },
        { id: 8, icon: <FaHeartbeat />, title: "Выздоровление", link: "/catalog/get-well" },
        { id: 9, icon: <FaPray />, title: "Соболезнования", link: "/catalog/condolences" },
        { id: 10, icon: <FaCalendarAlt />, title: "Корпоративы", link: "/catalog/corporate" }
    ];

  const seasonBouquets = bouquet.filter(item =>
    item.category && item.category.includes("hit")
  );

  const seasonFlower3 = seasonBouquets.slice(0, 4);

  return (
    <div className="povod-page">
      {/* Hero Section */}
      <section className="povod-hero">
        <div className="hero-content">
          <h1>Цветы на любой повод</h1>
          <p>Идеальные букеты для самых важных моментов в жизни</p>
          <button onClick={() => navigate('/catalog')} className="cta-button">Выбрать букет</button>
        </div>
      </section>

      <section className="occasions-section">
        <div className="container">
          <h2>Выберите повод</h2>
          <div className="occasions-grid">
            {occasions.map((occasion) => (
              <Link to={occasion.link} key={occasion.id} className="occasion-card">
                <div className="icon-wrapper">{occasion.icon}</div>
                <h3>{occasion.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Bouquets */}
      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <h2>Популярные букеты</h2>
            <Link to="/catalog" className="view-all">Смотреть все →</Link>
          </div>
          <div className="povod-bouquets-grid">
            {seasonFlower3.map((bouquet) => (
              <div key={bouquet.id} className="povod-bouquet-card">
                <div className="image-wrapper">
                  <img src={bouquet.image} alt={bouquet.name} />
                  <button className="quick-view">Быстрый просмотр</button>
                </div>
                <h3>{bouquet.name}</h3>
                <p className="price">{bouquet.price}</p>
                <button onClick={() => navigate(`/catalog/${bouquet.id}`)} className="add-to-cart-povod">Добавить в корзину</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Categories */}
      <section className="price-categories">
        <div className="container">
          <h2>На любой бюджет</h2>
          <div className="price-cards">
            <div className="price-card budget">
              <h3>Бюджетные</h3>
              <p>до 3,000 ₽</p>
              <Link to="/catalog?price=0-3000">Смотреть</Link>
            </div>
            <div className="price-card mid-range">
              <h3>Средние</h3>
              <p>3,000 - 7,000 ₽</p>
              <Link to="/catalog?price=3000-7000">Смотреть</Link>
            </div>
            <div className="price-card premium">
              <h3>Премиум</h3>
              <p>от 7,000 ₽</p>
              <Link to="/catalog?price=7000-">Смотреть</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gift-addons">
        <div className="container">
          <h2>Дополните подарок</h2>
          <div className="addons-grid">
            <div className="addon-card" onClick={() => navigate('/gifts')}>
              <img src={teddy} alt="Мягкие игрушки" />
              <h3><RiBearSmileLine className="teddy-icon" /> Мягкие игрушки</h3>
            </div>
            <div className="addon-card" onClick={() => navigate('/gifts')}>
              <img src={chocolate} alt="Шоколад" />
              <h3> <GiChocolateBar className="chocolate-icon" /> Шоколадные наборы</h3>
            </div>
            <div className="addon-card" onClick={() => navigate('/gifts')}>
              <img src={champange} alt="Шампанское" />
              <h3> <FaChampagneGlasses className="champagne-icon" /> Шампанское</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PovodPage;