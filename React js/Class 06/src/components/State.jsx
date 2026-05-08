import { useState } from "react"

function State() {
    let [count,setCount] = useState(0)
//   let Increase =() => {
//     // count = count + 1;
//     setCount(count + 1)
//   }  
//   let Decrease =() => {
//     // count = count + 1;
//    count > 0 && setCount(count - 1)
//   }  
//   console.log('Rander');
  
    return(
        <div>
            <h2>Use State</h2>
            <h3>Counter App</h3>
            <p>{count}</p>
            <button className="border-2" onClick={() => setCount(count + 1)}>Increase</button> <br />
            <button className="border-2" onClick={() => count > 0 && setCount(count -1)}>Decrease</button>
        </div>
    )
}
export default State