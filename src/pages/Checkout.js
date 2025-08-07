import React, { useEffect, useState } from 'react';
import useApi from '../api';
import Layout from '../components/Layout';

const Checkout = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [equipmentId, setEquipmentId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const api = useApi();

  const fetchData = async () => {
    const [eqRes, coRes] = await Promise.all([
      api.get('/equipment'),
      api.get('/checkout/mine')
    ]);
    setEquipmentList(eqRes.data);
    setCheckedOut(coRes.data);
  };

  const checkout = async () => {
    try {
      await api.post('/checkout', { equipment_id: equipmentId, quantity, due_date: dueDate, notes });
      setEquipmentId(''); setQuantity(1); setDueDate(''); setNotes('');
      fetchData();
    } catch (err) {
      alert('Checkout failed');
    }
  };

  const returnItem = async (id) => {
    try {
      await api.put(`/checkout/${id}/return`);
      fetchData();
    } catch (err) {
      alert('Return failed');
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Checkout Equipment</h2>
      <div className="space-y-4 mb-6">
        <select value={equipmentId} onChange={e => setEquipmentId(e.target.value)} className="border p-2 w-full">
          <option value="">Select Equipment</option>
          {equipmentList.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="border p-2 w-full" placeholder="Quantity" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-2 w-full" />
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="border p-2 w-full" placeholder="Notes" />
        <button onClick={checkout} className="bg-blue-500 text-white px-4 py-2">Checkout</button>
      </div>

      <h3 className="text-lg font-bold mb-2">My Checked Out Items</h3>
      <ul className="space-y-2">
        {checkedOut.map(co => (
          <li key={co.id} className="bg-white p-3 rounded shadow">
            {co.equipment_name} (Qty: {co.quantity}) - Due: {new Date(co.due_date).toLocaleDateString()}
            {!co.returned_at && (
              <button onClick={() => returnItem(co.id)} className="ml-4 bg-green-500 text-white px-2 py-1">Return</button>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Checkout;