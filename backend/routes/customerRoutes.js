import express from 'express';
import { addCustomer, getCustomer, getAllCustomers, deleteCustomer, addPayment, deletePayment } from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addCustomer); // Protected route
router.get('/:uniqueId', getCustomer); // Public route
router.get('/', getAllCustomers); // GET /api/customers
router.delete('/:uniqueId', protect, deleteCustomer); // Protected route
router.post('/:uniqueId/payments', protect, addPayment); // Add payment route
router.delete('/:uniqueId/payments/:paymentId', protect, deletePayment); // Add delete payment route

export default router;