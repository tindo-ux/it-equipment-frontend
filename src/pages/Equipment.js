import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [name, setName] = useState('');

  const fetchEquipment = async () => {
    const res = await api.get('/equipment');
    setEquipment(res.data);
  };

  const addEquipment = async () => {
    try {
      await api.post('/equipment', { name, quantity: 1 });
      setName('');
      fetchEquipment();
    } catch (err) {
      alert('Error adding equipment');
    }
  };

  useEffect(() => { fetchEquipment(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Equipment</h2>
      <div className="mb-4 flex space-x-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New Equipment" className="border p-2" />
        <button onClick={addEquipment} className="bg-blue-500 text-white px-4">Add</button>
      </div>
      <ul className="space-y-2">
        {equipment.map(eq => (
          <li key={eq.id} className="p-2 bg-white rounded shadow">{eq.name} (Qty: {eq.quantity})</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Equipment;