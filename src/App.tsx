import { useState } from "react";
import { User } from "./types/types";
import RegisterForm from "./component/RegisterForm";
import UsersList from "./component/UsersList";


function App() {
  const [userList, setUserList] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "t2XfM@example.com",
      password: "password123",
      confirmPassword: "password123"
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "t2XfM@example.com",
      password: "password123",
      confirmPassword: "password123"
    },
    {
      id: 3,
      name: "Mia Doe",
      email: "t2XfM@example.com",
      password: "password123",
      confirmPassword: "password123"
    }
  ]);

  const addUser = (user: User) => {
    const newUser = { ...user, id: userList.length + 1 };
    setUserList([...userList, newUser]);
  }


  const [page, setPage] = useState(1);

  return (
    <div className="container mt-5">
      <button
        onClick={() => setPage(1)}
        className={`btn ${page === 1 ? 'btn-success' : 'btn-outline-success'} me-2 btn-lg`}
      >
        Register
      </button>

      <button
        onClick={() => setPage(2)}
        className={`btn ${page === 2 ? 'btn-info' : 'btn-outline-info'} btn-lg`}
      >
        Users
      </button>

      {page === 1 && <RegisterForm addUser={addUser} />}
      {page === 2 && <UsersList userList={userList} />}
    </div>
  );
}

export default App;