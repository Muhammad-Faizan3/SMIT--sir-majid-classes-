import { useState } from 'react'
import Home from './Components/Home'
import Card1 from './Components/Card1'
import users from './assets/data/userData.'
import CustomInput from './Components/shared/CustomInput'
import './App.css'


function App() {
  return (
    <>
      {/* <Home />
    
    {users.map((data,index) => {
      return(
        <div className="flex flex-wrap gap-6 justify-center ">
        <Card1 name= {data.name} age={data.age} profession={data.profession} experience={data.experience} city={data.city} img={data.image}
        />
        </div>
      )
    })} */}
    <CustomInput title={Name} />
    </>
  )
}

export default App
