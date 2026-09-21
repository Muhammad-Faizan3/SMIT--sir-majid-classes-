
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './assets/Components/body'
import Body from './assets/Components/footer'
import Header from './assets/Components/header'

function App() {
  let [count,setCount] = useState(0)
  let [darkTheme,setDarkTheme] = useState(false)
  let [toggle,setTogggle] = useState(false)

  const getData = () => {
    console.log("API call");
    
  }
  useEffect(() => {
    // console.log('API Call');
  getData()

    
  },[count])

  return (
    <div style={{background : darkTheme ? 'black' : 'white'}}>
      <h1>hello world</h1>
      
      <Body/>
      {
      
        toggle ? <Header/> :<Footer/>
      }
      <button onClick={()=> {
        setTogggle(!toggle)
      }}>toggle</button>
      <button onClick={() => {
        setCount(++count)
      }}>Click Counter: {count}</button>

      <button onClick={() => {
        setDarkTheme(!darkTheme)
      }}>{
        darkTheme ? 'light theme' : 'dark theme'
      } </button>
    </div>
  )
}

export default App
