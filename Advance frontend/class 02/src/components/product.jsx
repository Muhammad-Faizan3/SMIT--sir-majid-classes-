import { useState } from "react";

function Product({ name, price }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div>
      <h1>Product: {name}</h1>

      <h2>Price: Rs. {price}</h2>

      <div>
        <button onClick={decreaseQuantity}>-</button>

        <span> Quantity: {quantity} </span>

        <button onClick={increaseQuantity}>+</button>
      </div>

      <h2>Total: Rs. {totalPrice}</h2>
    </div>
  );
}

export default Product;