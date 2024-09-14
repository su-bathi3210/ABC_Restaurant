import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

export const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='ABC Restaurant Logo' className='footer-logo' />
          <p>
            At ABC Restaurant, we are committed to delivering a memorable dining experience that delights your taste buds and warms your heart. Our passion for culinary excellence is reflected in every dish, crafted with the freshest ingredients and served with a smile. Whether you're joining us for a casual meal or a special occasion, our team is dedicated to making every visit extraordinary. Visit us today at ABC Restaurant, where great food and great company come together.
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
          <h3>Opening Hours</h3>
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
  );
};

export default Footer;
