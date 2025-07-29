import React from 'react';
import { Link } from 'react-router-dom'; // or use <a> tags if not using React Router
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="ranking-navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Rankings</h1>
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Party Ranking</Link></li>
          <li><Link to="/" className="nav-link">Live Ranking</Link></li>
          <li><Link to="/" className="nav-link">Hourly Ranking</Link></li>
          <li><Link to="/" className="nav-link">Family Ranking</Link></li>
          <li><Link to="/" className="nav-link">Weekly Contribution Ranking</Link></li>
          <li><Link to="/addUsers" className="nav-link2">Add more users </Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;