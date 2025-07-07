import { Route, Routes, Outlet } from "react-router-dom";
import useContextPro from "./hooks/useContextPro";
import Login from "./page/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./page/admin/Admin";
import Home from "./page/home/Home";
import SingUp from "./page/login/SingUp";
import IsLoading from "./components/IsLoading";
import PageNotFound from "./components/PageNotFound";
import Profile from "./page/admin/Profile/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Parfumery from "./components/ParfumeryPage/Parfumery";
import ParfumeryDetail from "./components/ParfumeryPage/ParfumeryDetail";
import ContactPage from "./components/ContactPage";
import OrderACall from "./components/OrderACall";
import CompletedPage from "./components/CompletedPage";
import PartnersPage from "./components/PartnersPage";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function EmptyLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <Routes>
  
      <Route element={<EmptyLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/order-a-call" element={<OrderACall />} />
        <Route path="/order-a-call/completed" element={<CompletedPage />} />
        <Route path="/admin" element={
          <ProtectedRoute isAllowed={!!user && user.roles.includes("ADMIN")}>
            <Admin />
          </ProtectedRoute>
        }>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/professional" element={<h1>Профессиональная косметика</h1>} />
        <Route path="/perfumery" element={<Parfumery />} />
        <Route path="/perfumery/:id" element={<ParfumeryDetail />} />
        <Route path="/about" element={<h1>О компании</h1>} />
        <Route path="/partners" element={<PartnersPage/>} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;