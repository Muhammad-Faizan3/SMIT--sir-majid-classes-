import Counter from "./components/counter"
import Product from "./components/product"
import User from "./components/user"

function App() {
  return (
    <>
    <User name='faizan' age={21} />
    < Counter/>
    <Product         name="Laptop"
        price={50000}
/>
    </>

  )
}

export default App