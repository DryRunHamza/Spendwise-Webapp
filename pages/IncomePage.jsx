import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';

const IncomePage = () => {
  const [incomes, setIncomes] = useState([]);
  const fetchIncomes = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const res = await fetch('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${user.token}` } });
    const data = await res.json();
    if (res.ok) setIncomes(data.filter(t => t.type === 'income'));
  };
  useEffect(() => { fetchIncomes(); }, []);

  return (
    <div className="dashboard-grid">
      <div>
        <h2>Inflow Management Portal</h2>
        <ul>
          {incomes.map(i => <li key={i._id} className="ledger-item income">{i.title} - ${i.amount}</li>)}
        </ul>
      </div>
      <TransactionForm onTransactionAdded={fetchIncomes} defaultType="income" />
    </div>
  );
};
export default IncomePage;