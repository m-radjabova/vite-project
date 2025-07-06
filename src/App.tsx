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
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Parfumery from "./components/ParfumeryPage/Parfumery";
import ParfumeryDetail from "./components/ParfumeryPage/ParfumeryDetail";
import ContactPage from "./components/ContactPage";

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div>
      <Header /> 
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SingUp />} />
          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={!!user && user.roles.includes("ADMIN")}>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
          </Route>
    
          <Route path="/professional" element={<h1>Профессиональная косметика</h1>} />
          <Route path="/perfumery" element={<Parfumery />} />
          <Route path="/perfumery/:id" element={<ParfumeryDetail />} />
          <Route path="/about" element={<h1>О компании</h1>} />
          <Route path="/partners" element={<h1>Партнеры</h1>} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;