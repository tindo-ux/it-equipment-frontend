import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', email: '' });

  const fetchVendors = async () => {
    try {
      const res = await api.get('/vendors');
      setVendors(res.data);
    } catch (err) {
      alert('Error loading vendors');
    }
  };

  const addVendor = async () => {
    try {
      await api.post('/vendors', form);
      setForm({ name: '', contact: '', email: '' });
      fetchVendors();
    } catch (err) {
      alert('Failed to add vendor');
    }
  };

  const deleteVendor = async (id) => {
    if (!window.confirm('Delete this vendor?')) return;
    try {
      await api.delete(`/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      alert('Failed to delete vendor');
    }
  };

  useEffect(() => { fetchVendors(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Vendor Management</h2>

      <div className="space-y-2 mb-6">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} className="border p-2 w-full" />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full" />
        <button onClick={addVendor} className="bg-indigo-600 text-white px-4 py-2">Add Vendor</button>
      </div>

      <ul className="space-y-2">
        {vendors.map(v => (
          <li key={v.id} className="bg-white p-3 rounded shadow">
            <div><strong>{v.name}</strong></div>
            <div>Contact: {v.contact}</div>
            <div>Email: {v.email}</div>
            <button onClick={() => deleteVendor(v.id)} className="mt-1 bg-red-500 text-white px-3 py-1">Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Vendors;