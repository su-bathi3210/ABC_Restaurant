import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [activeForm, setActiveForm] = useState('Food');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/gallery/gallery', { params: { name: activeForm } });
        console.log(response.data);


        if (Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          console.error('Unexpected response format:', response.data);
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching gallery images', error);
      }
    };

    fetchImages();
  }, [activeForm]);

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Welcome to our culinary showcase! Dive into a visual feast that captures the essence of our restaurant. From savory dishes and delectable desserts to refreshing beverages and elegant ambiance, our gallery offers a taste of the vibrant experiences that await you. Let these images whet your appetite and inspire your next visit. Enjoy a glimpse of the passion and creativity that define our cuisine.</p>
      </div>
      <div className="full-gallery-container">
        <div className="galleries-container">
          <div className="galleries-button-group">

            <button
              onClick={() => setActiveForm('All')}
              className={`galleries-form-toggle-button ${activeForm === 'All' ? 'active' : ''}`}
            >
              All
            </button>

            <button
              onClick={() => setActiveForm('Food')}
              className={`galleries-form-toggle-button ${activeForm === 'Food' ? 'active' : ''}`}
            >
              Food
            </button>

            <button
              onClick={() => setActiveForm('Dessert')}
              className={`galleries-form-toggle-button ${activeForm === 'Dessert' ? 'active' : ''}`}
            >
              Dessert
            </button>

            <button
              onClick={() => setActiveForm('Beverages')}
              className={`galleries-form-toggle-button ${activeForm === 'Beverages' ? 'active' : ''}`}
            >
              Beverages
            </button>

            <button
              onClick={() => setActiveForm('Restaurant')}
              className={`galleries-form-toggle-button ${activeForm === 'Restaurant' ? 'active' : ''}`}
            >
              Restaurant
            </button>

          </div>

          <div className="galleries-images">
            {images.length > 0 ? (
              images.map((imageData, index) => (
                <div key={index} className="galleries-image">
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt={`${activeForm}`}
                  />
                </div>
              ))
            ) : (
              <p>No images available for {activeForm}</p>
            )}
          </div>
        </div>
      </div>

      <footer className="about-footer">
        <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Gallery;
