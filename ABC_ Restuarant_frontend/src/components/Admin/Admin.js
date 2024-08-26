import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import logo from '../../admin_assets/Admin.png';

const Admin = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="admin-container">
        <div className="admin-section" onClick={() => navigateTo('/orders')}>
          <h2>Orders</h2>
        </div>
        <div className="admin-section" onClick={() => navigateTo('/adminmenu')}>
          <h2>Menu</h2>
        </div>
        <div className="admin-section" onClick={() => navigateTo('/adminreservations')}>
          <h2>Reservations</h2>
        </div>
        <div className="admin-section" onClick={() => navigateTo('/staff')}>
          <h2>Staff</h2>
        </div>
      </div>
    </div>
  );
}

export default Admin;
