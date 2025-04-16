import { Todos } from "../page/Todos";
import { Badge, ListGroup } from "react-bootstrap";
import { DragEvent, useState } from "react";
import apiClient from "../apiClient/ApiClient";

interface Props {
    todos: Todos[];
    setTodos: (todos: Todos[]) => void; 
}

function TodoList({ todos, setTodos }: Props) {
    const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);
    const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null)


    const changeTodoStatus = (todoId: number) => {
        apiClient.patch(`/todos/${todoId}`, { completed: !todos.find(todo => todo.id === todoId)?.completed })
        .then((res) => setTodos(todos.map(todo => todo.id === todoId ? res.data : todo)));
    };

    function handleDragStart(id: number) {
        setDraggedTodoId(id);
    }

    function handleDrop(ev: DragEvent<HTMLDivElement>, dropTarget: number) {
        ev.preventDefault();

        if (draggedTodoId === null) return;

        const draggedTodo = todos.find(t => t.id === draggedTodoId);
        if (!draggedTodo) return;

        const shouldBeCompleted = dropTarget === 1;

        if (draggedTodo.completed !== shouldBeCompleted) {
            const updatedTodo = { ...draggedTodo, completed: shouldBeCompleted };
            apiClient.patch(`/todos/${draggedTodo.id}`, updatedTodo)
            .then((res) => setTodos(todos.map(t => t.id === draggedTodo.id ? res.data : t)));
        }

        setDraggedTodoId(null);
    }

    
    return (
        <div className="mt-3">
            <div className="todo-container d-flex justify-content-between gap-3">
                <div 
                    className="pending w-50" 
                    style={{borderRight: '3px solid #5a8f7b', paddingRight: '1rem'}}
                    onDragOver={ev => ev.preventDefault()}
                    onDrop={e => handleDrop(e, 0)}
                >
                    <h5 className="mb-3" style={{ color: '#5a8f7b', fontWeight: '600' }}>⌛ Pending Tasks</h5>
                    <ListGroup variant="flush" className="mb-4">
                        {todos.filter(todo => !todo.completed).map(todo => (
                            <ListGroup.Item 
                                draggable
                                key={todo.id}
                                id={`todo-${todo.id}`}
                                className={`mb-3 p-3 rounded pending-item`}
                                style={{
                                    height: '80px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    borderLeft: `5px solid #5a8f7b`,
                                    boxShadow: '0 3px 6px rgba(90, 143, 123, 0.1)',
                                    cursor: 'pointer',
                                    transform: hoveredTodo === todo.id ? 'translateX(5px)' : 'none',
                                    backgroundColor: hoveredTodo === todo.id ? '#f8f9fa' : 'white',
                                    opacity: hoveredTodo === todo.id ? 1 : 0.9
                                }}
                                onClick={() => changeTodoStatus(todo.id)}
                                onMouseEnter={() => setHoveredTodo(todo.id)}
                                onMouseLeave={() => setHoveredTodo(null)}
                                onDragStart={() => handleDragStart(todo.id)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div style={{ 
                                        flex: 1,
                                        color: '#2d2d2d',
                                        fontSize: '1.1rem'
                                    }}>
                                        {todo.title}
                                    </div>
                                    <Badge 
                                        pill 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            changeTodoStatus(todo.id);
                                        }}
                                        bg="warning"
                                        className="ms-3"
                                        style={{
                                            backgroundColor: '#e0f0e5',
                                            color: 'black',
                                            fontSize: '0.85rem',
                                            padding: '8px 12px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            transform: hoveredTodo === todo.id ? 'scale(1.05)' : 'none'
                                        }}
                                    >
                                        <span>⌛ Pending</span>
                                    </Badge>
                                </div>
                                <div className="mt-2" style={{ 
                                    fontSize: '0.8rem',
                                    color: '#7a7a7a'
                                }}>
                                    ID: {todo.id}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <div 
                    className="completed w-50"
                    onDragOver={ev => ev.preventDefault()}
                    onDrop={e => handleDrop(e, 1)}
                >
                    <h5 className="mb-3" style={{ color: '#a8df8e', fontWeight: '600' }}> ✓ Completed Tasks</h5>
                    <ListGroup variant="flush">
                        {todos.filter(todo => todo.completed).map(todo => (
                            <ListGroup.Item 
                                onDragStart={() => handleDragStart(todo.id)}
                                draggable
                                key={todo.id}
                                id={`todo-${todo.id}`}
                                className={`mb-3 p-3 rounded completed-item`}
                                style={{
                                    height: '80px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    borderLeft: `5px solid #a8df8e`,
                                    boxShadow: '0 3px 6px rgba(90, 143, 123, 0.1)',
                                    cursor: 'pointer',
                                    transform: hoveredTodo === todo.id ? 'translateX(5px)' : 'none',
                                    backgroundColor: hoveredTodo === todo.id ? '#f8f9fa' : 'white',
                                    opacity: hoveredTodo === todo.id ? 0.5 : 1
                                }}
                                onClick={() => changeTodoStatus(todo.id)}
                                onMouseEnter={() => setHoveredTodo(todo.id)}
                                onMouseLeave={() => setHoveredTodo(null)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div style={{ 
                                        flex: 1,
                                        textDecoration: 'line-through',
                                        color: '#7a7a7a',
                                        fontSize: '1.1rem'
                                    }}>
                                        {todo.title}
                                    </div>
                                    <Badge 
                                        pill 
                                        onClick={(e) => {
                                            console.log(e)
                                            changeTodoStatus(todo.id);
                                        }}
                                        bg="success"
                                        className="ms-3"
                                        style={{
                                            backgroundColor: '#a8df8e',
                                            color: 'white',
                                            fontSize: '0.85rem',
                                            padding: '8px 12px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            transform: hoveredTodo === todo.id ? 'scale(1.05)' : 'none'
                                        }}
                                    >
                                        <span>✓ Completed</span>
                                    </Badge>
                                </div>
                                <div className="mt-2" style={{ 
                                    fontSize: '0.8rem',
                                    color: '#7a7a7a'
                                }}>
                                    ID: {todo.id}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default TodoList;