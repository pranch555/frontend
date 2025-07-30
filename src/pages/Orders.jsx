import { useEffect, useState } from 'react';
import api from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get('/orders')
      .then(r => setOrders(r.data))
      .catch(err => {
        console.error(err);
        setOrders([]);
      });
  }, []);

  if (orders === null) return <LoadingSpinner />;

  return (
    <div style={{ padding:16 }}>
      <h1>My Orders</h1>
      {orders.length === 0 && <p>No past orders.</p>}
      {orders.map(o => (
        <div key={o.id} style={{ border:'1px solid #ccc', padding:16, marginBottom:16 }}>
          <h2>Order #{o.id}</h2>
          <p>Date: {new Date(o.order_date).toLocaleString()}</p>
          <ul>
            {o.items.map(i => (
              <li key={i.id}>
                {i.bookTitle} × {i.quantity} @ ${i.priceAtPurchase.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}