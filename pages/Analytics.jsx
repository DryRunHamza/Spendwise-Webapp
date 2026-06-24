import { useEffect, useState } from 'react';

const Analytics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    fetch('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => res.json()).then(d => setData(d));
  }, []);

  const totalInc = data.filter(t => t.type === 'income').reduce((a,c) => a+c.amount,0);
  const totalExp = data.filter(t => t.type === 'expense').reduce((a,c) => a+c.amount,0);

  return (
    <div className="centered-container">
      <h2>Financial Analytics Module</h2>
      <div className="card">
        <p><strong>Total Income:</strong> ${totalInc}</p>
        <p><strong>Total Expenses:</strong> ${totalExp}</p>
        <p><strong>Efficiency Ratio:</strong> {totalInc > 0 ? ((totalExp / totalInc) * 100).toFixed(1) : 0}%</p>
      </div>
    </div>
  );
};
export default Analytics;