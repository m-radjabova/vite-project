import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./page/home/Home"
import Login from "./page/login/Login"
import Admin from "./page/admin/Admin"
import AdminServices from "./page/admin/AdminServices"
import SingUp from "./page/login/SingUp"
import { useEffect, useState } from "react"
import apiClient from "./apiClient/ApiClient"
import AdminBlog from "./page/admin/AdminBlog"

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

function App() {

  const [user, setUser] = useState<User | null>()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("token")

    apiClient.get(`/users/${token}`).then((res) => {
      setUser(res.data)
    })
  }, [location.pathname])


  return (
    <div>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SingUp/>}/>
        <Route path="/admin" element={
            user === undefined 
              ? <div>Loading...</div> 
              : user?.role === "ADMIN" 
                ? <Admin /> 
                : <h1>Access Denied</h1>
          }>
          <Route path="services" element={<AdminServices />} />
          <Route path="blog" element={<AdminBlog/>} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>}/>
      </Routes>
    </div>
  )
}

export default App