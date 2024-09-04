import React, { useContext } from 'react';
import './Navbar.css';
import Customer from '../../assets/Customer.png'
import cartIcon from '../../assets/basket_icon.png';
import { Link } from 'react-router-dom';
import { StoreContext } from '../StoreContext/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <Link to='/'><img src={Customer} alt="Logo" className="logo-image" /></Link>
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

          <a href="/cart" className="cart-button">
            <Link to='/cart'><img src={cartIcon} alt="Cart" className="cart-icon" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            </div>
          </a>

          <button onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
