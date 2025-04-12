import { Route, Routes} from "react-router-dom"
import Users from "./page/Users"
import Posts from "./page/Posts"
import Todos from "./page/Todos"
import Header from "./page/Header"
import Comments from "./page/Comments"


function App() {
  return (
    <div>
      <Header/>
       <div className="container mt-3">
        <Routes>
          <Route path="/Users" element={<Users/>} />
          <Route path="/Posts" element={<Posts/>} />
          <Route path="/Posts/:id/Comments" element={<Comments/>} />
          <Route path="/Todos" element={<Todos/>} />
        </Routes>
       </div>
    </div>
  )
}

export default App