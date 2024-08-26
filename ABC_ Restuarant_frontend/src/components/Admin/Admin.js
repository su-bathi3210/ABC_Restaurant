import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from '../../admin_assets/Admin.png';
import { assets } from '../../assets/assets'

const Admin = () => {
  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          <Link to="/admin" className="navbar-logo">
            <img src={logo} alt="Logo" className="admin-logo-image" />
          </Link>
          <ul className="admin-navbar-menu">
            <li><Link to="/admin" className="admin-navbar-item">Home</Link></li>
            <li><Link to="/menu" className="admin-navbar-item">Menu</Link></li>
            <li><Link to="/gallery" className="admin-navbar-item">Gallery</Link></li>
            <li><Link to="/facility" className="admin-navbar-item">Facility</Link></li>
            <li><Link to="/reservation" className="admin-navbar-item">Reservation</Link></li>
            <li><Link to="/contact" className="admin-navbar-item">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <div className='admin-header'>
        <div className="admin-header-contents">
          <h2>Order Your<br />Favorite Food Here</h2>
          <p>Choose from a diverse menu featuring a delectable array of dishes made with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings with a delightful dining experience, one delicious meal at a time.</p>
        </div>
      </div>

      <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br />ABC App </p>
        <div className='app-download-platforms'>
          <img src={assets.play_store} alt='' />
          <img src={assets.app_store} alt='' />
        </div>
      </div>

      <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='ABC Restaurant Logo' className='footer-logo' />
          <p>
            At ABC Restaurant, we are committed to delivering a memorable dining experience that delights your taste buds and warms your heart. Our passion for culinary excellence is reflected in every dish, crafted with the freshest ingredients and served with a smile. Whether you're joining us for a casual meal or a special occasion, our team is dedicated to making every visit extraordinary. Visit us today at ABC Restaurant, where great food and great company come together. © 2024 ABC Restaurant. All rights reserved.
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='Facebook' />
            <img src={assets.twitter_icon} alt='Twitter' />
            <img src={assets.linkedin_icon} alt='LinkedIn' />
          </div>
        </div>

        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
          <h2>Get in Touch</h2>
          <ul>
            <li>011-2345678</li>
            <li>abc@gmail.com</li>
          </ul><br></br>     <br></br>
          <h2>Opening Hours</h2>
          <ul>
            <li>Mon-Fri: 9am - 10pm</li>
            <li>Sat-Sun: 10am - 11pm</li>
          </ul>
        </div>
      </div>

      <div className='footer-loyalty'>
        <h2>Join Our Loyalty Program</h2>
        <p>Sign up for our loyalty program and enjoy exclusive offers, discounts, and more! As a member, you'll earn points every time you dine with us, which you can redeem for exciting rewards.</p>
        <form>
          <input type='email' placeholder='Enter Your Email To Join' />
          <button type='submit'>Join Now</button>
        </form>
      </div>

      <hr />
      <p className='footer-copyright'>
        Copyright 2024 © ABC.com - All Rights Reserved.
      </p>
    </div>
    </>
  );
}

export default Admin;
