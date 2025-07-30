import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', password:'' });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registered—please log in.');
      nav('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth:400, margin:'auto', padding:16 }}>
      <h1>Register</h1>
      {['name','email','phone','address','password'].map(f => (
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
      <button>Create Account</button>
    </form>
  );
}