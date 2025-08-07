import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
