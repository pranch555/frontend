import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';   // ✅ Link imported
import api from '../api/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });  // ✅ form state
  const [loading, setLoading] = useState(false);                  // ✅ loading state
  const [error, setError] = useState('');                         // ✅ error state
  const nav = useNavigate();

  // ✅ define submit function
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/login', form, { withCredentials: true });
      nav('/'); // redirect to home
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 8 }}>
        <label>Email:</label><br />
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Password:</label><br />
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: '100%' }}
        />
      </div>

      <button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}