import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  const { uniqueId } = useParams();
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uniqueId) {
          // Reset customer state
          setCustomer(null); // Reset customer state before fetching new data
          const response = await axiosInstance.get(`/customers/${uniqueId}`);
          console.log('Customer Details:', response.data); // Debug log
          setCustomer(response.data);
        } else {
          // Fetch all customers
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
          }
          const response = await axiosInstance.get('/customers');
          console.log('All Customers:', response.data); // Debug log
          setCustomers(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData()
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {uniqueId ? (
          // Display details of a specific customer
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Customer Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-600">{customer.name}</h2>
              <p><strong>Unique ID:</strong> {customer.uniqueId}</p>
              <p><strong>Order Type:</strong> {customer.orders[0].type}</p>
              <p><strong>Price:</strong> {customer.orders[0].price}</p>
              <p><strong>Bloodline:</strong> {customer.orders[0].bloodline}</p>
              <p><strong>Facebook Link:</strong> <a href={customer.facebookLink} className="text-blue-500 hover:underline">{customer.facebookLink}</a></p>
              <img src={customer.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto mt-4" />
            </div>
          </div>
        ) : (
          // Display list of all customers
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Customers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((customer) => (
                <div key={customer._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-blue-600">{customer.name}</h2>
                  <p className="text-gray-600">Unique ID: {customer.uniqueId}</p>
                  <Link
                    to={`/customers/${customer.uniqueId}`}
                    className="mt-4 inline-block text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.uniqueId)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;