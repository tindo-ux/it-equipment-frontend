import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Maintenance = () => {
  const [issues, setIssues] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentId, setEquipmentId] = useState('');
  const [issue, setIssue] = useState('');

  const fetchData = async () => {
    const [eqRes, issuesRes] = await Promise.all([
      api.get('/equipment'),
      api.get('/maintenance')
    ]);
    setEquipmentList(eqRes.data);
    setIssues(issuesRes.data);
  };

  const reportIssue = async () => {
    try {
      await api.post('/maintenance', { equipment_id: equipmentId, issue });
      setEquipmentId('');
      setIssue('');
      fetchData();
    } catch (err) {
      alert('Issue reporting failed');
    }
  };

  const updateStatus = async (id) => {
    const notes = prompt('Enter notes for resolution:');
    if (!notes) return;
    try {
      await api.put(`/maintenance/${id}`, { status: 'completed', notes });
      fetchData();
    } catch (err) {
      alert('Status update failed');
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Maintenance Issues</h2>
      <div className="space-y-4 mb-6">
        <select value={equipmentId} onChange={e => setEquipmentId(e.target.value)} className="border p-2 w-full">
          <option value="">Select Equipment</option>
          {equipmentList.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <textarea value={issue} onChange={e => setIssue(e.target.value)} className="border p-2 w-full" placeholder="Describe the issue" />
        <button onClick={reportIssue} className="bg-yellow-500 text-white px-4 py-2">Report Issue</button>
      </div>
      <ul className="space-y-2">
        {issues.map(iss => (
          <li key={iss.id} className="bg-white p-3 rounded shadow">
            {iss.equipment_name || `Equipment #${iss.equipment_id}`}: {iss.issue} — {iss.status}
            {iss.status !== 'completed' && (
              <button onClick={() => updateStatus(iss.id)} className="ml-4 bg-green-500 text-white px-2 py-1">Mark Resolved</button>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Maintenance;