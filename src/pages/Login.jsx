import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/auth/login', form);
      nav('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth:400, margin:'auto', padding:16 }}>
      <h1>Login</h1>
      {['email','password'].map(f => (
        <div key={f} style={{ marginBottom:8 }}>
          <label>{f.charAt(0).toUpperCase()+f.slice(1)}:</label><br/>
          <input
            type={f==='password'?'password':'text'}
            value={form[f]}
            onChange={e => setForm({...form, [f]: e.target.value})}
            required
            style={{ width:'100%' }}
          />
        </div>
      ))}
      <button>Log In</button>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}