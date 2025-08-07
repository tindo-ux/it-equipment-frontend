import React, { useState } from 'react';
import axios from 'axios';

function MaintenanceScheduler() {
  const [equipmentId, setEquipmentId] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  const scheduleMaintenance = async () => {
    await axios.post('http://localhost:5000/api/maintenance', {
      equipment_id: equipmentId,
      scheduled_date: date,
      description: desc,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Maintenance scheduled.');
  };

  return (
    <div>
      <input placeholder="Equipment ID" value={equipmentId} onChange={e => setEquipmentId(e.target.value)} />
      <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
      <button onClick={scheduleMaintenance}>Schedule Maintenance</button>
    </div>
  );
}

export default MaintenanceScheduler;