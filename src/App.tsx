import { Route, Routes } from "react-router-dom";
import useContextPro from "./hooks/useContextPro";
import Login from "./page/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./page/admin/Admin";
import Home from "./page/home/Home";
import SingUp from "./page/login/SingUp";
import IsLoading from "./components/IsLoading";
import PageNotFound from "./components/PageNotFound";
import Profile from "./page/admin/Profile";

export interface User {
  id: string;
  username: string;
  email: string;
  roles: ("ADMIN" | "USER")[];
  password: string;
  phoneNumber: string;
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
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App