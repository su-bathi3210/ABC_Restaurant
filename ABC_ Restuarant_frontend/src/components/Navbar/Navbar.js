import React from 'react';
import './Navbar.css';
import Customer from '../../assets/Customer.png';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <Link to='/'><img src={Customer}
            style={{ marginLeft: '-65.6px' }}
            alt="Logo" className="logo-image" /></Link>
        </a>
        <ul className="navbar-menu">
          <li><a href="/" className="navbar-item">Home</a></li>
          <li><a href="/about" className="navbar-item">About</a></li>
          <li><a href="/menu" className="navbar-item">Menu</a></li>
          <li><a href="/gallery" className="navbar-item">Gallery</a></li>
          <li><a href="/facility" className="navbar-item">Facility</a></li>
          <li><a href="/reservation" className="navbar-item">Reservation</a></li>
          <li><a href="/query" className="navbar-item">Query</a></li>
          <li><a href="/contact" className="navbar-item">Contact</a></li>
        </ul>
        <div className="navbar-auth">
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
