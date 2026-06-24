import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
     <a href="/" className="brand-logo">
  💰 SpendWise
    </a>
      <div className="nav-links">
        <button onClick={toggleTheme} className="theme-btn">{darkMode ? '☀️ Light' : '🌙 Dark'}</button>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/income">Income</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/help">Help</Link>
            <button onClick={() => { logout(); navigate('/'); }} className="logout-btn">Logout ({user.name})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;