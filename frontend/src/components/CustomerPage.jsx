import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  const { uniqueId } = useParams(); // Get the uniqueId from the URL
  const [customer, setCustomer] = useState(null); // State for a specific customer
  const [customers, setCustomers] = useState([]); // State for all customers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0); // State for payment amount
  const navigate = useNavigate();

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uniqueId) {
          // Fetch a specific customer
          const response = await axiosInstance.get(`/customers/${uniqueId}`);
          setCustomer(response.data);
        } else {
          // Fetch all customers
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
          }
          const response = await axiosInstance.get('/customers');
          setCustomers(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error:', err); // Log the full error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uniqueId, navigate]);

  const handleDelete = async (uniqueId) => {
    try {
      await axiosInstance.delete(`/customers/${uniqueId}`);
      // Remove the deleted customer from the list
      setCustomers(customers.filter((customer) => customer.uniqueId !== uniqueId));
    } catch (err) {
      setError('Failed to delete customer.');
      console.error(err);
    }
  };

  const handleAddPayment = async () => {
    try {
      const response = await axiosInstance.post(`/customers/${uniqueId}/payments`, {
        type: 'Partial Payment',
        amount: paymentAmount,
      });
      setCustomer(response.data); // Update customer data
      setPaymentAmount(0); // Reset payment amount
    } catch (err) {
      setError('Failed to add payment.');
      console.error(err);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await axiosInstance.delete(`/customers/${uniqueId}/payments/${paymentId}`);
      setCustomer(response.data); // Update customer data
    } catch (err) {
      setError('Failed to delete payment.');
      console.error(err);
    }
  };

 // Calculate the remaining balance based on total price and payments
 const calculateRemainingBalance = () => {
  if (!customer || !customer.orders.length) return 0;

  const totalPrice = customer.orders.reduce((sum, order) => sum + (order.price || 0), 0);
  const totalPayments = customer.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  return totalPrice - totalPayments;
};

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4">
      <div className="max-w-6xl mx-auto">
        {uniqueId ? (
          // Display details of a specific customer
          <div className="min-h-screen bg-[#F5F5F5] p-6 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
              <h2 className="text-3xl font-bold text-center text-[#1E90FF] mb-6">
                RDD Moonchild GF
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Section - Customer Info */}
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p><strong>Order Type:</strong> {customer.orders[0]?.type}</p>
                    <p><strong>Price:</strong> ₱{customer.orders[0]?.price}</p>
                    <strong>Bloodlines:</strong> {customer.orders[0]?.bloodlines && (
                      <ul className="list-disc pl-5">
                        {customer.orders[0].bloodlines.map((bloodline, index) => (
                          <li key={index}>{bloodline}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Balance Info */}
                  <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-[#1E90FF]">Remaining Balance</h3>
                    <p className="text-xl font-bold">
                      ₱{calculateRemainingBalance().toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Right Section - Profile and Design */}
                <div className="flex flex-col items-center space-y-4">
                  <img src={customer.profilePicture} alt="Profile" className="w-48 h-48 rounded-full shadow-lg" />
                  <h2 className="text-3xl font-bold text-center text-[#1E90FF] mb-6">{customer.name}</h2>
                  <p>
                    <a 
                      href={customer.facebookLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Open Facebook
                      </button>
                    </a>
                  </p>
                </div>
              </div>

              {/* Payment Section (Admin Only) */}
              {localStorage.getItem('token') && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-[#1E90FF]">Add Payment</h3>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mt-2"
                    placeholder="Enter payment amount"
                  />
                  <button
                    onClick={handleAddPayment}
                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Payment
                  </button>
                </div>
              )}

              {/* Payment History */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-[#1E90FF]">Payment History</h3>
                <ul className="mt-2">
                  {customer.payments.map((payment) => (
                    <li key={payment._id} className="flex justify-between items-center border-b py-2">
                      <div>
                        <p><strong>Type:</strong> {payment.type}</p>
                        <p><strong>Amount:</strong> ₱{payment.amount}</p>
                        <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                      {localStorage.getItem('token') && (
                        <button
                          onClick={() => handleDeletePayment(payment._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Display list of all customers
          <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#1E90FF]">All Customers</h1>

              {/* Buttons */}
              <div className="space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-customer"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Add Customer
                </Link>
              </div>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
                    <th className="p-4">Customer</th>
                    <th className="p-4 text-center">Profile</th>
                    <th className="p-4 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer._id} className="border-t text-gray-700 hover:bg-gray-50">
                      {/* Profile Picture + Name + Email */}
                      <td className="p-4 flex items-center space-x-3">
                        {customer.profilePicture ? (
                          <img className="w-10 h-10 rounded-full" src={customer.profilePicture} alt={customer.name} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                            {customer.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </td>

                      {/* Profile Button */}
                      <td className="p-4 text-center">
                        <Link
                          to={`/customers/${customer.uniqueId}`}
                          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 text-sm font-medium"
                        >
                          View Profile
                        </Link>
                      </td>

                      {/* Delete Button */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(customer.uniqueId)}
                          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;