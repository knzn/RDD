import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [orderType, setOrderType] = useState('');
  const [price, setPrice] = useState('');
  const [bloodlines, setBloodlines] = useState([]); // State for multiple bloodlines
  const [downpayment, setDownpayment] = useState(0); // State for downpayment
  const [facebookLink, setFacebookLink] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/customers', {
        name,
        orders: [{ type: orderType, price, bloodlines }],
        payments: [{ type: 'Downpayment', amount: downpayment }], // Add downpayment
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

  const handleBloodlineChange = (e) => {
    const selectedBloodlines = Array.from(e.target.selectedOptions, (option) => option.value);
    setBloodlines(selectedBloodlines);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Customer</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Add Customer</h2>
          <p className="text-gray-500 text-sm mb-4">Enter customer details below.</p>
          
          {/* Customer Name */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Customer Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          
          {/* Order Type */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="orderType">Order Type</label>
          <select id="orderType" value={orderType} onChange={(e) => setOrderType(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select Order Type</option>
            <option value="Quadro">Quadro</option>
            <option value="Trio">Trio</option>
            <option value="Pair">Pair</option>
            <option value="Stag">Stag</option>
            <option value="Pullet">Pullet</option>
            <option value="Battlestag">Battlestag</option>
            <option value="Crosses Pullet">Crosses Pullet</option>
          </select>
          
          {/* Price */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="price">Price</label>
          <select id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select Price</option>
            <option value="35000">35,000</option>
            <option value="30000">30,000</option>
            <option value="23000">23,000</option>
            <option value="15000">15,000</option>
            <option value="8000">8,000</option>
            <option value="5000">5,000</option>
            <option value="3500">3,500</option>
          </select>
          
          
          {/* Bloodlines */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="bloodlines">Bloodlines</label>
          <select id="bloodlines" multiple value={bloodlines} onChange={handleBloodlineChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
            <option value="Stag: Larry Romero Raptor Sweater">Stag: Larry Romero Raptor Sweater</option>
            <option value="Stag: Larry Romero YLH">Stag: Larry Romero YLH</option>
            <option value="Stag: Larry Romero Hatch Grey">Stag: Larry Romero Hatch Grey</option>
            <option value="Stag: Carol Nesmith Gilmore Hatch">Stag: Carol Nesmith Gilmore Hatch</option>
            <option value="Stag: Luke Breesee Yellow Leg Kelso">Stag: Luke Breesee Yellow Leg Kelso</option>
            <option value="Stag: Paul Morris Boston Roundhead">Stag: Paul Morris Boston Roundhead</option>
            <option value="Stag: LDT Boston RH">Stag: LDT Boston RH</option>
            <option value="Stag: Crowsville Sweaters">Stag: Crowsville Sweaters</option>
            <option value="Stag: NJ Biason Sweaters">Stag: NJ Biason Sweaters</option>
            <option value="Stag: RDD dom/bulik">Stag: RDD dom/bulik</option>
            <option value="Pullet: Larry Romero Raptor Sweater">Pullet: Larry Romero Raptor Sweater</option>
            <option value="Pullet: Larry Romero YLH">Pullet: Larry Romero YLH</option>
            <option value="Pullet: Larry Romero Hatch Grey">Pullet: Larry Romero Hatch Grey</option>
            <option value="Pullet: Carol Nesmith Gilmore Hatch">Pullet: Carol Nesmith Gilmore Hatch</option>
            <option value="Pullet: Luke Breesee Yellow Leg Kelso">Pullet: Luke Breesee Yellow Leg Kelso</option>
            <option value="Pullet: Paul Morris Boston Roundhead">Pullet: Paul Morris Boston Roundhead</option>
            <option value="Pullet: LDT Boston RH">Pullet: LDT Boston RH</option>
            <option value="Pullet: Crowsville Sweaters">Pullet: Crowsville Sweaters</option>
            <option value="Pullet: NJ Biason Sweaters">Pullet: NJ Biason Sweaters</option>
            <option value="Pullet: RDD dom/bulik">Pullet: RDD dom/bulik</option>
          </select>
          
          {/* Downpayment */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="downpayment">Downpayment</label>
          <input type="number" id="downpayment" value={downpayment} onChange={(e) => setDownpayment(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          
          {/* Facebook Link */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="facebookLink">Facebook Link</label>
          <input type="url" id="facebookLink" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          
          {/* Profile Picture URL */}
          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2" htmlFor="profilePicture">Profile Picture URL</label>
          <input type="url" id="profilePicture" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter profile picture URL" />
          
          {/* Submit Button */}
          <div className="flex justify-end gap-2 mt-6">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Customer</button>
          </div>
        </form>



      </div>
    </div>
  );
};

export default CustomerForm;