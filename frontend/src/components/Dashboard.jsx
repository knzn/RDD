import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/add-customer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <h2 className="text-xl font-semibold text-blue-600">Add Customer</h2>
            <p className="text-gray-600">Add a new customer to the system.</p>
          </Link>
          <Link
            to="/customers"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <h2 className="text-xl font-semibold text-blue-600">View Customers</h2>
            <p className="text-gray-600">View and manage existing customers.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;