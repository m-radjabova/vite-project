import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import apiClient from "../apiClient/ApiClient";
import { FaCheckCircle, FaFilter, FaRegCircle, FaTasks } from "react-icons/fa";

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

    useEffect(() => {
        getTodos();
    }, [page, limit, currentFilter]);

    function getTodos() {
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
              });
    }

    const changePage = (event: ChangeEvent<unknown>, value : number) => {
        console.log(event)
          setPage(value)
    }


    

    return (
        <div className="container p-4" style={{ backgroundColor: '#f5faf8'}}>
            <div className="row justify-content-center">
            <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                        <FaTasks className="text-success" size={28} />
                        <h1 className="m-0 text-success" style={{
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            textShadow: '1px 1px 2px rgba(90, 143, 123, 0.2)'
                        }}>
                            My Tasks
                        </h1>
                    </div>
                    <div className="d-flex gap-2">
                    <button onClick={() => { setCurrentFilter(''); setPage(1); }} className="btn btn-outline-success d-flex align-items-center gap-2">
                        <FaFilter size={14} />
                        <span>All</span>
                    </button>
                    <button onClick={() => { setCurrentFilter('true'); setPage(1); }} className="btn btn-outline-success d-flex align-items-center gap-2">
                        <FaCheckCircle size={14} />
                        <span>Completed</span>
                    </button>
                    <button onClick={() => { setCurrentFilter('false'); setPage(1); }} className="btn btn-outline-success d-flex align-items-center gap-2">
                        <FaRegCircle size={14} />
                        <span>Uncompleted</span>
                    </button>

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <InputLabel id="rows-per-page-label" sx={{ color: "#5a8f7b" }}>
                            Limit
                        </InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) =>{setLimit(Number(e.target.value)); setPage(1) }}
                            labelId="rows-per-page-label"
                            label="limit"
                            sx={{
                                "& .MuiSelect-select": {
                                color: "#5a8f7b",
                                },
                            }}
                        
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack spacing={2}>
                        <Pagination count={pageSize} onChange={changePage} color="secondary" />
                    </Stack>
                </div>
                <div className="col-md-12">
                    <TodoList todos={todos} setTodos={setTodos} />
                </div>
            </div>
        </div>
    );
}
export default Todos;