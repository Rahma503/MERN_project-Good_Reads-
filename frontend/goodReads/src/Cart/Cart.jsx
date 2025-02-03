import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../services/api.js";
import './Cart.css'

const Cart = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCart(userId).then(res => setCart(res.data));
  }, [userId]);

  return (
    <div className="cart-container">
    <h2>Your Cart</h2>
    {cart?.items?.length ? (
      <>
        {cart.items.map(item => (
          <CartItem
            key={item.bookId._id}
            item={item}
            onRemove={handleRemove}
          />
        ))}
        <div className="total">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
      </>
    ) : (
      <p>Your cart is empty.</p>
    )}
  </div>
  );
};

export default Cart;
