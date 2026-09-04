import Body from "./components/body"
import Footer from "./components/footer"
import Header from "./components/header"
import './App.css'

const App = () => {
  var userName = 'faizan'

  const foo = (userName) => {
    console.log('foo',userName);
    
  }
  // console.log(userName);
  
  return(
    <>
    <Header/>
    <Body/>
    <Footer/>
    <h1>Hello {userName}</h1>
    <button onClick={()=> {
      console.log('run callback');
      foo("Faizan")      
    }}>click</button>
    </>
  )
}
export default App