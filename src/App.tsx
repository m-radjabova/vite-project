import { Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './page/Admin/Admin';
import useContextPro from './hooks/useContextPro';
import Teacher from './page/Teacher/Teacher';
import AddTeacher from './page/Admin/AddTeacher';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

function App() {
  const {
    state: { user, isLoading },
  } = useContextPro();

  return (
    <div>
      {
        !isLoading && (
          <Routes>
            <Route index element={<Login />} />
            {/* ADMIN */}
            <Route
                path="/admin"
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("ADMIN")}
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              >    
              <Route path="add-teacher" element={<AddTeacher />} />
            </Route>
            {/* TEACHER */}
            <Route
                path="/teacher"
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("TEACHER")}
                  >
                    <Teacher />
                  </ProtectedRoute>
                }
              >    
            </Route>
          </Routes>   
        )
      }
    </div>
  )
}

export default App