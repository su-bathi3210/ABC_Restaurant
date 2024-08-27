import React, { useEffect, useState } from 'react';
import './Facility.css';
import axios from 'axios';

const Facility = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    // Fetch the facility data from the backend
    axios.get('/facility')
      .then(response => {
        setFacilities(response.data);
      })
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  return (
    <div className="facility-container">
      <header className="facility-header">
        <h1>Our Facilities</h1>
        <p>ABC Restaurant offers a range of top-notch facilities, including spacious seating areas, a well-equipped kitchen, clean restrooms, and accessible amenities to ensure a comfortable and enjoyable dining experience for all guests.</p>
      </header>

      <section className="facility-gallery">
        {facilities.map((facility, index) => (
          <div className={`gallery-item ${index % 2 !== 0 ? 'reverse' : ''}`} key={facility.id}>
            <div className="image-container">
              <img src={`data:image/jpeg;base64,${facility.image}`} alt={facility.heading} />
            </div>
            <div className="description">
              <h3>{facility.heading}</h3>
              <p>{facility.description}</p>
            </div>
          </div>
        ))}
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
