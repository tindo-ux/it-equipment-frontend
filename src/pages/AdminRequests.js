import React, { useEffect, useState } from 'react';
import useApi from '../api';
import Layout from '../components/Layout';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const api = useApi();

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data);
    } catch (err) {
      alert('Error loading requests');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      fetchRequests();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">All Equipment Requests</h2>
      <ul className="space-y-2">
        {requests.map(req => (
          <li key={req.id} className="border p-3 rounded bg-white shadow">
            <div className="mb-2">
              <strong>{req.user_name || `User #${req.user_id}`}</strong> requested <strong>{req.equipment_name || `Equipment #${req.equipment_id}`}</strong><br/>
              Qty: {req.quantity} — Reason: {req.reason}<br/>
              Status: <span className="font-bold">{req.status}</span>
            </div>
            {req.status === 'pending' && (
              <div className="space-x-2">
                <button onClick={() => updateStatus(req.id, 'approved')} className="bg-green-500 text-white px-3 py-1">Approve</button>
                <button onClick={() => updateStatus(req.id, 'rejected')} className="bg-red-500 text-white px-3 py-1">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AdminRequests;