import mongoose from 'mongoose'; // [cite: 103]

const transactionSchema = new mongoose.Schema({ // [cite: 104]
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // [cite: 105]
  title: { type: String, required: true, trim: true }, // [cite: 106]
  amount: { type: Number, required: true }, // [cite: 107]
  type: { type: String, enum: ['income', 'expense'], required: true }, // [cite: 108]
  category: { type: String, required: true }, // [cite: 109]
  date: { type: Date, required: true }, // [cite: 110]
  description: { type: String } // [cite: 111]
}, { timestamps: true }); // [cite: 112]

export default mongoose.model('Transaction', transactionSchema); // [cite: 113]