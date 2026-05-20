
import { useEffect, useState } from 'react'
import './App.css'
import ToggleButton from './Components/ToggleButton'
// import DataBinding from './Components/DataBinding'
// import Parent from './Components/Parent'

function App() {
  let [count,setCount] = useState(0)
  let [students,setStudents] = useState([])
  let [User,setUser] = useState(true)
  let inCrease = () => {
    setCount(count +1)

  }
  let DeCrease =() => {
    count > 0 && setCount(count -1)
  }

  useEffect(() => {
  let func = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => res.json())
    .then((resp) => console.log('resp ',resp) 
    )
  }
  func()
  },[students])
  useEffect(() => {
    console.log('Running...');
    
  },[count])
console.log('user', User);

let addStudents =() => {
  setStudents(
    {
      name: 'faizan',
      rollNo: 123,
    }
  )
}
console.log(students);

  return (
    <>
    {/* <Parent />   */}
    {/* <DataBinding />     */}
    <p>{count}</p>
    <button onClick={inCrease}  className=' border-2'>InCrease</button><br/>
    <button onClick={DeCrease} className=' border-2'>DeCrease</button>

    <button onClick={addStudents}>Add Student</button>

    <ToggleButton/>
    


   {/* clearInterval(interval); */}
    

    </>
  )
}

export default App
