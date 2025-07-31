import { useState, useEffect } from 'react';
import api from '../api/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [books, setBooks] = useState(null);
  const [q, setQ] = useState({ title:'', minPrice:'', maxPrice:'', category:'' });

  async function load() {
    try {
      const params = {
        title: q.title || undefined,
        minPrice: q.minPrice || undefined,
        maxPrice: q.maxPrice || undefined,
        category: q.category || undefined
      };
      const res = await api.get('/books', { params });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    }
  }
 useEffect(() => {
  async function fetchBooks() {
    await load();
  }
  fetchBooks();
}, []);

  if (books === null) return <LoadingSpinner />;

  return (
    <div style={{ padding:16 }}>
      <h1>Catalog</h1>
      <div style={{ marginBottom:16 }}>
        <input
          placeholder="Title"
          value={q.title}
          onChange={e => setQ({ ...q, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min $"
          value={q.minPrice}
          onChange={e => setQ({ ...q, minPrice: e.target.value })}
          style={{ marginLeft:8 }}
        />
        <input
          type="number"
          placeholder="Max $"
          value={q.maxPrice}
          onChange={e => setQ({ ...q, maxPrice: e.target.value })}
          style={{ marginLeft:8 }}
        />
        <select
          value={q.category}
          onChange={e => setQ({ ...q, category: e.target.value })}
          style={{ marginLeft:8 }}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
        <button onClick={load} style={{ marginLeft:8 }}>Search</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 }}>
        {books.map(b => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}