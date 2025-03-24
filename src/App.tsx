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
    {
      id: 1,
      title: 'Fix Bugs in the Login Module',
      status: Status.todo,
    },
    {
      id: 2,
      title: 'Implement User Registration',
      status: Status.inProgress,
    },
    {
      id: 3,
      title: 'Optimize Database Queries',
      status: Status.completed,
    }
  ]);

  const [status, setStatus] = useState("all");
  const [title, setTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState<Status>(Status.todo); 

  const changeStatus = (id: number, status: Status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const addTasks = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("iltimos title kiriting");
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

  return (
    <div className="container mt-5 p-4" style={{boxShadow : '0px 3px 8px rgba(0, 0, 0, 0.24)'}}>
      <h1 className="text-center">Tasks</h1>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="btn-group">
          <button
            onClick={() => setStatus("all")}
            className="btn btn-info me-2 btn-lg"
          >
            All
          </button>
          <button
            onClick={() => setStatus("todo")}
            className="btn btn-primary me-2 btn-lg"
          >
            Todo
          </button>
          <button
            onClick={() => setStatus("inProgress")}
            className="btn btn-warning me-2 btn-lg"
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("completed")}
            className="btn btn-success btn-lg"
          >
            Completed
          </button>
        </div>
        <button onClick={handleOpen} className="btn btn-primary btn-lg">
          Add
        </button>
      </div>
      <hr />
      <TasksList
        tasks={
          status === "all"
            ? tasks
            : tasks.filter((task) => task.status === status)
        }
        changeStatus={changeStatus}
      />

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