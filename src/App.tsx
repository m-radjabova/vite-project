import { Route, Routes } from "react-router-dom"
import Home from "./page/home/Home"
import Login from "./page/login/Login"
import Admin from "./page/admin/Admin"
import AdminServices from "./page/admin/AdminServices"

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}>
          <Route path="services" element={<AdminServices />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App