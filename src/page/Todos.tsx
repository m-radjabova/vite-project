import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import apiClient from "../apiClient/ApiClient";
import { FaArrowDown, FaCheckCircle, FaFilter, FaInfoCircle, FaRegCircle, FaTasks } from "react-icons/fa";
import Loading from "../component/Loading";

export interface Todos {
    id: number;
    title: string;
    completed: boolean;
}

function Todos() {
    const [todos, setTodos] = useState<Todos[]>([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [limit, setLimit] = useState(10)
    const [currentFilter, setCurrentFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getTodos();
    }, [page, limit, currentFilter]);

    function getTodos() {
        setIsLoading(true);
        const filter = currentFilter
        const url = `/todos?_page=${page}&_limit=${limit}`;
        const updatedUrl = filter !== "" ? `${url}&completed=${filter}` : url;

        axios
            .get(apiClient.defaults.baseURL + updatedUrl)
            .then((res) => {
                setPageSize(Math.floor(res.headers["x-total-count"] / limit));
                setTodos(res.data);
            })
              .catch((error) => {
                console.log(error);
              }).finally(( ) => {
                  setIsLoading(false)
              })
    }

    const changePage = (event: ChangeEvent<unknown>, value : number) => {
        console.log(event)
        setPage(value)
    }


    return (
        <div className="container p-4" style={{ 
            backgroundColor: '#f5faf8',
          }}>
            {isLoading && <Loading />}

            <div className="row justify-content-center">
              <div className="d-flex justify-content-between align-items-center mb-4 p-4" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(90, 143, 123, 0.1)',
                borderLeft: '5px solid #5a8f7b'
              }}>
                <div className="d-flex align-items-center gap-3">
                  <div style={{
                    backgroundColor: '#e8f5e9',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaTasks className="text-success" size={28} />
                  </div>
                  <h1 className="m-0" style={{
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    color: '#2e7d32',
                    fontSize: '1.8rem'
                  }}>
                    My Tasks
                    <span className="badge bg-success bg-opacity-10 text-success ms-3" style={{
                      fontSize: '0.9rem',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontWeight: '500'
                    }}>
                      {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
                    </span>
                  </h1>
                </div>
                

                <div className="d-flex gap-3">
                  <button 
                    onClick={() => { setCurrentFilter(''); setPage(1); }} 
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: currentFilter === '' ? '#e8f5e9' : 'white',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FaFilter size={14} />
                    <span>All</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentFilter('true'); setPage(1); }} 
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: currentFilter === 'true' ? '#e8f5e9' : 'white',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FaCheckCircle size={14} className="text-success" />
                    <span>Completed</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentFilter('false'); setPage(1); }} 
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: currentFilter === 'false' ? '#e8f5e9' : 'white',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FaRegCircle size={14} className="text-warning" />
                    <span>Uncompleted</span>
                  </button>
                </div>
              </div>
          
              <div className="d-flex justify-content-between align-items-center mb-4 p-3" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(90, 143, 123, 0.1)'
              }}>
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel id="rows-per-page-label" sx={{ color: "#5a8f7b" }}>
                    Items per page
                  </InputLabel>
                  <Select
                    value={limit}
                    onChange={(e) =>{setLimit(Number(e.target.value)); setPage(1) }}
                    labelId="rows-per-page-label"
                    label="Items per page"
                    sx={{
                      "& .MuiSelect-select": {
                        color: "#5a8f7b",
                        fontWeight: '500'
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#c8e6c9"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5a8f7b"
                      }
                    }}
                  >
                    {[10, 20, 30, 40].map(num => (
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
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#5a8f7b",
                        borderColor: "#c8e6c9"
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#e8f5e9 !important",
                        color: "#2e7d32 !important",
                        fontWeight: '500'
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
                  className="btn d-flex align-items-center gap-2 mx-auto btn-hoverme"
                  style={{
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(90, 143, 123, 0.2)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FaArrowDown className="me-2" />
                  Load More Tasks
                  <span className="badge bg-success bg-opacity-25 text-success ms-3" style={{
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    borderRadius: '12px'
                  }}>
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
    );
}
export default Todos;