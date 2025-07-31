import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // ✅ import navigate

export default function AdminLogin({ setAdminToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', form, {withCredentials: true});
      localStorage.setItem('adminToken', res.data.token);
      if (setAdminToken) setAdminToken(res.data.token);

      // ✅ redirect to admin dashboard after successful login
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}