import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <nav className="bg-white shadow p-4 flex justify-between">
        <div className="space-x-4">
          <Link to="/dashboard" className="font-semibold text-blue-600">Dashboard</Link>
          <Link to="/equipment" className="text-gray-700 hover:text-blue-500">Equipment</Link>
          <Link to="/requests" className="text-gray-700 hover:text-blue-500">Requests</Link>
          <Link to="/checkout" className="text-gray-700 hover:text-blue-500">Checkout</Link>
          <Link to="/maintenance" className="text-gray-700 hover:text-blue-500">Maintenance</Link>
          <Link to="/vendors" className="text-gray-700 hover:text-blue-500">Vendors</Link>
          <Link to="/admin/requests" className="text-gray-700 hover:text-blue-500">Admin</Link>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;