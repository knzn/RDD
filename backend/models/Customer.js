import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  orders: [
    {
      type: { type: String, enum: ['Quadro', 'Trio', 'Pair', 'Stag', 'Pullet', 'Battlestag', 'Crosses Pullet'], required: true },
      price: { type: Number, enum: [35000, 30000, 23000, 15000, 8000, 5000, 3500], required: true },
      bloodline: { type: String, enum: ['Boston RH', 'Sweater', 'Kelso', 'Hatch'], required: true },
    },
  ],
  payments: [
    {
      type: { type: String, enum: ['Downpayment', 'Partial Payment'], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  facebookLink: { type: String },
  profilePicture: { type: String },
});

export const Customer = mongoose.model('Customer', customerSchema);