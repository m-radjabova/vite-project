import { Task, Status } from '../types/Types'

interface Props {
    tasks: Task[];
    changeStatus: (id: number, status: Status) => void
}
function TasksList({tasks, changeStatus}: Props) {

  return (
    <table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>
                            <button onClick={() => changeStatus(task.id, Status.todo)} className={`btn btn-outline-primary ${task.status === Status.todo ? 'active' : ''}`}>todo</button>
                            <button onClick={() => changeStatus(task.id, Status.inProgress)} className={`btn btn-outline-primary mx-3 ${task.status === Status.inProgress ? 'active' : ''}`}>progress</button>
                            <button onClick={() => changeStatus(task.id, Status.completed)} className={`btn btn-outline-primary ${task.status === Status.completed ? 'active' : ''}`}>completed</button>
                        </td>

                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default TasksList