import { Route, Routes } from "react-router-dom";
import useContextPro from "./hooks/useContextPro";
import Login from "./page/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./page/admin/Admin";
import Home from "./page/home/Home";
import SingUp from "./page/login/SingUp";
import AdminProduct from "./page/admin/AdminProduct";
import Profile from "./page/admin/Profile";
import AdminCategories from "./page/admin/AdminCategories";
import AdminClients from "./page/admin/AdminClients";
import PageNotFound from "./components/PageNotFound";
import IsLoading from "./components/IsLoading";
import AdminProductForm from "./page/admin/AdminProductForm";

export interface User {
  id: string;
  username: string;
  email: string;
  roles: ("ADMIN" | "USER")[];
  password: string;
  phoneNumber: string;
  avatar: string;
}

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  if (isLoading) {
    return <IsLoading/>;
  }

  return (
    <div>
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
          <Route path="product" element={<AdminProduct />} />
          <Route path="product/add" element={<AdminProductForm />} />
          <Route path="/admin/product/add/:id" element={<AdminProductForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App