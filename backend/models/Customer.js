import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  orders: [
    {
      type: { type: String, enum: ['Quadro', 'Trio', 'Pair', 'Stag', 'Pullet', 'Battlestag', 'Crosses Pullet'], required: true },
      price: { type: Number, required: true },
      bloodlines: [{ type: String, enum: ['Stag: Larry Romero Raptor Sweater', 'Stag: Larry Romero YLH', 'Stag: Larry Romero Hatch Grey', 'Stag: Carol Nesmith Gilmore Hatch', 'Stag: Luke Breesee Yellow Leg Kelso', 'Stag: Paul Morris Boston Roundhead', 'Stag: LDT Boston RH', 'Stag: Crowsville Sweaters', 'Stag: NJ Biason Sweaters', 'Stag: RDD dom/bulik', 'Pullet: Larry Romero Raptor Sweater', 'Pullet: Larry Romero YLH', 'Pullet: Larry Romero Hatch Grey', 'Pullet: Carol Nesmith Gilmore Hatch', 'Pullet: Luke Breesee Yellow Leg Kelso', 'Pullet: Paul Morris Boston Roundhead', 'Pullet: LDT Boston RH', 'Pullet: Crowsville Sweaters', 'Pullet: NJ Biason Sweaters', 'Pullet: Sweater'] }], // Allow multiple bloodlines
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