import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [orderType, setOrderType] = useState('');
  const [price, setPrice] = useState('');
  const [bloodline, setBloodline] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/customers', {
        name,
        orders: [{ type: orderType, price, bloodline }],
        facebookLink,
        profilePicture,
      });
      console.log('Customer added:', response.data);
      navigate(`/customers/${response.data.uniqueId}`);
    } catch (err) {
      setError('Failed to add customer. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Customer</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Customer Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderType">
                Order Type
              </label>
              <select
                id="orderType"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Order Type</option>
                <option value="Quadro">Quadro</option>
                <option value="Trio">Trio</option>
                <option value="Pair">Pair</option>
                <option value="Stag">Stag</option>
                <option value="Pullet">Pullet</option>
                <option value="Battlestag">Battlestag</option>
                <option value="Crosses Pullet">Crosses Pullet</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <select
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Price</option>
                <option value="35000">35,000</option>
                <option value="30000">30,000</option>
                <option value="23000">23,000</option>
                <option value="15000">15,000</option>
                <option value="8000">8,000</option>
                <option value="5000">5,000</option>
                <option value="3500">3,500</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodline">
                Bloodline
              </label>
              <select
                id="bloodline"
                value={bloodline}
                onChange={(e) => setBloodline(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Bloodline</option>
                <option value="Boston RH">Boston RH</option>
                <option value="Sweater">Sweater</option>
                <option value="Kelso">Kelso</option>
                <option value="Hatch">Hatch</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebookLink">
                Facebook Link
              </label>
              <input
                type="url"
                id="facebookLink"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Facebook link"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                Profile Picture URL
              </label>
              <input
                type="url"
                id="profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter profile picture URL"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;