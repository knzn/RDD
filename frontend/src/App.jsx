import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Correct path
import Register from './components/Register'; // Correct path
import CustomerForm from './components/CustomerForm'; // Correct path
import CustomerPage from './components/CustomerPage'; // Correct path
import Dashboard from './components/Dashboard'; // Correct path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-customer" element={<CustomerForm />} />
        <Route path="/customers/:uniqueId" element={<CustomerPage />} />
        <Route path="/customers" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
};

export default App;