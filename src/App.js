import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Requests from './pages/Requests';
import Checkout from './pages/Checkout';
import AdminRequests from './pages/AdminRequests';
import AdminAssignments from './pages/AdminAssignments';
import Maintenance from './pages/Maintenance';
import Vendors from './pages/Vendors';
import LoadingSpinner from './components/LoadingSpinner';

const AppContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <Router>
        {loading && <LoadingSpinner />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/equipment" element={token ? <Equipment /> : <Navigate to="/login" />} />
          <Route path="/requests" element={token ? <Requests /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/admin/requests" element={token ? <AdminRequests /> : <Navigate to="/login" />} />
          <Route path="/admin/assignments" element={token ? <AdminAssignments /> : <Navigate to="/login" />} />
          <Route path="/maintenance" element={token ? <Maintenance /> : <Navigate to="/login" />} />
          <Route path="/vendors" element={token ? <Vendors /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default App;