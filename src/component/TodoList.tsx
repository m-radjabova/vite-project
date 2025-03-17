interface TodoProps {
    id: number,
    title: string,
    completed: boolean
}

interface Props {
   todos: TodoProps[]
   setChecked: (id: number) => void
}

function TodoList(props : Props) {

  return (
    <div>
        <ul>
            {
                props.todos.map(todo => (
                    <li key={todo.id}>
                        <label style={{textDecoration : todo.completed ? 'line-through' : 'none'}} htmlFor={String(todo.id)}> {todo.title}</label>
                        <input id={String(todo.id)} type="checkbox" checked={todo.completed} onChange={() => props.setChecked(todo.id)} />
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TodoList