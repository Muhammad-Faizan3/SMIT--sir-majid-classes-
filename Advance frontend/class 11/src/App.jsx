import { Route, Routes } from "react-router-dom"
import "./App.css"
import NavBar from "./components/navbar"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import User from "./pages/user"

const App = () => {
  return (
    <div className="app">
    
    <h1 className="app-title">React Router dom</h1>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/user" element={<User/>} />
    </Routes>
    </div>
  )
}

export default App
