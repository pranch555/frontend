import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', price: '', stock: '', isbn: '' });
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/books').then((res) => setBooks(res.data));
  }, []);

  const addBook = async () => {
    await axios.post('/api/admin/books', form, {
      headers: { Authorization: token }
    });
    window.location.reload();
  };

  const deleteBook = async (id) => {
    await axios.delete(`/api/admin/books/${id}`, {
      headers: { Authorization: token }
    });
    window.location.reload();
  };

  const updateBook = async (id, price, stock) => {
    await axios.put(`/api/admin/books/${id}`, { price, stock }, {
      headers: { Authorization: token }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Add Book</h3>
        <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Author" onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Price" type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Stock" type="number" onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <input placeholder="ISBN" onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
        <button onClick={addBook}>Add Book</button>
      </div>

      <h3>Books List</h3>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} - {b.author} - ${b.price} - Stock: {b.stock}
            <button onClick={() => deleteBook(b.id)}>Delete</button>
            <button onClick={() => {
              const newPrice = prompt('Enter new price:', b.price);
              const newStock = prompt('Enter new stock:', b.stock);
              updateBook(b.id, newPrice, newStock);
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}