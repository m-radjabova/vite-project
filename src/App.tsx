import { FormEvent, useState } from 'react';
import TasksList from './component/TasksList';
import { Status, Task } from './types/Types';

import { Box as MuiBox } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  padding: '24px',
};

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'apple 🍎', status: Status.todo },
    { id: 2, title: 'lemon 🍋', status: Status.inProgress },
    { id: 3, title: 'strawberry 🍓', status: Status.completed },
    { id: 4, title: 'pineple 🍍', status: Status.todo },
    { id: 5, title: 'watermelon 🍉', status: Status.inProgress },
    { id: 6, title: 'cherry 🍒', status: Status.completed },
    { id: 7, title: 'grape 🍇', status: Status.todo },
    { id: 8, title: 'kiwi 🥝', status: Status.inProgress },
  ]);

  const [status, setStatus] = useState("all");
  const [title, setTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState<Status>(Status.todo);
  const [search, setSearch] = useState("");

  const changeStatus = (id: number, status: Status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const addTasks = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title!");
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      status: taskStatus,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setTaskStatus(Status.todo);
    handleClose();
  };


  const filteredTasks = tasks.filter((task) => {
    const statusmatch = status === "all" || task.status === status;
    const searchMatch = task.title.toLowerCase().includes(search.toLowerCase());
    return statusmatch && searchMatch;
  });

  return (
    <div className="container mt-3 p-4" style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
      <h1 className="text-center">Tasks</h1>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="btn-group">
          <button
            onClick={() => setStatus("all")}
            className={`btn btn-info me-2 ${status === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("todo")}
            className={`btn btn-primary me-2 ${status === "todo" ? "active" : ""}`}
          >
            Todo
          </button>
          <button
            onClick={() => setStatus("inProgress")}
            className={`btn btn-warning me-2 ${status === "inProgress" ? "active" : ""}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("completed")}
            className={`btn btn-success ${status === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
        </div>
        <button onClick={handleOpen} className="btn btn-primary">
          Add
        </button>
      </div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="form-control mt-3"
        placeholder="Search tasks..."
        type="search"
      />
      <hr />
      <TasksList tasks={filteredTasks} changeStatus={changeStatus} />

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MuiBox sx={style}>
          <h2 id="modal-modal-title" className="text-center">Add Task</h2>
          <form onSubmit={addTasks}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-control"
                id="title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value as Status)}
              >
                <option value={Status.todo}>Todo</option>
                <option value={Status.inProgress}>In Progress</option>
                <option value={Status.completed}>Completed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </MuiBox>
      </Modal>
    </div>
  );
}

export default App;