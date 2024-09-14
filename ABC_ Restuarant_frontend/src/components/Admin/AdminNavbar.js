import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';
import logo from '../../admin_assets/Admin.png';

const AdminNavbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
    const [signOutSuccess, setSignOutSuccess] = useState(false);

    const handleSignOut = () => {
      setSignOutSuccess(true);

      setTimeout(() => {
          navigate('/');
          setSignOutSuccess(false);
      }, 2000);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/admin" className="navbar-logo">
          <img src={logo} alt="Logo" className="admin-logo-image" />
        </Link>
        <ul className="admin-navbar-menu">
          <li><Link to="/admin" className="admin-navbar-item">Home</Link></li>
          <li><Link to="/admin-product" className="admin-navbar-item">Menu</Link></li>
          <li><Link to="/admin-gallery" className="admin-navbar-item">Gallery</Link></li>
          <li><Link to="/admin-facility" className="admin-navbar-item">Facility</Link></li>
          <li><Link to="/admin-reservation" className="admin-navbar-item">Reservation</Link></li>
          <li><Link to="/admin-query" className="admin-navbar-item">Query</Link></li>
          <li><Link to="/admin-user" className="admin-navbar-item">Users</Link></li>
          <li><Link to="/admin-other" className="admin-navbar-item">Other</Link></li>
        </ul>

        <div className="navbar-auth">
        <button onClick={handleSignOut} alt="Sign Out Button">Sign Out</button>
        </div>
      </div>
      
      {signOutSuccess && (
                <div className="sign-out-message">
                    <p>Sign out successful!</p>
                </div>
            )}
    </nav>
  );
};

export default AdminNavbar;
