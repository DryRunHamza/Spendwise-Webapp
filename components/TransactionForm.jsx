import { useState } from 'react';

const TransactionForm = ({ onTransactionAdded, defaultType = 'expense' }) => {
  const [formData, setFormData] = useState({ title: '', amount: '', type: defaultType, category: '', date: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ title: '', amount: '', type: defaultType, category: '', date: '', description: '' });
        onTransactionAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>Add New Record</h3>
      <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
      <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
      <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Transaction'}</button>
    </form>
  );
};

export default TransactionForm;