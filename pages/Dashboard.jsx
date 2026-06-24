import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const fetchTransactions = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const res = await fetch('http://localhost:5000/api/transactions', {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    const data = await res.json();
    if (res.ok) setTransactions(data);
  };

  const deleteTransaction = async (id) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });
    fetchTransactions();
  };

  useEffect(() => { fetchTransactions(); }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  // Simple Bonus Feature: Filtering & Searching
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="dashboard-grid">
      <div className="main-content">
        <h2>Financial Overview Matrix</h2>
        <div className="metrics-row">
          <div className="card card-balance"><h3>Net Balance</h3><p>${netBalance}</p></div>
          <div className="card card-income"><h3>Total Inflow</h3><p>+${totalIncome}</p></div>
          <div className="card card-expense"><h3>Total Outflow</h3><p>-${totalExpenses}</p></div>
        </div>

        {/* Search & Filter Controls */}
        <div className="filter-bar">
          <input type="text" placeholder="Search by description or tag..." value={search} onChange={e => setSearch(e.target.value)} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Records</option>
            <option value="income">Inflow Only</option>
            <option value="expense">Outflow Only</option>
          </select>
        </div>

        <h3>Recent Transactions Ledger</h3>
        <ul className="ledger-list">
          {filteredTransactions.map(t => (
            <li key={t._id} className={`ledger-item ${t.type}`}>
              <span>{t.title} ({t.category})</span>
              <strong>{t.type === 'income' ? '+' : '-'}${t.amount}</strong>
              <button onClick={() => deleteTransaction(t._id)} className="delete-btn">❌</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-content">
        <TransactionForm onTransactionAdded={fetchTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;