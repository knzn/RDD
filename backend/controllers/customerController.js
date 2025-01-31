import { Customer } from '../models/Customer.js';

export const addCustomer = async (req, res) => {
  const { name, orders, payments, facebookLink, profilePicture } = req.body;
  try {
    const uniqueId = `${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
    const customer = await Customer.create({ name, uniqueId, orders, payments, facebookLink, profilePicture });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const customer = await Customer.findOne({ uniqueId });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find(); // Fetch all customers
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const customer = await Customer.findOneAndDelete({ uniqueId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};