import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from '../../admin_assets/Admin.png';

const AdminNavbar = ({ setShowLogin }) => {

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/admin" className="navbar-logo">
          <img src={logo} alt="Logo" className="admin-logo-image" />
        </Link>
        <ul className="admin-navbar-menu">
          <li><Link to="/admin" className="admin-navbar-item">Home</Link></li>
          <li><Link to="/admin-product" className="admin-navbar-item">Product</Link></li>
          <li><Link to="/admin-gallery" className="admin-navbar-item">Gallery</Link></li>
          <li><Link to="/admin-facility" className="admin-navbar-item">Facility</Link></li>
          <li><Link to="/admin-reservation" className="admin-navbar-item">Reservation</Link></li>
          <li><Link to="/admin-user" className="admin-navbar-item">Users</Link></li>
          <li><Link to="/admin-other" className="admin-navbar-item">Other</Link></li>
          
        </ul>

        <div className="navbar-auth">
          <button onClick={() => setShowLogin(true)}>Sign Out</button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;
