import { Route, Routes } from "react-router-dom";
import useContextPro from "./hooks/useContextPro";
import Login from "./page/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./page/admin/Admin";
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

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  if (isLoading) {
    return <IsLoading />;
  }

  return (
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
        <Route index element={<Admin />} />
        <Route path="profile" element={<Profile />} />
      </Route>

  
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
