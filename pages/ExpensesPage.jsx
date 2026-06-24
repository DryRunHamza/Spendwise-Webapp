import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const res = await fetch('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${user.token}` } });
    const data = await res.json();
    if (res.ok) setExpenses(data.filter(t => t.type === 'expense'));
  };
  useEffect(() => { fetchExpenses(); }, []);

  return (
    <div className="dashboard-grid">
      <div>
        <h2>Outflow Allocation Ledger</h2>
        <ul>
          {expenses.map(e => <li key={e._id} className="ledger-item expense">{e.title} - ${e.amount}</li>)}
        </ul>
      </div>
      <TransactionForm onTransactionAdded={fetchExpenses} defaultType="expense" />
    </div>
  );
};
export default ExpensesPage;