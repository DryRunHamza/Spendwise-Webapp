import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="centered-container">
      <h2>Application Context Preferences</h2>
      <div className="card">
        <p>Toggle Theme State Management Pipeline:</p>
        <button onClick={toggleTheme} className="btn primary-btn">{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
      </div>
    </div>
  );
};
export default Settings;