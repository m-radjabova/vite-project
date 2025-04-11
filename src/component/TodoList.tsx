import { Todos } from "../page/Todos";
import { Badge, ListGroup } from "react-bootstrap";
import { useState } from "react";

interface Props {
    todos: Todos[];
    setTodos: (todos: Todos[]) => void; 
}

function TodoList({ todos, setTodos }: Props) {
    const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);

    const changeTodoStatus = (todoId: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div className="container mt-3">
            <div className="todo-container">
                <ListGroup variant="flush">
                    {todos.map(todo => (
                        <ListGroup.Item 
                            key={todo.id}
                            className={`mb-3 p-3 rounded ${todo.completed ? 'completed-item' : 'pending-item'}`}
                            style={{
                                height: '80px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                borderLeft: `5px solid ${todo.completed ? '#a8df8e' : '#5a8f7b'}`,
                                boxShadow: '0 3px 6px rgba(90, 143, 123, 0.1)',
                                cursor: 'pointer',
                                transform: hoveredTodo === todo.id ? 'translateX(5px)' : 'none',
                                backgroundColor: hoveredTodo === todo.id ? '#f8f9fa' : 'white'
                            }}
                            onClick={() => changeTodoStatus(todo.id)}
                            onMouseEnter={() => setHoveredTodo(todo.id)}
                            onMouseLeave={() => setHoveredTodo(null)}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ 
                                    flex: 1,
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#7a7a7a' : '#2d2d2d',
                                    fontSize: '1.1rem'
                                }}>
                                    {todo.title}
                                </div>
                                <Badge 
                                    pill 
                                    onClick={() => {
                                        changeTodoStatus(todo.id);
                                    }}
                                    bg={todo.completed ? 'success' : 'warning'}
                                    className="ms-3"
                                    style={{
                                        backgroundColor: todo.completed ? '#a8df8e' : '#e0f0e5',
                                        color: todo.completed ? 'white' : 'black',
                                        fontSize: '0.85rem',
                                        padding: '8px 12px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        transform: hoveredTodo === todo.id ? 'scale(1.05)' : 'none'
                                    }}
                                >
                                    {todo.completed ? (
                                        <span>✓ Completed</span>
                                    ) : (
                                        <span>⌛ Pending</span>
                                    )}
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
    );
}

export default TodoList;