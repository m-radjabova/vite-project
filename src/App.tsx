import { useState } from "react"
import MyComponent from "./component/MyComponent"

// function App() {

//   const [count , setCount] = useState(0)
//   const [start, setStart] = useState(false)

//   useEffect (() => {
//     setTimeout(() => {
//       setCount(c => c + 1)
//     })
//   }, [start])

//   return (
//     <div className="container">
//       <h1>{count}</h1>
//       <button onClick={() => setStart(!start)}>Click</button>
//     </div>
//   )
// }

function App() {

  const [visible, setVisible] = useState(false)

  const [count, setCount] = useState(0)


  return (
    <div className="container mt-3">
      <button onClick={() => setVisible(true)}>show</button>
      <button onClick={() => setVisible(false)}>hide</button>

      {
        visible ? <MyComponent count={count}/> : <h1>no component</h1>
      }

      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App 