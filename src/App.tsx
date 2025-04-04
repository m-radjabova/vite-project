import { useReducer } from "react"

function reducer(state: { count: number; name: string }, action: { type: string }) {
    switch (action.type) {
      case "increment":
        return { ...state, count: state.count + 1 };
      case "decrement":
        return { ...state, count: state.count - 1 };
      case "doubleIncrement":
        return { ...state, count: state.count * 2 };
      case "change_name":
        return { ...state, name: state.name === "John" ? "Doe" : "John" }; 
    }
    return state;
}

function App() {

  const [state, dispatch] = useReducer(reducer , { count: 0, name : "John" ,  })

  return (
    <div className="container">
      <h1>{state.name}</h1>
      <button className="btn btn-success" onClick={() => dispatch({ type: "change_name" })}>Change Name</button>
      <hr />

      <h1>{state.count}</h1>
      <button className="btn btn-primary me-2" onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button className="btn btn-danger me-2" onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button className="btn btn-warning" onClick={() => dispatch({ type: "doubleIncrement" })}>Double Increment</button>
      <hr />
    </div>
  )
}

export default App