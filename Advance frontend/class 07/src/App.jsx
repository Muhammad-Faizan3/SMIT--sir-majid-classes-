import { useState } from "react"

const App = () => {
  const [name,setName] = useState("")
  // const [data, setData] = useState(['Faizan', 'bashir'])

  // const UIArray = data.map((value, index) => {
  //   return <h1 key={index}>hello {value}</h1>

  //   console.log(UIArray)
    
  // })
  const getUserName =() => {
    console.log(name);
    
  }
  return(
    <>
    <h1>hello world</h1>
    {/* {
      data.map((val,index)=> {
        return(
          <h1 key={index}>hello world</h1>
        )
      })
    } */}
    <input type="text" value={name} placeholder="Enter your Name" onChange={(e)=> {
      setName(e.target.value)
    }}/>
    <button onClick={getUserName}>Get UserName</button>
    {
      <h1>{name}</h1>
    }
    </>
    
  )
}
export default App