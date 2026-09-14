// import { useState } from "react"
// import Navbar from "./components/navbar"

import Counter from "./components/counter"

const App = () => {
  // const userName = 'faizan'
  // const [userName,setUserName] = useState('faizan')
  return(
    <>
    <h1>parent components</h1>
    {/* <button onClick={() => {
      setUserName('faizan bashir')
    }}>updated button</button>
    {/* <Navbar name={userName} age={20} /> */}
    {/* <Navbar userName={userName}/> */}





    <Counter title='My Counter' />
    </>
  )
}

export default App