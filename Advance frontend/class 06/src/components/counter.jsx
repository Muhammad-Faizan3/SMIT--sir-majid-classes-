import { useState } from "react"

const Counter = (props) => {
    const [count, setCount] = useState(0)
     const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };
    return (
        <>
        <h1>{props.title}</h1>
            <h1>Count: {count}</h1>
             <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increase}>+</button>
        </>
    )
}
export default Counter