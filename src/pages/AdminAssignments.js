import React, { useEffect, useState } from 'react';
import useApi from '../api';
import Layout from '../components/Layout';

const AdminAssignments = () => {
  const [requests, setRequests] = useState([]);
  const api = useApi();

  const fetchData = async () => {
    const res = await api.get('/requests?status=approved');
    setRequests(res.data);
  };

  const assignEquipment = async (request) => {
    try {
      await api.post('/assignments', {
        user_id: request.user_id,
        equipment_id: request.equipment_id,
        quantity: request.quantity,
        request_id: request.id,
        notes: 'Assigned by admin'
      });
      fetchData();
    } catch (err) {
      alert('Assignment failed');
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Assign Equipment</h2>
      <ul className="space-y-2">
        {requests.map(req => (
          <li key={req.id} className="border p-3 rounded bg-white shadow">
            <div>
              <strong>{req.user_name || `User #${req.user_id}`}</strong> requested <strong>{req.equipment_name || `Equipment #${req.equipment_id}`}</strong>
              <br />Qty: {req.quantity} — Reason: {req.reason}
            </div>
            <button onClick={() => assignEquipment(req)} className="mt-2 bg-blue-600 text-white px-4 py-1">Assign</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AdminAssignments;