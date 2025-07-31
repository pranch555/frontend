import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/checkout">Cart ({totalQty})</Link> |{' '}
      <Link to="/orders">My Orders</Link> |{' '}
      <Link to="/admin/login">Admin</Link>
    </nav>
  );
}