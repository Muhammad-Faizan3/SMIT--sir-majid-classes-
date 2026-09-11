import { useState } from "react"
import Navbar from "./components/navbar"
import CardUI from "./components/cardUI"
import Loading from "./components/loading"

const App = () => {
  const [count,setCount] = useState(0)
  return(
    <>
    <h1>{count}</h1>
    <button onClick={() => setCount(count + 1)}>inrease</button>
    <Navbar/>
    <CardUI/>
    <Loading/>
    </>
  )
}
export default App