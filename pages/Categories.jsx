import { useState, useEffect } from 'react';

const Categories = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    fetch('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => res.json())
      .then(d => setCats([...new Set(d.map(t => t.category))]));
  }, []);

  return (
    <div className="centered-container">
      <h2>Active Budgeting Categories</h2>
      <ul>{cats.map((c, i) => <li key={i} className="card" style={{margin: '5px', padding: '10px'}}>{c}</li>)}</ul>
    </div>
  );
};
export default Categories;