import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function BookCard({ book }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ border: '1px solid #ccc', padding: 16 }}>
      <h3>{book.title}</h3>
      <p>Price: ${book.price.toFixed(2)}</p>
      <p>Stock: {book.stock}</p>
      <input
        type="number"
        min="1"
        max={book.stock}
        value={qty}
        onChange={e => setQty(+e.target.value)}
      />
      <button
        disabled={book.stock === 0}
        onClick={() => addToCart(book, qty)}
        style={{ marginLeft: 8 }}
      >
        Add to Cart
      </button>
    </div>
  );
}