import express from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware globally to all endpoints below
router.use(protect);

// 1. GET ALL TRANSACTIONS (Web filters automatically, mobile sees the fallback data)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST NEW TRANSACTION
router.post('/', async (req, res) => {
  const { title, amount, type, category, date, description } = req.body;
  try {
    const transaction = await Transaction.create({
      user: req.user._id, // Always guaranteed to be a valid MongoDB ObjectId now!
      title,
      amount: Number(amount),
      type,
      category,
      date: date || new Date(),
      description: description || ''
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE TRANSACTION
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Transaction record not found or unauthorized' });
    }
    await transaction.deleteOne();
    res.json({ message: 'Transaction successfully removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;