import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../admin_assets/staff.png';
import './Staff.css';

const StaffNavbar = ({ setShowLogin }) => {

  return (
    <nav className="staff-navbar">
      <div className="staff-navbar-container">
        <Link to="/staff" className="navbar-logo">
          <img src={logo} alt="Logo" className="staff-logo-image" />
        </Link>
        <ul className="staff-navbar-menu">
          <li><Link to="/staff" className="staff-navbar-item">Home</Link></li>
          <li><Link to="/staff-order" className="staff-navbar-item">Orders</Link></li>
          <li><Link to="/staff-reservation" className="staff-navbar-item">Reservation</Link></li>
          <li><Link to="/staff-feedback" className="staff-navbar-item">Feedback</Link></li>
          <li><Link to="/staff-deals" className="staff-navbar-item">Deals</Link></li>
          <li><Link to="/staff-branch" className="staff-navbar-item">Branch</Link></li>
          <li><Link to="/staff-query" className="staff-navbar-item">Query</Link></li>
        </ul>

        <div className="navbar-auth">
        <Link to=''><button onClick={() => setShowLogin(true)}>Sign Out</button></Link>
        </div>

      </div>
    </nav>
  );
}

export default StaffNavbar;
