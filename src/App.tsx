import { useState } from 'react';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Learn React',
      completed: false
    },
    {
      id: 2,
      title: 'Learn Vue',
      completed: true
    }
  ])

  function addTodo(title: string) {
    todos.push({
      id: todos.length+1,
      title,
      completed: false
    })
    setTodos([...todos])
  }

  function setChecked(id: number) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(newTodos)
  }


  return (
    <div className='container'>
      <TodoForm addTodo={addTodo}/>
      <TodoList setChecked={setChecked} todos={todos}/>
    </div>
  )
}

export default App