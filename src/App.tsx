import Sidebar from './component/Sidebar'
import Content from './component/Content'
import { useState } from 'react';

export interface User {
  id: number,
  userName: string,
  phone: string
}

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      userName: 'me (save changes)',
      phone: '0123456789'
    },
    {
      id: 2,
      userName: 'Mary',
      phone: '09829753469'
    },
    {
      id: 3,
      userName: 'Jane',
      phone: '0123456789'
    },
    {
      id: 4,
      userName: 'Jake',
      phone: '0156789'
    },
    {
      id: 5,
      userName: 'Anna',
      phone: '0123456789'
    },
    {
      id: 6,
      userName: 'Vika',
      phone: '3456789'
    },
    {
      id: 7,
      userName: 'Tom',
      phone: '9876543210'
    },
    {
      id: 8,
      userName: 'Lucy',
      phone: '1234567890'
    },
    {
      id: 9,
      userName: 'John',
      phone: '5678901234'
    },
    {
      id: 10,
      userName: 'Emma',
      phone: '6789012345'
    },
    {
      id: 11,
      userName: 'Chris',
      phone: '7890123456'
    },
    {
      id: 12,
      userName: 'Sophia',
      phone: '8901234567'
    },
    {
      id: 13,
      userName: 'Michael',
      phone: '9012345678'
    }
  ]);

  const [selectedUser , setSelectedUser] = useState<User | null>(null);

  function addUser(user: User) {
    users.push(user);
    setUsers([...users]);
  }

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    if (selectedUser?.id === updatedUser.id) {
      setSelectedUser(updatedUser);
    }
  };

  function deleteUser(user: User) {
    const updateUsers = users.filter((u) => u.id !== user.id);
    setUsers(updateUsers);
  }

  return (
    <div className='container'>
      <Sidebar 
          updateUser={updateUser}
          deleteUser={deleteUser} 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser} 
          addUser={addUser} 
          users={users} 
      />
      <Content selectedUser={selectedUser} />
    </div>
  )
}

export default App