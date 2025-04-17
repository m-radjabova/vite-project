import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import apiClient from "../apiClient/ApiClient";
import { FaArrowDown, FaCheckCircle, FaFilter, FaInfoCircle, FaRegCircle, FaTasks } from "react-icons/fa";
import Loading from "../component/LoadingForUsers";
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
          <div className="sidebar w-25" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: 'fit-content'
          }}>
            <div className="sidebar-header" style={{
              borderBottom: '1px solid #e0e0e0',
              paddingBottom: '15px',
              marginBottom: '20px'
            }}>
              <h1 className="sidebar-title" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#2e7d32',
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: 0
              }}>
                <div className="icon-circle" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#e8f5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BiTask className="text-success" size={28} />
                </div>
                Tasks
              </h1>
            </div>
            <div className="sidebar-content">
              <ul className="sidebar-list" style={{ 
                padding: 0,
                listStyle: 'none',
                margin: 0
              }}>
                <li className={`sidebar-item ${currentUserId === null ? 'active' : ''}`} 
                  onClick={() => handleUserClick(null)}
                  style={{
                    padding: '12px 15px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: currentUserId === null ? '#e8f5e9' : 'transparent',
                  }}
                >
                  <span className="sidebar-item-name" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: currentUserId === null ? '#2e7d32' : '#455a64',
                    fontWeight: currentUserId === null ? '500' : '400'
                  }}> 
                    <span style={{ fontSize: '1.2rem' }}>💚</span> All Tasks
                  </span>
                </li>
                {users.map((user) => (
                  <li 
                    key={user.id} 
                    className={`sidebar-item ${user.id === currentUserId ? 'active' : ''}`}
                    onClick={() => handleUserClick(user.id)}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: user.id === currentUserId ? '#e8f5e9' : 'transparent'
                    }}
                  >
                    <span className="sidebar-item-name" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: user.id === currentUserId ? '#2e7d32' : '#455a64',
                      fontWeight: user.id === currentUserId ? '500' : '400'
                    }}> 
                      <span style={{ fontSize: '1.2rem' }}>💚</span> {user.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      
          <div className="flex-grow-1" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div className="header-box" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '20px',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle" style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#e8f5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaTasks className="text-success" size={28} />
                </div>
                <h1 className="m-0 task-title" style={{
                  color: '#2e7d32',
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  Tasks List
                  <span className="task-badge" style={{
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
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
                    color: currentFilter === '' ? '#2e7d32' : '#455a64',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '8px 15px',
                    transition: 'all 0.2s ease'
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
                    color: currentFilter === 'true' ? '#2e7d32' : '#455a64',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '8px 15px',
                    transition: 'all 0.2s ease'
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
                    color: currentFilter === 'false' ? '#2e7d32' : '#455a64',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '8px 15px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FaRegCircle size={14} className="text-warning" />
                  <span>Uncompleted</span>
                </button>
              </div>
            </div>
      
            <div className="settings-box" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px'
            }}>
              <FormControl sx={{ 
                minWidth: 150, 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#c8e6c9',
                  },
                  '&:hover fieldset': {
                    borderColor: '#81c784',
                  },
                }
              }} size="small">
                <InputLabel id="rows-per-page-label" sx={{ color: "#5a8f7b" }}>
                  Items per page
                </InputLabel>
                <Select
                  value={limit}
                  onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                  labelId="rows-per-page-label"
                  label="Items per page"
                  className="select-items"
                  sx={{
                    color: "#2e7d32",
                    '& .MuiSvgIcon-root': {
                      color: "#5a8f7b"
                    }
                  }}
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
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#5a8f7b',
                      border: '1px solid #c8e6c9'
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#e8f5e9 !important',
                      color: '#2e7d32',
                      fontWeight: 'bold'
                    },
                    '& .MuiPaginationItem-root:hover': {
                      backgroundColor: '#f1f8e9'
                    }
                  }}
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
                style={{
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 25px',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(46, 125, 50, 0.1)'
                }}
              >
                <FaArrowDown className="me-2" />
                Load More Tasks
                <span className="load-more-badge" style={{
                  marginLeft: '10px',
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem'
                }}>
                  +10
                </span>
              </button>
      
              <p className="text-muted mt-3 small d-flex align-items-center justify-content-center gap-2" style={{
                color: '#78909c',
                fontSize: '0.9rem'
              }}>
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