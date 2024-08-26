import React from 'react';
import './Facility.css';
import Dining from '../../images/Dining Area.png'
import Outdoor from '../../images/Outdoor Seating.png'
import Private from '../../images/Private Dining.png'


const Facility = () => {
  return (
    <div className="facility-container">
      <header className="facility-header">
        <h1>Our Facilities</h1>
        <p>Experience exceptional dining with our state-of-the-art facilities.</p>
      </header>

      <section className="facility-gallery">

        <div className="gallery-item">
          <div className="image-container">
            <img src={Dining} alt="Dining Area" />
          </div>
          <div className="description">
            <h3>Spacious Dining Area</h3>
            <p>Our restaurant offers a generously sized dining area designed for comfort and flexibility. With plenty of space for both intimate and larger gatherings, our welcoming atmosphere ensures an enjoyable dining experience for all guests. Perfect for casual meals or special occasions, our spacious setting enhances every visit.</p>
          </div>
        </div>

        <div className="gallery-item reverse">
          <div className="description">
            <h3>Private Dining Rooms</h3>
            <p>Enjoy an exclusive dining experience in our stylish private rooms, perfect for intimate gatherings or special events. With personalized service and a tailored menu, our private dining spaces ensure a memorable occasion in a sophisticated setting.</p>
          </div>
          <div className="image-container">
            <img src={Private} alt="Private Dining" />
          </div>
        </div>

        <div className="gallery-item">
          <div className="image-container">
            <img src={Outdoor} alt="Outdoor Seating" />
          </div>
          <div className="description">
            <h3>Outdoor Seating</h3>
            <p>Enjoy our outdoor seating area, where you can dine surrounded by lush greenery and fresh air. It's the perfect spot for a relaxed meal with friends and family, offering a charming setting to savor your favorite dishes.</p>
          </div>
        </div>

      </section>

      <section className="facility-features">
        <h2>Key Features</h2>
        <ul>
          <li>Wi-Fi Available</li>
          <li>Parking on Site</li>
          <li>Wheelchair Accessible</li>
          <li>Private Event Spaces</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Facility;