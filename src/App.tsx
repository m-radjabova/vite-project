import { Route, Routes } from "react-router-dom";
import useContextPro from "./hooks/useContextPro";
import Login from "./page/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./page/home/Home";
import SingUp from "./page/login/SingUp";
import IsLoading from "./components/IsLoading";
import PageNotFound from "./components/PageNotFound";
import Profile from "./page/admin/Profile/Profile";
import Catalog from "./components/Catalog";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import AdminLayout from "./Layout/AdminLayout";
import BouquetDisplay from "./components/BouquetDisplay";
import AboutCompany from "./components/AboutPage/AboutCompany";
import PaymentPage from "./components/PaymentPage";
import DeliveryPage from "./components/DeliveryPage";
import ReviewsPage from "./components/ReviewsPage";
import DiscountPage from "./components/DiscountPage";
import VideoPage from "./components/VideoPage";
import ContactPage from "./components/ContactPage";
import BouquetsPage from "./components/MainHeaderPage/BouquetsPage";
import RosesPage from "./components/MainHeaderPage/RosesPage";
import FlowersPage from "./components/MainHeaderPage/FlowersPage";
import PlantsPage from "./components/MainHeaderPage/PlantsPage";
import SalesPage from "./components/MainHeaderPage/SalesPage";
import GiftsPage from "./components/MainHeaderPage/GiftsPage";
import FavoritesPage from "./components/FavoritesPage";
import CartPage from "./components/CartPage";
import ArticlePage from "./components/ArticlePage";
import NewsPage from "./components/NewsPage";
import AdminArticles from "./page/admin/Articles/AdminArticles";
import AdminNews from "./page/admin/News/AdminNews";
import AdminReviews from "./page/admin/Reviews/AdminReviews";
import AdminPoints from "./page/admin/DeliveryPoints/AdminPoints";
import { BouquetProvider } from './context/BouquetProvider';
import AdminSeason from "./page/admin/Bouquets/Pages/AdminSeason";
import AdminBestSeller from "./page/admin/Bouquets/Pages/AdminBestSeller";
import AdminDiscount from "./page/admin/Bouquets/Pages/AdminDiscount";
import AdminRoses from "./page/admin/Bouquets/Pages/AdminRoses";
import AdminBouquets from './page/admin/Bouquets/Pages/AdminBouquets';
import AdminCategories from "./page/admin/Categories/AdminCategories";
import AdminBouquetsPage from "./page/admin/Bouquets/AdminBouquetsPage";
import AdminFlowers from './page/admin/Bouquets/Pages/AdminFlowers';
import AdminPlants from "./page/admin/Bouquets/Pages/AdminPlants";
import AdminGifts from "./page/admin/Bouquets/Pages/AdminGifts";
import AddNewBouquets from "./page/admin/Bouquets/AddNewBouquets";

export interface User{
  id: number;
  username: string;
  email: string;
  password: string;
  roles: string[];
  favorites: string[];
  cart: string[];
}

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <BouquetProvider>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<BouquetDisplay />} />
        <Route path="/about" element={<AboutCompany />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/bouquets" element={<BouquetsPage />} />
        <Route path="/bouquets/:id" element={<BouquetDisplay />} />
        <Route path="/roses" element={<RosesPage />} />
        <Route path="/roses/:id" element={<BouquetDisplay />} />
        <Route path="/flowers" element={<FlowersPage />} />
        <Route path="/flowers/:id" element={<BouquetDisplay />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/plants/:id" element={<BouquetDisplay />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/sales/:id" element={<BouquetDisplay />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/gifts/:id" element={<BouquetDisplay />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SingUp />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={!!user && user.roles.includes("ADMIN")}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="flowers/all" element={<AdminBouquetsPage />} />
        <Route path="flowers/all/new" element={<AddNewBouquets />} />
        <Route path="flowers/all/new/:id" element={<AddNewBouquets />} />
        <Route path="flowers/season" element={<AdminSeason />} />
        <Route path="flowers/hit" element={<AdminBestSeller />} />
        <Route path="flowers/discount" element={<AdminDiscount />} />
        <Route path="flowers/roses" element={<AdminRoses />} />  
        <Route path="flowers/bouquets" element={<AdminBouquets />} />
        <Route path="flowers/flower" element={<AdminFlowers />} />
        <Route path="flowers/plants" element={<AdminPlants />} />
        <Route path="flowers/gifts" element={<AdminGifts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="articles" element={<AdminArticles />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="delivery" element={<AdminPoints />} />
        <Route path="profile" element={<Profile />} />
      </Route>

  
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BouquetProvider>
  );
}

export default App;
