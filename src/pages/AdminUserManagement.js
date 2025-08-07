import React, { useEffect, useState } from 'react';
import useApi from '../api';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const api = useApi();

  const fetchUsers = async () => {
    const res = await api.get('/auth/users');
    setUsers(res.data);
  };

  const createUser = async () => {
    await api.post('/auth/register', { name, email, password, role });
    setName('');
    setEmail('');
    setPassword('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Create New User</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={createUser}>Create User</button>

      <h3>Existing Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.role}) - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUserManagement;