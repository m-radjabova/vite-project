import { Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './page/Admin/Admin';
import useContextPro from './hooks/useContextPro';
import Teacher from './page/Teacher/Teacher';
import AddTeacher from './page/Admin/AddTeacher';
import ArizaOchiqDars from './page/Teacher/ArizaOchiqDars';
import ArizaOchiqDarsForm from './page/Teacher/ArizaOchiqDarsForm';
import ArizaBildirgi from './page/Teacher/ArizaBildirgi';
import ArizaBildirgiForm from './page/Teacher/ArizaBildirgiForm';

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
               <Route path="/teacher/ochiqdars" element={<ArizaOchiqDars />} />  
               <Route path="/teacher/ochiqdars/new" element={<ArizaOchiqDarsForm />} />
               <Route path="/teacher/bildirgi" element={<ArizaBildirgi />} />  
               <Route path="/teacher/bildirgi/newAnnouns" element={<ArizaBildirgiForm />} />
            </Route>
          </Routes>   
        )
      }
    </div>
  )
}

export default App