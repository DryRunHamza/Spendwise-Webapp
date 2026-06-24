import { Link } from 'react-router-dom';

const Home = () => (
  <div className="centered-container hero">
    <h1>Take Control of Your Personal Finances</h1>
    <p>Track your real-time cash flow, manage dynamic expenses, and view visual analytics instantly.</p>
    <div className="hero-buttons">
      <Link to="/signup" className="btn primary-btn">Get Started Today</Link>
      <Link to="/login" className="btn secondary-btn">Sign In</Link>
    </div>
  </div>
);

export default Home;