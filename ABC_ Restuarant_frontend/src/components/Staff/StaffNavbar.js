import React from 'react';
import { Link } from 'react-router-dom';
import './Staff.css';
import logo from '../../admin_assets/Admin.png';

const StaffNavbar = ({ setShowLogin }) => {

  return (
    <nav className="staff-navbar">
      <div className="staff-navbar-container">
        <Link to="/staff" className="navbar-logo">
          <img src={logo} alt="Logo" className="staff-logo-image" />
        </Link>
        <ul className="staff-navbar-menu">
          <li><Link to="/staff" className="staff-navbar-item">Home</Link></li>
          <li><Link to="/staff-orders" className="staff-navbar-item">Orders</Link></li>
          <li><Link to="/staff-reservation" className="staff-navbar-item">Reservation</Link></li>
          <li><Link to="/staff-user" className="staff-navbar-item">Users</Link></li>
          <li><Link to="/staff-other" className="staff-navbar-item">Other</Link></li>
        </ul>

        <div className="navbar-auth">
          <button onClick={() => setShowLogin(true)}>Sign Out</button>
        </div>

      </div>
    </nav>
  );
}

export default StaffNavbar;
