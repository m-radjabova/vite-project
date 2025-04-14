import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import apiClient from "../apiClient/ApiClient";
import { FaArrowDown, FaCheckCircle, FaFilter, FaInfoCircle, FaRegCircle, FaTasks } from "react-icons/fa";
import Loading from "../component/Loading";
import { User } from "./Posts";
import { BiTask } from "react-icons/bi";

export interface Todos {
    id: number;
    title: string;
    completed: boolean;
    userId: number
}

function Todos() {
    const [todos, setTodos] = useState<Todos[]>([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [limit, setLimit] = useState(7)
    const [currentFilter, setCurrentFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [currentUserId, setCurrentUserId] = useState<number | null>(null)

    useEffect(() => {
        getTodos();
        getUsers();
    }, [page, limit, currentFilter, currentUserId]);

    function getTodos() {
      setIsLoading(true);
      const filter = currentFilter;
      let url = `/todos?_page=${page}&_limit=${limit}`;
      
      if (currentUserId) {
          url += `&userId=${currentUserId}`;
      }
      
      const updatedUrl = filter !== "" ? `${url}&completed=${filter}` : url;

      axios
          .get(apiClient.defaults.baseURL + updatedUrl)
          .then((res) => {
              setPageSize(Math.floor(res.headers["x-total-count"] / limit)); 
              setTodos(res.data);
          })
          .catch((error) => {
              console.log(error);
          })
          .finally(() => {
              setIsLoading(false);
          });
  }

    function getUsers(){
      axios.get<User[]>(apiClient.defaults.baseURL + `/users`)
      .then((res) => setUsers(res.data));
    }

    const changePage = (event: ChangeEvent<unknown>, value : number) => {
        console.log(event)
        setPage(value)
      
    }

    const handleUserClick = (userId: number | null) => {
        setCurrentUserId(userId === currentUserId ? null : userId); 
        setPage(1);
    }

    return (
      <div className="container-loading">
         {isLoading && <Loading />}
         <div className="p-4 custom-container d-flex gap-3">
          <div className="sidebar w-25">
            <div className="sidebar-header">
              <h1 className="sidebar-title">
               <div className="icon-circle">
                  <BiTask className="text-success" size={28} />
                </div>
                Tasks
              </h1>
            </div>
            <div className="sidebar-content">
              <ul className="sidebar-list" style={{ padding: 0 }} onClick={()=>{}}>
                <li className={`sidebar-item ${currentUserId === null ? 'active' : ''}`} onClick={() => handleUserClick(null)}>
                  <span className="sidebar-item-name"> 💚 All Tasks</span>
                </li>
                {users.map((user) => (
                  <li 
                    key={user.id} 
                    className={`sidebar-item ${user.id === currentUserId ? 'active' : ''}`}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <span className="sidebar-item-name" > 💚 {user.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-grow-1 ">
            <div className="header-box">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <FaTasks className="text-success" size={28} />
                </div>
                <h1 className="m-0 task-title">
                  Tasks List
                  <span className="task-badge">
                    {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
                  </span>
                </h1>
              </div>

                <div className="d-flex gap-3">
                    <button 
                      onClick={() => { setCurrentFilter(''); setPage(1); }} 
                      className="btn d-flex align-items-center gap-2 btn-all"
                      style={{
                        backgroundColor: currentFilter === '' ? '#e8f5e9' : 'white',
                      }}
                    >
                      <FaFilter size={14} />
                      <span>All</span>
                    </button>
                    <button 
                      onClick={() => { setCurrentFilter('true'); setPage(1); }} 
                      className="btn d-flex align-items-center gap-2 btn-all"
                      style={{
                        backgroundColor: currentFilter === 'true' ? '#e8f5e9' : 'white',
                      }}
                    >
                      <FaCheckCircle size={14} className="text-success" />
                      <span>Completed</span>
                    </button>
                    <button 
                      onClick={() => { setCurrentFilter('false'); setPage(1); }} 
                      className="btn d-flex align-items-center gap-2 btn-all"
                      style={{
                        backgroundColor: currentFilter === 'false' ? '#e8f5e9' : 'white',
                      }}
                    >
                      <FaRegCircle size={14} className="text-warning" />
                      <span>Uncompleted</span>
                    </button>
                  </div>
                </div>

            <div className="settings-box">
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="rows-per-page-label" sx={{ color: "#5a8f7b" }}>
                  Items per page
                </InputLabel>
                <Select
                  value={limit}
                  onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                  labelId="rows-per-page-label"
                  label="Items per page"
                  className="select-items"
                >
                  {[7,10, 20, 30, 40].map(num => (
                    <MenuItem
                      key={num}
                      value={num}
                      sx={{ color: "#5a8f7b" }}
                    >
                      Show {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={2}>
                <Pagination
                  count={pageSize}
                  onChange={changePage}
                  color="primary"
                  className="custom-pagination"
                />
              </Stack>
            </div>

            <div className="col-md-12 mb-4">
              {!isLoading && <TodoList todos={todos} setTodos={setTodos} />}
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => setLimit(limit + 10)}
                className="btn load-more-btn"
              >
                <FaArrowDown className="me-2" />
                Load More Tasks
                <span className="load-more-badge">
                  +10
                </span>
              </button>

              <p className="text-muted mt-3 small d-flex align-items-center justify-content-center gap-2">
                <FaInfoCircle />
                Showing {Math.min(limit, todos.length)} of {todos.length} tasks
              </p>
            </div>
          </div>
        </div>
      </div>

    );
}
export default Todos;