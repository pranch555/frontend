import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const nav = useNavigate();

  async function place() {
    try {
      await api.post('/orders', {
        items: cart.map(i => ({ bookId: i.id, quantity: i.quantity }))
      });
      alert('Order placed!');
      clearCart();
      nav('/orders');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Checkout failed');
    }
  }

  if (!cart.length) return <p style={{ padding:16 }}>Cart is empty.</p>;

  return (
    <div style={{ padding:16 }}>
      <h1>Checkout</h1>
      <ul>
        {cart.map(i => (
          <li key={i.id}>
            {i.title} × {i.quantity} = ${(i.price*i.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={place}>Place Order</button>
    </div>
  );
}