import { useEffect } from "react"

function MyComponent({count} : {count: number}) {

    useEffect (() => {
        console.log("boshladi:" , count)
    }, [count])

    useEffect (() => {
        return () => {
            console.log("tugadi")
        }
    }, [])

    return (
        <div>
            <h1>My Component</h1>
        </div>
    )
}

export default MyComponent