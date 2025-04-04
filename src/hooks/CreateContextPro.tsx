import { MyContext } from "../context/MyContext"

function CreateContextPro() {
  return (
    <>
        <MyContext.Provider value={undefined}>

        </MyContext.Provider>
    </>
}

export default CreateContextPro