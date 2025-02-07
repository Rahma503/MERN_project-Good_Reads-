import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const userId = '67a52c22f14e9ddd97fff3ab'; // Replace with actual logged-in user ID, probably from context or auth state
    //const token = localStorage.getItem("auth-token"); // Assuming JWT is stored in localStorage
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjp7Im5hbWUiOiJTYXJhYWhhbXJyIiwiZW1haWwiOiJzYXJhYWhhbXJyOThAZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzM4ODc5NzYyLCJleHAiOjE3NDE0NzE3NjJ9.L8OMBtD4Ta2flh8aB9PwNUnXkHhY8wRsrx_UCvP4nAI';
    
    const addToCart = async (bookId) => {
        try {
            const response = await fetch('/api/cart/add-to-cart', {
                method: 'PUT',
                headers: {
                    'auth-token': `bearer ${token}`,
                    'id': userId,
                    'bookid': bookId,
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert('Book added to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    

    // Fetch the cart data when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cart/get-user-cart?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': `bearer ${token}`
                    }
                });                
                const data = await response.json();
                if (data.status === 'success') {
                    setCart(data.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [token, userId]);

    // Remove an item
    const removeItem = async (bookId) => {
        try {
            const response = await fetch(`/api/cart/remove-from-cart/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'id': userId,
                },
            });
            const data = await response.json();
            if (data.status === 'success') {
                setCart(cart.filter(item => item._id !== bookId)); // Update the cart state after removing
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // Update quantity
    const updateQuantity = async (bookId, newQuantity) => {
        // You will need to handle the backend logic for updating the quantity as well
        // You can create a new API endpoint if needed, or update the cart item locally for now
        // For simplicity, you can update the quantity on frontend but also send a request to update the backend

        setCart(cart.map(item => 
            item._id === bookId ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Calculate total
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2 className="cartTitle">Shopping Cart</h2>
            {cart.length > 0 ? (
                cart.map(item => (
                    <CartItem key={item._id} product={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="last-cart">
                <h3 className="totalo">Total: {totalPrice} EGP</h3>
                <button className="checkout" onClick={() => navigate("/checkout")}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
