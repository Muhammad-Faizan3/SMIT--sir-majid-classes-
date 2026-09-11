import { useState } from "react"

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false)
    console.log('Navbar');

    const loginHandler = () => {
        setIsLogin(true)
    }
    
    return(
        <>
        <h1>Navbar {isLogin ? 'Faizan bashir' : 'please login'}</h1>
        <button onClick={loginHandler}>Login</button>
        </>
    )
}
export default Navbar