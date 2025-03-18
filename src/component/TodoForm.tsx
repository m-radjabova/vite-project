import { FormEvent, useState } from "react";

interface Props {
    addTodo (title: string) : void
}

function TodoForm(props : Props) {
    const[title, setTitle] = useState('')

    function add(e: FormEvent){
        e.preventDefault()
        props.addTodo(title)
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={add}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add todo" />
                <button>Add todo</button>
            </form>
        </div>
  )
}

export default TodoForm;