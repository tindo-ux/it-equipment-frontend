import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [equipmentId, setEquipmentId] = useState('');
  const [reason, setReason] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [equipmentList, setEquipmentList] = useState([]);

  const fetchData = async () => {
    const [eqRes, reqRes] = await Promise.all([
      api.get('/equipment'),
      api.get('/requests/mine')
    ]);
    setEquipmentList(eqRes.data);
    setRequests(reqRes.data);
  };

  const submitRequest = async () => {
    try {
      await api.post('/requests', { equipment_id: equipmentId, quantity, reason });
      setEquipmentId('');
      setQuantity(1);
      setReason('');
      fetchData();
    } catch (err) {
      alert('Error submitting request');
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">My Requests</h2>
      <div className="space-y-4 mb-6">
        <select value={equipmentId} onChange={e => setEquipmentId(e.target.value)} className="border p-2 w-full">
          <option value="">Select Equipment</option>
          {equipmentList.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="border p-2 w-full" placeholder="Quantity" />
        <textarea value={reason} onChange={e => setReason(e.target.value)} className="border p-2 w-full" placeholder="Reason" />
        <button onClick={submitRequest} className="bg-green-600 text-white px-4 py-2">Submit Request</button>
      </div>
      <ul className="space-y-2">
        {requests.map(req => (
          <li key={req.id} className="bg-white border p-2 rounded shadow">
            {req.equipment_name || `Equipment #${req.equipment_id}`} - {req.quantity} pcs - {req.status}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Requests;